"use client";

import { getCatalogEntry } from "@/catalogs/loader";
import {
  getSpeedTraitId,
  isBattleSpeedUnlocked,
} from "@/game/battle/speed";
import { useGameStore } from "@/stores/game-store";
import { BATTLE_SPEED_OPTIONS } from "@/types";

export function BattleSpeedSelector() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const setBattleSpeed = useGameStore((state) => state.setBattleSpeed);

  if (!save) return null;

  const currentSpeed = save.settings.battleSpeed;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-[var(--text-muted)]">{t("battle.speed.label")}</span>
      <div className="flex gap-1">
        {BATTLE_SPEED_OPTIONS.map((speed) => {
          const unlocked = isBattleSpeedUnlocked(save, speed);
          const isActive = currentSpeed === speed;
          const traitId = getSpeedTraitId(speed);
          const trait = traitId ? getCatalogEntry("trait", traitId) : null;

          return (
            <button
              key={speed}
              type="button"
              disabled={!unlocked}
              onClick={() => setBattleSpeed(speed)}
              title={
                unlocked
                  ? t("battle.speed.option", { speed: String(speed) })
                  : trait
                    ? t("battle.speed.locked_trait", { trait: t(trait.nameKey) })
                    : t("battle.speed.locked")
              }
              className={`min-w-[2.5rem] rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : unlocked
                    ? "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent)]/50"
                    : "cursor-not-allowed border border-[var(--border)] bg-[var(--bg-card)]/50 text-[var(--text-muted)] opacity-50"
              }`}
            >
              {speed}x
            </button>
          );
        })}
      </div>
    </div>
  );
}
