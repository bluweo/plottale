"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home2,
  Book1,
  Edit2,
  Category,
  Sun1,
  Moon,
  Login,
  Profile,
  Setting2,
  Logout,
  SearchNormal1,
  Notification,
  Add,
  MessageText1,
  VideoPlay,
  People,
  Star1,
  User,
  Global,
  ArrowDown2,
} from "iconsax-react";
import { useAppearance } from "@/context/AppearanceContext";
import { useBackground } from "@/context/BackgroundContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { isLocale, LANGUAGE_REGIONS, getLanguageInfo } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type IconComponent = React.ComponentType<{
  size: number;
  variant: "Linear" | "Bulk";
  color: string;
}>;

interface SubMenuItem {
  icon: IconComponent;
  label: string;
  labelKey: string;
  href: string;
  gradient?: string;
  iconColor?: string;
  descKey?: string;
  category?: string;
}

interface NavItem {
  href: string;
  icon: IconComponent;
  label: string;
  labelKey: string;
  exact: boolean;
  subMenu?: SubMenuItem[];
  menuStyle?: "widget" | "grid" | "list";
}

/* ------------------------------------------------------------------ */
/*  Shared hook: detect mobile (≤1024px)                               */
/* ------------------------------------------------------------------ */

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ------------------------------------------------------------------ */
/*  Scroll-direction: hide top controls on scroll-down                  */
/* ------------------------------------------------------------------ */

function useScrollHidden() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      // Only show when near the top of the page
      if (y <= 80) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);   // scrolling down
      }
      // Scrolling up mid-page: stay hidden (no else branch)
      lastY.current = y;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return hidden;
}

/* ------------------------------------------------------------------ */
/*  Strip locale prefix from pathname for nav matching                  */
/* ------------------------------------------------------------------ */

function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (seg && isLocale(seg)) {
    return "/" + pathname.split("/").slice(2).join("/") || "/";
  }
  return pathname;
}

/* ------------------------------------------------------------------ */
/*  Navigation items                                                   */
/* ------------------------------------------------------------------ */

const EXPLORE_SUB_MENU: SubMenuItem[] = [
  { icon: Book1,        label: "All Novels",     labelKey: "sub.allnovels",   href: "/novels",     gradient: "linear-gradient(135deg, #f6d365 0%, #f59e0b 100%)", iconColor: "#92400e" },
  { icon: Star1,        label: "Top Rated",      labelKey: "sub.toprated",    href: "/top",        gradient: "linear-gradient(135deg, #a8c0ff 0%, #7b8cde 100%)", iconColor: "#4a5ba8" },
  { icon: VideoPlay,    label: "With Trailers",  labelKey: "sub.trailers",    href: "/trailers",   gradient: "linear-gradient(135deg, #f8a4d0 0%, #d16ba5 100%)", iconColor: "#9b3d78" },
  { icon: MessageText1, label: "AI Characters",  labelKey: "sub.aichars",     href: "/characters", gradient: "linear-gradient(135deg, #a1f0c2 0%, #56c88a 100%)", iconColor: "#2e8b57" },
];

