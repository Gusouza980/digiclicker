import { getCatalogEntry, getGlobalConfig } from "@/catalogs/loader";
import {
  consumeEssence,
  consumeItem,
  getEggById,
  getEssenceQuantity,
  getItemQuantity,
  removeEgg,
  validateEggContents,
} from "@/game/inventory/operations";
import { getEssenceIdForType } from "@/game/inventory";
import { createInstanceId } from "@/utils/id";
import type {
  GlobalConfig,
  HatchDestination,
  HatchingFeedback,
  InsertionOutcome,
  PlayerDigimon,
  SaveData,
} from "@/types";

import {
  getInsertionChancesForSuccessfulCount,
  getNextInsertionSlot,
  rollInsertionOutcome,
} from "./chances";
import { rollHatchPersonalityId } from "./personality";

export type HatchingActionResult =
  | { ok: true; save: SaveData; feedback: HatchingFeedback }
  | { ok: false; reason: string; feedback: HatchingFeedback };

function findEgg(save: SaveData, eggInstanceId: string) {
  return getEggById(save.inventory, eggInstanceId);
}

export function getScanCost(eggRarity: SaveData["inventory"]["eggs"][number]["rarity"], config: GlobalConfig): number {
  return config.hatching.scanCostByRarity[eggRarity];
}

export function getEssenceInsertCost(
  eggRarity: SaveData["inventory"]["eggs"][number]["rarity"],
  config: GlobalConfig,
): number {
  return config.hatching.essenceCostByRarity[eggRarity];
}

export function getNextInsertionChances(save: SaveData, eggInstanceId: string) {
  const config = getGlobalConfig();
  const egg = findEgg(save, eggInstanceId);
  if (!egg) return null;

  return getInsertionChancesForSuccessfulCount(
    config.hatching.insertionChances,
    egg.insertions,
  );
}

export { getNextInsertionSlot };

export function scanEgg(save: SaveData, eggInstanceId: string): HatchingActionResult {
  const config = getGlobalConfig();
  const next = structuredClone(save);
  const egg = findEgg(next, eggInstanceId);

  if (!egg) {
    return {
      ok: false,
      reason: "egg_not_found",
      feedback: { messageKey: "hatching.error.egg_not_found", variant: "fail" },
    };
  }

  if (egg.scanned) {
    return {
      ok: false,
      reason: "already_scanned",
      feedback: { messageKey: "hatching.error.already_scanned", variant: "info" },
    };
  }

  if (!validateEggContents(egg)) {
    return {
      ok: false,
      reason: "invalid_contents",
      feedback: { messageKey: "hatching.error.invalid_contents", variant: "fail" },
    };
  }

  const cost = getScanCost(egg.rarity, config);
  if (next.player.bits < cost) {
    return {
      ok: false,
      reason: "insufficient_bits",
      feedback: {
        messageKey: "hatching.error.insufficient_bits",
        variant: "fail",
        params: { cost: String(cost) },
      },
    };
  }

  next.player.bits -= cost;
  egg.scanned = true;
  egg.revealedDigimonId = egg.containedDigimonId;

  const digimon = getCatalogEntry("digimon", egg.containedDigimonId);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "hatching.scan.success",
      variant: "success",
      params: {
        name: digimon?.nameKey ? digimon.nameKey : egg.containedDigimonId,
        cost: String(cost),
      },
    },
  };
}

