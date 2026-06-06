import type { LevelUpEvent, RewardDisplayEntry } from "@/game/rewards";

import type { DigimonAttribute, DigimonElement } from "./digimon";
import type { StatBlock } from "./stats";

export type BossVictorySummary = {
  bossNameKey: string;
  rewards: RewardDisplayEntry[];
  levelUps: LevelUpEvent[];
};

export type BossDailyProgress = {
  dateKey: string;
  attemptedBossIds: string[];
};

export type BossRewardItem = {
  itemId: string;
  quantity: number;
  chance: number;
};

export type BossCatalogEntry = {
  id: string;
  locationId: string;
  nameKey: string;
  digimonId: string;
  attribute: DigimonAttribute;
  element: DigimonElement;
  baseStats: StatBlock;
  challengeRequirementIds: string[];
  rewardBitsMin: number;
  rewardBitsMax: number;
  rewardItems?: BossRewardItem[];
};
