"use client";

import { useGameStore } from "@/stores/game-store";
import { CURRENT_SAVE_VERSION } from "@/game/save";

export function SaveDebugPanel() {
  const save = useGameStore((state) => state.save);
  const createNewSave = useGameStore((state) => state.createNewSave);
  const resetCurrentSave = useGameStore((state) => state.resetCurrentSave);
  const touchSave = useGameStore((state) => state.touchSave);
  const t = useGameStore((state) => state.t);

  if (!save) return null;

  return (
    <section className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-card)]/50 p-4">
      <h3 className="text-sm font-medium text-[var(--text-primary)]">
        Save — Sprint 0 QA
      </h3>
      <dl className="mt-3 grid gap-2 text-xs text-[var(--text-muted)] sm:grid-cols-2">
        <div>
          <dt>{t("save.version")}</dt>
          <dd className="font-mono text-[var(--text-primary)]">
            v{save.saveVersion} (current: v{CURRENT_SAVE_VERSION})
          </dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd className="font-mono text-[var(--text-primary)]">{save.updatedAt}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => touchSave()}
          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs hover:bg-[var(--bg-secondary)]"
        >
          Persist
        </button>
        <button
          type="button"
          onClick={() => createNewSave()}
          className="rounded-lg border border-[var(--accent)]/40 px-3 py-1.5 text-xs text-[var(--accent)] hover:bg-[var(--accent)]/10"
        >
          {t("save.actions.new")}
        </button>
        <button
          type="button"
          onClick={() => resetCurrentSave()}
          className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
        >
          {t("save.actions.reset")}
        </button>
      </div>
    </section>
  );
}
