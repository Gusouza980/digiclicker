"use client";

import { useBattleLoop } from "@/hooks/useBattleLoop";
import { getLocationName, useGameStore } from "@/stores/game-store";
import { useBattleStore } from "@/stores/battle-store";

import { ActiveMissionCard } from "@/components/missions/ActiveMissionCard";

import { BattleArena } from "./BattleArena";
import { BattleSpeedSelector } from "./BattleSpeedSelector";
import { CombatLog } from "./CombatLog";
import { DigimonCard } from "./DigimonCard";
import { RecentRewards } from "./RecentRewards";

export function BattleScreen() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const snapshot = useBattleStore((state) => state.snapshot);

  useBattleLoop();

  if (!save || !snapshot) {
    return (
      <p className="text-sm text-[var(--text-muted)]">{t("battle.loading")}</p>
    );
  }

  const locationName = getLocationName(
    save.location.currentLocationId,
    save.settings.locale,
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {t("battle.title")}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">{locationName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BattleSpeedSelector />
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
            {t("battle.team_atk")}:{" "}
            <strong className="text-[var(--accent)]">{snapshot.teamTotalAtk}</strong>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
            {t("header.bits")}:{" "}
            <strong className="text-amber-300">{save.player.bits}</strong>
          </div>
        </div>
      </section>

      <ActiveMissionCard />

      {save.activeBuffs.length > 0 && (
        <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-xs text-violet-200">
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

      <BattleArena
        enemies={snapshot.enemies}
        phase={snapshot.phase}
        lastDamage={snapshot.lastDamage}
        lastDamageType={snapshot.lastDamageType}
        lastCombatAdvantage={snapshot.lastCombatAdvantage}
        isBossBattle={snapshot.isBossBattle}
      />

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
          {t("battle.team")}
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          {snapshot.allies.map((ally) => (
            <DigimonCard key={ally.instanceId} ally={ally} />
          ))}
        </div>
      </section>

      <CombatLog entries={snapshot.combatLog} />

      <RecentRewards
        rewards={snapshot.recentRewards}
        levelUps={snapshot.levelUpEvents}
      />
    </div>
  );
}
