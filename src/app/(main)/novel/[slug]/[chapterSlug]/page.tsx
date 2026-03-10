"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft2,
  ArrowRight2,
  Setting2,
  Setting3,
  Book1,
  Clock,
  ArrowUp2,
  Minus,
} from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAppearance } from "@/context/AppearanceContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import {
  type PlottaleNovel,
  type PlottaleChapter,
  getNovelBySlug,
  getChaptersByNovelId,
  getChapterByNovelIdAndNumber,
  localize,
} from "@/data/plottale-content";

/* ================================================================== */
/*  READING THEME DEFINITIONS                                          */
/* ================================================================== */

type ThemeKey = "default" | "paper" | "sepia" | "calm" | "night" | "dark" | "focus";
type FontKey = "sans" | "jakarta" | "serif" | "thai";

interface ReadingTheme {
  key: ThemeKey;
  bg: string;
  text: string;
  accent: string;
  muted: string;
  dot: string;
}

const READING_THEMES: ReadingTheme[] = [
  { key: "default", bg: "transparent", text: "inherit", accent: "#f59e0b", muted: "inherit", dot: "#737373" },
  { key: "paper",   bg: "#faf8f0",    text: "#3d3929", accent: "#c2410c", muted: "#8a8270", dot: "#faf8f0" },
  { key: "sepia",   bg: "#f4ecd8",    text: "#4a3f2f", accent: "#b45309", muted: "#8a7d6b", dot: "#f4ecd8" },
  { key: "calm",    bg: "#e8f0e8",    text: "#2d3a2d", accent: "#16a34a", muted: "#6b7c6b", dot: "#e8f0e8" },
  { key: "night",   bg: "#1a1a2e",    text: "#d1d5db", accent: "#818cf8", muted: "#6b7280", dot: "#1a1a2e" },
  { key: "dark",    bg: "#141414",    text: "#e0e0e0", accent: "#f59e0b", muted: "#737373", dot: "#141414" },
  { key: "focus",   bg: "#f5f5f5",    text: "#1f2937", accent: "#6366f1", muted: "#9ca3af", dot: "#f5f5f5" },
];

const FONT_FAMILIES: Record<FontKey, string> = {
  sans:    "'Google Sans', system-ui, -apple-system, sans-serif",
  jakarta: "'Plus Jakarta Sans', system-ui, sans-serif",
  serif:   "Georgia, 'Times New Roman', serif",
  thai:    "'IBM Plex Sans Thai', system-ui, sans-serif",
};

type FontWeightKey = "light" | "regular" | "medium" | "bold";

const FONT_WEIGHTS: Record<FontWeightKey, number> = {
  light:   300,
  regular: 400,
  medium:  500,
  bold:    600,
};

interface ReadingSettings {
  theme: ThemeKey;
  font: FontKey;
  fontSize: number;
  fontWeight: FontWeightKey;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  theme: "default",
  font: "sans",
  fontSize: 20,
  fontWeight: "regular",
};

const LS_KEY = "plottale-reading-settings";

function loadSettings(): ReadingSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(s: ReadingSettings) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

/* ================================================================== */
/*  GLASS STYLE CONSTANT                                               */
/* ================================================================== */

const GLASS_STYLE: React.CSSProperties = {
  borderRadius: "var(--glass-radius-lg)",
  background: "var(--glass-bg)",
  backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
};

/* ================================================================== */
/*  READING PROGRESS BAR                                               */
/* ================================================================== */

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { setProgress(0); return; }
      setProgress(Math.min(100, (window.scrollY / docH) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #f59e0b, #ea580c)",
        }}
      />
    </div>
  );
}

/* ================================================================== */
/*  CHAPTER HERO                                                       */
/* ================================================================== */

