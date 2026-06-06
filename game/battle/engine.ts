import { getCatalogEntry } from "@/catalogs/loader";
import { calculateTeamTotalStat, calculateTotalStats } from "@/game/stats/calculator";
import type { GlobalConfig, SaveData } from "@/types";
import type { BattlePhase } from "@/types/battle";
import type { PlayerDigimon } from "@/types/digimon";

import {
  calculateAttackDamage,
  calculateClickDamage,
  getAttackIntervalMs,
} from "./damage";
import { getEnemyCatalogEntry, pickEnemyTeam } from "./spawn";
import type {
  BattleAllyState,
  BattleEnemyState,
  BattleSnapshot,
  CombatLogEntry,
} from "./types";

let logCounter = 0;
let enemyInstanceCounter = 0;

function nextLogId(): string {
  logCounter += 1;
  return `log_${logCounter}`;
}

function nextEnemyInstanceId(catalogId: string): string {
  enemyInstanceCounter += 1;
  return `enemy_${enemyInstanceCounter}_${catalogId}`;
}

export class BattleEngine {
  private phase: BattlePhase = "fighting";
  private locationId: string;
  private enemies: BattleEnemyState[] = [];
  private allies: BattleAllyState[] = [];
  private combatLog: CombatLogEntry[] = [];
  private lastDamage: number | null = null;
  private readonly config: GlobalConfig;
  private readonly getDigimon: (id: string) => PlayerDigimon | undefined;

  constructor(save: SaveData, config: GlobalConfig) {
    this.config = config;
    this.locationId = save.location.currentLocationId;
    this.getDigimon = (id) => save.digimons[id];
    this.allies = this.buildAllies(save);
    this.spawnEnemyTeam();
  }

  getSnapshot(): BattleSnapshot {
    return {
      phase: this.phase,
      locationId: this.locationId,
      enemies: this.enemies,
      allies: this.allies,
      teamTotalAtk: this.getTeamTotalAtk(),
      combatLog: [...this.combatLog],
      lastDamage: this.lastDamage,
    };
  }

  tick(deltaMs: number): BattleSnapshot {
    if (this.phase !== "fighting" || !this.hasLivingEnemies()) {
      return this.getSnapshot();
    }

    this.processAllyTimers(deltaMs);
    this.processEnemyTimers(deltaMs);

    return this.getSnapshot();
  }

  click(): BattleSnapshot {
    if (this.phase !== "fighting" || !this.hasLivingEnemies()) {
      return this.getSnapshot();
    }

    const target = this.pickRandomLivingEnemy();
    if (!target) {
      return this.getSnapshot();
    }

    const damage = calculateClickDamage(
      this.getTeamTotalAtk(),
      this.config.battle.clickDamageMultiplier,
    );

    this.applyDamageToEnemy(target, damage, "battle.log.click_damage");
    return this.getSnapshot();
  }

  retry(): BattleSnapshot {
    this.allies = this.allies.map((ally) => ({
      ...ally,
      currentHp: ally.maxHp,
      isDefeated: false,
      attackTimerMs: getAttackIntervalMs(ally.spd),
    }));
    this.phase = "fighting";
    this.combatLog = [];
    this.lastDamage = null;
    this.spawnEnemyTeam();
    return this.getSnapshot();
  }

  continueAfterVictory(): BattleSnapshot {
    if (this.phase !== "victory") {
      return this.getSnapshot();
    }

    this.phase = "fighting";
    this.lastDamage = null;
    this.spawnEnemyTeam();
    return this.getSnapshot();
  }

  private buildAllies(save: SaveData): BattleAllyState[] {
    const allies: BattleAllyState[] = [];

    for (const instanceId of save.team.activeDigimonIds) {
      const digimon = save.digimons[instanceId];
      if (!digimon) continue;

      const catalog = getCatalogEntry("digimon", digimon.catalogId);
      const stats = calculateTotalStats(digimon);
      if (!catalog || !stats) continue;

      const maxHp = stats.hp;

      allies.push({
        instanceId,
        catalogId: digimon.catalogId,
        nameKey: catalog.nameKey,
        level: digimon.level,
        currentHp: maxHp,
        maxHp,
        atk: stats.atk,
        def: stats.def,
        spd: stats.spd,
        attackTimerMs: getAttackIntervalMs(stats.spd),
        isDefeated: false,
      });
    }

    return allies;
  }

