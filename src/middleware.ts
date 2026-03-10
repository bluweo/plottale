import { NextRequest, NextResponse } from "next/server";
import {
  LOCALES,
  DEFAULT_LOCALE,
  COOKIE_NAME,
  HEADER_NAME,
  isLocale,
} from "./lib/i18n";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Detect the preferred locale from cookie → Accept-Language → default */
function detectLocale(req: NextRequest): string {
  // 1. Cookie (returning user)
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2. Accept-Language header (new user)
  const acceptLang = req.headers.get("accept-language") ?? "";
  for (const locale of LOCALES) {
    if (acceptLang.includes(locale)) return locale;
  }

  return DEFAULT_LOCALE;
}

/* ------------------------------------------------------------------ */
/*  Middleware                                                         */
/* ------------------------------------------------------------------ */

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Extract potential locale prefix ──────────────────────────────
  const segments = pathname.split("/");
  const firstSegment = segments[1] ?? "";
  const hasLocalePrefix = isLocale(firstSegment);

  if (hasLocalePrefix) {
    // Path is e.g. /en/novels or /th/feed
    const locale = firstSegment;
    const strippedPath = "/" + segments.slice(2).join("/") || "/";

    // Rewrite: strip locale prefix for internal routing
    const url = req.nextUrl.clone();
    url.pathname = strippedPath;

    const response = NextResponse.rewrite(url);
    response.headers.set(HEADER_NAME, locale);
    response.cookies.set(COOKIE_NAME, locale, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    return response;
  }

  // ── No locale prefix — redirect to add locale prefix ──────────
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url, 307);
  response.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Files with extensions (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)",
  ],
};
