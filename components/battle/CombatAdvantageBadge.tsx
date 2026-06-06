"use client";

import { useGameStore } from "@/stores/game-store";
import type { CombatAdvantage } from "@/game/combat/attribute-element";

type CombatAdvantageBadgeProps = {
  advantage: CombatAdvantage | null;
};

export function CombatAdvantageBadge({ advantage }: CombatAdvantageBadgeProps) {
  const t = useGameStore((state) => state.t);

  if (!advantage || advantage === "neutral") return null;

  const isAdvantage = advantage === "advantage";

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        isAdvantage
          ? "bg-emerald-500/20 text-emerald-300"
          : "bg-red-500/20 text-red-300"
      }`}
    >
      {t(`combat.${advantage}`)}
    </span>
  );
}
