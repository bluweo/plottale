"use client";

import { useBackground, COLOR_BACKGROUNDS } from "@/context/BackgroundContext";

export function BackgroundSystem() {
  const { currentBg, currentBgId, currentBgType, hydrated } = useBackground();

  /* Don't render until localStorage has been read — prevents flash of default background */
  if (!hydrated) return <div className="fixed inset-0 -z-1" />;

  return (
    <div className="fixed inset-0 -z-1">
      {currentBgType === "color" ? (
        (() => {
          const preset = COLOR_BACKGROUNDS.find((c) => c.id === currentBgId);
          return preset ? (
            <div
              className="absolute inset-0 w-full h-full"
              style={preset.style}
            />
          ) : null;
        })()
      ) : currentBgType === "video" ? (
        <>
          <video
            key={currentBg}
            src={currentBg}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={currentBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}
    </div>
  );
}
