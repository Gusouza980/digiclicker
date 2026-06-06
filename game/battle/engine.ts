import { getCatalogEntry } from "@/catalogs/loader";
import {
  applyCombatMultiplier,
  getCombatAdvantage,
  getCombatMultiplier,
  type CombatAdvantage,
} from "@/game/combat/attribute-element";
import type { LevelUpEvent, RewardDisplayEntry } from "@/game/rewards";
import { calculateTeamTotalStat, calculateTotalStats } from "@/game/stats/calculator";
import { getTraitModifiers, type TraitModifiers } from "@/game/traits/effects";
import type {
  BossCatalogEntry,
  DigimonAttribute,
  DigimonElement,
  GlobalConfig,
  SaveData,
} from "@/types";
import type { BattlePhase } from "@/types/battle";
import type { PlayerDigimon } from "@/types/digimon";

import {
  calculateAttackDamage,
  calculateClickDamage,
  calculateSpecialDamage,
  getAttackIntervalMs,
} from "./damage";
import { getEnemyCatalogEntry, pickEnemyTeam } from "./spawn";
import type {
  BattleAllyState,
  BattleEnemyState,
  BattleSnapshot,
  CombatLogEntry,
  DamageType,
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
  private lastDamageType: DamageType | null = null;
  private lastCombatAdvantage: CombatAdvantage | null = null;
  private bossChallengeId: string | null = null;
  private isBossBattle = false;
  private defeatedEnemyIds: string[] = [];
  private recentRewards: RewardDisplayEntry[] = [];
  private levelUpEvents: LevelUpEvent[] = [];
  private readonly config: GlobalConfig;
  private readonly getDigimon: (id: string) => PlayerDigimon | undefined;
  private traitModifiers: TraitModifiers;

  constructor(save: SaveData, config: GlobalConfig) {
    this.config = config;
    this.locationId = save.location.currentLocationId;
    this.getDigimon = (id) => save.digimons[id];
    this.traitModifiers = getTraitModifiers(save);
    this.allies = this.buildAllies(save);
    this.spawnEnemyTeam();
  }

  getSnapshot(): BattleSnapshot {
    return {
      phase: this.phase,
      locationId: this.locationId,
      isBossBattle: this.isBossBattle,
      bossChallengeId: this.bossChallengeId,
      enemies: this.enemies,
      allies: this.allies,
      teamTotalAtk: this.getTeamTotalAtk(),
      combatLog: [...this.combatLog],
      lastDamage: this.lastDamage,
      lastDamageType: this.lastDamageType,
      lastCombatAdvantage: this.lastCombatAdvantage,
      recentRewards: [...this.recentRewards],
      levelUpEvents: [...this.levelUpEvents],
    };
  }

  getBossChallengeId(): string | null {
    return this.bossChallengeId;
  }

  getIsBossBattle(): boolean {
    return this.isBossBattle;
  }

  startBossChallenge(bossId: string): BattleSnapshot {
    const boss = getCatalogEntry("boss", bossId);
    if (!boss) return this.getSnapshot();

    this.bossChallengeId = bossId;
    this.isBossBattle = true;
    this.phase = "fighting";
    this.combatLog = [];
    this.lastDamage = null;
    this.lastDamageType = null;
    this.lastCombatAdvantage = null;
    this.defeatedEnemyIds = [];
    this.clearVictoryFeedback();
    this.spawnBossTeam(boss);
    return this.getSnapshot();
  }

  healAlly(allyInstanceId: string, healPercent: number): BattleSnapshot {
    const ally = this.allies.find((member) => member.instanceId === allyInstanceId);
    if (!ally || ally.isDefeated) return this.getSnapshot();

    const healAmount = Math.max(1, Math.floor(ally.maxHp * healPercent));
    ally.currentHp = Math.min(ally.maxHp, ally.currentHp + healAmount);
    this.pushLog("battle.log.heal", healAmount, "normal", ally.nameKey);
    return this.getSnapshot();
  }

  getDefeatedEnemyIds(): string[] {
    return [...this.defeatedEnemyIds];
  }

  getLivingAllyInstanceIds(): string[] {
    return this.allies
      .filter((ally) => !ally.isDefeated)
      .map((ally) => ally.instanceId);
  }

  getLocationId(): string {
    return this.locationId;
  }

  setVictoryRewards(
    rewards: RewardDisplayEntry[],
    levelUps: LevelUpEvent[],
  ): void {
    this.recentRewards = rewards;
    this.levelUpEvents = levelUps;
  }

  clearVictoryFeedback(): void {
    this.recentRewards = [];
    this.levelUpEvents = [];
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

    const attacker = this.getClickAttacker();
    const baseDamage = calculateClickDamage(
      this.getTeamTotalAtk(),
      this.config.battle.clickDamageMultiplier,
    );
    const damage = this.scaleOutgoingDamage(
      baseDamage,
      attacker?.attribute ?? "free",
      attacker?.element ?? "neutral",
      target.attribute,
      target.element,
    );

    this.applyDamageToEnemy(target, damage, "battle.log.click_damage", undefined, "click");
    return this.getSnapshot();
  }

  useSpecial(allyInstanceId: string): BattleSnapshot {
    if (this.phase !== "fighting" || !this.hasLivingEnemies()) {
      return this.getSnapshot();
    }

    const ally = this.allies.find((member) => member.instanceId === allyInstanceId);
    if (!ally || ally.isDefeated || !ally.specialReady) {
      return this.getSnapshot();
    }

    const target = this.pickRandomLivingEnemy();
    if (!target) {
      return this.getSnapshot();
    }

    const baseDamage = calculateSpecialDamage(
      ally.atk,
      ally.int,
      this.config.battle.specialDamageMultiplier,
    );
    const damage = this.scaleOutgoingDamage(
      baseDamage,
      ally.attribute,
      ally.element,
      target.attribute,
      target.element,
    );

    this.applyDamageToEnemy(
      target,
      damage,
      "battle.log.special_attack",
      ally.nameKey,
      "special",
    );

    ally.mp = 0;
    ally.specialReady = false;

    return this.getSnapshot();
  }

  retry(): BattleSnapshot {
    this.allies = this.allies.map((ally) => ({
      ...ally,
      currentHp: ally.maxHp,
      isDefeated: false,
      mp: 0,
      specialReady: false,
      attackTimerMs: getAttackIntervalMs(ally.spd),
    }));
    this.phase = "fighting";
    this.combatLog = [];
    this.lastDamage = null;
    this.lastDamageType = null;
    this.lastCombatAdvantage = null;
    this.bossChallengeId = null;
    this.isBossBattle = false;
    this.defeatedEnemyIds = [];
    this.clearVictoryFeedback();
    this.spawnEnemyTeam();
    return this.getSnapshot();
  }

  continueAfterVictory(save?: SaveData): BattleSnapshot {
    if (this.phase !== "victory") {
      return this.getSnapshot();
    }

    if (save) {
      this.traitModifiers = getTraitModifiers(save);
      this.refreshAlliesFromSave(save);
    }

    this.phase = "fighting";
    this.lastDamage = null;
    this.lastDamageType = null;
    this.lastCombatAdvantage = null;
    this.bossChallengeId = null;
    this.isBossBattle = false;
    this.defeatedEnemyIds = [];
    this.resetAlliesMp();
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

      const atk = Math.floor(stats.atk * (1 + this.traitModifiers.atkPercent));
      const def = Math.floor(stats.def * (1 + this.traitModifiers.defPercent));

      allies.push({
        instanceId,
        catalogId: digimon.catalogId,
        nameKey: catalog.nameKey,
        level: digimon.level,
        currentHp: stats.hp,
        maxHp: stats.hp,
        atk,
        def,
        int: stats.int,
        spd: stats.spd,
        mp: 0,
        specialReady: false,
        attackTimerMs: getAttackIntervalMs(stats.spd),
        isDefeated: false,
        attribute: catalog.attribute,
        element: catalog.element,
      });
    }

    return allies;
  }

  private refreshAlliesFromSave(save: SaveData): void {
    for (const ally of this.allies) {
      const digimon = save.digimons[ally.instanceId];
      if (!digimon) continue;

      const catalog = getCatalogEntry("digimon", digimon.catalogId);
      const stats = calculateTotalStats(digimon);
      if (!catalog || !stats) continue;

      ally.level = digimon.level;
      ally.nameKey = catalog.nameKey;
      ally.maxHp = stats.hp;
      ally.currentHp = Math.min(ally.currentHp, stats.hp);
      ally.atk = Math.floor(stats.atk * (1 + this.traitModifiers.atkPercent));
      ally.def = Math.floor(stats.def * (1 + this.traitModifiers.defPercent));
      ally.int = stats.int;
      ally.spd = stats.spd;
    }
  }

  private resetAlliesMp(): void {
    for (const ally of this.allies) {
      ally.mp = 0;
      ally.specialReady = false;
    }
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
        attribute: catalog.attribute,
        element: catalog.element,
      });
    }

    this.enemies = enemies;
    this.resetAlliesMp();
  }

  private hasLivingEnemies(): boolean {
    return this.enemies.some((enemy) => !enemy.isDefeated);
  }

  private gainMpFromAutoAttack(ally: BattleAllyState): void {
    ally.mp = Math.min(1, ally.mp + this.config.battle.mpGainPerAutoAttack);
    ally.specialReady = ally.mp >= 1;
  }

  private processAllyTimers(deltaMs: number): void {
    for (const ally of this.allies) {
      if (ally.isDefeated || !this.hasLivingEnemies()) continue;

      ally.attackTimerMs -= deltaMs;

      if (ally.attackTimerMs <= 0) {
        const target = this.pickRandomLivingEnemy();
        if (!target) continue;

        const baseDamage = calculateAttackDamage(ally.atk, target.def);
        const damage = this.scaleOutgoingDamage(
          baseDamage,
          ally.attribute,
          ally.element,
          target.attribute,
          target.element,
        );
        this.applyDamageToEnemy(target, damage, "battle.log.ally_attack", ally.nameKey, "normal");
        this.gainMpFromAutoAttack(ally);
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
          const baseDamage = calculateAttackDamage(enemy.atk, target.def);
          const damage = this.scaleIncomingDamage(
            baseDamage,
            enemy.attribute,
            enemy.element,
            target.attribute,
            target.element,
          );
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

  private spawnBossTeam(boss: BossCatalogEntry): void {
    const maxHp = boss.baseStats.hp;

    this.enemies = [
      {
        instanceId: nextEnemyInstanceId(boss.id),
        catalogId: boss.digimonId,
        nameKey: boss.nameKey,
        currentHp: maxHp,
        maxHp,
        atk: boss.baseStats.atk,
        def: boss.baseStats.def,
        spd: boss.baseStats.spd,
        attackTimerMs: getAttackIntervalMs(boss.baseStats.spd),
        isDefeated: false,
        attribute: boss.attribute,
        element: boss.element,
        isBoss: true,
      },
    ];
    this.resetAlliesMp();
  }

  private getClickAttacker(): BattleAllyState | null {
    return this.allies.find((ally) => !ally.isDefeated) ?? null;
  }

  private scaleOutgoingDamage(
    baseDamage: number,
    attackerAttribute: DigimonAttribute,
    attackerElement: DigimonElement,
    defenderAttribute: DigimonAttribute,
    defenderElement: DigimonElement,
  ): number {
    const multiplier = getCombatMultiplier(
      attackerAttribute,
      attackerElement,
      defenderAttribute,
      defenderElement,
      this.config.combat,
    );
    this.lastCombatAdvantage = getCombatAdvantage(
      attackerAttribute,
      attackerElement,
      defenderAttribute,
      defenderElement,
      this.config.combat,
    );
    return applyCombatMultiplier(baseDamage, multiplier);
  }

  private scaleIncomingDamage(
    baseDamage: number,
    attackerAttribute: DigimonAttribute,
    attackerElement: DigimonElement,
    defenderAttribute: DigimonAttribute,
    defenderElement: DigimonElement,
  ): number {
    const multiplier = getCombatMultiplier(
      attackerAttribute,
      attackerElement,
      defenderAttribute,
      defenderElement,
      this.config.combat,
    );
    return applyCombatMultiplier(baseDamage, multiplier);
  }

  private applyDamageToEnemy(
    enemy: BattleEnemyState,
    damage: number,
    messageKey: string,
    actorNameKey?: string,
    damageType: DamageType = "normal",
  ): void {
    enemy.currentHp = Math.max(0, enemy.currentHp - damage);
    this.lastDamage = damage;
    this.lastDamageType = damageType;
    this.pushLog(messageKey, damage, damageType, actorNameKey);

    if (enemy.currentHp <= 0 && !enemy.isDefeated) {
      enemy.isDefeated = true;
      const defeatedId =
        enemy.isBoss && this.bossChallengeId ? this.bossChallengeId : enemy.catalogId;
      this.defeatedEnemyIds.push(defeatedId);
      this.pushLog("battle.log.enemy_defeated", 0, "normal", enemy.nameKey);
    }

    if (!this.hasLivingEnemies()) {
      this.phase = "victory";
      this.pushLog("battle.log.victory", 0, "normal");
    }
  }

  private applyDamageToAlly(
    ally: BattleAllyState,
    damage: number,
    attackerNameKey: string,
  ): void {
    ally.currentHp = Math.max(0, ally.currentHp - damage);
    this.lastDamage = damage;
    this.lastDamageType = "normal";
    this.pushLog("battle.log.enemy_attack", damage, "normal", attackerNameKey);

    if (ally.currentHp <= 0) {
      ally.isDefeated = true;
      this.pushLog("battle.log.ally_defeated", 0, "normal", ally.nameKey);
    }

    if (this.allies.every((member) => member.isDefeated)) {
      this.phase = "defeat";
      this.pushLog("battle.log.defeat", 0, "normal");
    }
  }

  private getTeamTotalAtk(): number {
    const digimons = this.allies
      .filter((ally) => !ally.isDefeated)
      .map((ally) => this.getDigimon(ally.instanceId))
      .filter((digimon): digimon is PlayerDigimon => digimon !== undefined);

    const baseAtk = calculateTeamTotalStat(digimons, "atk");
    return Math.floor(baseAtk * (1 + this.traitModifiers.atkPercent));
  }

  private pushLog(
    messageKey: string,
    damage: number,
    damageType: DamageType,
    actorNameKey?: string,
  ): void {
    const entry: CombatLogEntry = {
      id: nextLogId(),
      messageKey,
      actorNameKey,
      damage,
      damageType,
      timestamp: Date.now(),
    };

    this.combatLog = [entry, ...this.combatLog].slice(0, 10);
  }
}
