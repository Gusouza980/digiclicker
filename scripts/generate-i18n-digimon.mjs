import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const digimon = JSON.parse(
  readFileSync(join(__dirname, "../catalogs/data/digimon.json"), "utf8"),
);

const DISPLAY_NAMES = {
  botamon: "Botamon",
  koromon: "Koromon",
  agumon: "Agumon",
  greymon: "Greymon",
  metalgreymon: "MetalGreymon",
  wargreymon: "WarGreymon",
  punimon: "Punimon",
  tsunomon: "Tsunomon",
  gabumon: "Gabumon",
  garurumon: "Garurumon",
  weregarurumon: "WereGarurumon",
  metalgarurumon: "MetalGarurumon",
  poyomon: "Poyomon",
  tokomon: "Tokomon",
  biyomon: "Biyomon",
  birdramon: "Birdramon",
  garudamon: "Garudamon",
  phoenixmon: "Phoenixmon",
  pabumon: "Pabumon",
  motimon: "Motimon",
  tentomon: "Tentomon",
  kabuterimon: "Kabuterimon",
  atlurkabuterimon: "AtlurKabuterimon",
  herculeskabuterimon: "HerculesKabuterimon",
  pupumon: "Pupumon",
  tanemon: "Tanemon",
  palmon: "Palmon",
  togemon: "Togemon",
  lilymon: "Lilymon",
  rosemon: "Rosemon",
  pitchmon: "Pitchmon",
  bukamon: "Bukamon",
  gomamon: "Gomamon",
  ikkakumon: "Ikkakumon",
  zudomon: "Zudomon",
  vikemon: "Vikemon",
  patamon: "Patamon",
  angemon: "Angemon",
  magnaangemon: "MagnaAngemon",
  seraphimon: "Seraphimon",
  nyaromon: "Nyaromon",
  salamon: "Salamon",
  gatomon: "Gatomon",
  angewomon: "Angewomon",
  ophanimon: "Ophanimon",
  elecmon: "Elecmon",
  betamon: "Betamon",
  kunemon: "Kunemon",
  veemon: "Veemon",
  wormmon: "Wormmon",
};

const localesDir = join(__dirname, "../i18n/locales");
for (const locale of ["pt", "en", "es"]) {
  const path = join(localesDir, `${locale}.json`);
  const data = JSON.parse(readFileSync(path, "utf8"));

  for (const [id] of Object.entries(digimon.entries)) {
    const key = `digimon.${id}.name`;
    if (!data[key]) {
      data[key] = DISPLAY_NAMES[id] ?? id;
    }
  }

  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log("Digimon i18n keys updated.");
