import { getAllCatalogEntries, getCatalogEntry, getGlobalConfig } from "@/catalogs/loader";
import type {
  CollectionFeedback,
  DigimonCatalogEntry,
  DigimonLocation,
  DigimonStage,
  GlobalConfig,
  SaveData,
} from "@/types";

export type CollectionActionResult =
  | { ok: true; save: SaveData; feedback: CollectionFeedback }
  | { ok: false; reason: string; feedback: CollectionFeedback };

const STAGE_ORDER: DigimonStage[] = [
  "baby",
  "in_training",
  "rookie",
  "champion",
  "ultimate",
  "mega",
];

export function getDigimonLocation(save: SaveData, instanceId: string): DigimonLocation {
  if (save.team.activeDigimonIds.includes(instanceId)) return "team";
  if (save.island.storedDigimonIds.includes(instanceId)) return "island";
  return "unknown";
}

export function isDigimonOccupied(save: SaveData, instanceId: string): boolean {
  return save.island.activeActions.some(
    (action) => action.digimonInstanceId === instanceId,
  );
}

export function canAddToTeam(save: SaveData, config: GlobalConfig): boolean {
  return save.team.activeDigimonIds.length < config.team.maxActive;
}

export function canAddToIsland(save: SaveData, config: GlobalConfig): boolean {
  return save.island.storedDigimonIds.length < config.island.maxStorage;
}

export function getEvolutionLine(catalogId: string): DigimonCatalogEntry[] {
  const current = getCatalogEntry("digimon", catalogId);
  if (!current?.lineId) return [current].filter(Boolean) as DigimonCatalogEntry[];

  return Object.values(getAllCatalogEntries("digimon"))
    .filter((entry) => entry.lineId === current.lineId)
    .sort(
      (a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage),
    );
}

export function moveDigimonToTeam(
  save: SaveData,
  islandDigimonId: string,
  swapWithTeamMemberId?: string,
  config: GlobalConfig = getGlobalConfig(),
): CollectionActionResult {
  const next = structuredClone(save);

  if (!next.digimons[islandDigimonId]) {
    return {
      ok: false,
      reason: "digimon_not_found",
      feedback: { messageKey: "collection.error.digimon_not_found", variant: "fail" },
    };
  }

  if (getDigimonLocation(next, islandDigimonId) !== "island") {
    return {
      ok: false,
      reason: "not_on_island",
      feedback: { messageKey: "collection.error.not_on_island", variant: "fail" },
    };
  }

  if (isDigimonOccupied(next, islandDigimonId)) {
    return {
      ok: false,
      reason: "digimon_occupied",
      feedback: { messageKey: "collection.error.digimon_occupied", variant: "fail" },
    };
  }

  const teamFull = !canAddToTeam(next, config);

  if (teamFull && !swapWithTeamMemberId) {
    return {
      ok: false,
      reason: "team_full",
      feedback: { messageKey: "collection.error.team_full", variant: "info" },
    };
  }

  if (swapWithTeamMemberId) {
    if (!next.team.activeDigimonIds.includes(swapWithTeamMemberId)) {
      return {
        ok: false,
        reason: "swap_not_in_team",
        feedback: { messageKey: "collection.error.swap_not_in_team", variant: "fail" },
      };
    }

    if (isDigimonOccupied(next, swapWithTeamMemberId)) {
      return {
        ok: false,
        reason: "swap_occupied",
        feedback: { messageKey: "collection.error.digimon_occupied", variant: "fail" },
      };
    }

    if (!canAddToIsland(next, config)) {
      return {
        ok: false,
        reason: "island_full",
        feedback: { messageKey: "collection.error.island_full", variant: "fail" },
      };
    }

    next.team.activeDigimonIds = next.team.activeDigimonIds.map((id) =>
      id === swapWithTeamMemberId ? islandDigimonId : id,
    );
    next.island.storedDigimonIds = next.island.storedDigimonIds.map((id) =>
      id === islandDigimonId ? swapWithTeamMemberId : id,
    );
  } else {
    next.island.storedDigimonIds = next.island.storedDigimonIds.filter(
      (id) => id !== islandDigimonId,
    );
    next.team.activeDigimonIds.push(islandDigimonId);
  }

  const catalog = getCatalogEntry("digimon", next.digimons[islandDigimonId].catalogId);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "collection.move.to_team",
      variant: "success",
      params: { name: catalog?.nameKey ?? islandDigimonId },
    },
  };
}

export function moveDigimonToIsland(
  save: SaveData,
  teamDigimonId: string,
  config: GlobalConfig = getGlobalConfig(),
): CollectionActionResult {
  const next = structuredClone(save);

  if (!next.digimons[teamDigimonId]) {
    return {
      ok: false,
      reason: "digimon_not_found",
      feedback: { messageKey: "collection.error.digimon_not_found", variant: "fail" },
    };
  }

  if (getDigimonLocation(next, teamDigimonId) !== "team") {
    return {
      ok: false,
      reason: "not_on_team",
      feedback: { messageKey: "collection.error.not_on_team", variant: "fail" },
    };
  }

  if (isDigimonOccupied(next, teamDigimonId)) {
    return {
      ok: false,
      reason: "digimon_occupied",
      feedback: { messageKey: "collection.error.digimon_occupied", variant: "fail" },
    };
  }

  if (next.team.activeDigimonIds.length <= 1) {
    return {
      ok: false,
      reason: "team_minimum",
      feedback: { messageKey: "collection.error.team_minimum", variant: "fail" },
    };
  }

  if (!canAddToIsland(next, config)) {
    return {
      ok: false,
      reason: "island_full",
      feedback: { messageKey: "collection.error.island_full", variant: "fail" },
    };
  }

  next.team.activeDigimonIds = next.team.activeDigimonIds.filter(
    (id) => id !== teamDigimonId,
  );
  next.island.storedDigimonIds.push(teamDigimonId);

  const catalog = getCatalogEntry("digimon", next.digimons[teamDigimonId].catalogId);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "collection.move.to_island",
      variant: "success",
      params: { name: catalog?.nameKey ?? teamDigimonId },
    },
  };
}
