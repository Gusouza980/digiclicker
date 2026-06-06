import configData from "./data/config.json";
import digimonData from "./data/digimon.json";
import evolutionData from "./data/evolutions.json";
import eggData from "./data/eggs.json";
import essenceData from "./data/essences.json";
import itemData from "./data/items.json";
import locationData from "./data/locations.json";
import missionData from "./data/missions.json";
import personalityData from "./data/personalities.json";
import requirementData from "./data/requirements.json";
import traitData from "./data/traits.json";

import type {
  CatalogKind,
  CatalogRegistry,
  DigimonCatalogEntry,
  EvolutionCatalogEntry,
  EggCatalogEntry,
  EssenceCatalogEntry,
  GlobalConfig,
  ItemCatalogEntry,
  LocationCatalogEntry,
  MissionCatalogEntry,
  PersonalityCatalogEntry,
  RequirementCatalogEntry,
  TraitCatalogEntry,
  VersionedCatalog,
} from "@/types";

const catalogRegistry: CatalogRegistry = {
  config: configData as VersionedCatalog<GlobalConfig>,
  digimon: digimonData as VersionedCatalog<DigimonCatalogEntry>,
  evolution: evolutionData as VersionedCatalog<EvolutionCatalogEntry>,
  item: itemData as VersionedCatalog<ItemCatalogEntry>,
  essence: essenceData as VersionedCatalog<EssenceCatalogEntry>,
  egg: eggData as VersionedCatalog<EggCatalogEntry>,
  location: locationData as VersionedCatalog<LocationCatalogEntry>,
  mission: missionData as VersionedCatalog<MissionCatalogEntry>,
  personality: personalityData as VersionedCatalog<PersonalityCatalogEntry>,
  requirement: requirementData as VersionedCatalog<RequirementCatalogEntry>,
  trait: traitData as VersionedCatalog<TraitCatalogEntry>,
};

export function getCatalogVersions(): Record<CatalogKind, string> {
  return Object.fromEntries(
    Object.entries(catalogRegistry).map(([kind, catalog]) => [
      kind,
      catalog.meta.version,
    ]),
  ) as Record<CatalogKind, string>;
}

export function getCatalogEntry<K extends keyof CatalogRegistry>(
  kind: K,
  id: string,
): CatalogRegistry[K]["entries"][string] | null {
  const catalog = catalogRegistry[kind];
  const entries = catalog.entries as Record<string, CatalogRegistry[K]["entries"][string]>;
  return entries[id] ?? null;
}

export function getAllCatalogEntries<K extends keyof CatalogRegistry>(
  kind: K,
): CatalogRegistry[K]["entries"] {
  return catalogRegistry[kind].entries;
}

export function getGlobalConfig(): GlobalConfig {
  const config = getCatalogEntry("config", "global");
  if (!config) {
    throw new Error("Global config catalog entry 'global' is missing.");
  }
  return config;
}

export function loadCatalogRegistry(): CatalogRegistry {
  return catalogRegistry;
}
