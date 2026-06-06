export { BattleEngine } from "./engine";
export {
  calculateAttackDamage,
  calculateClickDamage,
  calculateSpecialDamage,
  getAttackIntervalMs,
} from "./damage";
export type { DamageType } from "./types";
export {
  getEnemyCatalogEntry,
  pickEnemyTeam,
  pickEnemyTeamSize,
  pickRandomEnemyId,
} from "./spawn";
export type {
  BattleAllyState,
  BattleEnemyState,
  BattleSnapshot,
  CombatLogEntry,
} from "./types";
