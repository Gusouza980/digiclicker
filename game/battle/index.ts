export { BattleEngine } from "./engine";
export {
  calculateAttackDamage,
  calculateClickDamage,
  getAttackIntervalMs,
} from "./damage";
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
