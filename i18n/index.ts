import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  type SupportedLocale,
} from "@/types/locale";

type TranslationDictionary = Record<string, string>;

const dictionaries: Record<SupportedLocale, TranslationDictionary> = {
  pt,
  en,
  es,
};

export function getDictionary(locale: SupportedLocale): TranslationDictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function translate(
  key: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
  fallback?: string,
): string {
  const dictionary = getDictionary(locale);
  return dictionary[key] ?? fallback ?? key;
}

export function resolveLocale(value: string | null | undefined): SupportedLocale {
  if (value && isSupportedLocale(value)) {
    return value;
  }
  return DEFAULT_LOCALE;
}
