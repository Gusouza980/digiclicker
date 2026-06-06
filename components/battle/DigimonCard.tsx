"use client";

import { FriendshipBar } from "@/components/digimon/FriendshipBar";
import { usePotionInBattle } from "@/game/items/use";
import { useBattleStore } from "@/stores/battle-store";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { BattleAllyState } from "@/game/battle";

const STAGE_COLORS: Record<string, string> = {
  rookie: "#38bdf8",
  champion: "#a78bfa",
  in_training: "#34d399",
  baby: "#fbbf24",
};

type DigimonCardProps = {
  ally: BattleAllyState;
};

export function DigimonCard({ ally }: DigimonCardProps) {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const config = useGameStore((state) => state.config);
  const useSpecial = useBattleStore((state) => state.useSpecial);
  const usePotion = useBattleStore((state) => state.usePotion);
  const replaceSave = useGameStore((state) => state.replaceSave);
  const phase = useBattleStore((state) => state.snapshot?.phase);
  const setSelectedDigimonId = useUiStore((state) => state.setSelectedDigimonId);
  const hpPercent = ally.maxHp > 0 ? (ally.currentHp / ally.maxHp) * 100 : 0;
  const mpPercent = Math.round(ally.mp * 100);
  const color = STAGE_COLORS.rookie;
  const canUseSpecial =
    phase === "fighting" && !ally.isDefeated && ally.specialReady;
  const canUsePotion =
    phase === "fighting" &&
    !ally.isDefeated &&
    ally.currentHp < ally.maxHp &&
    (save?.inventory.items.find((item) => item.itemId === "potion_small")?.quantity ?? 0) > 0;
  const friendship = save?.digimons[ally.instanceId]?.friendship ?? 0;

  const handlePotion = () => {
    if (!save || !config) return;
    const result = usePotionInBattle(
      save,
      ally.instanceId,
      Math.floor(ally.maxHp * config.items.potionHealPercent),
    );
    if (!result.ok) return;
    replaceSave(result.save);
    usePotion(ally.instanceId, config.items.potionHealPercent);
  };

  return (
    <article
      className={`rounded-xl border bg-[var(--bg-card)] p-3 transition-opacity ${
        ally.isDefeated
          ? "border-red-500/30 opacity-50"
          : "border-[var(--border)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          {t(ally.nameKey).charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setSelectedDigimonId(ally.instanceId)}
              className="truncate text-left font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
            >
              {t(ally.nameKey)}
            </button>
            <span className="text-xs text-[var(--text-muted)]">
              {t("battle.level")} {ally.level}
            </span>
          </div>
          <div className="mt-2 space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
                <span>HP</span>
                <span>
                  {ally.currentHp}/{ally.maxHp}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-primary)]">
                <div
                  className={`h-full rounded-full transition-all ${
                    ally.isDefeated ? "bg-red-500/60" : "bg-emerald-500"
                  }`}
                  style={{ width: `${hpPercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
                <span>MP</span>
                <span>{mpPercent}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-primary)]">
                <div
                  className={`h-full rounded-full transition-all ${
                    ally.specialReady ? "bg-amber-400" : "bg-sky-500/70"
                  }`}
                  style={{ width: `${mpPercent}%` }}
                />
              </div>
            </div>
            <FriendshipBar
              friendship={friendship}
              compact
              label={t("digimon.detail.friendship")}
            />
          </div>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
        <div>
          <dt className="text-[var(--text-muted)]">ATK</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.atk}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">INT</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.int}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">DEF</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.def}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">SPD</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.spd}</dd>
        </div>
      </dl>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => useSpecial(ally.instanceId)}
          disabled={!canUseSpecial}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            canUseSpecial
              ? "bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/50 hover:bg-amber-400/30"
              : "cursor-not-allowed bg-[var(--bg-primary)] text-[var(--text-muted)] opacity-60"
          }`}
        >
          {ally.specialReady ? t("battle.special.ready") : t("battle.special.charging")}
        </button>
        <button
          type="button"
          onClick={handlePotion}
          disabled={!canUsePotion}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            canUsePotion
              ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40 hover:bg-emerald-500/30"
              : "cursor-not-allowed bg-[var(--bg-primary)] text-[var(--text-muted)] opacity-60"
          }`}
        >
          {t("battle.use_potion")}
        </button>
      </div>
      {ally.isDefeated && (
        <p className="mt-2 text-center text-xs font-medium text-red-400">
          {t("battle.defeated")}
        </p>
      )}
    </article>
  );
}
