import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../catalogs/data/eggs.json");

const TYPES = [
  "reptile",
  "bird",
  "insect",
  "vegetation",
  "aquatic",
  "holy_beast",
  "mammal",
  "lesser",
  "larva",
  "amphibian",
  "mini_dragon",
];

const RARITIES = ["common", "rare", "reinforced", "special", "event"];

const entries = {};

for (const digimonType of TYPES) {
  for (const rarity of RARITIES) {
    const id = `egg_${digimonType}_${rarity}`;
    entries[id] = {
      id,
      nameKey: `egg.${rarity}.name`,
      digimonType,
      rarity,
    };
  }
}

const output = {
  meta: { kind: "egg", version: "1.0.0", updatedAt: "2026-06-06" },
  entries,
};

writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Egg catalog: ${Object.keys(entries).length} entries`);