function ChapterHero({
  chapter,
  novel,
}: {
  chapter: PlottaleChapter;
  novel: PlottaleNovel;
}) {
  const { t, lang } = useLanguage();
  const heroSrc = chapter.heroImage ?? novel.backdropImage ?? novel.images[1] ?? novel.coverImage;

  return (
    <>
      {/* Fixed hero background — stays in place while paper scrolls over it */}
      <div className="fixed inset-0 w-full h-[50vh] md:h-[60vh] z-0">
        <Image
          src={heroSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Chapter title — positioned at bottom of hero */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
            {/* Chapter badge */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
              style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)", color: "#fff" }}
            >
              {t("pt.novel.chapter")} {chapter.number}
            </span>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              {localize(chapter.title, lang)}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="font-medium text-white/90">{localize(novel.title, lang)}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{localize(novel.author, lang)}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="flex items-center gap-1">
                <Clock size={14} color="#ffffff" />
                {chapter.readingTime} {t("pt.novel.readtime")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer — reserves space in the document flow for the fixed hero */}
      <div className="w-full h-[50vh] md:h-[60vh]" />
    </>
  );
}


/* ================================================================== */
/*  CHAPTER SIDEBAR (desktop only)                                     */
/* ================================================================== */

const SIDEBAR_POS_KEY = "plottale-sidebar-pos-v4";

function ChapterSidebar({
  novel,
  chapters,
  currentNumber,
  settings,
  onSettingsChange,
}: {
  novel: PlottaleNovel;
  chapters: PlottaleChapter[];
  currentNumber: number;
  settings: ReadingSettings;
  onSettingsChange: (s: ReadingSettings) => void;
}) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const [tab, setTab] = useState<"contents" | "settings">("contents");
  const [panelOpen, setPanelOpen] = useState(false);
  const [chaptersExpanded, setChaptersExpanded] = useState(true);

  /* ── Shared refs ── */
  const iconSize = 48;
  const edgeGap = 48;
  const panelW = 270;
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const rafId = useRef(0);
  const elRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Icon position (used when panel is closed) ── */
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  /* ── Panel position (independent, used when panel is open) ── */
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);

  /* Load saved icon position — default to bottom-right with gap */
  useEffect(() => {
    const defaultPos = { x: window.innerWidth - iconSize - edgeGap, y: window.innerHeight - iconSize - edgeGap };
    try {
      const raw = localStorage.getItem(SIDEBAR_POS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setPos({
          x: Math.max(edgeGap, Math.min(saved.x, window.innerWidth - iconSize - edgeGap)),
          y: Math.max(edgeGap, Math.min(saved.y, window.innerHeight - iconSize - edgeGap)),
        });
      } else {
        setPos(defaultPos);
      }
    } catch {
      setPos(defaultPos);
    }
  }, []);

  /* Clamp helper — keep icon fully within viewport with gap */
  const clampIcon = useCallback((x: number, y: number) => ({
    x: Math.max(edgeGap, Math.min(x, window.innerWidth - iconSize - edgeGap)),
    y: Math.max(edgeGap, Math.min(y, window.innerHeight - iconSize - edgeGap)),
  }), []);

  /* Clamp helper — keep panel within viewport */
  const clampPanel = useCallback((x: number, y: number) => {
    const gap = 8;
    return {
      x: Math.max(gap, Math.min(x, window.innerWidth - panelW - gap)),
      y: Math.max(gap, Math.min(y, window.innerHeight - gap)),
    };
  }, []);

  /* ── Icon pointer handlers ── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!pos) return;
    dragging.current = true;
    dragMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const next = clampIcon(dragStart.current.posX + dx, dragStart.current.posY + dy);
      setPos(next);
    });
  }, [clampIcon]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setPos((p) => {
      if (p) try { localStorage.setItem(SIDEBAR_POS_KEY, JSON.stringify(p)); } catch { /* */ }
      return p;
    });
    if (!dragMoved.current) setPanelOpen((o) => !o);
  }, []);

  /* ── Panel drag handlers (moves panelPos directly) ── */
  const onPanelPointerDown = useCallback((e: React.PointerEvent) => {
    if (!panelPos) return;
    dragging.current = true;
    dragMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, posX: panelPos.x, posY: panelPos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [panelPos]);

  const onPanelPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const next = clampPanel(dragStart.current.posX + dx, dragStart.current.posY + dy);
      setPanelPos(next);
    });
  }, [clampPanel]);

  const onPanelPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
  }, []);

  /* ── Calculate initial panel position when opening ── */
  useEffect(() => {
    if (!panelOpen || !pos) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 16;
    const estH = panelRef.current?.offsetHeight || 420;

    const iconCenterX = pos.x + iconSize / 2;
    const iconCenterY = pos.y + iconSize / 2;

    let left: number;
    if (iconCenterX > vw / 2) {
      left = vw - panelW - gap;
    } else {
      left = pos.x + iconSize + 8;
      if (left + panelW + gap > vw) left = vw - panelW - gap;
    }
    if (left < gap) left = gap;

    let top: number;
    if (iconCenterY > vh / 2) {
      top = vh - estH - gap;
    } else {
      top = pos.y;
    }
    if (top < gap) top = gap;

    setPanelPos({ x: left, y: top });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelOpen]);

  /* ── Panel style from panelPos ── */
  const panelStyle: React.CSSProperties = panelPos
    ? { position: "fixed", top: panelPos.y, left: panelPos.x, width: panelW, zIndex: 41 }
    : { display: "none" };

  if (!pos) return null;

  return (
    <>
      {/* ── Bounce animation keyframes ── */}
      <style>{`
        @keyframes sidebarBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* ── Floating icon (hidden when panel is open) ── */}
      {!panelOpen && (
        <div
          ref={elRef}
          className="flex fixed z-40 items-center justify-center w-12 h-12 rounded-full cursor-grab active:cursor-grabbing select-none hover:scale-105"
          style={{
            top: pos.y,
            left: pos.x,
            ...GLASS_STYLE,
            borderRadius: "50%",
            boxShadow: "var(--glass-shadow-elevated)",
            touchAction: "none",
            transition: dragging.current ? "none" : "top 0.3s ease, left 0.3s ease",
            animation: "sidebarBounce 3s ease-in-out infinite",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <Setting3
            size={22}
            color="currentColor"
            variant="Bulk"
            className="text-neutral-600 dark:text-neutral-300"
          />
        </div>
      )}

      {/* ── Expanded panel ── */}
      {panelOpen && (
        <div
          ref={panelRef}
          className="block overflow-visible"
          style={{ ...panelStyle, ...GLASS_STYLE, boxShadow: "var(--glass-shadow-elevated)" }}
        >
          {/* Drag handle — entire top bar is draggable */}
          <div
            className="flex justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: "none" }}
            onPointerDown={onPanelPointerDown}
            onPointerMove={onPanelPointerMove}
            onPointerUp={onPanelPointerUp}
          >
            <div className="w-10 h-1.5 rounded-full bg-neutral-300/60 dark:bg-white/20" />
          </div>

          <div className="px-5 pb-5">
            {/* Header — tabs + minimize */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-1 rounded-lg bg-neutral-100/70 dark:bg-white/8 p-0.5">
                <button
                  onClick={() => setTab("contents")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    tab === "contents"
                      ? "bg-white dark:bg-white/15 text-neutral-800 dark:text-white shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  {t("pt.reader.contents")}
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    tab === "settings"
                      ? "bg-white dark:bg-white/15 text-neutral-800 dark:text-white shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  {t("pt.reader.settingsLabel")}
                </button>
              </div>
              <button
                onClick={() => {
                  setPanelOpen(false);
                  /* Snap icon back to bottom-right with gap */
                  const bottomRight = { x: window.innerWidth - iconSize - 48, y: window.innerHeight - iconSize - 48 };
                  setPos(bottomRight);
                  try { localStorage.setItem(SIDEBAR_POS_KEY, JSON.stringify(bottomRight)); } catch { /* */ }
                }}
                className="p-1.5 rounded-full bg-neutral-100/70 dark:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/70 dark:hover:bg-white/15 transition-all cursor-pointer"
                title={t("pt.reader.collapse")}
              >
                <Minus size={16} color="currentColor" />
              </button>
            </div>

            {/* ── Contents tab ── */}
            {tab === "contents" && (
              <>
                {/* Progress dots */}
                <div className="flex gap-1.5 flex-wrap">
                  {chapters.map((ch) => (
                    <Link
                      key={ch.id}
                      href={lhref(`/novel/${novel.slug}/chapter-${ch.number}`)}
                      className="block w-3 h-3 rounded-full transition-all hover:scale-125"
                      style={{
                        background:
                          ch.number === currentNumber
                            ? "linear-gradient(135deg, #f59e0b, #ea580c)"
                            : "rgba(150,150,150,0.3)",
                        boxShadow:
                          ch.number === currentNumber
                            ? "0 0 8px rgba(245,158,11,0.5)"
                            : "none",
                      }}
                      title={localize(ch.title, lang)}
                    />
                  ))}
                </div>

                {/* Novel name */}
                <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mt-2.5 truncate">
                  {localize(novel.title, lang)}
                </p>

                {/* Chapter subtitle */}
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {t("pt.reader.chapterOf")
                    .replace("{n}", String(currentNumber))
                    .replace("{total}", String(chapters.length))}
                </p>

                {/* Chapter list (collapsible) */}
                <div
                  className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ maxHeight: chaptersExpanded ? `${chapters.length * 52}px` : "0px", opacity: chaptersExpanded ? 1 : 0 }}
                >
                  <div className="mt-3 pt-3 space-y-0.5">
                    {chapters.map((ch) => {
                      const isActive = ch.number === currentNumber;
                      return (
                        <Link
                          key={ch.id}
                          href={lhref(`/novel/${novel.slug}/chapter-${ch.number}`)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-white/5"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isActive
                                ? "text-white"
                                : "bg-neutral-200/60 dark:bg-white/10 text-neutral-500 dark:text-neutral-400"
                            }`}
                            style={
                              isActive
                                ? { background: "linear-gradient(135deg, #f59e0b, #ea580c)" }
                                : undefined
                            }
                          >
                            {ch.number}
                          </span>
                          <span className="truncate">{localize(ch.title, lang)}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Expand / Collapse toggle */}
                <button
                  onClick={() => setChaptersExpanded(!chaptersExpanded)}
                  className="flex items-center justify-center gap-1.5 w-full mt-3 pt-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  <span>{chaptersExpanded ? t("pt.reader.collapse") : t("pt.reader.showAll")}</span>
                  <ArrowRight2
                    size={12}
                    color="currentColor"
                    className={`transition-transform duration-300 ${chaptersExpanded ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
              </>
            )}

            {/* ── Settings tab ── */}
            {tab === "settings" && (
              <div className="space-y-5">
                {/* Font size */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                    {t("pt.reader.fontSize")}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400" style={{ fontFamily: FONT_FAMILIES[settings.font] }}>Aa</span>
                    <input
                      type="range"
                      min={14}
                      max={28}
                      step={2}
                      value={settings.fontSize}
                      onChange={(e) => onSettingsChange({ ...settings, fontSize: Number(e.target.value) })}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(90deg, #f59e0b ${((settings.fontSize - 14) / 14) * 100}%, rgba(150,150,150,0.3) ${((settings.fontSize - 14) / 14) * 100}%)`,
                      }}
                    />
                    <span className="text-base font-bold text-neutral-400" style={{ fontFamily: FONT_FAMILIES[settings.font] }}>Aa</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1.5 text-center">
                    {settings.fontSize}px
                  </p>
                </div>

                {/* Font weight */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                    {t("pt.reader.fontWeight")}
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {(Object.keys(FONT_WEIGHTS) as FontWeightKey[]).map((wk) => (
                      <button
                        key={wk}
                        onClick={() => onSettingsChange({ ...settings, fontWeight: wk })}
                        className={`py-1.5 text-[11px] transition-all cursor-pointer text-center rounded-md ${
                          settings.fontWeight === wk
                            ? "text-white dark:text-neutral-900 bg-neutral-800 dark:bg-white"
                            : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-white/10"
                        }`}
                        style={{ fontWeight: FONT_WEIGHTS[wk] }}
                      >
                        {t(`pt.reader.weight.${wk}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background / Theme */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                    {t("pt.reader.theme")}
                  </label>
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {READING_THEMES.map((th) => {
                      const isActive = settings.theme === th.key;
                      const circleBg = th.key === "default" ? "#ffffff" : th.bg;
                      const isDark = th.key === "night" || th.key === "dark";
                      return (
                        <button
                          key={th.key}
                          onClick={() => onSettingsChange({ ...settings, theme: th.key })}
                          className="relative w-10 h-10 rounded-full transition-all cursor-pointer hover:scale-110"
                          style={{
                            background: circleBg,
                            border: isActive
                              ? "2.5px solid #f59e0b"
                              : isDark
                                ? "1.5px solid rgba(255,255,255,0.15)"
                                : "1.5px solid rgba(0,0,0,0.1)",
                            boxShadow: isActive ? "0 0 0 2px rgba(245,158,11,0.25)" : "none",
                          }}
                          title={t(`pt.reader.theme.${th.key}`)}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Font family */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                    {t("pt.reader.fontFamily")}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(Object.keys(FONT_FAMILIES) as FontKey[]).map((fk) => (
                      <button
                        key={fk}
                        onClick={() => onSettingsChange({ ...settings, font: fk })}
                        className={`py-2.5 px-3 text-[13px] transition-all cursor-pointer text-center ${
                          settings.font === fk
                            ? "font-bold text-white dark:text-neutral-900 bg-neutral-800 dark:bg-white"
                            : "font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-white/10"
                        }`}
                        style={{
                          fontFamily: FONT_FAMILIES[fk],
                          borderRadius: "var(--glass-radius, 12px)",
                        }}
                      >
                        {t(`pt.reader.font.${fk}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => onSettingsChange(DEFAULT_SETTINGS)}
                  className="w-full pt-3 mt-1 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer border-t border-neutral-200/50 dark:border-white/8"
                >
                  {t("pt.reader.reset")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ================================================================== */
/*  CHAPTER BODY (content area)                                        */
/* ================================================================== */

function ChapterBody({
  chapter,
  settings,
}: {
  chapter: PlottaleChapter;
  settings: ReadingSettings;
}) {
  const { lang } = useLanguage();
  const theme = READING_THEMES.find((t) => t.key === settings.theme) ?? READING_THEMES[0];
  const fontFamily = FONT_FAMILIES[settings.font] ?? FONT_FAMILIES.jakarta;
  const fontWeight = FONT_WEIGHTS[settings.fontWeight] ?? FONT_WEIGHTS.regular;

  const paragraphs = localize(chapter.content, lang).split("\n\n").filter(Boolean);
  const epigraph = chapter.epigraph ? localize(chapter.epigraph, lang) : null;

  const isCustomTheme = settings.theme !== "default";

  return (
    <div className="flex-1 min-w-0 transition-colors duration-300">
      <article
        className="max-w-[680px] xl:max-w-[780px] 2xl:max-w-[880px] mx-auto"
        style={{
          fontFamily,
          fontSize: settings.fontSize,
          fontWeight,
          lineHeight: 1.9,
          color: isCustomTheme ? theme.text : undefined,
        }}
      >
        {/* Epigraph */}
        {epigraph && (
          <blockquote
            className="mb-10 pl-5 italic"
            style={{
              borderLeft: `3px solid ${theme.accent}`,
              color: isCustomTheme ? theme.muted : "rgba(120,120,120,0.9)",
              fontSize: settings.fontSize - 2,
            }}
          >
            {epigraph}
          </blockquote>
        )}

        {/* Body paragraphs */}
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`mb-6 leading-relaxed ${i === 0 ? "first-letter:text-[3.2em] first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8]" : ""}`}
            style={
              i === 0
                ? { ["--tw-first-letter-color" as string]: theme.accent }
                : undefined
            }
          >
            {p}
          </p>
        ))}
      </article>
    </div>
  );
}

/* ================================================================== */
/*  CHAPTER NAV FOOTER                                                 */
/* ================================================================== */

function ChapterNavFooter({
  novel,
  chapters,
  currentNumber,
  theme,
  isCustomTheme,
}: {
  novel: PlottaleNovel;
  chapters: PlottaleChapter[];
  currentNumber: number;
  theme: ReadingTheme;
  isCustomTheme: boolean;
}) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();

  const prev = chapters.find((ch) => ch.number === currentNumber - 1);
  const next = chapters.find((ch) => ch.number === currentNumber + 1);

  /* Theme-aware border & text colors */
  const borderColor = isCustomTheme ? `color-mix(in srgb, ${theme.text} 15%, transparent)` : undefined;
  const emptyBorderColor = isCustomTheme ? `color-mix(in srgb, ${theme.text} 10%, transparent)` : undefined;
  const emptyBg = isCustomTheme ? `color-mix(in srgb, ${theme.text} 4%, transparent)` : undefined;
  const mutedColor = isCustomTheme ? theme.muted : undefined;
  const textColor = isCustomTheme ? theme.text : undefined;
  const accentColor = theme.accent;

  const cardStyle: React.CSSProperties = isCustomTheme
    ? { borderColor: borderColor }
    : {};

  const emptyStyle: React.CSSProperties = isCustomTheme
    ? { borderColor: emptyBorderColor, background: emptyBg }
    : {};

  return (
    <nav className="max-w-[680px] xl:max-w-[780px] 2xl:max-w-[880px] mx-auto mt-12 mb-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Previous */}
        {prev ? (
          <Link
            href={lhref(`/novel/${novel.slug}/chapter-${prev.number}`)}
            className={`group p-4 rounded-lg border transition-all ${isCustomTheme ? "" : "border-neutral-300 dark:border-white/20 hover:bg-neutral-50 dark:hover:bg-white/5"}`}
            style={cardStyle}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ${isCustomTheme ? "" : "text-neutral-400 dark:text-neutral-500"}`}
              style={mutedColor ? { color: mutedColor } : undefined}
            >
              <ArrowLeft2 size={14} color="currentColor" />
              {t("pt.reader.prevChapter")}
            </span>
            <p
              className={`text-sm font-semibold transition-colors ${isCustomTheme ? "" : "text-neutral-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400"}`}
              style={textColor ? { color: textColor } : undefined}
            >
              {localize(prev.title, lang)}
            </p>
          </Link>
        ) : (
          <div
            className={`hidden sm:block p-4 rounded-lg border ${isCustomTheme ? "" : "border-neutral-200 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.04]"}`}
            style={emptyStyle}
          />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={lhref(`/novel/${novel.slug}/chapter-${next.number}`)}
            className={`group p-4 rounded-lg border text-right transition-all ${isCustomTheme ? "" : "border-neutral-300 dark:border-white/20 hover:bg-neutral-50 dark:hover:bg-white/5"}`}
            style={cardStyle}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider flex items-center justify-end gap-1.5 mb-1.5 ${isCustomTheme ? "" : "text-neutral-400 dark:text-neutral-500"}`}
              style={mutedColor ? { color: mutedColor } : undefined}
            >
              {t("pt.reader.nextChapter")}
              <ArrowRight2 size={14} color="currentColor" />
            </span>
            <p
              className={`text-sm font-semibold transition-colors ${isCustomTheme ? "" : "text-neutral-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400"}`}
              style={textColor ? { color: textColor } : undefined}
            >
              {localize(next.title, lang)}
            </p>
          </Link>
        ) : (
          <div
            className={`hidden sm:block p-4 rounded-lg border ${isCustomTheme ? "" : "border-neutral-200 dark:border-white/10 bg-neutral-100/60 dark:bg-white/[0.04]"}`}
            style={emptyStyle}
          />
        )}
      </div>

      {/* Back to novel */}
      <Link
        href={lhref(`/novel/${novel.slug}`)}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg border text-sm font-medium transition-all ${isCustomTheme ? "" : "border-neutral-300 dark:border-white/20 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 hover:text-amber-600 dark:hover:text-amber-400"}`}
        style={isCustomTheme ? { borderColor: borderColor, color: mutedColor } : undefined}
      >
        <Book1 size={16} color="currentColor" />
        {t("pt.reader.backToNovel")}
      </Link>
    </nav>
  );
}

/* ================================================================== */
/*  READING SETTINGS PANEL (slide-up)                                  */
/* ================================================================== */

function ReadingSettingsPanel({
  open,
  settings,
  onChange,
}: {
  open: boolean;
  settings: ReadingSettings;
  onChange: (s: ReadingSettings) => void;
}) {
  const { t } = useLanguage();

  const updateTheme = (theme: ThemeKey) => onChange({ ...settings, theme });
  const updateFont = (font: FontKey) => onChange({ ...settings, font });
  const updateSize = (fontSize: number) => onChange({ ...settings, fontSize });

  return (
    <div
      className="fixed bottom-[56px] left-0 right-0 z-[52] transition-all duration-300 pointer-events-none"
      style={{
        transform: open ? "translateY(0)" : "translateY(100%)",
        opacity: open ? 1 : 0,
      }}
    >
      <div
        className="max-w-lg mx-auto mx-4 md:mx-auto p-5 pointer-events-auto"
        style={{
          ...GLASS_STYLE,
          borderRadius: "20px 20px 0 0",
          background: "rgba(var(--glass-bg-rgb, 255,255,255), 0.92)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        }}
      >
        {/* Theme row */}
        <div className="mb-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
            {t("pt.reader.theme")}
          </label>
          <div className="flex gap-2 flex-wrap">
            {READING_THEMES.map((th) => (
              <button
                key={th.key}
                onClick={() => updateTheme(th.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  settings.theme === th.key
                    ? "ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-neutral-900"
                    : "hover:bg-neutral-100/50 dark:hover:bg-white/10"
                }`}
                style={{
                  background: th.key === "default" ? undefined : th.bg,
                  color: th.key === "default" ? undefined : th.text,
                }}
              >
                {t(`pt.reader.theme.${th.key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Font row */}
        <div className="mb-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
            {t("pt.reader.fontFamily")}
          </label>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(FONT_FAMILIES) as FontKey[]).map((fk) => (
              <button
                key={fk}
                onClick={() => updateFont(fk)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  settings.font === fk
                    ? "ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-neutral-900"
                    : "hover:bg-neutral-100/50 dark:hover:bg-white/10"
                }`}
                style={{ fontFamily: FONT_FAMILIES[fk] }}
              >
                {t(`pt.reader.font.${fk}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Font size slider */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
            {t("pt.reader.fontSize")} — {settings.fontSize}px
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">A</span>
            <input
              type="range"
              min={14}
              max={28}
              step={2}
              value={settings.fontSize}
              onChange={(e) => updateSize(Number(e.target.value))}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #f59e0b ${((settings.fontSize - 14) / 14) * 100}%, rgba(150,150,150,0.3) ${((settings.fontSize - 14) / 14) * 100}%)`,
              }}
            />
            <span className="text-base text-neutral-400 font-bold">A</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  READING SETTINGS BAR (fixed bottom)                                */
/* ================================================================== */

function ReadingSettingsBar({
  chapter,
  chapters,
  novel,
  settingsOpen,
  onToggleSettings,
  onToggleContents,
}: {
  chapter: PlottaleChapter;
  chapters: PlottaleChapter[];
  novel: PlottaleNovel;
  settingsOpen: boolean;
  onToggleSettings: () => void;
  onToggleContents: () => void;
}) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();

  const prev = chapters.find((ch) => ch.number === chapter.number - 1);
  const next = chapters.find((ch) => ch.number === chapter.number + 1);

  // Auto-hide on scroll down (desktop only)
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Always show on mobile
      if (window.innerWidth < 1024) { setVisible(true); return; }
      setVisible(y < lastY.current || y < 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[55] transition-transform duration-300 lg:hidden"
      style={{ transform: visible || settingsOpen ? "translateY(0)" : "translateY(100%)" }}
    >
      <div
        className="flex items-center justify-between px-4 md:px-6 h-14"
        style={{
          background: "rgba(var(--glass-bg-rgb, 255,255,255), 0.85)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        {/* Left — Contents */}
        <button
          onClick={onToggleContents}
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer lg:hidden"
        >
          <Book1 size={18} color="currentColor" />
          <span className="hidden sm:inline">{t("pt.reader.contents")}</span>
        </button>

        {/* Center — Chapter title */}
        <div className="flex-1 text-center truncate px-3">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {t("pt.novel.chapter")} {chapter.number} · {localize(chapter.title, lang)}
          </span>
        </div>

        {/* Right — Nav + Settings */}
        <div className="flex items-center gap-1">
          {prev ? (
            <Link
              href={lhref(`/novel/${novel.slug}/chapter-${prev.number}`)}
              className="p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowLeft2 size={18} color="currentColor" />
            </Link>
          ) : (
            <span className="p-2 opacity-30">
              <ArrowLeft2 size={18} color="currentColor" />
            </span>
          )}
          {next ? (
            <Link
              href={lhref(`/novel/${novel.slug}/chapter-${next.number}`)}
              className="p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowRight2 size={18} color="currentColor" />
            </Link>
          ) : (
            <span className="p-2 opacity-30">
              <ArrowRight2 size={18} color="currentColor" />
            </span>
          )}
          <button
            onClick={onToggleSettings}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              settingsOpen
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                : "hover:bg-neutral-100/50 dark:hover:bg-white/10"
            }`}
          >
            <Setting2 size={18} color="currentColor" variant={settingsOpen ? "Bold" : "Linear"} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MOBILE CONTENTS SHEET                                              */
/* ================================================================== */

function MobileContentsSheet({
  open,
  onClose,
  novel,
  chapters,
  currentNumber,
}: {
  open: boolean;
  onClose: () => void;
  novel: PlottaleNovel;
  chapters: PlottaleChapter[];
  currentNumber: number;
}) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto p-6 animate-slide-up"
        style={{
          ...GLASS_STYLE,
          borderRadius: "24px 24px 0 0",
          background: "rgba(var(--glass-bg-rgb, 255,255,255), 0.95)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto mb-5" />

        <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4">
          {t("pt.reader.contents")}
        </h3>

        <div className="space-y-1">
          {chapters.map((ch) => {
            const isActive = ch.number === currentNumber;
            return (
              <Link
                key={ch.id}
                href={lhref(`/novel/${novel.slug}/chapter-${ch.number}`)}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-white/5"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isActive ? "text-white" : "bg-neutral-200/60 dark:bg-white/10"
                  }`}
                  style={isActive ? { background: "linear-gradient(135deg, #f59e0b, #ea580c)" } : undefined}
                >
                  {ch.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate">{localize(ch.title, lang)}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {ch.readingTime} {t("pt.novel.readtime")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.35s cubic-bezier(0.32, 0.72, 0, 1) both;
        }
      `}</style>
    </div>
  );
}

/* ================================================================== */
/*  SCROLL-TO-TOP BUTTON                                               */
/* ================================================================== */

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-5 z-[50] w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
      style={{
        background: "rgba(var(--glass-bg-rgb, 255,255,255), 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
      <ArrowUp2 size={18} color="currentColor" />
    </button>
  );
}

/* ================================================================== */
/*  NOT FOUND                                                          */
/* ================================================================== */

function ReaderNotFound() {
  const { t } = useLanguage();
  const lhref = useLocalizedHref();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-white mb-3">
        {t("pt.reader.notfound")}
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6" style={{ maxWidth: "448px" }}>
        {t("pt.reader.notfound.desc")}
      </p>
      <Link
        href={lhref("/")}
        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors"
      >
        {t("pt.novel.backfeed")}
      </Link>
    </div>
  );
}

/* ================================================================== */
/*  PAGE — DEFAULT EXPORT                                              */
/* ================================================================== */

export default function ChapterReadingPage() {
  const { t, lang } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  const chapterSlug = params.chapterSlug as string;

  // Parse chapter number from slug: "chapter-3" → 3
  const chapterMatch = chapterSlug?.match(/^chapter-(\d+)$/);
  const chapterNumber = chapterMatch ? parseInt(chapterMatch[1], 10) : NaN;

  const novel = getNovelBySlug(slug);
  const chapters = novel ? getChaptersByNovelId(novel.id) : [];
  const chapter = novel && !isNaN(chapterNumber)
    ? getChapterByNovelIdAndNumber(novel.id, chapterNumber)
    : undefined;

  // Reading settings
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);


  // Load settings from localStorage
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const updateSettings = useCallback((s: ReadingSettings) => {
    setSettings(s);
    saveSettings(s);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowLeft" && chapter) {
        const prev = chapters.find((ch) => ch.number === chapter.number - 1);
        if (prev) {
          window.location.href = `/novel/${slug}/chapter-${prev.number}`;
        }
      } else if (e.key === "ArrowRight" && chapter) {
        const next = chapters.find((ch) => ch.number === chapter.number + 1);
        if (next) {
          window.location.href = `/novel/${slug}/chapter-${next.number}`;
        }
      } else if (e.key === "Escape") {
        if (settingsOpen) setSettingsOpen(false);
        else if (contentsOpen) setContentsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapter, chapters, slug, settingsOpen, contentsOpen]);

  // Close settings when clicking outside
  useEffect(() => {
    if (!settingsOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-settings-panel]") && !target.closest("[data-settings-toggle]")) {
        setSettingsOpen(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [settingsOpen]);

  // Scroll to top on chapter change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterNumber]);


  if (!novel || !chapter) return <ReaderNotFound />;

  const { transparency } = useAppearance();
  const activeTheme = READING_THEMES.find((t) => t.key === settings.theme) ?? READING_THEMES[0];
  const isCustomTheme = settings.theme !== "default";

  /* Paper bg — blend reading-theme color with Appearance transparency.
     For "default" theme, use the glass CSS variable directly.
     For custom themes, convert their hex bg to rgba with the transparency value. */
  const paperBg = (() => {
    if (!isCustomTheme) return "var(--glass-bg)";
    const hex = activeTheme.bg;
    // Parse hex → rgb
    const match = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (!match) return hex; // fallback to solid if not a hex
    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${transparency})`;
  })();

  return (
    <div className="min-h-screen pb-16">
      {/* Progress bar */}
      <ReadingProgressBar />

      {/* Hero */}
      <ChapterHero chapter={chapter} novel={novel} />

      {/* Paper card — overlaps hero, respects Appearance transparency + shadow */}
      <div
        className="relative z-10 -mt-16 md:-mt-24 mx-3 md:mx-auto md:max-w-[720px] lg:max-w-[850px] xl:max-w-[960px] 2xl:max-w-[1200px] px-5 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-10 md:pt-14 pb-10 transition-colors duration-300"
        style={{
          borderRadius: "var(--glass-radius)",
          backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow-elevated)",
          background: paperBg,
        }}
      >
        <ChapterBody chapter={chapter} settings={settings} />
        <ChapterNavFooter novel={novel} chapters={chapters} currentNumber={chapter.number} theme={activeTheme} isCustomTheme={isCustomTheme} />
      </div>

      {/* Floating sidebar (desktop, outside main container) */}
      <ChapterSidebar
        novel={novel}
        chapters={chapters}
        currentNumber={chapter.number}
        settings={settings}
        onSettingsChange={updateSettings}
      />

      {/* Bottom bar */}
      <ReadingSettingsBar
        chapter={chapter}
        chapters={chapters}
        novel={novel}
        settingsOpen={settingsOpen}
        onToggleSettings={() => setSettingsOpen(!settingsOpen)}
        onToggleContents={() => setContentsOpen(!contentsOpen)}
      />

      {/* Settings panel (mobile/md only, slides from bottom bar) */}
      <div data-settings-panel className="lg:hidden">
        <ReadingSettingsPanel
          open={settingsOpen}
          settings={settings}
          onChange={updateSettings}
        />
      </div>

      {/* Mobile contents sheet */}
      <MobileContentsSheet
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        novel={novel}
        chapters={chapters}
        currentNumber={chapter.number}
      />

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Drop cap + reading mode styles */}
      <style>{`
        article p:first-of-type::first-letter {
          color: inherit;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
