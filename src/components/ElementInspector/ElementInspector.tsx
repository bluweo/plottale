"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ElementInfo {
  tag: string;
  id: string;
  classes: string[];
  rect: DOMRect;
  computedStyles: Record<string, string>;
  attributes: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const INSPECTOR_ATTR = "data-element-inspector";

function getElementInfo(el: Element): ElementInfo {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);

  return {
    tag: el.tagName.toLowerCase(),
    id: el.id || "",
    classes: Array.from(el.classList),
    rect,
    computedStyles: {
      display: cs.display,
      position: cs.position,
      width: cs.width,
      height: cs.height,
      padding: cs.padding,
      margin: cs.margin,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      gap: cs.gap,
      flexDirection: cs.flexDirection,
    },
    attributes: Object.fromEntries(
      Array.from(el.attributes)
        .filter((a) => !["class", "id", "style"].includes(a.name))
        .slice(0, 8)
        .map((a) => [a.name, a.value.length > 60 ? a.value.slice(0, 60) + "..." : a.value])
    ),
  };
}

function truncateClasses(classes: string[], maxLen = 50): string {
  let result = "";
  for (const cls of classes) {
    const next = result ? result + " ." + cls : "." + cls;
    if (next.length > maxLen) {
      return result + "...";
    }
    result = next;
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ElementInspector() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState<ElementInfo | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<ElementInfo | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  /* SSR guard */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Listen for toggle event from ContextMenu */
  useEffect(() => {
    const handler = () => {
      setActive((prev) => {
        if (prev) {
          // Turning off -- clear state
          setHoveredInfo(null);
          setSelectedInfo(null);
        }
        return !prev;
      });
    };
    window.addEventListener("toggle-inspector", handler);
    return () => window.removeEventListener("toggle-inspector", handler);
  }, []);

  /* Mouse move -- find element under cursor */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!active) return;

      setMousePos({ x: e.clientX, y: e.clientY });

      // Temporarily hide overlay to see what's underneath
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "none";
      }

      const target = document.elementFromPoint(e.clientX, e.clientY);

      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "auto";
      }

      if (
        target &&
        !target.closest(`[${INSPECTOR_ATTR}]`) &&
        target !== document.documentElement &&
        target !== document.body
      ) {
        setHoveredInfo(getElementInfo(target));
      }
    },
    [active]
  );

  /* Click -- select element */
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!active) return;
      e.preventDefault();
      e.stopPropagation();

      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "none";
      }

      const target = document.elementFromPoint(e.clientX, e.clientY);

      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "auto";
      }

      if (
        target &&
        !target.closest(`[${INSPECTOR_ATTR}]`) &&
        target !== document.documentElement &&
        target !== document.body
      ) {
        const info = getElementInfo(target);
        setSelectedInfo(info);

        // Log to console for developer use
        console.group(
          `%c<${info.tag}>${info.id ? "#" + info.id : ""} ${info.classes.map((c) => "." + c).join("")}`,
          "color: #7dd3fc; font-weight: bold; font-size: 13px"
        );
        console.log("%cElement:", "font-weight: bold", target);
        console.log(
          "%cDimensions:",
          "font-weight: bold",
          `${Math.round(info.rect.width)} x ${Math.round(info.rect.height)}`
        );
        console.log("%cComputed Styles:", "font-weight: bold", info.computedStyles);
        if (Object.keys(info.attributes).length > 0) {
          console.log("%cAttributes:", "font-weight: bold", info.attributes);
        }
        console.groupEnd();
      }
    },
    [active]
  );

  /* Escape -- deactivate */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) {
        setActive(false);
        setHoveredInfo(null);
        setSelectedInfo(null);
      }
    },
    [active]
  );

  /* Attach/detach event listeners */
  useEffect(() => {
    if (!active) return;

    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [active, handleMouseMove, handleClick, handleKeyDown]);

  /* ---- Render ---- */
  if (!mounted || !active) return null;

  const info = hoveredInfo;
  const tooltipX = mousePos.x + 16;
  const tooltipY = mousePos.y + 16;

  return createPortal(
    <>
      {/* Transparent overlay to capture mouse events */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] cursor-crosshair"
        {...{ [INSPECTOR_ATTR]: true }}
      />

      {/* Highlight box around hovered element */}
      {info && (
        <div
          className="fixed z-[9997] pointer-events-none border-2 border-[rgba(0,122,255,0.8)] bg-[rgba(0,122,255,0.08)] transition-all duration-[80ms] ease-out"
          {...{ [INSPECTOR_ATTR]: true }}
          style={{
            left: info.rect.left,
            top: info.rect.top,
            width: info.rect.width,
            height: info.rect.height,
          }}
        />
      )}

      {/* Tooltip near cursor */}
      {info && (
        <div
          className="fixed z-[9999] pointer-events-none px-3 py-2 bg-[rgba(30,30,40,0.92)] backdrop-blur-[16px] backdrop-saturate-[1.6] border border-[rgba(255,255,255,0.12)] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.24),0_2px_8px_rgba(0,0,0,0.12)] font-mono text-xs leading-relaxed text-[#f0f0f0] whitespace-nowrap max-w-[420px] overflow-hidden"
          {...{ [INSPECTOR_ATTR]: true }}
          style={{
            left: Math.min(tooltipX, window.innerWidth - 320),
            top:
              tooltipY + 60 > window.innerHeight
                ? mousePos.y - 50
                : tooltipY,
          }}
        >
          <span className="text-[#7dd3fc] font-semibold">&lt;{info.tag}&gt;</span>
          {info.id && <span className="text-[#c084fc]">#{info.id}</span>}
          {info.classes.length > 0 && (
            <span className="text-[#86efac]">
              {" "}
              {truncateClasses(info.classes)}
            </span>
          )}
          <span className="text-white/50 ml-2 text-[11px]">
            {Math.round(info.rect.width)} &times; {Math.round(info.rect.height)}
          </span>
        </div>
      )}

      {/* ESC hint */}
      <div
        className="fixed top-3 right-3 z-[9999] pointer-events-none px-3 py-1.5 bg-[rgba(30,30,40,0.88)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] rounded-lg font-[var(--font-sans)] text-xs text-white/60 animate-esc-hint-fade-in [&_kbd]:inline-block [&_kbd]:px-1.5 [&_kbd]:py-0.5 [&_kbd]:mr-1 [&_kbd]:bg-[rgba(255,255,255,0.12)] [&_kbd]:border [&_kbd]:border-[rgba(255,255,255,0.15)] [&_kbd]:rounded [&_kbd]:font-[inherit] [&_kbd]:text-[11px] [&_kbd]:font-semibold [&_kbd]:text-white/80"
        {...{ [INSPECTOR_ATTR]: true }}
      >
        <kbd>ESC</kbd> to exit inspector
      </div>

      {/* Pinned info panel (shown after clicking an element) */}
      {selectedInfo && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] max-h-[280px] overflow-y-auto px-5 py-4 bg-[rgba(20,20,28,0.95)] backdrop-blur-[24px] backdrop-saturate-[1.6] border-t border-[rgba(255,255,255,0.1)] shadow-[0_-8px_40px_rgba(0,0,0,0.2)] font-mono text-xs leading-relaxed text-[#e0e0e4] animate-info-panel-slide-up"
          {...{ [INSPECTOR_ATTR]: true }}
        >
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[rgba(255,255,255,0.08)]">
            <span className="text-[13px] font-semibold text-[#f0f0f2]">
              Element Inspector
            </span>
            <button
              className="w-6 h-6 flex items-center justify-center rounded-[6px] border-none bg-[rgba(255,255,255,0.08)] text-white/60 cursor-pointer text-sm font-[inherit] transition-all duration-150 ease-linear hover:bg-[rgba(255,255,255,0.14)] hover:text-white"
              onClick={() => setSelectedInfo(null)}
              aria-label="Close info panel"
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-x-3 gap-y-1.5">
            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Element</span>
            <span className="text-[#e0e0e4] break-all">
              <span className="text-[#7dd3fc]">&lt;{selectedInfo.tag}&gt;</span>
              {selectedInfo.id && (
                <span className="text-[#c084fc]"> #{selectedInfo.id}</span>
              )}
            </span>

            {selectedInfo.classes.length > 0 && (
              <>
                <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Classes</span>
                <span className="text-[#e0e0e4] break-all">
                  <span className="text-[#86efac]">
                    {selectedInfo.classes.map((c) => "." + c).join(" ")}
                  </span>
                </span>
              </>
            )}

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Size</span>
            <span className="text-[#e0e0e4] break-all">
              <span className="text-[#fbbf24]">
                {Math.round(selectedInfo.rect.width)} &times;{" "}
                {Math.round(selectedInfo.rect.height)}
              </span>
            </span>

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Position</span>
            <span className="text-[#e0e0e4] break-all">
              <span className="text-[#fbbf24]">
                x: {Math.round(selectedInfo.rect.left)}, y:{" "}
                {Math.round(selectedInfo.rect.top)}
              </span>
            </span>

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Display</span>
            <span className="text-[#e0e0e4] break-all">
              <span className="text-[#fb923c]">
                {selectedInfo.computedStyles.display}
              </span>
              {selectedInfo.computedStyles.flexDirection !== "row" &&
                selectedInfo.computedStyles.display === "flex" && (
                  <span className="text-[#fb923c]">
                    {" "}
                    / {selectedInfo.computedStyles.flexDirection}
                  </span>
                )}
            </span>

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Padding</span>
            <span className="text-[#e0e0e4] break-all">
              {selectedInfo.computedStyles.padding}
            </span>

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Margin</span>
            <span className="text-[#e0e0e4] break-all">
              {selectedInfo.computedStyles.margin}
            </span>

            {selectedInfo.computedStyles.gap !== "normal" && (
              <>
                <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Gap</span>
                <span className="text-[#e0e0e4] break-all">
                  {selectedInfo.computedStyles.gap}
                </span>
              </>
            )}

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Font</span>
            <span className="text-[#e0e0e4] break-all">
              {selectedInfo.computedStyles.fontSize} /{" "}
              {selectedInfo.computedStyles.fontWeight}
            </span>

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Color</span>
            <span className="text-[#e0e0e4] break-all">
              {selectedInfo.computedStyles.color}
            </span>

            <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Background</span>
            <span className="text-[#e0e0e4] break-all">
              {selectedInfo.computedStyles.backgroundColor}
            </span>

            {selectedInfo.computedStyles.borderRadius !== "0px" && (
              <>
                <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Radius</span>
                <span className="text-[#e0e0e4] break-all">
                  {selectedInfo.computedStyles.borderRadius}
                </span>
              </>
            )}

            {Object.entries(selectedInfo.attributes).length > 0 && (
              <>
                <span className="text-white/40 text-[11px] uppercase tracking-[0.04em]">Attributes</span>
                <span className="text-[#e0e0e4] break-all">
                  {Object.entries(selectedInfo.attributes)
                    .map(([k, v]) => `${k}="${v}"`)
                    .join("  ")}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
