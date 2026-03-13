"use client";

import {
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

export type RadiusPreset = "minimal" | "medium" | "large";
export type ShadowPreset = "flat" | "soft" | "elevated";
export type ThemeMode = "light" | "dark";

interface AppearanceContextValue {
  transparency: number;
  setTransparency: (v: number) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (v: RadiusPreset) => void;
  blurIntensity: number;
  setBlurIntensity: (v: number) => void;
  shadowPreset: ShadowPreset;
  setShadowPreset: (v: ShadowPreset) => void;
  theme: ThemeMode;
  setTheme: (v: ThemeMode) => void;
  toggleTheme: () => void;
  resetToDefaults: () => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const DEFAULT_TRANSPARENCY = 0.64;
const DEFAULT_RADIUS: RadiusPreset = "minimal";
const DEFAULT_BLUR = 24;
const DEFAULT_SHADOW: ShadowPreset = "soft";
const DEFAULT_THEME: ThemeMode = "light";

/* ------------------------------------------------------------------ */
/*  localStorage persistence                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "bluweo-appearance";

interface StoredAppearance {
  transparency: number;
  radiusPreset: RadiusPreset;
  blurIntensity: number;
  shadowPreset: ShadowPreset;
  theme: ThemeMode;
}

function loadStored(): Partial<StoredAppearance> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<StoredAppearance>;
  } catch {
    return {};
  }
}

function saveStored(settings: StoredAppearance) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* quota exceeded — ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Preset maps                                                        */
/* ------------------------------------------------------------------ */

const RADIUS_MAP: Record<RadiusPreset, { lg: string; main: string; sm: string; pill: string }> = {
  minimal:  { lg: "8px",   main: "6px",  sm: "4px",  pill: "8px" },
  medium:   { lg: "20px",  main: "14px", sm: "10px", pill: "40px" },
  large:    { lg: "36px",  main: "26px", sm: "18px", pill: "100px" },
};

const SHADOW_MAP: Record<ShadowPreset, { base: string; hover: string; elevated: string }> = {
  flat: {
    base: "none",
    hover: "none",
    elevated: "0 4px 12px rgba(0,0,0,0.06)",
  },
  soft: {
    base: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)",
    hover: "0 20px 60px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)",
    elevated: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)",
  },
  elevated: {
    base: "0 16px 60px rgba(0,0,0,0.16), 0 6px 24px rgba(0,0,0,0.1)",
    hover: "0 28px 80px rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.12)",
    elevated: "0 32px 100px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.1)",
  },
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [transparency, setTransparency] = useState(DEFAULT_TRANSPARENCY);
  const [radiusPreset, setRadiusPreset] = useState<RadiusPreset>(DEFAULT_RADIUS);
  const [blurIntensity, setBlurIntensity] = useState(DEFAULT_BLUR);
  const [shadowPreset, setShadowPreset] = useState<ShadowPreset>(DEFAULT_SHADOW);
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);
  const [modalOpen, setModalOpen] = useState(false);

  const hydratedRef = useRef(false);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    const stored = loadStored();
    if (stored.transparency !== undefined) setTransparency(stored.transparency);
    if (stored.radiusPreset !== undefined) setRadiusPreset(stored.radiusPreset);
    if (stored.blurIntensity !== undefined) setBlurIntensity(stored.blurIntensity);
    if (stored.shadowPreset !== undefined) setShadowPreset(stored.shadowPreset);
    if (stored.theme !== undefined) setTheme(stored.theme);
    hydratedRef.current = true;
  }, []);

  /* Persist to localStorage on every change (after hydration) */
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveStored({ transparency, radiusPreset, blurIntensity, shadowPreset, theme });
  }, [transparency, radiusPreset, blurIntensity, shadowPreset, theme]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const resetToDefaults = useCallback(() => {
    setTransparency(DEFAULT_TRANSPARENCY);
    setRadiusPreset(DEFAULT_RADIUS);
    setBlurIntensity(DEFAULT_BLUR);
    setShadowPreset(DEFAULT_SHADOW);
  }, []);

  /* Apply CSS variables to :root whenever settings change */
  useEffect(() => {
    const root = document.documentElement;
    const rs = root.style;
    const isDark = theme === "dark";

    /* data-theme attribute for CSS selectors */
    root.setAttribute("data-theme", theme);

    /* Transparency → glass backgrounds
       Offsets shrink as transparency approaches 1.0 so ALL variants
       converge to fully-solid when the slider is at 100%.              */
    const t = transparency;
    const remaining = Math.max(0, 1 - t);          // 0.2 at default, 0 at max
    const spread = Math.min(remaining / 0.2, 1);   // 1.0 for t≤0.8, fades to 0 at t=1.0

    const hoverAlpha   = Math.min(t + 0.16 * spread, 1.0);
    const strongAlpha  = Math.min(t + 0.20 * spread, 1.0);
    const subtleAlpha  = Math.max(t - 0.17 * spread, 0.15);

    if (isDark) {
      rs.setProperty("--glass-bg",        `rgba(25, 25, 35, ${t})`);
      rs.setProperty("--glass-bg-hover",   `rgba(35, 35, 48, ${hoverAlpha})`);
      rs.setProperty("--glass-bg-strong",  `rgba(35, 35, 48, ${strongAlpha})`);
      rs.setProperty("--glass-bg-subtle",  `rgba(20, 20, 30, ${subtleAlpha})`);
    } else {
      rs.setProperty("--glass-bg",        `rgba(255, 255, 255, ${t})`);
      rs.setProperty("--glass-bg-hover",   `rgba(255, 255, 255, ${hoverAlpha})`);
      rs.setProperty("--glass-bg-strong",  `rgba(255, 255, 255, ${strongAlpha})`);
      rs.setProperty("--glass-bg-subtle",  `rgba(255, 255, 255, ${subtleAlpha})`);
    }

    /* Glass border */
    if (isDark) {
      rs.setProperty("--glass-border", "rgba(255, 255, 255, 0.1)");
      rs.setProperty("--glass-border-hover", "rgba(255, 255, 255, 0.18)");
    } else {
      rs.setProperty("--glass-border", "rgba(255, 255, 255, 0.55)");
      rs.setProperty("--glass-border-hover", "rgba(255, 255, 255, 0.75)");
    }

    /* Text colors */
    if (isDark) {
      rs.setProperty("--text-primary", "rgba(255, 255, 255, 0.92)");
      rs.setProperty("--text-secondary", "rgba(255, 255, 255, 0.55)");
      rs.setProperty("--text-tertiary", "rgba(255, 255, 255, 0.35)");
    } else {
      rs.setProperty("--text-primary", "rgba(30, 30, 35, 0.88)");
      rs.setProperty("--text-secondary", "rgba(30, 30, 35, 0.52)");
      rs.setProperty("--text-tertiary", "rgba(30, 30, 35, 0.35)");
    }

    /* Border radius */
    const r = RADIUS_MAP[radiusPreset];
    rs.setProperty("--glass-radius-lg", r.lg);
    rs.setProperty("--glass-radius", r.main);
    rs.setProperty("--glass-radius-sm", r.sm);
    rs.setProperty("--glass-radius-pill", r.pill);

    /* Blur + Saturation */
    rs.setProperty("--glass-blur", `${blurIntensity}px`);
    rs.setProperty("--glass-blur-strong", `${Math.round(blurIntensity * 1.67)}px`);
    rs.setProperty("--glass-blur-overlay", `${Math.round(blurIntensity * 0.5)}px`);
    rs.setProperty("--glass-saturation", isDark ? "1.4" : "1.8");

    /* Liquid glass specular tokens — theme-aware */
    rs.setProperty("--liquid-specular-top", isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.35)");
    rs.setProperty("--liquid-specular-mid", isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.08)");
    rs.setProperty("--liquid-noise-opacity", isDark ? "0.02" : "0.03");

    /* Shadow — darker in dark mode */
    const s = SHADOW_MAP[shadowPreset];
    if (isDark) {
      rs.setProperty("--glass-shadow", s.base.replace(/rgba\(0,0,0,/g, "rgba(0,0,0,").replace(/0\.08/g, "0.25").replace(/0\.04/g, "0.15"));
      rs.setProperty("--glass-shadow-hover", s.hover.replace(/0\.14/g, "0.35").replace(/0\.06/g, "0.2"));
      rs.setProperty("--glass-shadow-elevated", s.elevated.replace(/0\.12/g, "0.35").replace(/0\.06/g, "0.2"));
      rs.setProperty("--glass-shadow-sm", "0 2px 8px rgba(0, 0, 0, 0.2)");
    } else {
      rs.setProperty("--glass-shadow", s.base);
      rs.setProperty("--glass-shadow-hover", s.hover);
      rs.setProperty("--glass-shadow-elevated", s.elevated);
      rs.setProperty("--glass-shadow-sm", shadowPreset === "flat" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.06)");
    }
  }, [transparency, radiusPreset, blurIntensity, shadowPreset, theme]);

  return (
    <AppearanceContext.Provider
      value={{
        transparency, setTransparency,
        radiusPreset, setRadiusPreset,
        blurIntensity, setBlurIntensity,
        shadowPreset, setShadowPreset,
        theme, setTheme, toggleTheme,
        resetToDefaults,
        modalOpen, openModal, closeModal,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return ctx;
}
