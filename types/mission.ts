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

export type MissionCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  objectives: Omit<MissionObjective, "current">[];
  rewardIds: string[];
  prerequisiteMissionIds: string[];
};

export type MissionProgress = {
  missionId: string;
  status: "active" | "completed" | "claimed";
  objectives: MissionObjective[];
};
