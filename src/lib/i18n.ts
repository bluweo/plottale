/* ------------------------------------------------------------------ */
/*  Shared i18n constants — used by middleware, server & client code   */
/* ------------------------------------------------------------------ */

export const LOCALES = ["en", "th"] as const;
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
