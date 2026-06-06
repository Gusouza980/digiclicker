import { getAllCatalogEntries, getCatalogEntry, getGlobalConfig } from "@/catalogs/loader";
import { getEssenceIdForType } from "@/game/inventory";
import type { RewardGrant } from "@/game/rewards/types";
import type { DigimonCatalogEntry, EggRarity } from "@/types";

function rollChance(chance: number): boolean {
  return Math.random() < chance;
}

function pickWeightedRarity(weights: Record<EggRarity, number>): EggRarity {
  const entries = Object.entries(weights).filter(([, weight]) => weight > 0);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;

  for (const [rarity, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return rarity as EggRarity;
  }

  return "common";
}

function pickRookieForType(primaryType: string): string | null {
  const digimons = Object.values(
    getAllCatalogEntries("digimon"),
  ) as DigimonCatalogEntry[];

  const candidates = digimons.filter(
    (entry) => entry.primaryType === primaryType && entry.stage === "rookie",
  );

  if (candidates.length === 0) return null;

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index]?.id ?? null;
}

export function resolveBattleDrops(defeatedEnemyIds: string[]): RewardGrant[] {
  const config = getGlobalConfig();
  const grants: RewardGrant[] = [];

  for (const enemyId of defeatedEnemyIds) {
    const enemy = getCatalogEntry("digimon", enemyId);
    if (!enemy) continue;

    const essenceChance =
      enemy.dropTable?.essenceChance ?? config.drops.essenceChance;
    const eggChance = enemy.dropTable?.eggChance ?? config.drops.eggChance;

    if (rollChance(essenceChance)) {
      grants.push({
        type: "essence",
        essenceId: getEssenceIdForType(enemy.primaryType),
        amount: 1,
      });
    }

    if (rollChance(eggChance)) {
      const rarity = pickWeightedRarity(config.drops.eggRarityWeights);
      const eggCatalogId = `egg_${enemy.primaryType}_${rarity}`;
      const containedDigimonId = pickRookieForType(enemy.primaryType);

      if (containedDigimonId && getCatalogEntry("egg", eggCatalogId)) {
        grants.push({
          type: "egg",
          eggCatalogId,
          containedDigimonId,
        });
      }
    }
  }

  return grants;
}