const CREATE_SUB_MENU: SubMenuItem[] = [
  { icon: Edit2,    label: "Write Novel",   labelKey: "sub.writenovel",  href: "/create/novel",   gradient: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)", iconColor: "#6b21a8" },
  { icon: People,   label: "Create Cast",   labelKey: "sub.createcast",  href: "/create/cast",    gradient: "linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)", iconColor: "#0f766e" },
  { icon: VideoPlay,label: "Make Trailer",  labelKey: "sub.maketrailer", href: "/create/trailer", gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#92400e" },
];

const NAV_ITEMS: NavItem[] = [
  { href: "/",           icon: Home2,    label: "Home",    labelKey: "nav.home",      exact: true },
  { href: "/novels",    icon: Book1,    label: "Explore", labelKey: "nav.explore",   exact: false, subMenu: EXPLORE_SUB_MENU, menuStyle: "grid" },
  { href: "/create",    icon: Edit2,    label: "Create",  labelKey: "nav.create",    exact: false, subMenu: CREATE_SUB_MENU, menuStyle: "grid" },
  { href: "/library",   icon: Category, label: "Library", labelKey: "nav.library",   exact: false },
];

const CIRCLE = 56;
const ICON_AREA = 56;
const PADDING_RIGHT = 36;

/* ------------------------------------------------------------------ */
/*  Gel Glass Circle Item (pill expand mode)                           */
/* ------------------------------------------------------------------ */

function GelCircleItem({
  href,
  icon: Icon,
  active,
  isDark,
}: {
  href: string;
  icon: IconComponent;
  label: string;
  labelKey: string;
  active: boolean;
  isDark: boolean;
}) {
  const lhref = useLocalizedHref();
  const inactiveColor = isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)";
  const activeBg = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.92)";
  const activeColor = isDark ? "#ffffff" : "#1a1a1a";

  return (
    <Link
      href={lhref(href)}
      className={[
        "gel-glass relative flex items-center justify-center w-14 h-14 rounded-[9999px]",
        "hover:!scale-105 hover:!translate-none",
        "max-[1024px]:w-12 max-[1024px]:h-12",
      ].join(" ")}
      style={active ? { backgroundColor: activeBg } : undefined}
    >
      <div className="gel-glass-shine rounded-[9999px]" />
      <span
        className="relative z-3 flex items-center justify-center [&_svg]:w-[22px] [&_svg]:h-[22px] max-[1024px]:[&_svg]:w-[18px] max-[1024px]:[&_svg]:h-[18px]"
        style={{ color: active ? activeColor : inactiveColor }}
      >
        <Icon size={22} variant={active ? "Bulk" : "Linear"} color="currentColor" />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Gel Glass Circle with Component Grid Menu                          */
/* ------------------------------------------------------------------ */

function GelCircleWithComponentMenu({
  icon: Icon,
  label,
  active,
  subMenu,
  isDark,
}: {
  icon: IconComponent;
  label: string;
  active: boolean;
  subMenu: SubMenuItem[];
  isDark: boolean;
}) {
  const { t } = useLanguage();
  const lhref = useLocalizedHref();
  const [hovered, setHovered] = useState(false);
  const mobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Click-outside handler for mobile */
  useEffect(() => {
    if (!mobile || !hovered) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        (!panelRef.current || !panelRef.current.contains(target))
      ) {
        setHovered(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobile, hovered]);

  /* ── Horizontal grid panel ── */
  const panelJSX = (
    <div
      ref={panelRef}
      className={[
        "glass-panel",
        mobile
          ? "fixed left-3 right-3 z-50 p-5 overflow-hidden"
          : "absolute left-[calc(100%+12px)] top-0 p-5 overflow-hidden",
      ].join(" ")}
      style={{
        ...(mobile ? { bottom: 100 } : {}),
        opacity: hovered ? 1 : 0,
        transform: hovered
          ? (mobile ? "none" : "translateX(0)")
          : (mobile ? "translateY(8px)" : "translateX(-8px)"),
        pointerEvents: hovered ? "auto" : "none",
        transition: "opacity 300ms ease, transform 300ms var(--transition-apple)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-5 justify-center">
        {subMenu.map((item) => {
          const ItemIcon = item.icon;
          return (
            <Link
              key={item.href}
              href={lhref(item.href)}
              className="flex flex-col items-center gap-2.5 group/item"
            >
              <div
                className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center [&_svg]:w-[28px] [&_svg]:h-[28px] transition-all duration-300 ease-out group-hover/item:scale-[1.18] group-hover/item:shadow-lg"
                style={{
                  background: item.gradient || "rgba(255,255,255,0.5)",
                  color: item.iconColor || "currentColor",
                }}
              >
                <ItemIcon size={28} variant="Bulk" color="currentColor" />
              </div>
              <span className="text-[12px] font-[500] text-gray-700 dark:text-gray-300 transition-transform duration-300 ease-out group-hover/item:translate-y-[2px]">
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => !mobile && setHovered(true)}
      onMouseLeave={() => !mobile && setHovered(false)}
      onClick={() => mobile && setHovered((v) => !v)}
    >
      {/* ── Gel glass circle (stays circle, no expand) ── */}
      <div
        className={[
          "gel-glass relative flex items-center justify-center w-14 h-14 rounded-[9999px]",
          "hover:!scale-105 hover:!translate-none",
          "max-[1024px]:h-12 max-[1024px]:w-12",
        ].join(" ")}
        style={active ? { backgroundColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.92)" } : undefined}
      >
        <div className="gel-glass-shine rounded-[9999px]" />
        <span
          className="relative z-3 flex items-center justify-center [&_svg]:w-[22px] [&_svg]:h-[22px]"
          style={{ color: active ? (isDark ? "#ffffff" : "#1a1a1a") : (isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)") }}
        >
          <Icon size={22} variant={active ? "Bulk" : "Linear"} color="currentColor" />
        </span>
      </div>

      {/* Invisible hover bridge — desktop only */}
      {hovered && !mobile && (
        <div className="absolute top-0 left-full w-[16px] h-14" />
      )}

      {/* Panel: portal on mobile, inline on desktop */}
      {mobile ? createPortal(panelJSX, document.body) : panelJSX}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Language Picker (globe gel button + Tesla-style panel)              */
/* ------------------------------------------------------------------ */

function LanguagePicker({ isDarkBg }: { isDarkBg: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const langInfo = getLanguageInfo(lang as Locale);

  useEffect(() => { setMounted(true); }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        btnRef.current && !btnRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const iconColor = isDarkBg ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)";

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="gel-glass relative flex items-center h-11 rounded-[9999px] !overflow-visible cursor-pointer"
        style={{
          transition: "box-shadow 400ms cubic-bezier(1,0,0.4,1), background-color 400ms cubic-bezier(1,0,0.4,1)",
        }}
        title="Change language"
      >
        <div className="gel-glass-shine rounded-[9999px]" />
        <span
          className="relative z-3 flex items-center gap-1.5 px-3.5 [&_svg]:shrink-0"
          style={{ color: iconColor }}
        >
          <Global size={18} variant="Linear" color="currentColor" />
          <span className="text-[11px] font-[600] uppercase tracking-wide">
            {langInfo?.code ?? lang}
          </span>
          <ArrowDown2
            size={12}
            variant="Linear"
            color="currentColor"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 250ms ease",
            }}
          />
        </span>
      </button>

      {/* ── Language picker panel (portaled to body) ── */}
      {mounted && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[99] bg-black/20 dark:bg-black/40 backdrop-blur-[var(--glass-blur-overlay)]"
            style={{
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 200ms ease",
            }}
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            ref={panelRef}
            className="glass-panel fixed z-[100] p-8 overflow-y-auto overscroll-contain"
            style={{
              top: "50%",
              left: "50%",
              transform: open
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -48%) scale(0.96)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 250ms ease, transform 250ms var(--transition-apple)",
              width: "min(640px, calc(100vw - 48px))",
              maxHeight: "min(520px, calc(100vh - 96px))",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Grid: 3 columns for regions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {LANGUAGE_REGIONS.map((region) => (
                <div key={region.region}>
                  {/* Region header */}
                  <h3 className="text-[13px] font-[700] text-black dark:text-white uppercase tracking-wider mb-4">
                    {region.region}
                  </h3>
                  {/* Language list */}
                  <div className="flex flex-col gap-1">
                    {region.languages.map((l) => {
                      const isSelected = lang === l.code;
                      return (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setOpen(false);
                          }}
                          className={[
                            "group/lang relative flex flex-col items-start px-3.5 py-2.5 rounded-[10px] text-left transition-all duration-200 cursor-pointer",
                            isSelected
                              ? "bg-gray-900 dark:bg-white"
                              : "hover:bg-white dark:hover:bg-black",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "text-[14px] font-[600] leading-tight transition-colors duration-200",
                              isSelected
                                ? "text-white dark:text-gray-900"
                                : "text-gray-700 dark:text-gray-300 group-hover/lang:text-gray-900 dark:group-hover/lang:text-white",
                            ].join(" ")}
                          >
                            {l.native}
                          </span>
                          <span
                            className={[
                              "text-[11px] font-[450] mt-0.5 transition-colors duration-200",
                              isSelected
                                ? "text-white/60 dark:text-gray-900/50"
                                : "text-gray-400 dark:text-gray-500 group-hover/lang:text-gray-900/50 dark:group-hover/lang:text-white/60",
                            ].join(" ")}
                          >
                            {l.english}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  User Menu (Login / Avatar + Dropdown)                              */
/* ------------------------------------------------------------------ */

function UserMenu({ isDarkBg }: { isDarkBg: boolean }) {
  const { t } = useLanguage();
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!loggedIn) {
    return (
      <button
        onClick={() => setLoggedIn(true)}
        className={[
          "gel-glass flex items-center h-11 rounded-[9999px] overflow-hidden",
          "hover:!scale-100 hover:!translate-none",
          "cursor-pointer",
        ].join(" ")}
        style={{
          color: isDarkBg ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)",
          transition: "box-shadow 400ms cubic-bezier(1,0,0.4,1), background-color 400ms cubic-bezier(1,0,0.4,1)",
        }}
        title="Login"
      >
        <div className="gel-glass-shine rounded-[9999px]" />
        <span className="relative z-3 w-11 h-11 flex items-center justify-center shrink-0 [&_svg]:w-[18px] [&_svg]:h-[18px]">
          <Login size={18} variant="Linear" color="currentColor" />
        </span>
        <span className="relative z-3 text-[13px] font-[580] whitespace-nowrap pr-5">
          {t("user.login")}
        </span>
      </button>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "gel-glass relative flex items-center justify-center w-11 h-11 rounded-[9999px] overflow-hidden",
          "hover:!scale-100 hover:!translate-none",
          "cursor-pointer",
          open ? "ring-1 ring-white/[0.25]" : "",
        ].join(" ")}
        style={{
          transition: "box-shadow 400ms cubic-bezier(1,0,0.4,1), background-color 400ms cubic-bezier(1,0,0.4,1)",
        }}
        title="Account"
      >
        <div className="gel-glass-shine rounded-[9999px]" />
        <div className="relative z-3 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[12px] font-[700]">
          P
        </div>
      </button>

      {/* Dropdown */}
      <div
        className={[
          "glass-panel absolute right-0 top-[calc(100%+8px)]",
          "w-[180px] p-1.5 overflow-hidden",
        ].join(" ")}
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms ease, transform 200ms var(--transition-apple)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          className="glass-menu-item w-full"
        >
          <span className="[&_svg]:w-[16px] [&_svg]:h-[16px]">
            <Profile size={16} variant="Linear" color="currentColor" />
          </span>
          {t("user.profile")}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="glass-menu-item w-full"
        >
          <span className="[&_svg]:w-[16px] [&_svg]:h-[16px]">
            <Setting2 size={16} variant="Linear" color="currentColor" />
          </span>
          {t("user.settings")}
        </button>
        <div className="h-px bg-black/[0.06] dark:bg-white/[0.08] mx-2 my-1" />
        <button
          onClick={() => { setOpen(false); setShowSignOut(true); }}
          className="glass-menu-item w-full text-red-500"
        >
          <span className="[&_svg]:w-[16px] [&_svg]:h-[16px]">
            <Logout size={16} variant="Linear" color="currentColor" />
          </span>
          {t("user.signout")}
        </button>
      </div>

      {/* ── Sign out confirmation modal (portaled to body) ── */}
      {showSignOut && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ fontFamily: "var(--font-google-sans), system-ui, sans-serif" }}
          onClick={() => setShowSignOut(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[var(--glass-blur-overlay)]" />

          {/* Modal */}
          <div
            className="glass-panel relative w-[320px] p-6 text-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "panelEnter 250ms var(--transition-apple) both",
            }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 dark:bg-red-500/15 flex items-center justify-center">
                <span className="[&_svg]:w-[22px] [&_svg]:h-[22px] text-red-500">
                  <Logout size={22} variant="Linear" color="currentColor" />
                </span>
              </div>
            </div>
            <h3 className="text-[16px] font-[650] text-gray-800 dark:text-gray-100 mb-1.5">
              {t("user.signout.q")}
            </h3>
            <p className="text-[13px] font-[450] text-gray-500 dark:text-gray-400 mb-5">
              {t("user.signout.body")}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSignOut(false)}
                className="flex-1 h-10 rounded-[12px] bg-white/40 hover:bg-white/60 dark:bg-white/10 dark:hover:bg-white/15 text-[13px] font-[550] text-gray-700 dark:text-gray-300 cursor-pointer transition-colors duration-200"
              >
                {t("user.cancel")}
              </button>
              <button
                onClick={() => { setLoggedIn(false); setShowSignOut(false); }}
                className="flex-1 h-10 rounded-[12px] bg-red-500 hover:bg-red-600 text-white text-[13px] font-[550] cursor-pointer transition-colors duration-200"
              >
                {t("user.signout")}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export function PlottaleShell({
  children,
  postModal,
}: {
  children: React.ReactNode;
  postModal: React.ReactNode;
}) {
  const pathname = usePathname();
  const barePath = stripLocale(pathname);
  const { theme, toggleTheme } = useAppearance();
  const isDark = theme === "dark";
  const { isDarkBg } = useBackground();
  const lhref = useLocalizedHref();
  const controlsHidden = useScrollHidden();

  /* Shared transition style for hideable top controls */
  const hideStyle: React.CSSProperties = {
    opacity: controlsHidden ? 0 : 1,
    transform: controlsHidden ? "translateY(-20px)" : "translateY(0)",
    pointerEvents: controlsHidden ? "none" : "auto",
    transition: "opacity 350ms ease, transform 350ms var(--transition-apple)",
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "var(--font-google-sans), system-ui, sans-serif" }}>
      {/* ── Top-left: Logo (always visible) ── */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <Link href={lhref("/")} className="shrink-0">
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-[52px] h-[52px] shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          >
            <path d="M0 16.6667C0 7.46192 7.46192 0 16.6667 0H83.3333C92.5381 0 100 7.46192 100 16.6667V83.3333C100 92.5381 92.5381 100 83.3333 100H16.6667C7.46192 100 0 92.5381 0 83.3333V16.6667Z" fill="#130056"/>
            <path d="M42.8307 63.9736C29.253 63.9736 19.2199 68.7218 19.2199 75.3744C19.2199 79.9639 27.2602 82.0614 34.7385 82.0614C36.2082 82.0614 37.8206 81.0362 38.3437 79.6723L44.3609 63.9693H42.8307V63.9736Z" fill="#FFD000"/>
            <path d="M19.2089 66.6481C24.2256 60.7252 33.4931 59.4819 40.0973 59.4819H51.9076C68.7172 59.4819 77.0984 51.5473 80.1876 42.3089C84.3825 29.7637 75.8507 18.6215 59.9661 18.6215H55.655C45.2861 18.6215 37.2276 21.2031 33.1489 30.8127L18.8949 66.4625C18.6238 67.1446 18.7357 67.205 19.2089 66.6438V66.6481Z" fill="#3700FF"/>
            <path d="M70.3706 26.4568C70.4088 26.3612 70.4231 26.2578 70.4121 26.1555C70.4011 26.0532 70.3651 25.9552 70.3075 25.87C70.2498 25.7848 70.1721 25.7151 70.0812 25.6669C69.9903 25.6187 69.8889 25.5936 69.7861 25.5937C69.2672 25.5955 57.0008 25.7576 43.5717 37.3288C43.4911 37.3932 35.794 43.6302 29.5727 54.9799C29.5311 55.0557 29.5056 55.1393 29.4978 55.2254C29.4899 55.3116 29.4999 55.3984 29.5271 55.4805C29.5543 55.5626 29.5982 55.6382 29.656 55.7026C29.7137 55.767 29.7841 55.8187 29.8628 55.8547C30.5692 56.1592 31.3014 56.4001 32.0505 56.5746L32.4599 56.6754C35.9357 57.4532 42.827 57.886 49.9519 52.0783C50.0525 51.9927 50.1237 51.8776 50.1553 51.7493C50.1869 51.621 50.1772 51.486 50.1278 51.3635C50.0807 51.2405 49.9962 51.1353 49.8861 51.0629C49.7761 50.9905 49.6461 50.9544 49.5144 50.9598C47.8121 51.0038 46.1105 50.8503 44.4436 50.5021C50.0751 49.4456 63.6519 44.9603 70.3706 26.4568Z" fill="white"/>
          </svg>
        </Link>
        {/* Language picker (globe button) — hides on scroll down */}
        <div style={hideStyle}>
          <LanguagePicker isDarkBg={isDarkBg} />
        </div>
      </div>

      {/* ── Top-right controls: theme toggle + user menu — hides on scroll down ── */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2" style={hideStyle}>
        <button
          onClick={toggleTheme}
          className="gel-glass relative flex items-center justify-center w-11 h-11 rounded-[9999px] !overflow-visible cursor-pointer [&_svg]:w-[20px] [&_svg]:h-[20px]"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div className="gel-glass-shine rounded-[inherit]" />
          <span style={{ color: isDarkBg ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)" }}>
            {theme === "dark" ? (
              <Sun1 size={20} variant="Linear" color="currentColor" />
            ) : (
              <Moon size={20} variant="Linear" color="currentColor" />
            )}
          </span>
        </button>
        <UserMenu isDarkBg={isDarkBg} />
      </div>

      {/* ── Floating glass panel nav ── */}
      <nav
        className={[
          "fixed left-4 top-1/2 -translate-y-1/2 z-50",
          "flex flex-col items-start gap-1.5 p-2",
          "rounded-[9999px]",
          "overflow-visible",
          "max-[1024px]:left-1/2 max-[1024px]:-translate-x-1/2",
          "max-[1024px]:top-auto max-[1024px]:bottom-6 max-[1024px]:translate-y-0",
          "max-[1024px]:flex-row max-[1024px]:items-center max-[1024px]:gap-1",
          "max-[1024px]:rounded-[9999px]",
          "max-[1024px]:p-1.5",
        ].join(" ")}
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? barePath === item.href
            : barePath.startsWith(item.href);

          if (item.subMenu && item.menuStyle === "grid") {
            return (
              <GelCircleWithComponentMenu
                key={item.href}
                icon={item.icon}
                label={item.label}
                active={isActive}
                subMenu={item.subMenu}
                isDark={isDark}
              />
            );
          }

          return (
            <GelCircleItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              labelKey={item.labelKey}
              active={isActive}
              isDark={isDark}
            />
          );
        })}
      </nav>

      {/* ── Page content ── */}
      <main className="min-h-screen">{children}{postModal}</main>
    </div>
  );
}
