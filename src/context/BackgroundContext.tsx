"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BgType = "image" | "video" | "color";

export interface BgOption {
  id: string;
  src: string;
  label: string;
  type?: BgType;
  theme?: "light" | "dark";
}

/* ------------------------------------------------------------------ */
/*  CSS color/pattern background presets                               */
/* ------------------------------------------------------------------ */

export interface ColorBgPreset {
  id: string;
  label: string;
  style: React.CSSProperties;
  theme?: "light" | "dark";
}

export const COLOR_BACKGROUNDS: ColorBgPreset[] = [
  /* ── Light theme ── */
  {
    id: "dot-grid",
    label: "Dot Grid",
    theme: "light",
    style: {
      backgroundColor: "#ffffff",
      backgroundImage:
        "radial-gradient(circle, #d0d0d0 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
  {
    id: "plus-grid",
    label: "Plus Grid",
    theme: "light",
    style: {
      backgroundColor: "#ffffff",
      backgroundImage:
        "linear-gradient(#e8e6d8 1px, transparent 1px), linear-gradient(90deg, #e8e6d8 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    },
  },
  {
    id: "cross-grid",
    label: "Cross Grid",
    theme: "light",
    style: {
      backgroundColor: "#ffffff",
      backgroundImage:
        "linear-gradient(45deg, #d0d0d0 1px, transparent 1px), linear-gradient(-45deg, #d0d0d0 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
  /* ── Light gradient + dot grid ── */
  {
    id: "gray-dot",
    label: "Ash",
    theme: "light",
    style: {
      background:
        "radial-gradient(circle, #b0b0b0 1px, transparent 1px), linear-gradient(160deg, #ffffff 0%, #e8e8e8 14%, #f5f5f5 28%, #d5d5d5 42%, #efefef 56%, #c8c8c8 70%, #e0e0e0 85%, #f8f8f8 100%)",
      backgroundSize: "20px 20px, 100% 100%",
    },
  },
  /* ── Dark theme ── */
  {
    id: "dark-dot-grid",
    label: "Dot Grid",
    theme: "dark",
    style: {
      backgroundColor: "#121218",
      backgroundImage:
        "radial-gradient(circle, #2a2a35 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
  {
    id: "dark-plus-grid",
    label: "Plus Grid",
    theme: "dark",
    style: {
      backgroundColor: "#121218",
      backgroundImage:
        "linear-gradient(#1e1e28 1px, transparent 1px), linear-gradient(90deg, #1e1e28 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    },
  },
  {
    id: "dark-cross-grid",
    label: "Cross Grid",
    theme: "dark",
    style: {
      backgroundColor: "#121218",
      backgroundImage:
        "linear-gradient(45deg, #2a2a35 1px, transparent 1px), linear-gradient(-45deg, #2a2a35 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
];

interface BackgroundContextValue {
  currentBg: string;
  currentBgId: string;
  currentBgType: BgType;
  hydrated: boolean;
  setBg: (id: string, src: string, type?: BgType) => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
}

/* ------------------------------------------------------------------ */
/*  Default                                                            */
/* ------------------------------------------------------------------ */

const THEME_DEFAULTS = {
  light: { id: "light:moutain", src: "/backgrounds/light/moutain.jpg", type: "image" as BgType },
  dark:  { id: "dark:night-moutain", src: "/backgrounds/dark/night-moutain.jpg", type: "image" as BgType },
};

const DEFAULT_BG_ID = THEME_DEFAULTS.light.id;
const DEFAULT_BG_SRC = THEME_DEFAULTS.light.src;
const DEFAULT_BG_TYPE: BgType = THEME_DEFAULTS.light.type;

/* ------------------------------------------------------------------ */
/*  localStorage persistence                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY_LIGHT = "bluweo-background-light";
const STORAGE_KEY_DARK = "bluweo-background-dark";

interface StoredBackground {
  id: string;
  src: string;
  type?: BgType;
}

function loadStored(theme: "light" | "dark"): StoredBackground | null {
  if (typeof window === "undefined") return null;
  const key = theme === "dark" ? STORAGE_KEY_DARK : STORAGE_KEY_LIGHT;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredBackground;
    if (parsed.id && parsed.src) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveStored(theme: "light" | "dark", bg: StoredBackground) {
  const key = theme === "dark" ? STORAGE_KEY_DARK : STORAGE_KEY_LIGHT;
  try {
    localStorage.setItem(key, JSON.stringify(bg));
  } catch {
    /* quota exceeded — ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const BackgroundContext = createContext<BackgroundContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function BackgroundProvider({ children }: { children: ReactNode }) {
  /* Detect current theme (data-theme attribute) */
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const check = () =>
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => obs.disconnect();
  }, []);

  /* Load stored background for the initial theme */
  const initialTheme = typeof window !== "undefined"
    ? (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light")
    : "light";
  const [stored] = useState(() => loadStored(initialTheme));
  const defaults = THEME_DEFAULTS[initialTheme];
  const [currentBg, setCurrentBg] = useState(stored?.src ?? defaults.src);
  const [currentBgId, setCurrentBgId] = useState(stored?.id ?? defaults.id);
  const [currentBgType, setCurrentBgType] = useState<BgType>(stored?.type ?? defaults.type);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const hydratedRef = useRef(false);
  const prevThemeRef = useRef(initialTheme);

  /* Mark as hydrated after first mount */
  useEffect(() => {
    hydratedRef.current = true;
    setHydrated(true);
  }, []);

  /* When theme changes, swap to that theme's stored background (or default) */
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (theme === prevThemeRef.current) return;
    prevThemeRef.current = theme;

    const themeBg = loadStored(theme);
    const fallback = THEME_DEFAULTS[theme];
    setCurrentBgId(themeBg?.id ?? fallback.id);
    setCurrentBg(themeBg?.src ?? fallback.src);
    setCurrentBgType(themeBg?.type ?? fallback.type);
  }, [theme]);

  /* Persist to localStorage on every change (after hydration) */
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveStored(theme, { id: currentBgId, src: currentBg, type: currentBgType });
  }, [currentBgId, currentBg, currentBgType, theme]);

  const setBg = useCallback((id: string, src: string, type: BgType = "image") => {
    setCurrentBgId(id);
    setCurrentBg(src);
    setCurrentBgType(type);
  }, []);

  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => setPickerOpen(false), []);

  return (
    <BackgroundContext.Provider
      value={{ currentBg, currentBgId, currentBgType, hydrated, setBg, pickerOpen, openPicker, closePicker }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return ctx;
}
