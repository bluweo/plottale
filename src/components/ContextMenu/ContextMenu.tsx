"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useBackground } from "@/context/BackgroundContext";
import { useAppearance } from "@/context/AppearanceContext";
import {
  Image,
  Music,
  Setting4,
  Maximize4,
} from "iconsax-react";

/* ------------------------------------------------------------------ */
/*  Menu items data                                                    */
/* ------------------------------------------------------------------ */

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  action?: string;
  dividerAfter?: boolean;
}

const ICON_PROPS = { size: 18, variant: "Linear" as const, color: "currentColor" };

const MENU_ITEMS: MenuItem[] = [
  { icon: <Image {...ICON_PROPS} />,          label: "Change Background", action: "change-bg" },
  { icon: <Music {...ICON_PROPS} />,          label: "Play Music",        action: "play-music" },
  { icon: <Setting4 {...ICON_PROPS} />,       label: "Appearance",        action: "appearance" },
  { icon: <Maximize4 {...ICON_PROPS} />,      label: "Fullscreen",       action: "fullscreen" },
];

/* ------------------------------------------------------------------ */
/*  Constants for viewport clamping                                    */
/* ------------------------------------------------------------------ */

const MENU_WIDTH = 220;
const MENU_HEIGHT_ESTIMATE = 400;
const EDGE_MARGIN = 12;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ContextMenu() {
  const { openPicker } = useBackground();
  const { openModal: openAppearance } = useAppearance();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  /* SSR guard --- portals need document.body */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Right-click -> show menu at cursor, clamped to viewport */
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();

    let x = e.clientX;
    let y = e.clientY;

    /* clamp right / bottom */
    if (x + MENU_WIDTH + EDGE_MARGIN > window.innerWidth) {
      x = window.innerWidth - MENU_WIDTH - EDGE_MARGIN;
    }
    if (y + MENU_HEIGHT_ESTIMATE + EDGE_MARGIN > window.innerHeight) {
      y = window.innerHeight - MENU_HEIGHT_ESTIMATE - EDGE_MARGIN;
    }

    /* clamp left / top */
    x = Math.max(EDGE_MARGIN, x);
    y = Math.max(EDGE_MARGIN, y);

    setPosition({ x, y });
    setVisible(true);
  }, []);

  /* Dismiss on click anywhere, Escape, scroll, or resize */
  const dismiss = useCallback(() => setVisible(false), []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", dismiss);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [handleContextMenu, dismiss, handleKeyDown]);

  /* ---- Render ---- */
  if (!mounted || !visible) return null;

  /* Split items into groups based on dividerAfter */
  const groups: MenuItem[][] = [];
  let current: MenuItem[] = [];
  for (const item of MENU_ITEMS) {
    current.push(item);
    if (item.dividerAfter) {
      groups.push(current);
      current = [];
    }
  }
  if (current.length) groups.push(current);

  const handleItemClick = (item: MenuItem) => {
    setVisible(false);
    if (item.action === "change-bg") openPicker();
    if (item.action === "appearance") openAppearance();
    if (item.action === "fullscreen") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  };

  return createPortal(
    <div
      className="gel-glass-context-menu fixed z-[1000] min-w-[220px] p-2.5 flex flex-col gap-2 animate-context-menu-enter origin-top-left select-none"
      style={{
        left: position.x,
        top: position.y,
      }}
      role="menu"
      aria-label="Context menu"
      onClick={(e) => e.stopPropagation()}
    >
      {groups.map((group, gi) => (
        <div key={gi} className="glass-1 glass-specular rounded-[var(--glass-radius-sm)] p-1">
          {group.map((item, ii) => (
            <button
              key={ii}
              className="glass-menu-item [&:hover_.menu-icon]:text-accent"
              role="menuitem"
              onClick={() => handleItemClick(item)}
            >
              <span className="menu-icon w-5 h-5 flex items-center justify-center text-text-secondary transition-colors duration-[200ms] ease-[var(--transition-apple)] shrink-0 [&_svg]:w-[18px] [&_svg]:h-[18px]">{item.icon}</span>
              <span className="flex-1 whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </div>,
    document.body
  );
}
