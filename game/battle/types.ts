import type { BattlePhase } from "@/types/battle";
import type { LevelUpEvent, RewardDisplayEntry } from "@/game/rewards";
import type { CombatAdvantage } from "@/game/combat/attribute-element";
import type { DigimonAttribute, DigimonElement } from "@/types/digimon";

export type DamageType = "normal" | "special" | "click";

export type CombatLogEntry = {
  id: string;
  messageKey: string;
  actorNameKey?: string;
  damage: number;
  damageType: DamageType;
  timestamp: number;
};

export type BattleAllyState = {
  instanceId: string;
  catalogId: string;
  nameKey: string;
  level: number;
  currentHp: number;
  maxHp: number;
  atk: number;
  def: number;
  int: number;
  spd: number;
  mp: number;
  specialReady: boolean;
  attackTimerMs: number;
  isDefeated: boolean;
  attribute: DigimonAttribute;
  element: DigimonElement;
};

export type BattleEnemyState = {
  instanceId: string;
  catalogId: string;
  nameKey: string;
  currentHp: number;
  maxHp: number;
  atk: number;
  def: number;
  spd: number;
  attackTimerMs: number;
  isDefeated: boolean;
  attribute: DigimonAttribute;
  element: DigimonElement;
  isBoss?: boolean;
};

export type BattleSnapshot = {
  phase: BattlePhase;
  locationId: string;
  isBossBattle: boolean;
  bossChallengeId: string | null;
  enemies: BattleEnemyState[];
  allies: BattleAllyState[];
  teamTotalAtk: number;
  combatLog: CombatLogEntry[];
  lastDamage: number | null;
  lastDamageType: DamageType | null;
  lastCombatAdvantage: CombatAdvantage | null;
  recentRewards: RewardDisplayEntry[];
  levelUpEvents: LevelUpEvent[];
};
