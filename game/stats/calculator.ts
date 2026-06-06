import { getCatalogEntry } from "@/catalogs/loader";
import type { PlayerDigimon } from "@/types/digimon";
import {
  createEmptyStatBlock,
  sumStatBlocks,
  type StatBlock,
  type StatBreakdown,
  type StatKey,
} from "@/types/stats";

const GROWTH_RATE = 0.1;

const FRIENDSHIP_CUMULATIVE_THRESHOLDS = [
  { min: 80, percent: 0.1 },
  { min: 50, percent: 0.08 },
  { min: 25, percent: 0.05 },
] as const;

function getGrowthByLevel(base: StatBlock, level: number): StatBlock {
  const growth = createEmptyStatBlock();
  const levelsAboveOne = Math.max(0, level - 1);

  for (const key of Object.keys(growth) as StatKey[]) {
    growth[key] = Math.floor(base[key] * GROWTH_RATE * levelsAboveOne);
  }

  return growth;
}

function getCumulativePercent(friendship: number): number {
  for (const threshold of FRIENDSHIP_CUMULATIVE_THRESHOLDS) {
    if (friendship >= threshold.min) {
      return threshold.percent;
    }
  }
  return 0;
}

function getCumulativeByFriendship(base: StatBlock, friendship: number): StatBlock {
  const cumulative = createEmptyStatBlock();
  const percent = getCumulativePercent(friendship);

  for (const key of Object.keys(cumulative) as StatKey[]) {
    cumulative[key] = Math.floor(base[key] * percent);
  }

  return cumulative;
}

export function calculateStatBreakdown(digimon: PlayerDigimon): StatBreakdown | null {
  const catalog = getCatalogEntry("digimon", digimon.catalogId);
  if (!catalog) return null;

  const base = { ...catalog.baseStats };
  const byLevel = getGrowthByLevel(base, digimon.level);
  const cumulative = getCumulativeByFriendship(base, digimon.friendship);

  return { base, byLevel, cumulative };
}

export function calculateTotalStats(digimon: PlayerDigimon): StatBlock | null {
  const breakdown = calculateStatBreakdown(digimon);
  if (!breakdown) return null;

  return sumStatBlocks(breakdown.base, breakdown.byLevel, breakdown.cumulative);
}

export function calculateTeamTotalStat(
  digimons: PlayerDigimon[],
  stat: StatKey,
): number {
  return digimons.reduce((total, digimon) => {
    const stats = calculateTotalStats(digimon);
    return total + (stats?.[stat] ?? 0);
  }, 0);
}
