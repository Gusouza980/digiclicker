import type { BattleSpeed } from "./battle";
import type { IslandAction } from "./island";
import type { PlayerDigimon } from "./digimon";
import type { FriendshipDailyProgress } from "./friendship";
import type { InventoryState } from "./inventory";
import type { SupportedLocale } from "./locale";
import type { MissionProgress } from "./mission";
import type { UnlockedTrait } from "./trait";

export type PlayerProfile = {
  trainerName: string;
  trainerLevel: number;
  trainerXp: number;
  traitPoints: number;
  bits: number;
  battlesWon: number;
};

export type TeamState = {
  activeDigimonIds: string[];
};

export type IslandState = {
  storedDigimonIds: string[];
  actions: IslandAction[];
};

export type LocationProgress = {
  currentLocationId: string;
  unlockedLocationIds: string[];
  defeatedBossIds: string[];
};

export type KnownFormsState = {
  knownFormIds: string[];
};

export type GameSettings = {
  locale: SupportedLocale;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  battleSpeed: BattleSpeed;
};

export type SaveData = {
  saveVersion: number;
  createdAt: string;
  updatedAt: string;
  player: PlayerProfile;
  team: TeamState;
  island: IslandState;
  digimons: Record<string, PlayerDigimon>;
  inventory: InventoryState;
  location: LocationProgress;
  missions: MissionProgress[];
  traits: UnlockedTrait[];
  knownForms: KnownFormsState;
  friendshipDaily: FriendshipDailyProgress;
  settings: GameSettings;
};
