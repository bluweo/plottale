"use client";

import { useState, useEffect } from "react";

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Preloads an image and returns its natural dimensions.
 * Returns `null` while loading, or a fallback on error.
 * Benefits from browser cache — if Next.js <Image> already loaded
 * the src in the feed, onload fires near-instantly.
 */
export function useImageDimensions(
  src: string | null,
): ImageDimensions | null {
  const [dims, setDims] = useState<ImageDimensions | null>(null);

  useEffect(() => {
    if (!src) {
      setDims(null);
      return;
    }

    setDims(null); // reset when src changes

    const img = new window.Image();
    img.onload = () =>
      setDims({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => setDims({ width: 800, height: 600 }); // fallback 4:3
    img.src = src;
  }, [src]);

  return dims;
}
