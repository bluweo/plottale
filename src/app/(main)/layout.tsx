import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { AppShellProviders } from "./providers";
import { PlottaleShell } from "./shell";
import {
  COOKIE_NAME,
  DEFAULT_LOCALE,
  HEADER_NAME,
  LOCALES,
  isLocale,
} from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  SEO — generateMetadata with hreflang + og:locale                   */
/* ------------------------------------------------------------------ */

const BASE_URL = "https://plottale.com";

async function resolveLocale(): Promise<Locale> {
  const hdrs = await headers();
  const headerLocale = hdrs.get(HEADER_NAME);
  if (headerLocale && isLocale(headerLocale)) return headerLocale;

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  return DEFAULT_LOCALE;
}

/** Map locale code → OpenGraph locale string */
const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US", zh: "zh_CN", es: "es_ES", ja: "ja_JP", ko: "ko_KR",
  pt: "pt_BR", id: "id_ID", th: "th_TH", vi: "vi_VN", fr: "fr_FR",
  de: "de_DE", ar: "ar_SA", ru: "ru_RU", tr: "tr_TR",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();

  // Mock: always use English title/description regardless of locale
  const title = "Plottale \u2014 The Cinematic Novel Platform";
  const description = "Read cinematic novels, chat with AI characters, and create your own universe.";

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }
  languages["x-default"] = `${BASE_URL}/en`;

  const ogLocale = OG_LOCALE_MAP[locale] ?? "en_US";
  const alternateLocale = LOCALES
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE_MAP[l] ?? "en_US");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: ogLocale,
      alternateLocale,
      url: `${BASE_URL}/${locale}`,
      siteName: "Plottale",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export default async function MainLayout({
  children,
  postModal,
}: Readonly<{
  children: React.ReactNode;
  postModal: React.ReactNode;
}>) {
  const locale = await resolveLocale();

  return (
    <AppShellProviders locale={locale}>
      <PlottaleShell postModal={postModal}>
        {children}
      </PlottaleShell>
    </AppShellProviders>
  );
}
