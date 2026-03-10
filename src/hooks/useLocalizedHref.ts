"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Returns a function that prepends the current locale to paths.
 *
 * Usage:
 *   const lhref = useLocalizedHref();
 *   <Link href={lhref("/novels")}>
 */
export function useLocalizedHref() {
  const { lang } = useLanguage();

  return (path: string): string => {
    // Prefix all internal paths with locale
    return `/${lang}${path}`;
  };
}
