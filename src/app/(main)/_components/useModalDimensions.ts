"use client";

import { useState, useEffect, useMemo } from "react";
import type { ImageDimensions } from "./useImageDimensions";

/* ── Constants ── */
const RIGHT_PANEL_WIDTH = 420;
const MAX_MODAL_WIDTH = 1200;
const MIN_LEFT_PANEL_WIDTH = 340;
const VIEWPORT_PADDING = 48; // 24px on each side
const MAX_HEIGHT_RATIO = 0.85; // 85vh breathing room
const TEXT_ONLY_WIDTH = 550;

export interface ModalDimensions {
  modalWidth: number;
  modalHeight: number | null; // null = auto (text-only)
  leftPanelWidth: number;
  rightPanelWidth: number;
  isTextOnly: boolean;
}

export function useModalDimensions(
  imageDims?: ImageDimensions,
): ModalDimensions {
  const [viewport, setViewport] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return useMemo(() => {
    /* Text-only posts → narrow modal, auto height */
    if (imageDims == null) {
      return {
        modalWidth: TEXT_ONLY_WIDTH,
        modalHeight: null,
        leftPanelWidth: 0,
        rightPanelWidth: TEXT_ONLY_WIDTH,
        isTextOnly: true,
      };
    }

    /* ── Height-aware sizing algorithm ── */
    const imageRatio = imageDims.width / imageDims.height;
    const maxModalHeight = Math.round(viewport.h * MAX_HEIGHT_RATIO);
    const maxLeftWidth = Math.min(
      viewport.w - RIGHT_PANEL_WIDTH - VIEWPORT_PADDING,
      MAX_MODAL_WIDTH - RIGHT_PANEL_WIDTH,
    );

    // Start from max height, derive width from ratio
    let leftHeight = maxModalHeight;
    let leftWidth = Math.round(leftHeight * imageRatio);

    // If too wide → start from max width, derive height
    if (leftWidth > maxLeftWidth) {
      leftWidth = maxLeftWidth;
      leftHeight = Math.round(leftWidth / imageRatio);
    }

    // Ensure minimum left panel width
    if (leftWidth < MIN_LEFT_PANEL_WIDTH) {
      leftWidth = MIN_LEFT_PANEL_WIDTH;
      leftHeight = Math.round(leftWidth / imageRatio);
    }

    const modalWidth = Math.min(
      leftWidth + RIGHT_PANEL_WIDTH,
      MAX_MODAL_WIDTH,
    );

    return {
      modalWidth,
      modalHeight: leftHeight,
      leftPanelWidth: modalWidth - RIGHT_PANEL_WIDTH,
      rightPanelWidth: RIGHT_PANEL_WIDTH,
      isTextOnly: false,
    };
  }, [imageDims, viewport]);
}
