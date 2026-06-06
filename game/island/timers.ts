import type { IslandAction } from "@/types";

export function getActionEndsAt(action: IslandAction): number {
  return new Date(action.endsAt).getTime();
}

export function isActionReady(action: IslandAction, now = Date.now()): boolean {
  return now >= getActionEndsAt(action);
}

export function getRemainingMs(action: IslandAction, now = Date.now()): number {
  return Math.max(0, getActionEndsAt(action) - now);
}

export function getActionProgress(action: IslandAction, now = Date.now()): number {
  const start = new Date(action.startedAt).getTime();
  const end = getActionEndsAt(action);
  const total = end - start;
  if (total <= 0) return 1;
  return Math.min(1, Math.max(0, (now - start) / total));
}

export function formatRemainingMs(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
