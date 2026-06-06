import type { StatBlock } from "./stats";

export type DigimonStage =
  | "baby"
  | "in_training"
  | "rookie"
  | "champion"
  | "ultimate"
  | "mega";

export type DigimonAttribute =
  | "vaccine"
  | "data"
  | "virus"
  | "free"
  | "variable"
  | "unknown";

export type DigimonElement =
  | "fire"
  | "water"
  | "plant"
  | "ice"
  | "electric"
  | "earth"
  | "wind"
  | "light"
  | "dark"
  | "neutral";

export type DigimonBattleRewards = {
  bitsMin: number;
  bitsMax: number;
  digimonXp: number;
};

export type DigimonCatalogEntry = {
  id: string;
  nameKey: string;
  stage: DigimonStage;
  attribute: DigimonAttribute;
  element: DigimonElement;
  primaryType: string;
  baseStats: StatBlock;
  battleRewards?: DigimonBattleRewards;
};

export type PlayerDigimon = {
  instanceId: string;
  catalogId: string;
  level: number;
  xp: number;
  friendship: number;
  personalityId: string | null;
  hatchQuality: 3 | 4 | 5 | null;
  typeXp: Record<string, number>;
};
