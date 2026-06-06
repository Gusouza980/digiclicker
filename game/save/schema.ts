/**
 * MVP local save schema — frozen at version 10.
 * Documentação de referência para migrations futuras e cloud save.
 */
export const MVP_SAVE_VERSION = 10;

export const SAVE_SCHEMA_SECTIONS = [
  "player",
  "team",
  "island",
  "digimons",
  "inventory",
  "location",
  "progression",
  "activeBuffs",
  "pendingOfflineSummary",
  "missions",
  "traits",
  "knownForms",
  "friendshipDaily",
  "bossDaily",
  "settings",
] as const;
