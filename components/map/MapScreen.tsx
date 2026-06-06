"use client";

import { getAllCatalogEntries, getCatalogEntry } from "@/catalogs/loader";
import {
  canChallengeBoss,
  getBossForLocation,
  hasBossAttemptToday,
  isBossDefeated,
  isBossReplay,
} from "@/game/boss";
import { checkAllRequirementSets } from "@/game/requirements";
import { ShopPanel } from "@/components/shop/ShopPanel";
import { getLocationName, useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { RequirementRule } from "@/types";

function getRequirementTargetLabel(
  rule: RequirementRule,
  t: (key: string) => string,
  locale: Parameters<typeof getLocationName>[1],
): string {
  if (!rule.targetId) return "";

  if (rule.type === "mission_claimed") {
    const mission = getCatalogEntry("mission", rule.targetId);
    return mission ? t(mission.nameKey) : rule.targetId;
  }

  if (rule.type === "boss_defeated") {
    const boss = getCatalogEntry("boss", rule.targetId);
    return boss ? t(boss.nameKey) : rule.targetId;
  }

  if (rule.type === "location_unlocked") {
    return getLocationName(rule.targetId, locale);
  }

  return rule.targetId;
}

export function MapScreen() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const selectLocation = useGameStore((state) => state.selectLocation);
  const toggleAutoProgress = useGameStore((state) => state.toggleAutoProgress);
  const challengeBoss = useGameStore((state) => state.challengeBoss);
  const setActiveScreen = useUiStore((state) => state.setActiveScreen);

  if (!save) return null;

  const locations = Object.values(getAllCatalogEntries("location"));

  const handleBossChallenge = (bossId: string) => {
    if (challengeBoss(bossId)) {
      setActiveScreen("battle");
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {t("map.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("map.subtitle")}</p>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {t("map.auto_progress")}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {t("map.auto_progress_hint")}
            </p>
          </div>
          <input
            type="checkbox"
            checked={save.progression.autoProgressEnabled}
            onChange={(event) => toggleAutoProgress(event.target.checked)}
            className="h-5 w-5 accent-[var(--accent)]"
          />
        </label>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => {
          const isUnlocked = save.location.unlockedLocationIds.includes(location.id);
          const isCurrent = save.location.currentLocationId === location.id;
          const requirementCheck = checkAllRequirementSets(
            save,
            location.unlockRequirementIds,
          );
          const boss = getBossForLocation(location.id);
          const bossDefeated = boss ? isBossDefeated(save, boss.id) : false;
          const bossCanFight = boss && isUnlocked && canChallengeBoss(save, boss.id);
          const bossReplay = boss ? isBossReplay(save, boss.id) : false;
          const bossDailyUsed =
            boss && isUnlocked && bossDefeated && hasBossAttemptToday(save, boss.id);

          return (
            <article
              key={location.id}
              className={`rounded-xl border p-4 transition-colors ${
                isCurrent
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : isUnlocked
                    ? "border-[var(--border)] bg-[var(--bg-card)]"
                    : "border-[var(--border)] bg-[var(--bg-card)]/50 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-[var(--text-primary)]">
                  {t(location.nameKey)}
                </h3>
                {isCurrent && (
                  <span className="rounded-full bg-[var(--accent)]/20 px-2 py-0.5 text-xs text-[var(--accent)]">
                    {t("map.current")}
                  </span>
                )}
                {!isUnlocked && (
                  <span className="rounded-full bg-zinc-500/20 px-2 py-0.5 text-xs text-zinc-400">
                    {t("map.locked")}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {t(location.descriptionKey)}
              </p>

              {boss && isUnlocked && (
                <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-2">
                  <p className="text-xs font-medium text-amber-300">
                    {t("map.boss")}: {t(boss.nameKey)}
                  </p>
                  {bossDefeated && (
                    <p className="mt-1 text-xs text-emerald-400">{t("map.boss_defeated")}</p>
                  )}
                  {bossCanFight && !bossDefeated && (
                    <button
                      type="button"
                      onClick={() => handleBossChallenge(boss.id)}
                      className="mt-2 w-full rounded-lg bg-amber-500/20 px-2 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/30"
                    >
                      {t("map.challenge_boss")}
                    </button>
                  )}
                  {bossReplay && (
                    <button
                      type="button"
                      onClick={() => handleBossChallenge(boss.id)}
                      className="mt-2 w-full rounded-lg bg-violet-500/20 px-2 py-1.5 text-xs font-medium text-violet-200 hover:bg-violet-500/30"
                    >
                      {t("map.rematch_boss")}
                    </button>
                  )}
                  {bossDailyUsed && (
                    <p className="mt-2 text-xs text-[var(--text-muted)]">
                      {t("map.boss_daily_used")}
                    </p>
                  )}
                  {!bossDefeated && !bossCanFight && isUnlocked && (
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {t("map.boss_locked")}
                    </p>
                  )}
                </div>
              )}

              {isUnlocked && location.shopId && <ShopPanel locationId={location.id} />}

              {!isUnlocked && location.unlockRequirementIds.length > 0 && (
                <p className="mt-3 text-xs text-amber-400/80">
                  {t("map.requirements_pending")}
                </p>
              )}

              {isUnlocked && !isCurrent && (
                <button
                  type="button"
                  onClick={() => selectLocation(location.id)}
                  className="mt-4 w-full rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  {t("map.travel")}
                </button>
              )}

              {isUnlocked && isCurrent && (
                <p className="mt-4 text-xs text-[var(--text-muted)]">
                  {t("map.already_here")}
                </p>
              )}

              {!isUnlocked && !requirementCheck.met && (
                <ul className="mt-3 space-y-1 text-xs text-[var(--text-muted)]">
                  {requirementCheck.failedRules.map((rule, index) => (
                    <li key={`${location.id}_${rule.type}_${index}`}>
                      {t(`requirement.${rule.type}`, {
                        value: String(rule.value),
                        target: getRequirementTargetLabel(rule, t, save.settings.locale),
                      })}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