  private spawnEnemyTeam(): void {
    const location = getCatalogEntry("location", this.locationId);
    if (!location) {
      this.enemies = [];
      return;
    }

    const teamSize = location.enemyTeamSize ?? { min: 1, max: 3 };
    const enemyIds = pickEnemyTeam(location.enemyPool, teamSize);
    const enemies: BattleEnemyState[] = [];

    for (const enemyId of enemyIds) {
      const catalog = getEnemyCatalogEntry(enemyId);
      if (!catalog) continue;

      const maxHp = catalog.baseStats.hp;

      enemies.push({
        instanceId: nextEnemyInstanceId(enemyId),
        catalogId: enemyId,
        nameKey: catalog.nameKey,
        currentHp: maxHp,
        maxHp,
        atk: catalog.baseStats.atk,
        def: catalog.baseStats.def,
        spd: catalog.baseStats.spd,
        attackTimerMs: getAttackIntervalMs(catalog.baseStats.spd),
        isDefeated: false,
      });
    }

    this.enemies = enemies;
  }

  private hasLivingEnemies(): boolean {
    return this.enemies.some((enemy) => !enemy.isDefeated);
  }

  private processAllyTimers(deltaMs: number): void {
    for (const ally of this.allies) {
      if (ally.isDefeated || !this.hasLivingEnemies()) continue;

      ally.attackTimerMs -= deltaMs;

      if (ally.attackTimerMs <= 0) {
        const target = this.pickRandomLivingEnemy();
        if (!target) continue;

        const damage = calculateAttackDamage(ally.atk, target.def);
        this.applyDamageToEnemy(target, damage, "battle.log.ally_attack", ally.nameKey);
        ally.attackTimerMs = getAttackIntervalMs(ally.spd);
      }
    }
  }

  private processEnemyTimers(deltaMs: number): void {
    if (this.phase !== "fighting") return;

    for (const enemy of this.enemies) {
      if (enemy.isDefeated) continue;

      enemy.attackTimerMs -= deltaMs;

      if (enemy.attackTimerMs <= 0) {
        const target = this.pickRandomLivingAlly();
        if (target) {
          const damage = calculateAttackDamage(enemy.atk, target.def);
          this.applyDamageToAlly(target, damage, enemy.nameKey);
        }
        enemy.attackTimerMs = getAttackIntervalMs(enemy.spd);
      }
    }
  }

  private pickRandomLivingAlly(): BattleAllyState | null {
    const living = this.allies.filter((ally) => !ally.isDefeated);
    if (living.length === 0) return null;
    const index = Math.floor(Math.random() * living.length);
    return living[index] ?? null;
  }

  private pickRandomLivingEnemy(): BattleEnemyState | null {
    const living = this.enemies.filter((enemy) => !enemy.isDefeated);
    if (living.length === 0) return null;
    const index = Math.floor(Math.random() * living.length);
    return living[index] ?? null;
  }

  private applyDamageToEnemy(
    enemy: BattleEnemyState,
    damage: number,
    messageKey: string,
    actorNameKey?: string,
  ): void {
    enemy.currentHp = Math.max(0, enemy.currentHp - damage);
    this.lastDamage = damage;
    this.pushLog(messageKey, damage, actorNameKey);

    if (enemy.currentHp <= 0) {
      enemy.isDefeated = true;
      this.pushLog("battle.log.enemy_defeated", 0, enemy.nameKey);
    }

    if (!this.hasLivingEnemies()) {
      this.phase = "victory";
      this.pushLog("battle.log.victory", 0);
    }
  }

  private applyDamageToAlly(
    ally: BattleAllyState,
    damage: number,
    attackerNameKey: string,
  ): void {
    ally.currentHp = Math.max(0, ally.currentHp - damage);
    this.lastDamage = damage;
    this.pushLog("battle.log.enemy_attack", damage, attackerNameKey);

    if (ally.currentHp <= 0) {
      ally.isDefeated = true;
      this.pushLog("battle.log.ally_defeated", 0, ally.nameKey);
    }

    if (this.allies.every((member) => member.isDefeated)) {
      this.phase = "defeat";
      this.pushLog("battle.log.defeat", 0);
    }
  }

  private getTeamTotalAtk(): number {
    const digimons = this.allies
      .filter((ally) => !ally.isDefeated)
      .map((ally) => this.getDigimon(ally.instanceId))
      .filter((digimon): digimon is PlayerDigimon => digimon !== undefined);

    return calculateTeamTotalStat(digimons, "atk");
  }

  private pushLog(
    messageKey: string,
    damage: number,
    actorNameKey?: string,
  ): void {
    const entry: CombatLogEntry = {
      id: nextLogId(),
      messageKey,
      actorNameKey,
      damage,
      timestamp: Date.now(),
    };

    this.combatLog = [entry, ...this.combatLog].slice(0, 8);
  }
}
