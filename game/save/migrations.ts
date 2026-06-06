import { clampBattleSpeed } from "@/game/battle/speed";
import { ensureStarterMission } from "@/game/missions";
import type { BattleSpeed, SaveData } from "@/types";

import { CURRENT_SAVE_VERSION } from "./constants";
import { ensureStarterTeam } from "./starter-team";

type Migration = (save: SaveData) => SaveData;

const migrations: Record<number, Migration> = {
  1: (save) => ({ ...save, saveVersion: 1 }),
  2: (save) => {
    const withTeam = ensureStarterTeam(save);
    return { ...withTeam, saveVersion: 2 };
  },
  3: (save) => {
    const withMission = ensureStarterMission({
      ...save,
      player: {
        ...save.player,
        battlesWon: save.player.battlesWon ?? 0,
      },
      saveVersion: 3,
    });
    return withMission;
  },
  4: (save) => ({
    ...save,
    settings: {
      ...save.settings,
      battleSpeed: save.settings.battleSpeed ?? 5,
    },
    saveVersion: 4,
  }),
  5: (save) => {
    const requested = (save.settings.battleSpeed ?? 1) as BattleSpeed;
    const clamped = clampBattleSpeed(save, requested);
    return {
      ...save,
      settings: {
        ...save.settings,
        battleSpeed: clamped,
      },
      saveVersion: 5,
    };
  },
};

export function migrateSave(save: SaveData): SaveData {
  let current = { ...save };

  while (current.saveVersion < CURRENT_SAVE_VERSION) {
    const nextVersion = current.saveVersion + 1;
    const migration = migrations[nextVersion];

    if (!migration) {
      throw new Error(
        `Missing migration from save version ${current.saveVersion} to ${nextVersion}.`,
      );
    }

    current = migration(current);
  }

  return current;
}
