"use client";

import { useGameStore } from "@/stores/game-store";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/types/locale";

export function LanguageSelector() {
  const locale = useGameStore((state) => state.save?.settings.locale);
  const setLocale = useGameStore((state) => state.setLocale);
  const t = useGameStore((state) => state.t);

  if (!locale) return null;

  return (
    <label className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <span className="sr-only">{t("settings.language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as SupportedLocale)}
        className="rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-1 text-sm text-[var(--text-primary)]"
        aria-label={t("settings.language")}
      >
        {SUPPORTED_LOCALES.map((code) => (
          <option key={code} value={code}>
            {t(`settings.language.${code}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
