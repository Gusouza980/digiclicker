import type { DigimonCatalogEntry } from "./digimon";
import type { EggCatalogEntry, EssenceCatalogEntry, ItemCatalogEntry } from "./item";
import type { LocationCatalogEntry } from "./location";
import type { MissionCatalogEntry } from "./mission";
import type { HatchingConfig } from "./hatching";
import type { PersonalityCatalogEntry } from "./personality";
import type { RequirementCatalogEntry } from "./requirement";
import type { TraitCatalogEntry } from "./trait";

export type CatalogKind =
  | "config"
  | "digimon"
  | "item"
  | "essence"
  | "egg"
  | "location"
  | "mission"
  | "personality"
  | "requirement"
  | "trait"
  | "i18n";

export type VersionedCatalogMeta = {
  kind: CatalogKind;
  version: string;
  updatedAt: string;
};

export type VersionedCatalog<T> = {
  meta: VersionedCatalogMeta;
  entries: Record<string, T>;
};

export type GlobalConfig = {
  battle: {
    tickMs: number;
    clickDamageMultiplier: number;
    mpGainPerAutoAttack: number;
    specialDamageMultiplier: number;
  };
  xp: {
    digimonPerVictory: number;
    trainerPerVictory: number;
    xpToNextBase: number;
    xpToNextGrowth: number;
  };
  drops: {
    essenceChance: number;
    eggChance: number;
    eggRarityWeights: Record<
      "common" | "rare" | "reinforced" | "special" | "event",
      number
    >;
  };
  island: {
    maxStorage: number;
    slotsPerAction: number;
  };
  team: {
    maxActive: number;
  };
  hatching: HatchingConfig;
};

export type CatalogRegistry = {
  config: VersionedCatalog<GlobalConfig>;
  digimon: VersionedCatalog<DigimonCatalogEntry>;
  item: VersionedCatalog<ItemCatalogEntry>;
  essence: VersionedCatalog<EssenceCatalogEntry>;
  egg: VersionedCatalog<EggCatalogEntry>;
  location: VersionedCatalog<LocationCatalogEntry>;
  mission: VersionedCatalog<MissionCatalogEntry>;
  personality: VersionedCatalog<PersonalityCatalogEntry>;
  requirement: VersionedCatalog<RequirementCatalogEntry>;
  trait: VersionedCatalog<TraitCatalogEntry>;
};
