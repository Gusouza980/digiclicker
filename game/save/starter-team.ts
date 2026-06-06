import type { PlayerDigimon, SaveData } from "@/types";

import { createInstanceId } from "@/utils/id";

const STARTER_CATALOG_IDS = ["agumon", "gabumon", "biyomon"] as const;

export function createStarterDigimon(catalogId: string): PlayerDigimon {
  return {
    instanceId: createInstanceId(catalogId),
    catalogId,
    level: 5,
    xp: 0,
    friendship: 0,
    personalityId: null,
    hatchQuality: null,
    typeXp: {},
  };
}

export function buildStarterTeam(): Pick<SaveData, "digimons" | "team"> {
  const digimons: Record<string, PlayerDigimon> = {};
  const activeDigimonIds: string[] = [];

  for (const catalogId of STARTER_CATALOG_IDS) {
    const digimon = createStarterDigimon(catalogId);
    digimons[digimon.instanceId] = digimon;
    activeDigimonIds.push(digimon.instanceId);
  }

  return {
    digimons,
    team: { activeDigimonIds },
  };
}

export function ensureStarterTeam(save: SaveData): SaveData {
  if (save.team.activeDigimonIds.length > 0) {
    return save;
  }

  const starter = buildStarterTeam();
  return {
    ...save,
    digimons: { ...save.digimons, ...starter.digimons },
    team: starter.team,
  };
}
