import { DEFAULT_LOCALE, type SaveData } from "@/types";

import { CURRENT_SAVE_VERSION } from "./constants";

export function createSave(locale = DEFAULT_LOCALE): SaveData {
  const now = new Date().toISOString();

  return {
    saveVersion: CURRENT_SAVE_VERSION,
    createdAt: now,
    updatedAt: now,
    player: {
      trainerName: "Tamer",
      trainerLevel: 1,
      trainerXp: 0,
      traitPoints: 0,
      bits: 0,
    },
    team: {
      activeDigimonIds: [],
    },
    island: {
      storedDigimonIds: [],
    },
    digimons: {},
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
    },
  };
}
