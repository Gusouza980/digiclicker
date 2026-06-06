export type MissionObjectiveType =
  | "defeat_enemies"
  | "defeat_boss"
  | "collect_item"
  | "reach_location"
  | "hatch_egg";

export type MissionObjective = {
  type: MissionObjectiveType;
  targetId: string | null;
  required: number;
  current: number;
};

export type MissionCatalogReward = {
  type: "bits" | "trainer_xp";
  amount: number;
};

export type MissionCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  objectives: Omit<MissionObjective, "current">[];
  rewards: MissionCatalogReward[];
  prerequisiteMissionIds: string[];
};

export type MissionProgress = {
  missionId: string;
  status: "active" | "completed" | "claimed";
  objectives: MissionObjective[];
};
