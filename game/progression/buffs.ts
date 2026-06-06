import type { SaveData } from "@/types";

export function getXpMultiplier(save: SaveData): number {
  const buff = save.activeBuffs.find(
    (entry) => entry.type === "xp_multiplier" && entry.battlesRemaining > 0,
  );
  return buff?.multiplier ?? 1;
}

export function consumeBattleBuffs(save: SaveData): SaveData {
  const next = structuredClone(save);

  next.activeBuffs = next.activeBuffs
    .map((buff) => {
      if (buff.type !== "xp_multiplier") return buff;
      return { ...buff, battlesRemaining: buff.battlesRemaining - 1 };
    })
    .filter((buff) => buff.battlesRemaining > 0);

  return next;
}
