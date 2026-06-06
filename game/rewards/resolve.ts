import { getCatalogEntry, getGlobalConfig } from "@/catalogs/loader";
import type { SaveData } from "@/types";

import type { RewardGrant } from "./types";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function resolveVictoryRewards(
  save: SaveData,
  locationId: string,
  defeatedEnemyIds: string[],
  livingAllyInstanceIds: string[],
): RewardGrant[] {
  const config = getGlobalConfig();
  const location = getCatalogEntry("location", locationId);
  const grants: RewardGrant[] = [];

  if (location?.victoryRewards) {
    grants.push({
      type: "bits",
      amount: randomInt(
        location.victoryRewards.bitsMin,
        location.victoryRewards.bitsMax,
      ),
    });
  }

  for (const allyId of livingAllyInstanceIds) {
    if (save.digimons[allyId]) {
      grants.push({
        type: "digimon_xp",
        digimonInstanceId: allyId,
        amount: config.xp.digimonPerVictory,
      });
    }
  }

  for (const enemyId of defeatedEnemyIds) {
    const enemy = getCatalogEntry("digimon", enemyId);
    if (!enemy?.battleRewards) continue;

    grants.push({
      type: "bits",
      amount: randomInt(enemy.battleRewards.bitsMin, enemy.battleRewards.bitsMax),
    });

    for (const allyId of livingAllyInstanceIds) {
      if (!save.digimons[allyId]) continue;
      grants.push({
        type: "digimon_xp",
        digimonInstanceId: allyId,
        amount: enemy.battleRewards.digimonXp,
      });
    }
  }

  return grants;
}
