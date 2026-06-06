import { getAllCatalogEntries, getCatalogEntry } from "@/catalogs/loader";
import { checkAllRequirementSets } from "@/game/requirements";
import type { SaveData } from "@/types";

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function normalizeBossDaily(save: SaveData): void {
  const today = getTodayKey();
  if (!save.bossDaily || save.bossDaily.dateKey !== today) {
    save.bossDaily = { dateKey: today, attemptedBossIds: [] };
  }
}

export function hasBossAttemptToday(save: SaveData, bossId: string): boolean {
  normalizeBossDaily(save);
  return save.bossDaily.attemptedBossIds.includes(bossId);
}

export function recordBossDailyAttempt(save: SaveData, bossId: string): SaveData {
  const next = structuredClone(save);
  normalizeBossDaily(next);

  if (!next.bossDaily.attemptedBossIds.includes(bossId)) {
    next.bossDaily.attemptedBossIds.push(bossId);
  }

  return next;
}

export function getBossForLocation(locationId: string) {
  const bosses = Object.values(getAllCatalogEntries("boss"));
  return bosses.find((boss) => boss.locationId === locationId) ?? null;
}

export function isBossDefeated(save: SaveData, bossId: string): boolean {
  return save.location.defeatedBossIds.includes(bossId);
}

export function canChallengeBoss(save: SaveData, bossId: string): boolean {
  const boss = getCatalogEntry("boss", bossId);
  if (!boss) return false;
  if (hasBossAttemptToday(save, bossId)) return false;

  if (!isBossDefeated(save, bossId)) {
    const check = checkAllRequirementSets(save, boss.challengeRequirementIds);
    return check.met;
  }

  return true;
}

export function isBossReplay(save: SaveData, bossId: string): boolean {
  return isBossDefeated(save, bossId) && canChallengeBoss(save, bossId);
}

export function registerBossDefeated(save: SaveData, bossId: string): SaveData {
  if (isBossDefeated(save, bossId)) return save;

  const next = structuredClone(save);
  next.location.defeatedBossIds.push(bossId);
  return next;
}
