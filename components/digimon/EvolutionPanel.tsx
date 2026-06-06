"use client";

import { getCatalogEntry } from "@/catalogs/loader";
import { getEvolutionLine } from "@/game/collection";
import { getTotalCumulativeGain } from "@/game/evolution/cumulative";
import { getDegenerateOptions, getEvolveOptions } from "@/game/evolution";
import { formatRequirementParams, getRequirementDescriptionKey } from "@/game/requirements";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { EvolutionFeedback, EvolutionOption, PlayerDigimon, SaveData } from "@/types";

const STATUS_STYLES: Record<EvolutionOption["status"], string> = {
  available: "border-emerald-500/40 bg-emerald-500/5",
  blocked: "border-amber-500/30 bg-amber-500/5",
  unknown: "border-dashed border-[var(--border)] opacity-60",
};

const FEEDBACK_STYLES: Record<EvolutionFeedback["variant"], string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  fail: "border-red-500/40 bg-red-500/10 text-red-300",
  info: "border-amber-500/40 bg-amber-500/10 text-amber-200",
};

function formatFeedback(
  t: (key: string, params?: Record<string, string>) => string,
  feedback: EvolutionFeedback,
): string {
  const params = { ...feedback.params };
  if (params.name?.startsWith("digimon.")) {
    params.name = t(params.name);
  }
  return t(feedback.messageKey, params);
}

type EvolutionOptionCardProps = {
  option: EvolutionOption;
  onAction: (transitionId: string) => void;
};

function EvolutionOptionCard({ option, onAction }: EvolutionOptionCardProps) {
  const t = useGameStore((state) => state.t);
  const target = getCatalogEntry("digimon", option.toId);
  const gainTotal = getTotalCumulativeGain(option.estimatedCumulativeGain);

  return (
    <li className={`rounded-xl border p-3 ${STATUS_STYLES[option.status]}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-[var(--text-primary)]">
            {option.status === "unknown" ? "?" : target ? t(target.nameKey) : option.toId}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {t(`digimon.stage.${target?.stage ?? "rookie"}`)}
          </p>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {t(`evolution.status.${option.status}`)}
        </span>
      </div>

      {option.status !== "unknown" && (
        <p className="mt-2 text-xs text-sky-300">
          {t("evolution.preview.cumulative_gain", { amount: String(gainTotal) })}
        </p>
      )}

      {option.failedRules.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-amber-200/90">
          {option.failedRules.map((rule, index) => (
            <li key={`${rule.type}-${index}`}>
              {t(getRequirementDescriptionKey(rule), formatRequirementParams(rule))}
            </li>
          ))}
        </ul>
      )}

      {option.status === "available" && (
        <button
          type="button"
          onClick={() => onAction(option.transitionId)}
          className="mt-3 w-full rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          {option.direction === "evolve"
            ? t("evolution.action.evolve")
            : t("evolution.action.degenerate")}
        </button>
      )}
    </li>
  );
}

type EvolutionTreeProps = {
  save: SaveData;
  digimon: PlayerDigimon;
};

function EvolutionTree({ save, digimon }: EvolutionTreeProps) {
  const t = useGameStore((state) => state.t);
  const forms = getEvolutionLine(digimon.catalogId);
  const evolveOptions = getEvolveOptions(save, digimon.instanceId);

  return (
    <ul className="flex flex-wrap gap-2">
      {forms.map((form) => {
        const isCurrent = form.id === digimon.catalogId;
        const isKnown =
          save.knownForms.knownFormIds.includes(form.id) || isCurrent;
        const canEvolve = evolveOptions.some(
          (o) => o.toId === form.id && o.status === "available",
        );

        return (
          <li
            key={form.id}
            className={`rounded-lg border px-3 py-1.5 text-xs ${
              isCurrent
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : canEvolve
                  ? "border-emerald-500/50 text-emerald-300"
                  : isKnown
                    ? "border-[var(--border)] text-[var(--text-primary)]"
                    : "border-dashed border-[var(--border)] text-[var(--text-muted)]"
            }`}
            title={canEvolve ? t("evolution.tree.can_evolve") : undefined}
          >
            {isKnown ? t(form.nameKey) : "?"}
          </li>
        );
      })}
    </ul>
  );
}

type EvolutionPanelProps = {
  digimon: PlayerDigimon;
};

export function EvolutionPanel({ digimon }: EvolutionPanelProps) {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const evolve = useGameStore((state) => state.performEvolve);
  const degenerate = useGameStore((state) => state.performDegenerate);
  const evolutionFeedback = useUiStore((state) => state.evolutionFeedback);
  const setEvolutionFeedback = useUiStore((state) => state.setEvolutionFeedback);

  if (!save) return null;

  const evolveOptions = getEvolveOptions(save, digimon.instanceId);
  const degenerateOptions = getDegenerateOptions(save, digimon.instanceId);

  const handleEvolve = (transitionId: string) => {
    const feedback = evolve(digimon.instanceId, transitionId);
    if (feedback) setEvolutionFeedback(feedback);
  };

  const handleDegenerate = (transitionId: string) => {
    const feedback = degenerate(digimon.instanceId, transitionId);
    if (feedback) setEvolutionFeedback(feedback);
  };

  return (
    <div className="space-y-4">
      {evolutionFeedback && (
        <div
          className={`rounded-xl border p-4 text-sm ${FEEDBACK_STYLES[evolutionFeedback.variant]}`}
        >
          {formatFeedback(t, evolutionFeedback)}
        </div>
      )}

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <h3 className="text-sm font-medium text-[var(--text-muted)]">
          {t("digimon.detail.evolution_line")}
        </h3>
        <div className="mt-3">
          <EvolutionTree save={save} digimon={digimon} />
        </div>
      </section>

      {evolveOptions.length > 0 && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 space-y-3">
          <h3 className="text-sm font-medium text-[var(--text-primary)]">
            {t("evolution.section.evolve")}
          </h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {evolveOptions.map((option) => (
              <EvolutionOptionCard
                key={option.transitionId}
                option={option}
                onAction={handleEvolve}
              />
            ))}
          </ul>
        </section>
      )}

      {degenerateOptions.length > 0 && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 space-y-3">
          <h3 className="text-sm font-medium text-[var(--text-primary)]">
            {t("evolution.section.degenerate")}
          </h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {degenerateOptions.map((option) => (
              <EvolutionOptionCard
                key={option.transitionId}
                option={option}
                onAction={handleDegenerate}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