export function insertEssence(
  save: SaveData,
  eggInstanceId: string,
  useStabilizer = false,
): HatchingActionResult {
  const config = getGlobalConfig();
  const next = structuredClone(save);
  const egg = findEgg(next, eggInstanceId);

  if (!egg) {
    return {
      ok: false,
      reason: "egg_not_found",
      feedback: { messageKey: "hatching.error.egg_not_found", variant: "fail" },
    };
  }

  if (!egg.scanned) {
    return {
      ok: false,
      reason: "not_scanned",
      feedback: { messageKey: "hatching.error.not_scanned", variant: "fail" },
    };
  }

  if (egg.insertions >= egg.maxInsertions) {
    return {
      ok: false,
      reason: "max_insertions",
      feedback: { messageKey: "hatching.error.max_insertions", variant: "info" },
    };
  }

  const essenceId = getEssenceIdForType(egg.digimonType);
  const essenceCost = getEssenceInsertCost(egg.rarity, config);

  if (getEssenceQuantity(next.inventory, essenceId) < essenceCost) {
    return {
      ok: false,
      reason: "insufficient_essence",
      feedback: {
        messageKey: "hatching.error.insufficient_essence",
        variant: "fail",
        params: { cost: String(essenceCost) },
      },
    };
  }

  if (useStabilizer && getItemQuantity(next.inventory, "hatch_stabilizer") < 1) {
    return {
      ok: false,
      reason: "no_stabilizer",
      feedback: { messageKey: "hatching.error.no_stabilizer", variant: "fail" },
    };
  }

  if (!consumeEssence(next.inventory, essenceId, essenceCost)) {
    return {
      ok: false,
      reason: "essence_consume_failed",
      feedback: { messageKey: "hatching.error.insufficient_essence", variant: "fail" },
    };
  }

  const chances = getInsertionChancesForSuccessfulCount(
    config.hatching.insertionChances,
    egg.insertions,
  );
  let outcome: InsertionOutcome = rollInsertionOutcome(chances);

  if (outcome === "break" && useStabilizer) {
    consumeItem(next.inventory, "hatch_stabilizer", 1);
    outcome = "fail";
  }

  if (outcome === "success") {
    egg.insertions += 1;
    return {
      ok: true,
      save: next,
      feedback: {
        messageKey: "hatching.insert.success",
        variant: "success",
        params: {
          current: String(egg.insertions),
          max: String(egg.maxInsertions),
        },
      },
    };
  }

  if (outcome === "fail") {
    return {
      ok: true,
      save: next,
      feedback: {
        messageKey: useStabilizer
          ? "hatching.insert.fail_stabilized"
          : "hatching.insert.fail",
        variant: "fail",
      },
    };
  }

  removeEgg(next.inventory, egg.instanceId);
  return {
    ok: true,
    save: next,
    feedback: { messageKey: "hatching.insert.break", variant: "break" },
  };
}

export function canHatchEgg(save: SaveData, eggInstanceId: string): boolean {
  const egg = findEgg(save, eggInstanceId);
  if (!egg || !egg.scanned) return false;
  return egg.insertions >= getGlobalConfig().hatching.minInsertionsToHatch;
}

export function canAddToTeam(save: SaveData, config: GlobalConfig): boolean {
  return save.team.activeDigimonIds.length < config.team.maxActive;
}

export function canAddToIsland(save: SaveData, config: GlobalConfig): boolean {
  return save.island.storedDigimonIds.length < config.island.maxStorage;
}

export function hatchEgg(
  save: SaveData,
  eggInstanceId: string,
  destination: HatchDestination,
): HatchingActionResult {
  const config = getGlobalConfig();
  const next = structuredClone(save);
  const egg = findEgg(next, eggInstanceId);

  if (!egg) {
    return {
      ok: false,
      reason: "egg_not_found",
      feedback: { messageKey: "hatching.error.egg_not_found", variant: "fail" },
    };
  }

  if (!canHatchEgg(next, eggInstanceId)) {
    return {
      ok: false,
      reason: "not_ready",
      feedback: { messageKey: "hatching.error.not_ready", variant: "fail" },
    };
  }

  if (destination === "team" && !canAddToTeam(next, config)) {
    return {
      ok: false,
      reason: "team_full",
      feedback: { messageKey: "hatching.error.team_full", variant: "fail" },
    };
  }

  if (destination === "island" && !canAddToIsland(next, config)) {
    return {
      ok: false,
      reason: "island_full",
      feedback: { messageKey: "hatching.error.island_full", variant: "fail" },
    };
  }

  const quality = Math.min(Math.max(egg.insertions, 3), 5) as 3 | 4 | 5;
  const personalityId = rollHatchPersonalityId();
  const digimon: PlayerDigimon = {
    instanceId: createInstanceId(egg.containedDigimonId),
    catalogId: egg.containedDigimonId,
    level: 1,
    xp: 0,
    friendship: 0,
    personalityId,
    hatchQuality: quality,
    typeXp: {},
    source: "hatch",
  };

  next.digimons[digimon.instanceId] = digimon;

  if (destination === "team") {
    next.team.activeDigimonIds.push(digimon.instanceId);
  } else {
    next.island.storedDigimonIds.push(digimon.instanceId);
  }

  removeEgg(next.inventory, egg.instanceId);

  const catalog = getCatalogEntry("digimon", digimon.catalogId);
  const personality = personalityId
    ? getCatalogEntry("personality", personalityId)
    : null;

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "hatching.hatch.success",
      variant: "success",
      params: {
        name: catalog?.nameKey ?? digimon.catalogId,
        quality: String(quality),
        personality: personality?.nameKey ?? "",
        destination:
          destination === "team" ? "hatching.destination.team" : "hatching.destination.island",
      },
    },
  };
}
