import { getCatalogEntry } from "@/catalogs/loader";
import { addEgg, addEssence } from "@/game/inventory";
import { calculateLevelFromXp } from "@/game/progression/xp";
import type { GlobalConfig, SaveData } from "@/types";

import type {
  AppliedReward,
  ApplyRewardsResult,
  LevelUpEvent,
  RewardDisplayEntry,
  RewardGrant,
} from "./types";

let displayCounter = 0;

function nextDisplayId(): string {
  displayCounter += 1;
  return `reward_${displayCounter}`;
}

export function applyRewards(
  save: SaveData,
  grants: RewardGrant[],
  config: GlobalConfig,
): ApplyRewardsResult {
  const nextSave: SaveData = structuredClone(save);
  const applied: AppliedReward[] = [];
  const levelUps: LevelUpEvent[] = [];
  const display: RewardDisplayEntry[] = [];

  for (const grant of grants) {
    if (grant.type === "bits") {
      nextSave.player.bits += grant.amount;
      applied.push({ type: "bits", amount: grant.amount });
      display.push({
        id: nextDisplayId(),
        messageKey: "battle.reward.bits",
        amount: grant.amount,
      });
      continue;
    }

    if (grant.type === "digimon_xp") {
      const digimon = nextSave.digimons[grant.digimonInstanceId];
      if (!digimon) continue;

      const catalog = getCatalogEntry("digimon", digimon.catalogId);
      const previousLevel = digimon.level;
      const totalXp = digimon.xp + grant.amount;
      const progressed = calculateLevelFromXp(digimon.level, totalXp, config);

      digimon.level = progressed.level;
      digimon.xp = progressed.xp;

      applied.push({
        type: "digimon_xp",
        amount: grant.amount,
        digimonInstanceId: grant.digimonInstanceId,
      });

      display.push({
        id: nextDisplayId(),
        messageKey: "battle.reward.xp",
        amount: grant.amount,
        actorNameKey: catalog?.nameKey,
      });

      if (digimon.level > previousLevel && catalog) {
        levelUps.push({
          digimonInstanceId: digimon.instanceId,
          nameKey: catalog.nameKey,
          previousLevel,
          newLevel: digimon.level,
        });
        display.push({
          id: nextDisplayId(),
          messageKey: "battle.reward.level_up",
          actorNameKey: catalog.nameKey,
          amount: digimon.level,
        });
      }

      continue;
    }

    if (grant.type === "essence") {
      addEssence(nextSave.inventory, grant.essenceId, grant.amount);
      const essence = getCatalogEntry("essence", grant.essenceId);
      applied.push({ type: "essence", amount: grant.amount, itemId: grant.essenceId });
      display.push({
        id: nextDisplayId(),
        messageKey: "battle.reward.essence",
        amount: grant.amount,
        actorNameKey: essence?.nameKey,
      });
      continue;
    }

    if (grant.type === "egg") {
      const egg = addEgg(
        nextSave.inventory,
        grant.eggCatalogId,
        grant.containedDigimonId,
      );
      if (!egg) continue;

      const eggCatalog = getCatalogEntry("egg", grant.eggCatalogId);
      applied.push({ type: "egg", amount: 1, itemId: grant.eggCatalogId });
      display.push({
        id: nextDisplayId(),
        messageKey: "battle.reward.egg",
        amount: 1,
        actorNameKey: eggCatalog?.nameKey,
      });
      continue;
    }

    if (grant.type === "item") {
      const existing = nextSave.inventory.items.find(
        (item) => item.itemId === grant.itemId,
      );

      if (existing) {
        existing.quantity += grant.quantity;
      } else {
        nextSave.inventory.items.push({
          itemId: grant.itemId,
          quantity: grant.quantity,
        });
      }

      applied.push({
        type: "item",
        amount: grant.quantity,
        itemId: grant.itemId,
      });
      display.push({
        id: nextDisplayId(),
        messageKey: "battle.reward.item",
        amount: grant.quantity,
      });
    }
  }

  return { save: nextSave, applied, levelUps, display };
}
