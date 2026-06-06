export const SUPPORTED_LOCALES = ["pt", "en", "es"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "pt";

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
