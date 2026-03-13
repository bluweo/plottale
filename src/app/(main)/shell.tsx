"use client";

import { useRef, useState, useEffect } from "react";
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
} from "iconsax-react";
import Image from "next/image";
import { useAppearance } from "@/context/AppearanceContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { isLocale } from "@/lib/i18n";

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
}: {
  href: string;
  icon: IconComponent;
  label: string;
  labelKey: string;
  active: boolean;
}) {
  const lhref = useLocalizedHref();

  return (
    <Link
      href={lhref(href)}
      className={[
        "relative flex items-center justify-center w-14 h-14 rounded-[9999px] overflow-hidden",
        "hover:scale-105",
        "transition-all duration-300 ease-[var(--transition-apple)]",
        "max-[1024px]:w-12 max-[1024px]:h-12",
      ].join(" ")}
      style={{
        background: active
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.12)",
        border: active
          ? "1px solid rgba(255, 255, 255, 0.9)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: active
          ? "0 2px 12px rgba(0,0,0,0.15)"
          : "none",
      }}
    >
      <span
        className="relative z-3 flex items-center justify-center [&_svg]:w-[22px] [&_svg]:h-[22px] max-[1024px]:[&_svg]:w-[18px] max-[1024px]:[&_svg]:h-[18px]"
        style={{ color: active ? "#1a1a1a" : "rgba(255, 255, 255, 0.85)" }}
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
}: {
  icon: IconComponent;
  label: string;
  active: boolean;
  subMenu: SubMenuItem[];
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
      {/* ── Glass circle (stays circle, no expand) ── */}
      <div
        className={[
          "relative flex items-center justify-center w-14 h-14 rounded-[9999px] overflow-hidden cursor-pointer",
          "hover:scale-105",
          "transition-all duration-300 ease-[var(--transition-apple)]",
          "max-[1024px]:h-12 max-[1024px]:w-12",
        ].join(" ")}
        style={{
          background: active
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.12)",
          border: active
            ? "1px solid rgba(255, 255, 255, 0.9)"
            : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: active
            ? "0 2px 12px rgba(0,0,0,0.15)"
            : "none",
        }}
      >
        <span
          className="relative z-3 flex items-center justify-center [&_svg]:w-[22px] [&_svg]:h-[22px]"
          style={{ color: active ? "#1a1a1a" : "rgba(255, 255, 255, 0.85)" }}
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
/*  User Menu (Login / Avatar + Dropdown)                              */
/* ------------------------------------------------------------------ */

function UserMenu() {
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
          "text-[#1a1a2e] dark:text-white cursor-pointer",
        ].join(" ")}
        style={{
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
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md" />

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
  const { lang, setLang } = useLanguage();
  const lhref = useLocalizedHref();

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "var(--font-google-sans), system-ui, sans-serif" }}>
      {/* ── Top-left: Logo + Language switcher ── */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <Link href={lhref("/")} className="shrink-0">
          <Image
            src="/resources/plottale-logo.svg"
            alt="Plottale"
            width={52}
            height={52}
            className="w-[52px] h-[52px] shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          />
        </Link>
        {/* Language toggle pill */}
        <div className="flex items-center h-9 rounded-full bg-black/10 dark:bg-black/30 backdrop-blur-md border border-white/25 dark:border-white/[0.08] overflow-hidden max-[1024px]:hidden">
          <button
            onClick={() => setLang("th")}
            className={[
              "h-full px-3 text-[11px] font-[600] transition-all duration-200 cursor-pointer",
              lang === "th"
                ? "bg-white/60 dark:bg-white/20 text-gray-800 dark:text-white"
                : "text-white/90 hover:text-white dark:text-white/50 dark:hover:text-white/70",
            ].join(" ")}
          >
            TH
          </button>
          <div className="w-px h-3.5 bg-white/20 dark:bg-white/[0.1]" />
          <button
            onClick={() => setLang("en")}
            className={[
              "h-full px-3 text-[11px] font-[600] transition-all duration-200 cursor-pointer",
              lang === "en"
                ? "bg-white/60 dark:bg-white/20 text-gray-800 dark:text-white"
                : "text-white/90 hover:text-white dark:text-white/50 dark:hover:text-white/70",
            ].join(" ")}
          >
            EN
          </button>
        </div>
      </div>

      {/* ── Top-right controls: theme toggle then user menu ── */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="gel-glass relative flex items-center justify-center w-11 h-11 rounded-[9999px] !overflow-visible cursor-pointer [&_svg]:w-[20px] [&_svg]:h-[20px]"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div className="gel-glass-shine rounded-[inherit]" />
          {theme === "dark" ? (
            <Sun1 size={20} variant="Linear" color="#ffffff" />
          ) : (
            <Moon size={20} variant="Linear" color="#1a1a2e" />
          )}
        </button>
        <UserMenu />
      </div>

      {/* ── Floating glass panel nav ── */}
      <nav
        className={[
          "fixed left-4 top-1/2 -translate-y-1/2 z-50",
          "flex flex-col items-start gap-1.5 p-2",
          "rounded-[9999px]",
          "overflow-visible",
          "hover:!scale-100 hover:!translate-y-[-50%]",
          "max-[1024px]:left-1/2 max-[1024px]:-translate-x-1/2",
          "max-[1024px]:top-auto max-[1024px]:bottom-6 max-[1024px]:translate-y-0",
          "max-[1024px]:hover:!translate-y-0 max-[1024px]:hover:!translate-x-[-50%]",
          "max-[1024px]:flex-row max-[1024px]:items-center max-[1024px]:gap-1",
          "max-[1024px]:rounded-[9999px]",
          "max-[1024px]:p-1.5",
        ].join(" ")}
        style={{
          background: "rgba(60, 60, 60, 0.45)",
          backdropFilter: "blur(40px) saturate(1.6)",
          WebkitBackdropFilter: "blur(40px) saturate(1.6)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
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
            />
          );
        })}
      </nav>

      {/* ── Page content ── */}
      <main className="min-h-screen">{children}{postModal}</main>
    </div>
  );
}
