import { getCatalogEntry } from "@/catalogs/loader";
import type { RewardGrant } from "@/game/rewards/types";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    if (Math.random() < drop.chance) {
      grants.push({
        type: "item",
        itemId: drop.itemId,
        quantity: drop.quantity,
      });
    }
  }

  return grants;
}
