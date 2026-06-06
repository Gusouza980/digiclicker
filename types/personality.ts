import type { StatKey } from "./stats";

export type PersonalityGrowthModifiers = Partial<Record<StatKey, number>>;

export type PersonalityCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  growthModifiers: PersonalityGrowthModifiers;
};
