import type { BossCatalogEntry } from "./boss";
import type { CombatConfig } from "./combat";
import type { DigimonCatalogEntry } from "./digimon";
import type { EvolutionCatalogEntry } from "./evolution";
import type { EggCatalogEntry, EssenceCatalogEntry, ItemCatalogEntry } from "./item";
import type { LocationCatalogEntry } from "./location";
import type { MissionCatalogEntry } from "./mission";
import type { FriendshipConfig } from "./friendship";
import type { IslandGameplayConfig } from "./island";
import type { HatchingConfig } from "./hatching";
import type { OfflineConfig } from "./offline";
import type { ItemEffectsConfig } from "./item-effects";
import type { PersonalityCatalogEntry } from "./personality";
import type { RequirementCatalogEntry } from "./requirement";
import type { ShopCatalogEntry } from "./shop";
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
  | "evolution"
  | "trait"
  | "boss"
  | "shop"
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
  combat: CombatConfig;
  items: ItemEffectsConfig;
  offline: OfflineConfig;
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
  island: IslandGameplayConfig;
  team: {
    maxActive: number;
  };
  hatching: HatchingConfig;
  friendship: FriendshipConfig;
  evolution: {
    cumulativeMaxPerStat: number;
  };
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
  evolution: VersionedCatalog<EvolutionCatalogEntry>;
  trait: VersionedCatalog<TraitCatalogEntry>;
  boss: VersionedCatalog<BossCatalogEntry>;
  shop: VersionedCatalog<ShopCatalogEntry>;
};
