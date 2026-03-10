"use client";

import { useState, useEffect } from "react";
import type { ImageDimensions } from "./useImageDimensions";

/**
 * Preloads ALL images in a gallery and returns their dimensions.
 * Returns `null` while any image is still loading.
 * Once all images are resolved, returns ImageDimensions[].
 */
export function useGalleryDimensions(
  srcs: string[] | undefined,
): ImageDimensions[] | null {
  const [allDims, setAllDims] = useState<ImageDimensions[] | null>(null);

  // Stable key so the effect only re-runs when the actual URLs change
  const key = srcs ? JSON.stringify(srcs) : "";

  useEffect(() => {
    if (!srcs || srcs.length === 0) {
      setAllDims(null);
      return;
    }

    setAllDims(null); // reset on change

    let cancelled = false;

    const promises = srcs.map(
      (src) =>
        new Promise<ImageDimensions>((resolve) => {
          const img = new window.Image();
          img.onload = () =>
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.onerror = () => resolve({ width: 800, height: 600 }); // fallback 4:3
          img.src = src;
        }),
    );

    Promise.all(promises).then((results) => {
      if (!cancelled) setAllDims(results);
    });

    return () => {
      cancelled = true;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return allDims;
}
