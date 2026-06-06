import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const digimonPath = join(__dirname, "../catalogs/data/digimon.json");

const STAGE_SCALE = {
  baby: 0.35,
  in_training: 0.55,
  rookie: 1,
  champion: 1.65,
  ultimate: 2.3,
  mega: 3,
};

function scaleStats(rookie, stage) {
  const factor = STAGE_SCALE[stage] ?? 1;
  return {
    hp: Math.max(1, Math.floor(rookie.hp * factor)),
    mp: Math.max(0, Math.floor(rookie.mp * factor)),
    atk: Math.max(1, Math.floor(rookie.atk * factor)),
    def: Math.max(1, Math.floor(rookie.def * factor)),
    int: Math.max(1, Math.floor(rookie.int * factor)),
    spi: Math.max(1, Math.floor(rookie.spi * factor)),
    spd: Math.max(1, Math.floor(rookie.spd * factor)),
  };
}

const LINES = [
  {
    lineId: "agumon",
    forms: [
      ["botamon", "baby", "vaccine", "neutral"],
      ["koromon", "in_training", "vaccine", "neutral"],
      ["agumon", "rookie", "vaccine", "fire"],
      ["greymon", "champion", "vaccine", "fire"],
      ["metalgreymon", "ultimate", "vaccine", "fire"],
      ["wargreymon", "mega", "vaccine", "fire"],
    ],
    primaryType: "reptile",
    rookie: { hp: 120, mp: 20, atk: 28, def: 18, int: 12, spi: 14, spd: 24 },
  },
  {
    lineId: "gabumon",
    forms: [
      ["punimon", "baby", "data", "neutral"],
      ["tsunomon", "in_training", "data", "ice"],
      ["gabumon", "rookie", "data", "fire"],
      ["garurumon", "champion", "data", "fire"],
      ["weregarurumon", "ultimate", "data", "fire"],
      ["metalgarurumon", "mega", "data", "ice"],
    ],
    primaryType: "reptile",
    rookie: { hp: 115, mp: 18, atk: 26, def: 20, int: 10, spi: 12, spd: 22 },
  },
  {
    lineId: "biyomon",
    forms: [
      ["poyomon", "baby", "vaccine", "neutral"],
      ["tokomon", "in_training", "vaccine", "light"],
      ["biyomon", "rookie", "vaccine", "fire"],
      ["birdramon", "champion", "vaccine", "fire"],
      ["garudamon", "ultimate", "vaccine", "fire"],
      ["phoenixmon", "mega", "vaccine", "fire"],
    ],
    primaryType: "bird",
    rookie: { hp: 100, mp: 22, atk: 22, def: 14, int: 16, spi: 18, spd: 30 },
  },
  {
    lineId: "tentomon",
    forms: [
      ["pabumon", "baby", "data", "neutral"],
      ["motimon", "in_training", "data", "neutral"],
      ["tentomon", "rookie", "vaccine", "electric"],
      ["kabuterimon", "champion", "vaccine", "electric"],
      ["atlurkabuterimon", "ultimate", "vaccine", "electric"],
      ["herculeskabuterimon", "mega", "vaccine", "electric"],
    ],
    primaryType: "insect",
    rookie: { hp: 105, mp: 20, atk: 20, def: 18, int: 18, spi: 16, spd: 22 },
  },
  {
    lineId: "palmon",
    forms: [
      ["pupumon", "baby", "data", "neutral"],
      ["tanemon", "in_training", "data", "plant"],
      ["palmon", "rookie", "data", "plant"],
      ["togemon", "champion", "data", "plant"],
      ["lilymon", "ultimate", "data", "plant"],
      ["rosemon", "mega", "data", "plant"],
    ],
    primaryType: "vegetation",
    rookie: { hp: 110, mp: 18, atk: 18, def: 16, int: 14, spi: 14, spd: 20 },
  },
  {
    lineId: "gomamon",
    forms: [
      ["pitchmon", "baby", "vaccine", "neutral"],
      ["bukamon", "in_training", "vaccine", "water"],
      ["gomamon", "rookie", "vaccine", "water"],
      ["ikkakumon", "champion", "vaccine", "water"],
      ["zudomon", "ultimate", "vaccine", "water"],
      ["vikemon", "mega", "vaccine", "water"],
    ],
    primaryType: "aquatic",
    rookie: { hp: 118, mp: 16, atk: 24, def: 20, int: 10, spi: 12, spd: 18 },
  },
  {
    lineId: "patamon",
    forms: [
      ["pupumon", "baby", "data", "neutral"],
      ["patamon", "rookie", "data", "wind"],
      ["angemon", "champion", "vaccine", "light"],
      ["magnaangemon", "ultimate", "vaccine", "light"],
      ["seraphimon", "mega", "vaccine", "light"],
    ],
    primaryType: "holy_beast",
    rookie: { hp: 95, mp: 24, atk: 18, def: 14, int: 20, spi: 22, spd: 26 },
  },
  {
    lineId: "gatomon",
    forms: [
      ["nyaromon", "baby", "data", "neutral"],
      ["salamon", "rookie", "vaccine", "light"],
      ["gatomon", "champion", "vaccine", "light"],
      ["angewomon", "ultimate", "vaccine", "light"],
      ["ophanimon", "mega", "vaccine", "light"],
    ],
    primaryType: "holy_beast",
    rookie: { hp: 90, mp: 22, atk: 20, def: 12, int: 18, spi: 20, spd: 28 },
  },
];

