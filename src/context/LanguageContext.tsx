"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, COOKIE_NAME, I18N_PATH_PREFIX, isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { translations } from "@/data/translations";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Lang = Locale;

interface LanguageContextValue {
  lang: Lang;
  setLang: (v: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "bluweo-language";

/** Extract locale from URL pathname, e.g. "/th/app-shell/..." → "th" */
function localeFromPath(pathname: string): Lang | null {
  const seg = pathname.split("/")[1];
  return seg && isLocale(seg) ? (seg as Lang) : null;
}

/** Set a cookie from client-side */
function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
}

/** Check if the path (after stripping locale) is under plottale */
function isPlottalePath(pathname: string): boolean {
  // Strip locale prefix if present
  const locale = localeFromPath(pathname);
  const bare = locale
    ? "/" + pathname.split("/").slice(2).join("/")
    : pathname;
  return bare === I18N_PATH_PREFIX || bare.startsWith(`${I18N_PATH_PREFIX}/`);
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Lang;
}) {
  const pathname = usePathname();
  const router = useRouter();

  /* Derive locale from URL when on a plottale page */
  const urlLocale = localeFromPath(pathname);

  const [lang, setLangState] = useState<Lang>(
    initialLocale ?? urlLocale ?? DEFAULT_LOCALE,
  );

  /* Sync lang from URL whenever pathname changes */
  useEffect(() => {
    if (urlLocale && urlLocale !== lang) {
      setLangState(urlLocale);
      setCookie(COOKIE_NAME, urlLocale);
      try {
        localStorage.setItem(STORAGE_KEY, urlLocale);
      } catch {
        /* noop */
      }
    } else if (!urlLocale) {
      // Not on a locale-prefixed page — read from localStorage as fallback
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
        if (stored && isLocale(stored) && stored !== lang) setLangState(stored);
      } catch {
        /* noop */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLocale]);

  const setLang = useCallback(
    (newLang: Lang) => {
      if (newLang === lang) return;

      setLangState(newLang);
      setCookie(COOKIE_NAME, newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        /* noop */
      }

      // If currently on a plottale page, navigate to the new locale URL
      if (isPlottalePath(pathname)) {
        const currentLocale = localeFromPath(pathname);
        let basePath = pathname;
        if (currentLocale) {
          // Strip the current locale prefix
          basePath =
            "/" + pathname.split("/").slice(2).join("/") || "/";
        }
        router.push(`/${newLang}${basePath}`);
      }
    },
    [lang, pathname, router],
  );

  const toggleLang = useCallback(() => {
    // Legacy toggle — cycles back to English from any non-English locale
    setLang(lang === "en" ? "th" : "en");
  }, [lang, setLang]);

  const t = useCallback(
    (key: string): string => translations[key]?.[lang] ?? translations[key]?.["en"] ?? key,
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
