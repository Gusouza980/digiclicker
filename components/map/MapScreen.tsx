"use client";

import { getAllCatalogEntries, getCatalogEntry } from "@/catalogs/loader";
import { checkAllRequirementSets } from "@/game/requirements";
import { getLocationName, useGameStore } from "@/stores/game-store";
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

  if (rule.type === "location_unlocked" || rule.type === "boss_defeated") {
    return getLocationName(rule.targetId, locale);
  }

  return rule.targetId;
}

export function MapScreen() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const selectLocation = useGameStore((state) => state.selectLocation);

  if (!save) return null;

  const locations = Object.values(getAllCatalogEntries("location"));

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {t("map.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("map.subtitle")}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => {
          const isUnlocked = save.location.unlockedLocationIds.includes(location.id);
          const isCurrent = save.location.currentLocationId === location.id;
          const requirementCheck = checkAllRequirementSets(
            save,
            location.unlockRequirementIds,
          );

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
