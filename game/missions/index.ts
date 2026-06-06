import { getAllCatalogEntries, getCatalogEntry } from "@/catalogs/loader";
import { applyTrainerXp } from "@/game/trainer/progression";
import type {
  GlobalConfig,
  MissionCatalogEntry,
  MissionObjective,
  MissionProgress,
  SaveData,
} from "@/types";

export type MissionClaimResult = {
  save: SaveData;
  bitsGained: number;
  trainerXpGained: number;
};

function createMissionProgress(entry: MissionCatalogEntry): MissionProgress {
  return {
    missionId: entry.id,
    status: "active",
    objectives: entry.objectives.map((objective) => ({
      ...objective,
      current: 0,
    })),
  };
}

export function ensureStarterMission(save: SaveData): SaveData {
  if (save.missions.length > 0) return save;

  const awakening = getCatalogEntry("mission", "mission_awakening");
  if (!awakening) return save;

  const next = structuredClone(save);
  next.missions.push(createMissionProgress(awakening));
  return next;
}

export function getActiveMission(save: SaveData): MissionProgress | null {
  return save.missions.find((mission) => mission.status === "active") ?? null;
}

export function getCompletedMission(save: SaveData): MissionProgress | null {
  return save.missions.find((mission) => mission.status === "completed") ?? null;
}

function areObjectivesComplete(objectives: MissionObjective[]): boolean {
  return objectives.every((objective) => objective.current >= objective.required);
}

function incrementObjective(
  objectives: MissionObjective[],
  type: MissionObjective["type"],
  targetId: string | null,
  amount: number,
): void {
  for (const objective of objectives) {
    if (objective.type !== type) continue;
    if (objective.targetId !== null && objective.targetId !== targetId) continue;
    objective.current = Math.min(objective.required, objective.current + amount);
  }
}

export type VictoryMissionContext = {
  locationId: string;
  defeatedEnemyCount: number;
  defeatedBossId: string | null;
};

export function updateMissionProgressOnVictory(
  save: SaveData,
  context: VictoryMissionContext,
): SaveData {
  const active = getActiveMission(save);
  if (!active) return save;

  const next = structuredClone(save);
  const mission = next.missions.find((entry) => entry.missionId === active.missionId);
  if (!mission || mission.status !== "active") return save;

  incrementObjective(
    mission.objectives,
    "defeat_enemies",
    context.locationId,
    context.defeatedEnemyCount,
  );
  incrementObjective(
    mission.objectives,
    "defeat_enemies",
    null,
    context.defeatedEnemyCount,
  );

  if (context.defeatedBossId) {
    incrementObjective(mission.objectives, "defeat_boss", context.defeatedBossId, 1);
  }

  if (areObjectivesComplete(mission.objectives)) {
    mission.status = "completed";
  }

  return next;
}

export function updateMissionProgressOnLocationChange(
  save: SaveData,
  locationId: string,
): SaveData {
  const active = getActiveMission(save);
  if (!active) return save;

  const next = structuredClone(save);
  const mission = next.missions.find((entry) => entry.missionId === active.missionId);
  if (!mission || mission.status !== "active") return save;

  incrementObjective(mission.objectives, "reach_location", locationId, 1);

  if (areObjectivesComplete(mission.objectives)) {
    mission.status = "completed";
  }

  return next;
}

function prerequisitesMet(save: SaveData, entry: MissionCatalogEntry): boolean {
  return entry.prerequisiteMissionIds.every((missionId) => {
    const progress = save.missions.find((mission) => mission.missionId === missionId);
    return progress?.status === "claimed";
  });
}

export function activateNextMission(save: SaveData): SaveData {
  const missions = getAllCatalogEntries("mission");
  const next = structuredClone(save);

  for (const entry of Object.values(missions)) {
    const existing = next.missions.find((mission) => mission.missionId === entry.id);
    if (existing) continue;
    if (!prerequisitesMet(next, entry)) continue;

    next.missions.push(createMissionProgress(entry));
    break;
  }

  return next;
}

export function claimMission(
  save: SaveData,
  missionId: string,
  config: GlobalConfig,
): MissionClaimResult | null {
  const entry = getCatalogEntry("mission", missionId);
  if (!entry) return null;

  const next = structuredClone(save);
  const mission = next.missions.find((item) => item.missionId === missionId);
  if (!mission || mission.status !== "completed") return null;

  let bitsGained = 0;
  let trainerXpGained = 0;

  for (const reward of entry.rewards) {
    if (reward.type === "bits") {
      next.player.bits += reward.amount;
      bitsGained += reward.amount;
    }

    if (reward.type === "trainer_xp") {
      const result = applyTrainerXp(next, reward.amount, config);
      Object.assign(next.player, result.save.player);
      trainerXpGained += reward.amount;
    }
  }

  mission.status = "claimed";

  const withNextMission = activateNextMission(next);
  return { save: withNextMission, bitsGained, trainerXpGained };
}
