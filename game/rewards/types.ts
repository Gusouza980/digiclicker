import type { SaveData } from "@/types";

export type RewardGrant =
  | { type: "bits"; amount: number }
  | { type: "digimon_xp"; digimonInstanceId: string; amount: number }
  | { type: "item"; itemId: string; quantity: number }
  | { type: "essence"; essenceId: string; amount: number }
  | { type: "egg"; eggCatalogId: string; containedDigimonId: string };

export type AppliedReward = {
  type: RewardGrant["type"];
  amount: number;
  itemId?: string;
  digimonInstanceId?: string;
};

export type RewardDisplayEntry = {
  id: string;
  messageKey: string;
  amount?: number;
  actorNameKey?: string;
};

export type LevelUpEvent = {
  digimonInstanceId: string;
  nameKey: string;
  previousLevel: number;
  newLevel: number;
};

export type ApplyRewardsResult = {
  save: SaveData;
  applied: AppliedReward[];
  levelUps: LevelUpEvent[];
  display: RewardDisplayEntry[];
};
