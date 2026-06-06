import type { BattlePhase } from "@/types/battle";

export type CombatLogEntry = {
  id: string;
  messageKey: string;
  actorNameKey?: string;
  damage: number;
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
  spd: number;
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
};
