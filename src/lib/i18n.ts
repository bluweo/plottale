/* ------------------------------------------------------------------ */
/*  Shared i18n constants — used by middleware, server & client code   */
/* ------------------------------------------------------------------ */

export const LOCALES = [
  "en", "zh", "es", "ja", "ko", "pt", "id", "th", "vi", "fr", "de", "ar", "ru", "tr",
] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie set by middleware to persist the chosen locale */
export const COOKIE_NAME = "NEXT_LOCALE";

/** Request header set by middleware so server components can read locale */
export const HEADER_NAME = "x-locale";

/** All paths get locale-based routing (standalone plottale) */
export const I18N_PATH_PREFIX = "";

/** Type-guard: is the value a supported locale? */
export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/* ------------------------------------------------------------------ */
/*  Language display names & regions (for language picker UI)           */
/* ------------------------------------------------------------------ */

export interface LanguageInfo {
  code: Locale;
  native: string;
  english: string;
}

export interface LanguageRegion {
  region: string;
  languages: LanguageInfo[];
}

export const LANGUAGE_REGIONS: LanguageRegion[] = [
  {
    region: "Americas",
    languages: [
      { code: "en", native: "English",    english: "English" },
      { code: "es", native: "Español",    english: "Spanish" },
      { code: "pt", native: "Português",  english: "Portuguese" },
    ],
  },
  {
    region: "Asia Pacific",
    languages: [
      { code: "zh", native: "中文 (简体)",        english: "Chinese (Simplified)" },
      { code: "ja", native: "日本語",              english: "Japanese" },
      { code: "ko", native: "한국어",              english: "Korean" },
      { code: "id", native: "Bahasa Indonesia",  english: "Indonesian" },
      { code: "th", native: "ไทย",               english: "Thai" },
      { code: "vi", native: "Tiếng Việt",        english: "Vietnamese" },
    ],
  },
  {
    region: "Europe & Middle East",
    languages: [
      { code: "fr", native: "Français",  english: "French" },
      { code: "de", native: "Deutsch",   english: "German" },
      { code: "ar", native: "العربية",    english: "Arabic" },
      { code: "ru", native: "Русский",   english: "Russian" },
      { code: "tr", native: "Türkçe",    english: "Turkish" },
    ],
  },
];

/** Get a flat list of all language infos */
export function getAllLanguages(): LanguageInfo[] {
  return LANGUAGE_REGIONS.flatMap((r) => r.languages);
}

/** Get display info for a specific locale code */
export function getLanguageInfo(code: Locale): LanguageInfo | undefined {
  return getAllLanguages().find((l) => l.code === code);
}
