"use client";

import { getActiveMission, getCompletedMission } from "@/game/missions";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";

export function BattleStatusBar() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const setActiveScreen = useUiStore((state) => state.setActiveScreen);

  if (!save) return null;

  const mission = getActiveMission(save) ?? getCompletedMission(save);
  const hasBuff = save.activeBuffs.some((buff) => buff.battlesRemaining > 0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {mission && (
        <button
          type="button"
          onClick={() => setActiveScreen("missions")}
          className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-300 hover:bg-sky-500/20"
        >
          {t("battle.mission_link")}
        </button>
      )}
      {hasBuff && (
        <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-200">
          {save.activeBuffs.map((buff) =>
            buff.type === "xp_multiplier" ? (
              <span key={buff.id}>
                {t("battle.xp_buff_active", {
                  multiplier: String(buff.multiplier),
                  battles: String(buff.battlesRemaining),
                })}
              </span>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
