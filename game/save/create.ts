import { ensureStarterMission } from "@/game/missions";
import { normalizeSave } from "@/game/save/normalize";
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
      activeActions: [],
    },
    digimons: starter.digimons,
    inventory: {
      items: [{ itemId: "hatch_stabilizer", quantity: 1 }],
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
    friendshipDaily: {
      dateKey: new Date().toISOString().slice(0, 10),
      clickGainUsed: 0,
    },
    settings: {
      locale,
      musicEnabled: true,
      sfxEnabled: true,
      battleSpeed: 1,
    },
  };

  return normalizeSave(ensureStarterMission(baseSave));
}
