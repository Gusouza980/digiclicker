import type { BattlePhase } from "@/types/battle";
import type { LevelUpEvent, RewardDisplayEntry } from "@/game/rewards";

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
};

export type BattleSnapshot = {
  phase: BattlePhase;
  locationId: string;
  enemies: BattleEnemyState[];
  allies: BattleAllyState[];
  teamTotalAtk: number;
  combatLog: CombatLogEntry[];
  lastDamage: number | null;
  lastDamageType: DamageType | null;
  recentRewards: RewardDisplayEntry[];
  levelUpEvents: LevelUpEvent[];
};
