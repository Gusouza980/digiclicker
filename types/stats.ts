export const STAT_KEYS = [
  "hp",
  "mp",
  "atk",
  "def",
  "int",
  "spi",
  "spd",
] as const;

export type StatKey = (typeof STAT_KEYS)[number];

export type StatBlock = Record<StatKey, number>;

export type StatBreakdown = {
  base: StatBlock;
  byLevel: StatBlock;
  cumulative: StatBlock;
};

export function createEmptyStatBlock(): StatBlock {
  return { hp: 0, mp: 0, atk: 0, def: 0, int: 0, spi: 0, spd: 0 };
}

export function sumStatBlocks(...blocks: StatBlock[]): StatBlock {
  const result = createEmptyStatBlock();
  for (const block of blocks) {
    for (const key of STAT_KEYS) {
      result[key] += block[key];
    }
  }
  return result;
}
