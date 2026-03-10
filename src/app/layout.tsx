import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, Google_Sans, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import pkg from "../../package.json";
import { COOKIE_NAME, DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jakarta",
});

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-google-sans",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-thai",
});

export const metadata: Metadata = {
  title: {
    default: "Plottale \u2014 The Cinematic Novel Platform",
    template: "%s | Plottale",
  },
  description:
    "Read cinematic novels, chat with AI characters, and create your own universe.",
  metadataBase: new URL("https://plottale.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Read locale from cookie set by middleware */
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(COOKIE_NAME)?.value;
  const lang: Locale =
    localeCookie && isLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;

  return (
    <html lang={lang} className={`${plusJakarta.variable} ${googleSans.variable} ${ibmPlexSansThai.variable}`}>
      <body>
        {children}
        <span className="fixed bottom-3 right-3 z-max rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-mono text-white/70 backdrop-blur-sm pointer-events-none select-none">
          v{pkg.version}
        </span>
      </body>
    </html>
  );
}
