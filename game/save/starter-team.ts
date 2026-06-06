import type { PlayerDigimon, SaveData } from "@/types";
import { createEmptyStatBlock } from "@/types/stats";

import { createInstanceId } from "@/utils/id";

const STARTER_CATALOG_IDS = ["agumon", "gabumon", "biyomon"] as const;

const STARTER_PERSONALITIES = ["fighter", "defender", "nimble"] as const;

export function createStarterDigimon(
  catalogId: string,
  personalityId: string | null = null,
): PlayerDigimon {
  return {
    instanceId: createInstanceId(catalogId),
    catalogId,
    level: 5,
    xp: 0,
    friendship: 0,
    personalityId,
    hatchQuality: null,
    typeXp: {},
    source: "starter",
    cumulativeStats: createEmptyStatBlock(),
  };
}

export function buildStarterTeam(): Pick<SaveData, "digimons" | "team"> {
  const digimons: Record<string, PlayerDigimon> = {};
  const activeDigimonIds: string[] = [];

  for (const [index, catalogId] of STARTER_CATALOG_IDS.entries()) {
    const digimon = createStarterDigimon(
      catalogId,
      STARTER_PERSONALITIES[index] ?? null,
    );
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
