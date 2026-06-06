export type WeightedOption<T> = {
  value: T;
  weight: number;
};

export function random(): number {
  return Math.random();
}

export function randomInt(min: number, max: number): number {
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  return Math.floor(random() * (safeMax - safeMin + 1)) + safeMin;
}

export function rollChance(chance: number): boolean {
  return random() < chance;
}

export function pickRandom<T>(items: readonly T[]): T | null {
  if (items.length === 0) return null;
  return items[randomInt(0, items.length - 1)] ?? null;
}

export function pickWeighted<T>(options: readonly WeightedOption<T>[]): T | null {
  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  if (totalWeight <= 0 || options.length === 0) return null;

  let roll = random() * totalWeight;
  for (const option of options) {
    roll -= option.weight;
    if (roll <= 0) return option.value;
  }

  return options[options.length - 1]?.value ?? null;
}