const ENEMIES = {
  koromon: { bitsMin: 1, bitsMax: 3, digimonXp: 4 },
  tsunomon: { bitsMin: 1, bitsMax: 4, digimonXp: 5 },
  tokomon: { bitsMin: 2, bitsMax: 4, digimonXp: 6 },
  tanemon: { bitsMin: 2, bitsMax: 5, digimonXp: 7 },
  elecmon: { bitsMin: 4, bitsMax: 8, digimonXp: 10 },
  palmon: { bitsMin: 4, bitsMax: 9, digimonXp: 11 },
  betamon: { bitsMin: 5, bitsMax: 10, digimonXp: 12 },
  kunemon: { bitsMin: 6, bitsMax: 12, digimonXp: 14 },
  veemon: { bitsMin: 7, bitsMax: 14, digimonXp: 15 },
  wormmon: { bitsMin: 7, bitsMax: 15, digimonXp: 16 },
};

const existing = JSON.parse(readFileSync(digimonPath, "utf8"));
const entries = { ...existing.entries };

for (const line of LINES) {
  for (const [id, stage, attribute, element] of line.forms) {
    const baseStats = scaleStats(line.rookie, stage);
    const entry = {
      id,
      nameKey: `digimon.${id}.name`,
      stage,
      attribute,
      element,
      primaryType: line.primaryType,
      lineId: line.lineId,
      baseStats,
    };

    if (ENEMIES[id]) {
      entry.battleRewards = ENEMIES[id];
      entry.dropTable = { essenceChance: 0.3, eggChance: 0.06 };
    }

    entries[id] = entry;
  }
}

// Location enemies not in lines
for (const [id, rewards] of Object.entries(ENEMIES)) {
  if (!entries[id]) continue;
  entries[id].battleRewards = rewards;
  entries[id].dropTable = { essenceChance: 0.3, eggChance: 0.06 };
}

// Fix patamon line pupumon conflict - patamon line uses same pupumon id as palmon line
// Palmon already has pupumon - patamon line baby shares pupumon in digimon world
// Keep single pupumon entry (palmon line baby). Patamon line starts at patamon rookie.

const output = {
  meta: {
    kind: "digimon",
    version: "2.0.0",
    updatedAt: "2026-06-06",
  },
  entries,
};

writeFileSync(digimonPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Digimon catalog updated: ${Object.keys(entries).length} entries`);
