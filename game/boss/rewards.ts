import { getCatalogEntry } from "@/catalogs/loader";
import { randomInt, rollChance } from "@/game/rng";
import type { RewardGrant } from "@/game/rewards/types";

export function resolveBossVictoryRewards(bossId: string): RewardGrant[] {
  const boss = getCatalogEntry("boss", bossId);
  if (!boss) return [];

  const grants: RewardGrant[] = [
    {
      type: "bits",
      amount: randomInt(boss.rewardBitsMin, boss.rewardBitsMax),
    },
  ];

  for (const drop of boss.rewardItems ?? []) {
    if (rollChance(drop.chance)) {
      grants.push({
        type: "item",
        itemId: drop.itemId,
        quantity: drop.quantity,
      });
    }
  }

  return grants;
}
