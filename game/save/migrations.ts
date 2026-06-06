import type { SaveData } from "@/types";

import { CURRENT_SAVE_VERSION } from "./constants";

type Migration = (save: SaveData) => SaveData;

const migrations: Record<number, Migration> = {
  1: (save) => ({ ...save, saveVersion: 1 }),
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
