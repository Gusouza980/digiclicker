"use client";

import { getFriendshipPercent } from "@/game/friendship";
import { useGameStore } from "@/stores/game-store";

type FriendshipBarProps = {
  friendship: number;
  compact?: boolean;
  label?: string;
};

export function FriendshipBar({ friendship, compact = false, label }: FriendshipBarProps) {
  const config = useGameStore((state) => state.config);
  if (!config) return null;

  const percent = getFriendshipPercent(friendship, config);

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      {label && (
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        className={`overflow-hidden rounded-full bg-[var(--bg-primary)] ${
          compact ? "h-1.5" : "h-2.5"
        }`}
      >
        <div
          className="h-full rounded-full bg-pink-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      {!label && (
        <p className="text-right text-xs text-[var(--text-muted)]">{percent}%</p>
      )}
    </div>
  );
}
