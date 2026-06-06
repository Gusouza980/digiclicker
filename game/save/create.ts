import { ensureStarterMission } from "@/game/missions";
import { DEFAULT_LOCALE, type SaveData } from "@/types";

import { CURRENT_SAVE_VERSION } from "./constants";
import { buildStarterTeam } from "./starter-team";

export function createSave(locale = DEFAULT_LOCALE): SaveData {
  const now = new Date().toISOString();
  const starter = buildStarterTeam();

  const baseSave: SaveData = {
    saveVersion: CURRENT_SAVE_VERSION,
    createdAt: now,
    updatedAt: now,
    player: {
      trainerName: "Tamer",
      trainerLevel: 1,
      trainerXp: 0,
      traitPoints: 0,
      bits: 0,
      battlesWon: 0,
    },
    team: starter.team,
    island: {
      storedDigimonIds: [],
    },
    digimons: starter.digimons,
    inventory: {
      items: [],
      essences: [],
      eggs: [],
    },
    location: {
      currentLocationId: "village_of_beginnings",
      unlockedLocationIds: ["village_of_beginnings"],
      defeatedBossIds: [],
    },
    missions: [],
    traits: [],
    knownForms: {
      knownFormIds: [],
    },
    settings: {
      locale,
      musicEnabled: true,
      sfxEnabled: true,
      battleSpeed: 1,
    },
  };

  return ensureStarterMission(baseSave);
}
