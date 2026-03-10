"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

export default function GalleryCarousel({
  images,
  onSlideChange,
}: {
  images: string[];
  onSlideChange?: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  /* Notify parent of slide changes (covers all navigation methods) */
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const prev = useCallback(
    () => setCurrentIndex((i) => Math.max(0, i - 1)),
    [],
  );
  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(images.length - 1, i + 1)),
    [images.length],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (delta > 50) next();
      else if (delta < -50) prev();
    },
    [next, prev],
  );

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      {currentIndex > 0 && (
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <ArrowLeft2 size={18} color="#fff" />
        </button>
      )}

      {/* Next arrow */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <ArrowRight2 size={18} color="#fff" />
        </button>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-200 cursor-pointer"
              style={{
                background:
                  i === currentIndex
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.4)",
                transform: i === currentIndex ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
