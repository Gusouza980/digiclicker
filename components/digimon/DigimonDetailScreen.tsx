"use client";

import { getCatalogEntry } from "@/catalogs/loader";
import { FriendshipBar } from "@/components/digimon/FriendshipBar";
import {
  getDigimonLocation,
  getEvolutionLine,
  isDigimonOccupied,
} from "@/game/collection";
import { calculateStatBreakdown, calculateTotalStats } from "@/game/stats/calculator";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { StatKey } from "@/types";

const STAT_KEYS: StatKey[] = ["hp", "mp", "atk", "def", "int", "spi", "spd"];

export function DigimonDetailScreen() {
  const save = useGameStore((state) => state.save);
  const config = useGameStore((state) => state.config);
  const t = useGameStore((state) => state.t);
  const moveToTeam = useGameStore((state) => state.moveToTeam);
  const moveToIsland = useGameStore((state) => state.moveToIsland);
  const selectedDigimonId = useUiStore((state) => state.selectedDigimonId);
  const setSelectedDigimonId = useUiStore((state) => state.setSelectedDigimonId);
  const setCollectionFeedback = useUiStore((state) => state.setCollectionFeedback);

  if (!save || !config || !selectedDigimonId) return null;

  const digimon = save.digimons[selectedDigimonId];
  if (!digimon) return null;

  const catalog = getCatalogEntry("digimon", digimon.catalogId);
  if (!catalog) return null;

  const breakdown = calculateStatBreakdown(digimon);
  const total = calculateTotalStats(digimon);
  const personality = digimon.personalityId
    ? getCatalogEntry("personality", digimon.personalityId)
    : null;
  const location = getDigimonLocation(save, digimon.instanceId);
  const occupied = isDigimonOccupied(save, digimon.instanceId);
  const evolutionLine = getEvolutionLine(digimon.catalogId);
  const teamCount = save.team.activeDigimonIds.length;

  const handleMoveToTeam = () => {
    const feedback = moveToTeam(digimon.instanceId);
    if (feedback) setCollectionFeedback(feedback);
  };

  const handleMoveToIsland = () => {
    const feedback = moveToIsland(digimon.instanceId);
    if (feedback) setCollectionFeedback(feedback);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => setSelectedDigimonId(null)}
            className="mb-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            {t("digimon.detail.back")}
          </button>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {t(catalog.nameKey)}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {t("digimon.detail.level", { level: String(digimon.level) })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1">
            {t("digimon.detail.attribute")}: {t(`digimon.attribute.${catalog.attribute}`)}
          </span>
          <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1">
            {t("digimon.detail.element")}: {t(`digimon.element.${catalog.element}`)}
          </span>
          <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1">
            {t("digimon.detail.type")}: {t(`digimon_type.${catalog.primaryType}`)}
          </span>
          <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1">
            {t("digimon.detail.location")}: {t(`digimon.detail.location.${location}`)}
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <h3 className="text-sm font-medium text-[var(--text-muted)]">
          {t("digimon.detail.friendship")}
        </h3>
        <div className="mt-3">
          <FriendshipBar friendship={digimon.friendship} label={t("digimon.detail.friendship")} />
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <h3 className="text-sm font-medium text-[var(--text-muted)]">
          {t("digimon.detail.personality")}
        </h3>
        {personality ? (
          <div className="mt-2">
            <p className="font-medium text-[var(--text-primary)]">
              {t(personality.nameKey)}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {t(personality.descriptionKey)}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {t("digimon.detail.no_personality")}
          </p>
        )}
      </section>

      {breakdown && total && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
          <h3 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
            {t("digimon.detail.stats")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] text-sm">
              <thead>
                <tr className="text-left text-xs text-[var(--text-muted)]">
                  <th className="pb-2">{t("digimon.detail.stat")}</th>
                  <th className="pb-2">{t("digimon.detail.base")}</th>
                  <th className="pb-2">{t("digimon.detail.by_level")}</th>
                  <th className="pb-2">{t("digimon.detail.cumulative")}</th>
                  <th className="pb-2">{t("digimon.detail.total")}</th>
                </tr>
              </thead>
              <tbody>
                {STAT_KEYS.map((stat) => (
                  <tr key={stat} className="border-t border-[var(--border)]">
                    <td className="py-2 font-medium uppercase text-[var(--text-primary)]">
                      {stat}
                    </td>
                    <td className="py-2 text-[var(--text-muted)]">
                      {breakdown.base[stat]}
                    </td>
                    <td className="py-2 text-sky-300">+{breakdown.byLevel[stat]}</td>
                    <td className="py-2 text-emerald-300">
                      +{breakdown.cumulative[stat]}
                    </td>
                    <td className="py-2 font-semibold text-[var(--accent)]">
                      {total[stat]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="grid gap-3 text-sm md:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <span className="text-[var(--text-muted)]">{t("digimon.detail.stage")}</span>
          <p className="font-semibold text-[var(--text-primary)]">
            {t(`digimon.stage.${catalog.stage}`)}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <span className="text-[var(--text-muted)]">{t("digimon.detail.source")}</span>
          <p className="font-semibold text-[var(--text-primary)]">
            {t(`digimon.detail.source.${digimon.source}`)}
          </p>
        </div>
        {digimon.hatchQuality && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3 md:col-span-2">
            <span className="text-[var(--text-muted)]">{t("digimon.detail.hatch_quality")}</span>
            <p className="font-semibold text-[var(--text-primary)]">
              {t("digimon.detail.hatch_quality_value", {
                quality: String(digimon.hatchQuality),
              })}
            </p>
          </div>
        )}
      </section>

      {evolutionLine.length > 0 && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
          <h3 className="text-sm font-medium text-[var(--text-muted)]">
            {t("digimon.detail.evolution_line")}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {evolutionLine.map((form) => {
              const isCurrent = form.id === digimon.catalogId;
              const isKnown = save.knownForms.knownFormIds.includes(form.id) || isCurrent;

              return (
                <li
                  key={form.id}
                  className={`rounded-lg border px-3 py-1.5 text-xs ${
                    isCurrent
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : isKnown
                        ? "border-[var(--border)] text-[var(--text-primary)]"
                        : "border-dashed border-[var(--border)] text-[var(--text-muted)]"
                  }`}
                >
                  {isKnown ? t(form.nameKey) : "?"}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {(location === "team" || location === "island") && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 space-y-3">
          <h3 className="text-sm font-medium text-[var(--text-muted)]">
            {t("digimon.detail.management")}
          </h3>
          {occupied && (
            <p className="text-sm text-amber-300">{t("collection.error.digimon_occupied")}</p>
          )}
          {location === "island" && (
            <button
              type="button"
              disabled={occupied || (teamCount >= config.team.maxActive)}
              onClick={handleMoveToTeam}
              className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("island.action.to_team")}
            </button>
          )}
          {location === "team" && (
            <button
              type="button"
              disabled={occupied || teamCount <= 1}
              onClick={handleMoveToIsland}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("island.action.to_island")}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
