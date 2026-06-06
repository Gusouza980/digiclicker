import { getGlobalConfig } from "@/catalogs/loader";
import type { PlayerDigimon } from "@/types";
import {
  createEmptyStatBlock,
  STAT_KEYS,
  type StatBlock,
  type StatKey,
} from "@/types/stats";

const FRIENDSHIP_INHERIT_THRESHOLDS = [
  { min: 68, percent: 0.1 },
  { min: 34, percent: 0.08 },
  { min: 1, percent: 0.05 },
] as const;

export function getFriendshipInheritPercent(friendship: number): number {
  for (const threshold of FRIENDSHIP_INHERIT_THRESHOLDS) {
    if (friendship >= threshold.min) {
      return threshold.percent;
    }
  }
  return 0;
}

export function calculateInheritedCumulative(
  totalStats: StatBlock,
  friendship: number,
): StatBlock {
  const percent = getFriendshipInheritPercent(friendship);
  const inherited = createEmptyStatBlock();

  for (const key of STAT_KEYS) {
    inherited[key] = Math.floor(totalStats[key] * percent);
  }

  return inherited;
}

export function mergeCumulativeStats(
  current: StatBlock,
  inherited: StatBlock,
  maxPerStat = getGlobalConfig().evolution.cumulativeMaxPerStat,
): StatBlock {
  const merged = { ...current };

  for (const key of STAT_KEYS) {
    merged[key] = Math.min(current[key] + inherited[key], maxPerStat);
  }

  return merged;
}

export function estimateCumulativeGain(
  digimon: PlayerDigimon,
  totalStats: StatBlock,
): StatBlock {
  const inherited = calculateInheritedCumulative(totalStats, digimon.friendship);
  const merged = mergeCumulativeStats(digimon.cumulativeStats, inherited);
  const gain = createEmptyStatBlock();

  for (const key of STAT_KEYS) {
    gain[key] = merged[key] - digimon.cumulativeStats[key];
  }

  return gain;
}

export function getTotalCumulativeGain(gain: StatBlock): number {
  return STAT_KEYS.reduce((sum, key) => sum + gain[key], 0);
}

export function formatStatKey(stat: StatKey): string {
  return stat.toUpperCase();
}
