import type { GlobalConfig } from "@/types";

export function getXpRequiredForLevel(level: number, config: GlobalConfig): number {
  return config.xp.xpToNextBase + level * config.xp.xpToNextGrowth;
}

export function calculateLevelFromXp(
  level: number,
  xp: number,
  config: GlobalConfig,
): { level: number; xp: number } {
  let currentLevel = level;
  let remainingXp = xp;

  while (remainingXp >= getXpRequiredForLevel(currentLevel, config)) {
    remainingXp -= getXpRequiredForLevel(currentLevel, config);
    currentLevel += 1;
  }

  return { level: currentLevel, xp: remainingXp };
}
