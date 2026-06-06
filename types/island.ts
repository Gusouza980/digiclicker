import type { StatKey } from "./stats";

export type IslandActionType =
  | "stat_training"
  | "friendship_training"
  | "type_xp"
  | "item_search"
  | "auto_mission";

export type IslandAction = {
  id: string;
  actionType: IslandActionType;
  digimonInstanceId: string;
  startedAt: string;
  endsAt: string;
  statTarget?: StatKey;
  typeXpTarget?: string;
  missionId?: string;
  usedTrainingChip?: boolean;
};

export type IslandActionConfig = {
  durationMs: number;
  statGain?: number;
  friendshipGain?: number;
  typeXpGain?: number;
};

export type IslandItemSearchDrop = {
  itemId: string;
  weight: number;
  quantity: number;
};

export type IslandAutoMissionConfig = {
  id: string;
  nameKey: string;
  durationMs: number;
  minLevel: number;
  rewardBits: number;
};

export type IslandTrainingChipConfig = {
  durationMultiplier: number;
  rewardMultiplier: number;
};

export type IslandActionsConfig = Record<IslandActionType, IslandActionConfig>;

export type IslandGameplayConfig = {
  maxStorage: number;
  slotsPerAction: number;
  actions: IslandActionsConfig;
  itemSearchDrops: IslandItemSearchDrop[];
  autoMissions: IslandAutoMissionConfig[];
  trainingChip: IslandTrainingChipConfig;
};

export type IslandActionFeedback = {
  messageKey: string;
  variant: "success" | "fail" | "info";
  params?: Record<string, string>;
};
