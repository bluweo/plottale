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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();

  const title =
    locale === "th"
      ? "Plottale \u2014 \u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e19\u0e34\u0e22\u0e32\u0e22\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c"
      : "Plottale \u2014 The Cinematic Novel Platform";
  const description =
    locale === "th"
      ? "\u0e2d\u0e48\u0e32\u0e19\u0e19\u0e34\u0e22\u0e32\u0e22\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c \u0e1e\u0e39\u0e14\u0e04\u0e38\u0e22\u0e01\u0e31\u0e1a\u0e15\u0e31\u0e27\u0e25\u0e30\u0e04\u0e23 AI \u0e2a\u0e23\u0e49\u0e32\u0e07\u0e08\u0e31\u0e01\u0e23\u0e27\u0e32\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e40\u0e2d\u0e07"
      : "Read cinematic novels, chat with AI characters, and create your own universe.";

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }
  languages["x-default"] = `${BASE_URL}/en`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
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
