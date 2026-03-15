"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Star1, ArrowLeft2, ArrowRight2, PlayCircle, Play, Pause, Clock, Book1, BookSaved, Lock1, Coin1, VolumeHigh, VolumeMute, Maximize4, Add, Repeat } from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAppearance } from "@/context/AppearanceContext";
import { useBackground } from "@/context/BackgroundContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import {
  type PlottaleNovel,
  type PlottaleCharacter,
  type PlottaleChapter,
  getNovelBySlug,
  getAllNovels,
  getChaptersByNovelId,
  getCharactersByNovelId,
  localize,
} from "@/data/plottale-content";

/* ================================================================== */
/*  GLASS STYLE CONSTANTS (same as main page)                          */
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
/*  STAR RATING COMPONENT                                              */
/* ================================================================== */

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star1
          key={i}
          size={size}
          variant={i < Math.round(rating) ? "Bold" : "Linear"}
          color={i < Math.round(rating) ? "#fbbf24" : "rgba(255,255,255,0.3)"}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium text-white/80">{rating.toFixed(1)}</span>
    </span>
  );
}

/* ================================================================== */
/*  HERO IMAGE CAROUSEL (free ratio, same height)                      */
/* ================================================================== */

function HeroImageCarousel({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) {
  const ITEM_HEIGHT_DESKTOP = 340;
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  // After initial render, begin the marquee and close the gap
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Duration scales with number of images for consistent speed
  const duration = images.length * 6;

  // Duplicate images for seamless loop
  const doubled = [...images, ...images];

  return (
    <div
      className="overflow-hidden"
      style={{
        paddingLeft: started ? 0 : 12,
        transition: "padding-left 1.5s ease-in-out",
      }}
    >
      <div
        className="flex gap-3 w-max"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        style={{
          animationName: started ? "marquee" : "none",
          animationDuration: started ? `${duration}s` : undefined,
          animationTimingFunction: started ? "linear" : undefined,
          animationIterationCount: started ? "infinite" : undefined,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((img, i) => (
          <button
            key={i}
            onClick={() => onImageClick(i % images.length)}
            className="flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer group h-[240px] lg:h-[340px]"
          >
            <Image
              src={img}
              alt=""
              width={480}
              height={ITEM_HEIGHT_DESKTOP}
              className="h-full w-auto object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="480px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Keyframes for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ================================================================== */
/*  FULLSCREEN PHOTO GALLERY LIGHTBOX                                  */
/* ================================================================== */

function PhotoGalleryLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setCurrentIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, images.length]);

  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (children[currentIndex]) {
      children[currentIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white hover:scale-110 transition-all"
        style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}
      >
        <span className="text-lg font-bold leading-none">✕</span>
      </button>

      <div
        className="flex-1 flex items-center justify-center px-4 md:px-16 py-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
          >
            <ArrowLeft2 size={20} color="#fff" />
          </button>
        )}

        <div className="relative max-w-full max-h-full flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt=""
            width={1200}
            height={800}
            className="max-h-[calc(100vh-160px)] w-auto object-contain"
            style={{ borderRadius: "var(--glass-radius)" }}
            sizes="100vw"
            priority
          />
        </div>

        {currentIndex < images.length - 1 && (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
          >
            <ArrowRight2 size={20} color="#fff" />
          </button>
        )}
      </div>

      <div
        className="px-4 pb-4 pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={thumbsRef}
          className="flex gap-3 justify-center overflow-x-auto scrollbar-hide py-1.5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="flex-shrink-0 relative cursor-pointer transition-all duration-200"
              style={{
                width: 72,
                height: 48,
                borderRadius: "var(--glass-radius-sm)",
                opacity: i === currentIndex ? 1 : 0.4,
                boxShadow: i === currentIndex ? "0 0 0 2px rgba(0,0,0,1), 0 0 0 4px rgba(255,255,255,0.85)" : "none",
                overflow: "hidden",
              }}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="72px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  TRAILER PLAYER — fullscreen cinematic video player                  */
/* ================================================================== */

function TrailerPlayer({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-hide controls after 3s
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, [resetControlsTimer]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "m") toggleMute();
      if (e.key === "f") toggleFullscreen();
      if (e.key === "l") setIsLooping((v) => !v);
      if (e.key === "ArrowLeft") seekBy(-10);
      if (e.key === "ArrowRight") seekBy(10);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const seekBy = (seconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const v = videoRef.current;
    if (v && duration) v.currentTime = pct * duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onMouseMove={resetControlsTimer}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Video container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          playsInline
          loop={isLooping}
          className="max-w-full max-h-full object-contain"
          style={{ borderRadius: "var(--glass-radius-sm)" }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            setCurrentTime(v.currentTime);
            if (v.buffered.length > 0) {
              setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
            }
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
        />

        {/* Title bar — top */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 transition-opacity duration-300"
          style={{
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <PlayCircle size={20} variant="Bulk" color="#f59e0b" />
            <span className="text-white font-semibold text-sm">{title} — Trailer</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <Add size={22} variant="Linear" color="currentColor" className="rotate-45" />
          </button>
        </div>

        {/* Center play/pause overlay on click */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Play size={32} variant="Bold" color="white" />
            </div>
          </button>
        )}

        {/* Bottom controls bar */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-16 transition-opacity duration-300"
          style={{
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="group/progress relative w-full h-1.5 rounded-full cursor-pointer mb-4 hover:h-2.5 transition-all"
            style={{ background: "rgba(255,255,255,0.15)" }}
            onClick={handleProgressClick}
          >
            {/* Buffered */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${buffered}%`, background: "rgba(255,255,255,0.2)" }}
            />
            {/* Played */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #f59e0b, #ea580c)",
              }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
              style={{
                left: `${progress}%`,
                transform: `translate(-50%, -50%)`,
                background: "white",
                boxShadow: "0 0 8px rgba(0,0,0,0.4)",
              }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={22} variant="Bold" color="currentColor" />
                ) : (
                  <Play size={22} variant="Bold" color="currentColor" />
                )}
              </button>

              {/* Volume */}
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {isMuted ? (
                  <VolumeMute size={20} variant="Bold" color="currentColor" />
                ) : (
                  <VolumeHigh size={20} variant="Bold" color="currentColor" />
                )}
              </button>

              {/* Time */}
              <span className="text-white/70 text-xs font-medium tabular-nums ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Loop */}
              <button
                onClick={() => setIsLooping((v) => !v)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{
                  color: isLooping ? "#f59e0b" : "rgba(255,255,255,0.7)",
                  background: isLooping ? "rgba(245,158,11,0.15)" : "transparent",
                }}
                title={isLooping ? "Loop: On" : "Loop: Off"}
              >
                <Repeat size={20} variant="Bold" color="currentColor" />
              </button>
              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <Maximize4 size={20} variant="Linear" color="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ================================================================== */
/*  CAST STRIP — horizontal character portraits                        */
/* ================================================================== */

function CastStrip({
  characters,
  lang,
}: {
  characters: PlottaleCharacter[];
  lang: string;
}) {
  const { isDarkBg } = useBackground();
  if (characters.length === 0) return null;
  const descColor = isDarkBg ? "text-white/60" : "text-neutral-600 dark:text-white/60";
  return (
    <section className="py-4 px-4 md:px-8 lg:px-12">
      <div
        className="flex gap-3 justify-center flex-wrap"
      >
        {characters.map((char) => (
          <div key={char.id} className="flex-shrink-0 w-[110px] lg:w-[120px] transition-transform duration-300 hover:scale-110 cursor-pointer">
            {/* Card with photo fills entire card */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 dark:bg-neutral-800 group" style={{ borderRadius: "var(--glass-radius)" }}>
              <Image src={char.avatar} alt={localize(char.name, lang)} fill className="object-cover" sizes="120px" />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              {/* Name on bottom-left */}
              <div className="absolute bottom-2 left-2 right-9">
                <p className="text-[11px] font-semibold text-white truncate leading-tight">
                  {localize(char.name, lang)}
                </p>
              </div>
              {/* [+] follow button on bottom-right */}
              <button className="absolute bottom-2 right-1.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold hover:bg-white/40 transition cursor-pointer">
                +
              </button>
            </div>
            {/* Role description — outside the card */}
            <p className={`text-[10px] leading-snug mt-1.5 text-center ${descColor}`}>
              {localize(char.role, lang)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  HERO COVER CAROUSEL — rotating book cover images                    */
/* ================================================================== */

function HeroCoverCarousel({
  images,
  title,
  onImageClick,
}: {
  images: string[];
  title: string;
  onImageClick?: () => void;
}) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const totalSlides = images.length;

  /* Auto-rotate: 6s interval */
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < totalSlides) setCurrent(idx);
    },
    [totalSlides]
  );

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      goTo(current > 0 ? current - 1 : totalSlides - 1);
    },
    [current, totalSlides, goTo]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      goTo(current < totalSlides - 1 ? current + 1 : 0);
    },
    [current, totalSlides, goTo]
  );

  return (
    <div className="relative w-full aspect-[9/16] overflow-hidden group/carousel" style={{ borderRadius: "var(--glass-radius-lg)" }}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            {img ? (
              <Image
                src={img}
                alt={`${title} — image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 55vw, 30vw"
                priority={idx === 0}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                <BookSaved size={36} variant="Bulk" color="currentColor" className="opacity-25" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Click overlay */}
      {onImageClick && (
        <button
          onClick={onImageClick}
          className="absolute inset-0 z-5 cursor-pointer"
          aria-label="Open gallery"
        />
      )}

      {/* Dot indicators */}
      {totalSlides > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goTo(idx);
              }}
              className="cursor-pointer transition-all duration-300"
              style={{
                width: idx === current ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: idx === current ? "white" : "rgba(255,255,255,0.45)",
                boxShadow: idx === current ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Nav arrows — visible on hover */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/55 transition-all duration-200 cursor-pointer z-10 [&_svg]:w-[14px] [&_svg]:h-[14px]"
          >
            <ArrowLeft2 size={14} variant="Linear" color="white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/55 transition-all duration-200 cursor-pointer z-10 [&_svg]:w-[14px] [&_svg]:h-[14px]"
          >
            <ArrowRight2 size={14} variant="Linear" color="white" />
          </button>
        </>
      )}
    </div>
  );
}

/* ================================================================== */
/*  SECTION 1 — CINEMATIC HERO                                         */
/* ================================================================== */

function CinematicHero({
  novel,
  chapters,
  characters,
  prevNovel,
  nextNovel,
}: {
  novel: PlottaleNovel;
  chapters: PlottaleChapter[];
  characters: PlottaleCharacter[];
  prevNovel: PlottaleNovel | null;
  nextNovel: PlottaleNovel | null;
}) {
  const { t, lang } = useLanguage();
  const { theme, transparency } = useAppearance();
  const isDark = theme === "dark";
  const lhref = useLocalizedHref();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // Gallery images: exclude cover (shown separately in hero)
  const galleryImages = novel.images.filter((img) => img !== novel.coverImage);
  // All images for carousel: cover first, then gallery scenes
  const coverImages = [novel.coverImage, ...novel.images.filter((img) => img !== novel.coverImage)];
  // All images: cover first, then gallery (for lightbox navigation)
  const allImages = [novel.coverImage, ...galleryImages];

  return (
    <>
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Backdrop image */}
        <div className="absolute inset-0">
          <Image
            src={novel.backdropImage ?? novel.images[1] ?? novel.coverImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay — 30% to 60% black, same for both themes */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>

        {/* Thin separator line below nav */}
        <div className="absolute top-[90px] left-0 right-0 z-20 h-px bg-white/25" />
        {/* Vertical separator — left of content panel */}
        <div className="hidden lg:block absolute z-20 w-px bg-white/25" style={{ top: 90, bottom: 0, right: "calc(2.5rem + (100% - 9.5rem) * 0.56)" }} />
        {/* Vertical separator — right of content panel */}
        <div className="hidden lg:block absolute z-20 w-px bg-white/25" style={{ top: 90, bottom: 0, right: "calc(2.5rem + (100% - 9.5rem) * 0.18)" }} />

        {/* Fluid 3-column content area */}
        <div className="relative z-10 w-full pb-10 md:pb-14 pt-40 max-[1024px]:pt-44 px-4 md:px-8 lg:pl-24 lg:pr-8 xl:pl-28 xl:pr-10">

          {/* Mobile: cover first, then stacked content */}
          <div className="lg:hidden mb-8">
            <div className="w-[55%] mx-auto">
              <div className="overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]" style={{ borderRadius: "var(--glass-radius-lg)" }}>
                <HeroCoverCarousel
                  images={coverImages}
                  title={localize(novel.title, lang)}
                  onImageClick={() => setLightboxIndex(0)}
                />
              </div>
            </div>
          </div>

          {/* Desktop: 3-column layout | Mobile: stacked */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:items-end">

            {/* ── MAIN (Left) — Spacer to push content right ── */}
            <div className="flex-1 min-w-0 hidden lg:block" />

            {/* ── SECOND RIGHT (~40%) — All content ── */}
            <div className="lg:w-[40%] xl:w-[38%] flex-shrink-0 lg:px-10 lg:self-end">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {novel.contentRating && (
                  <span className="px-2 py-0.5 text-xs font-bold border border-white/40 text-white/90 rounded">
                    {novel.contentRating}
                  </span>
                )}
                {novel.genres.map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm bg-white/10 text-white/80 border border-white/10"
                  >
                    {localize(g, lang)}
                  </span>
                ))}
              </div>

              {/* 1. Title */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {localize(novel.title, lang)}
              </h1>

              {/* 2. Author */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={novel.authorAvatar}
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-full object-cover ring-2 ring-white/20"
                />
                <span className="text-white/80 text-sm font-medium">
                  {localize(novel.author, lang)}
                </span>
              </div>

              {/* 3. 1st paragraph — novel preview */}
              <p className="text-white/70 text-base leading-relaxed mb-3">
                {localize(novel.synopsis, lang)}
              </p>

              {/* 4. 2nd paragraph — extended synopsis */}
              <p className="text-white/50 text-base leading-relaxed mb-4">
                {lang === "th"
                  ? "เรื่องราวที่สะเทือนใจจากนวนิยายชื่อดังของเอลซา จูเบิร์ต เล่าชีวิตจริงของหญิงชาวโคซาผู้ผ่านพ้นยุคการแบ่งแยกสีผิว ความรัก ความสูญเสีย และความหวังที่ไม่มีวันดับ"
                  : "Based on the celebrated novel by Elsa Joubert, this is the true-to-life story of a Xhosa woman navigating the apartheid era — a tale of love, loss, and an unyielding hope that refuses to be silenced."}
              </p>

              {/* 5. Rating */}
              <div className="flex items-center gap-2 mb-5">
                <Stars rating={novel.rating} size={16} />
              </div>

              {/* 6. CTAs — Read + Trailer on same line */}
              <div className="flex gap-2.5">
                <Link
                  href={lhref(`/novel/${novel.slug}/chapter-1`)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm cursor-pointer transition-all hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}
                >
                  <Book1 size={18} variant="Bold" color="#ffffff" />
                  {t("pt.novel.readch1")}
                </Link>
                {novel.trailerThumbnail && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer transition-all hover:scale-[1.02] text-white hover:bg-white/20"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <PlayCircle size={18} variant="Bulk" color="#ffffff" />
                    {t("pt.novel.trailer")}
                  </button>
                )}
              </div>
            </div>

            {/* ── RIGHT PANEL — Book cover + Back ── */}
            <div className="hidden lg:flex flex-col items-center gap-4 lg:w-[18%] xl:w-[18%] flex-shrink-0 lg:pl-10 lg:self-end">
              {/* Book cover */}
              <div className="w-full overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]" style={{ borderRadius: "var(--glass-radius-lg)" }}>
                <HeroCoverCarousel
                  images={coverImages}
                  title={localize(novel.title, lang)}
                  onImageClick={() => setLightboxIndex(0)}
                />
              </div>
              {/* Back button */}
              <Link
                href={lhref("/")}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer transition-all hover:scale-[1.02] text-white hover:bg-white/20 self-end"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ArrowLeft2 size={16} variant="Linear" color="#ffffff" />
                {t("pt.novel.back") ?? "Back"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image carousel section — fluid */}
      <section className="py-3">
        <HeroImageCarousel
          images={galleryImages}
          onImageClick={(i) => setLightboxIndex(i + 1)}
        />
      </section>

      {/* Cast strip */}
      <CastStrip characters={characters} lang={lang} />

      {/* Fullscreen lightbox */}
      {lightboxIndex !== null && (
        <PhotoGalleryLightbox
          images={allImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Trailer player */}
      {showTrailer && (
        <TrailerPlayer
          src="/video-backgrounds/dark/space-war.mp4"
          title={localize(novel.title, lang)}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}

/* ================================================================== */
/*  SECTION 2 — BENTO GRID                                             */
/* ================================================================== */

function BentoGridSection({
  novel,
  characters,
}: {
  novel: PlottaleNovel;
  characters: PlottaleCharacter[];
}) {
  const { t, lang } = useLanguage();

  const galleryImages = novel.images.slice(0, 3);
  const hasCast = characters.length > 0;

  return (
    <section className="px-4 md:px-8 lg:px-12 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {/* Cast Card */}
        {hasCast && (
          <div
            className="md:col-span-2 p-5 overflow-hidden"
            style={{
              ...GLASS_STYLE,
              animation: "cardEnter 0.5s var(--ease-spring) 0.05s both",
            }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
              {t("pt.novel.cast")}
            </h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {characters.map((char) => (
                <div key={char.id} className="flex flex-col items-center flex-shrink-0 w-20">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 ring-2 ring-white/10">
                    <Image src={char.avatar} alt="" fill className="object-cover" sizes="64px" />
                  </div>
                  <span className="text-xs text-center font-medium text-neutral-700 dark:text-neutral-300 truncate w-full">
                    {localize(char.name, lang)}
                  </span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate w-full text-center">
                    {localize(char.role, lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Card */}
        <div
          className={`${hasCast ? "md:col-span-2" : "md:col-span-4"} p-5 overflow-hidden`}
          style={{
            ...GLASS_STYLE,
            animation: "cardEnter 0.5s var(--ease-spring) 0.1s both",
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
            {t("pt.novel.gallery")}
          </h3>
          <div className="grid grid-cols-3 gap-2 h-36">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden" style={{ borderRadius: "var(--glass-radius-sm)" }}>
                <Image src={img} alt="" fill className="object-cover" sizes="200px" />
              </div>
            ))}
          </div>
        </div>

        {/* Trailer Card */}
        {novel.trailerThumbnail && (
          <div
            className="md:col-span-2 p-5 overflow-hidden"
            style={{
              ...GLASS_STYLE,
              animation: "cardEnter 0.5s var(--ease-spring) 0.15s both",
            }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
              {t("pt.novel.trailer")}
            </h3>
            <div className="relative h-40 overflow-hidden group cursor-pointer" style={{ borderRadius: "var(--glass-radius-sm)" }}>
              <Image
                src={novel.trailerThumbnail}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Play size={22} variant="Bold" className="text-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Card */}
        <div
          className="md:col-span-1 p-5 flex flex-col items-center justify-center"
          style={{
            ...GLASS_STYLE,
            animation: "cardEnter 0.5s var(--ease-spring) 0.2s both",
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            {t("pt.novel.rating")}
          </h3>
          <span className="text-5xl font-bold text-neutral-800 dark:text-white mb-2">
            {novel.rating.toFixed(1)}
          </span>
          <Stars rating={novel.rating} size={14} />
        </div>

        {/* Author Card */}
        <div
          className="md:col-span-1 p-5 flex flex-col items-center justify-center"
          style={{
            ...GLASS_STYLE,
            animation: "cardEnter 0.5s var(--ease-spring) 0.25s both",
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            {t("pt.novel.author")}
          </h3>
          <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2 ring-2 ring-white/10">
            <Image src={novel.authorAvatar} alt="" fill className="object-cover" sizes="56px" />
          </div>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 text-center">
            {localize(novel.author, lang)}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 3 — CHAPTERS                                               */
/* ================================================================== */

function CreditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Modal */}
      <div
        className="relative p-8 text-center"
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: "var(--glass-radius-lg)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          animation: "cardEnter 0.35s var(--ease-spring) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-white/10 flex items-center justify-center mx-auto mb-5">
          <span className="text-neutral-700 dark:text-white/80 [&_svg]:!text-current">
            <Coin1 size={32} variant="Bulk" color="currentColor" />
          </span>
        </div>
        <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2">
          Premium Chapter
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
          This chapter requires <span className="font-semibold text-amber-500">1 credit</span> to unlock. Support the author and continue reading this story.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 transition-colors cursor-pointer"
            style={{ borderRadius: "var(--glass-radius-pill)" }}
          >
            Maybe Later
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
            style={{ borderRadius: "var(--glass-radius-pill)" }}
          >
            <Coin1 size={16} variant="Bold" color="white" />
            Unlock (1 Credit)
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ChaptersSection({ chapters, novelSlug }: { chapters: PlottaleChapter[]; novelSlug: string }) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const [creditModalOpen, setCreditModalOpen] = useState(false);

  // Saklı: chapters 3 & 4 are locked (premium)
  const isLocked = (ch: PlottaleChapter) => novelSlug === "sakli" && ch.number >= 3;

  if (chapters.length === 0) return null;

  return (
    <section className="px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Glass card wrapper */}
        <div className="p-6 md:p-8" style={GLASS_STYLE}>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-6">
            {t("pt.novel.chapters")}
          </h2>

          <style>{`.ch-item:hover > .ch-border { opacity: 0; } .ch-item:hover + .ch-item > .ch-border { opacity: 0; }`}</style>
          <div className="space-y-0">
            {chapters.map((ch, i) => {
              const locked = isLocked(ch);
              const inner = (
                <>
                  {/* Number */}
                  <span className={`text-3xl md:text-4xl font-extrabold w-12 flex-shrink-0 pt-1 tabular-nums ${locked ? "text-neutral-400 dark:text-white/40" : "text-neutral-800 dark:text-white/80"}`}>
                    {String(ch.number).padStart(2, "0")}.
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base md:text-lg font-semibold mb-1 transition-colors ${locked ? "text-neutral-400 dark:text-white/40 select-none" : "text-neutral-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400"}`}
                      style={locked ? { filter: "blur(5px)", WebkitFilter: "blur(5px)" } : undefined}
                    >
                      {localize(ch.title, lang)}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed line-clamp-2 ${locked ? "text-neutral-400/70 dark:text-neutral-500/70 select-none" : "text-neutral-500 dark:text-neutral-400"}`}
                      style={locked ? { filter: "blur(4px)", WebkitFilter: "blur(4px)" } : undefined}
                    >
                      {localize(ch.description, lang)}
                    </p>
                  </div>

                  {/* Lock icon or reading time */}
                  {locked ? (
                    <div
                      className="flex-shrink-0 self-center flex items-center justify-center rounded-full"
                      style={{
                        width: 32,
                        height: 32,
                        background: "var(--glass-bg)",
                        backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
                        WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <span className="text-neutral-700 dark:text-white/80 flex items-center justify-center [&_svg]:!text-current"><Lock1 size={16} variant="Bold" color="currentColor" /></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0 self-center">
                      <Clock size={14} />
                      <span>{ch.readingTime} {t("pt.novel.readtime")}</span>
                    </div>
                  )}
                </>
              );

              return (
                <div
                  key={ch.id}
                  className="ch-item"
                  style={{ animation: `cardEnter 0.5s var(--ease-spring) ${i * 0.06}s both` }}
                >
                  {i > 0 && (
                    <div className="ch-border border-t border-neutral-200/60 dark:border-white/10 transition-opacity duration-200 mx-4" />
                  )}
                  {locked ? (
                    <button
                      onClick={() => setCreditModalOpen(true)}
                      className="group flex gap-5 md:gap-8 py-5 px-4 hover:bg-neutral-100/50 dark:hover:bg-white/5 transition-colors w-full text-left cursor-pointer"
                      style={{ borderRadius: "var(--glass-radius)" }}
                    >
                      {inner}
                    </button>
                  ) : (
                    <Link
                      href={lhref(`/novel/${novelSlug}/chapter-${ch.number}`)}
                      className="group flex gap-5 md:gap-8 py-5 px-4 hover:bg-neutral-100/50 dark:hover:bg-white/5 transition-colors"
                      style={{ borderRadius: "var(--glass-radius)" }}
                    >
                      {inner}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CreditModal open={creditModalOpen} onClose={() => setCreditModalOpen(false)} />
    </section>
  );
}

/* ================================================================== */
/*  SECTION 4 — RELATED NOVELS                                        */
/* ================================================================== */

function RelatedNovelsSection({ novel }: { novel: PlottaleNovel }) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const { isDarkBg } = useBackground();

  const allNovels = getAllNovels();
  const novelGenreKeys = novel.genres.map((g) => g.en);

  // Find novels that share at least one genre, excluding current
  const related = allNovels
    .filter((n) => n.id !== novel.id && n.genres.some((g) => novelGenreKeys.includes(g.en)))
    .slice(0, 8);

  if (related.length === 0) return null;

  const headingColor = isDarkBg ? "text-white" : "text-neutral-800 dark:text-white";
  const titleColor = isDarkBg ? "text-white group-hover:text-amber-400" : "text-neutral-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400";
  const subtitleColor = isDarkBg ? "text-white/60" : "text-neutral-500 dark:text-neutral-400";

  return (
    <section className="px-4 md:px-8 lg:px-12 py-10 pb-20">
      <div className="max-w-6xl mx-auto">
      <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${headingColor}`}>
        {t("pt.novel.related")}
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {related.map((n, i) => (
          <Link
            key={n.id}
            href={lhref(`/novel/${n.slug}`)}
            className="flex-shrink-0 w-36 md:w-44 group"
            style={{ animation: `cardEnter 0.5s var(--ease-spring) ${i * 0.06}s both` }}
          >
            <div
              className="relative aspect-[9/16] rounded-xl overflow-hidden mb-3"
              style={{
                ...GLASS_STYLE,
                padding: 0,
                border: "none",
              }}
            >
              <Image
                src={n.coverImage}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="176px"
              />
            </div>
            <h3 className={`text-sm font-semibold truncate transition-colors ${titleColor}`}>
              {localize(n.title, lang)}
            </h3>
            <p className={`text-xs truncate ${subtitleColor}`}>
              {localize(n.author, lang)}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  NOT FOUND STATE                                                    */
/* ================================================================== */

function NotFound() {
  const { t } = useLanguage();
  const lhref = useLocalizedHref();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-white mb-3">
        {t("pt.novel.notfound")}
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6" style={{ maxWidth: "448px" }}>
        {t("pt.novel.notfound.desc")}
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

export default function NovelDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const novel = getNovelBySlug(slug);

  if (!novel) return <NotFound />;

  const chapters = getChaptersByNovelId(novel.id);
  const characters = getCharactersByNovelId(novel.id);

  // Prev / Next novel navigation
  const allNovels = getAllNovels();
  const currentIndex = allNovels.findIndex((n) => n.id === novel.id);
  const prevNovel = currentIndex > 0 ? allNovels[currentIndex - 1] : null;
  const nextNovel = currentIndex < allNovels.length - 1 ? allNovels[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <CinematicHero novel={novel} chapters={chapters} characters={characters} prevNovel={prevNovel} nextNovel={nextNovel} />
      <ChaptersSection chapters={chapters} novelSlug={novel.slug} />
      <RelatedNovelsSection novel={novel} />
    </div>
  );
}
