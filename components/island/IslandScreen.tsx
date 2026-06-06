"use client";

import { useState } from "react";

import { getCatalogEntry } from "@/catalogs/loader";
import { IslandActionsPanel } from "@/components/island/IslandActionsPanel";
import { FriendshipBar } from "@/components/digimon/FriendshipBar";
import { isDigimonOccupied } from "@/game/collection";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { CollectionFeedback, PlayerDigimon } from "@/types";

const FEEDBACK_STYLES: Record<CollectionFeedback["variant"], string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  fail: "border-red-500/40 bg-red-500/10 text-red-300",
  info: "border-amber-500/40 bg-amber-500/10 text-amber-200",
};

function formatFeedback(
  t: (key: string, params?: Record<string, string>) => string,
  feedback: CollectionFeedback,
): string {
  const params = { ...feedback.params };
  if (params.name?.startsWith("digimon.")) {
    params.name = t(params.name);
  }
  return t(feedback.messageKey, params);
}

type DigimonListCardProps = {
  digimon: PlayerDigimon;
  location: "team" | "island";
  occupied: boolean;
  onView: () => void;
  onMove?: () => void;
  moveLabel?: string;
  moveDisabled?: boolean;
};

function DigimonListCard({
  digimon,
  location,
  occupied,
  onView,
  onMove,
  moveLabel,
  moveDisabled,
}: DigimonListCardProps) {
  const t = useGameStore((state) => state.t);
  const catalog = getCatalogEntry("digimon", digimon.catalogId);
  if (!catalog) return null;

  return (
    <li className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onView}
          className="text-left font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
        >
          {t(catalog.nameKey)}
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          {t("island.card.level", { level: String(digimon.level) })}
        </span>
      </div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        {t(`digimon.stage.${catalog.stage}`)} · {t(`digimon_type.${catalog.primaryType}`)}
      </p>
      <div className="mt-2">
        <FriendshipBar
          friendship={digimon.friendship}
          compact
          label={t("island.card.friendship")}
        />
      </div>
      {occupied && (
        <p className="mt-2 text-xs text-amber-300">{t("island.card.occupied")}</p>
      )}
      {onMove && moveLabel && (
        <button
          type="button"
          disabled={moveDisabled || occupied}
          onClick={onMove}
          className="mt-3 w-full rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {moveLabel}
        </button>
      )}
      <p className="mt-2 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
        {location === "team" ? t("island.location.team") : t("island.location.island")}
      </p>
    </li>
  );
}

export function IslandScreen() {
  const save = useGameStore((state) => state.save);
  const config = useGameStore((state) => state.config);
  const t = useGameStore((state) => state.t);
  const moveToTeam = useGameStore((state) => state.moveToTeam);
  const moveToIsland = useGameStore((state) => state.moveToIsland);
  const setSelectedDigimonId = useUiStore((state) => state.setSelectedDigimonId);
  const collectionFeedback = useUiStore((state) => state.collectionFeedback);
  const setCollectionFeedback = useUiStore((state) => state.setCollectionFeedback);

  const [swapCandidateId, setSwapCandidateId] = useState<string | null>(null);

  if (!save || !config) return null;

  const teamDigimons = save.team.activeDigimonIds
    .map((id) => save.digimons[id])
    .filter(Boolean) as PlayerDigimon[];

  const islandDigimons = save.island.storedDigimonIds
    .map((id) => save.digimons[id])
    .filter(Boolean) as PlayerDigimon[];

  const teamFull = teamDigimons.length >= config.team.maxActive;
  const islandUsed = islandDigimons.length;
  const islandMax = config.island.maxStorage;

  const runAction = (feedback: CollectionFeedback | null) => {
    if (feedback) setCollectionFeedback(feedback);
    setSwapCandidateId(null);
  };

  const handleAddToTeam = (islandDigimonId: string) => {
    if (teamFull && !swapCandidateId) {
      setSwapCandidateId(islandDigimonId);
      setCollectionFeedback({
        messageKey: "collection.prompt.choose_swap",
        variant: "info",
      });
      return;
    }

    const feedback = moveToTeam(islandDigimonId, swapCandidateId ?? undefined);
    runAction(feedback);
  };

  const handleSwapSelect = (teamMemberId: string) => {
    if (!swapCandidateId) return;
    const feedback = moveToTeam(swapCandidateId, teamMemberId);
    runAction(feedback);
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {t("island.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("island.subtitle")}</p>
        <p className="mt-2 text-sm text-amber-300/90">
          {t("island.capacity", {
            used: String(islandUsed),
            max: String(islandMax),
          })}
        </p>
      </section>

      {collectionFeedback && (
        <div
          className={`rounded-xl border p-4 text-sm ${FEEDBACK_STYLES[collectionFeedback.variant]}`}
        >
          {formatFeedback(t, collectionFeedback)}
        </div>
      )}

      <IslandActionsPanel />

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-[var(--text-primary)]">
            {t("island.team_title", {
              current: String(teamDigimons.length),
              max: String(config.team.maxActive),
            })}
          </h3>
        </div>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {teamDigimons.map((digimon) => (
            <DigimonListCard
              key={digimon.instanceId}
              digimon={digimon}
              location="team"
              occupied={isDigimonOccupied(save, digimon.instanceId)}
              onView={() => setSelectedDigimonId(digimon.instanceId)}
              onMove={() => runAction(moveToIsland(digimon.instanceId))}
              moveLabel={t("island.action.to_island")}
              moveDisabled={teamDigimons.length <= 1}
            />
          ))}
          {swapCandidateId && (
            <li className="rounded-xl border border-dashed border-amber-500/50 bg-amber-500/5 p-3 md:col-span-2 lg:col-span-3">
              <p className="text-sm text-amber-200">{t("collection.prompt.choose_swap")}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {teamDigimons.map((member) => (
                  <button
                    key={member.instanceId}
                    type="button"
                    onClick={() => handleSwapSelect(member.instanceId)}
                    className="rounded-lg border border-amber-500/40 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-500/10"
                  >
                    {t(getCatalogEntry("digimon", member.catalogId)?.nameKey ?? member.catalogId)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSwapCandidateId(null);
                    setCollectionFeedback(null);
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  {t("island.action.cancel_swap")}
                </button>
              </div>
            </li>
          )}
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          {t("island.storage_title")}
        </h3>
        {islandDigimons.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-muted)]">
            {t("island.empty")}
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {islandDigimons.map((digimon) => (
              <DigimonListCard
                key={digimon.instanceId}
                digimon={digimon}
                location="island"
                occupied={isDigimonOccupied(save, digimon.instanceId)}
                onView={() => setSelectedDigimonId(digimon.instanceId)}
                onMove={() => handleAddToTeam(digimon.instanceId)}
                moveLabel={t("island.action.to_team")}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
