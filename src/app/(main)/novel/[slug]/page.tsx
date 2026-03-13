"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Star1, ArrowLeft2, ArrowRight2, PlayCircle, Play, Clock, Book1 } from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";
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
            className="max-h-[calc(100vh-160px)] w-auto object-contain rounded-lg"
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
              className="flex-shrink-0 relative rounded-lg cursor-pointer transition-all duration-200"
              style={{
                width: 72,
                height: 48,
                opacity: i === currentIndex ? 1 : 0.4,
                boxShadow: i === currentIndex ? "0 0 0 2px rgba(0,0,0,1), 0 0 0 4px rgba(255,255,255,0.85)" : "none",
              }}
            >
              <Image src={img} alt="" fill className="object-cover rounded-lg" sizes="72px" />
            </button>
          ))}
        </div>
      </div>
    </div>
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
  if (characters.length === 0) return null;
  return (
    <section className="py-4 px-4 md:px-8 lg:px-12">
      <div
        className="flex gap-3 justify-center flex-wrap"
      >
        {characters.map((char) => (
          <div key={char.id} className="flex-shrink-0 w-[110px] lg:w-[120px] transition-transform duration-300 hover:scale-110 cursor-pointer">
            {/* Card with photo fills entire card */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 group">
              <Image src={char.avatar} alt={localize(char.name, lang)} fill className="object-cover" sizes="120px" />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              {/* Name + Role on bottom-left */}
              <div className="absolute bottom-2 left-2 right-9">
                <p className="text-[11px] font-semibold text-white truncate leading-tight">
                  {localize(char.name, lang)}
                </p>
                <p className="text-[9px] text-white/60 truncate leading-tight mt-0.5">
                  {localize(char.role, lang)}
                </p>
              </div>
              {/* [+] follow button on bottom-right */}
              <button className="absolute bottom-2 right-1.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold hover:bg-white/40 transition cursor-pointer">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
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
  const lhref = useLocalizedHref();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Gallery images: exclude cover (shown separately in hero)
  const galleryImages = novel.images.filter((img) => img !== novel.coverImage);
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
          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/40" />
        </div>

        {/* Two-column content area */}
        <div className="relative z-10 w-full pb-10 md:pb-14 pt-40 max-[1024px]:pt-44">
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-end">
            {/* Cover image — shown first on mobile, moves to right on desktop */}
            <div className="w-[55%] mx-auto lg:hidden">
              <button
                onClick={() => setLightboxIndex(0)}
                className="relative block w-full aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={novel.coverImage}
                  alt={localize(novel.title, lang)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="50vw"
                  priority
                />
              </button>
            </div>

            {/* Left column — Novel info */}
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {novel.contentRating && (
                  <span className="px-2 py-0.5 text-xs font-bold border border-white/40 text-white/90 rounded">
                    {novel.contentRating}
                  </span>
                )}
                {novel.genres.map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/80 border border-white/10"
                  >
                    {localize(g, lang)}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-2xl">
                {localize(novel.title, lang)}
              </h1>

              {/* 1. Author profile */}
              <div className="flex items-center gap-3 mb-5">
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

              {/* 2–3. Synopsis + more synopsis */}
              <div className="mb-6 space-y-3" style={{ maxWidth: "576px" }}>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  {localize(novel.synopsis, lang)}
                </p>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {lang === "th"
                    ? "เรื่องราวที่สะเทือนใจจากนวนิยายชื่อดังของเอลซา จูเบิร์ต เล่าชีวิตจริงของหญิงชาวโคซาผู้ผ่านพ้นยุคการแบ่งแยกสีผิว ความรัก ความสูญเสีย และความหวังที่ไม่มีวันดับ"
                    : "Based on the celebrated novel by Elsa Joubert, this is the true-to-life story of a Xhosa woman navigating the apartheid era — a tale of love, loss, and an unyielding hope that refuses to be silenced."}
                </p>
              </div>

              {/* 4. Review / Rating */}
              <div className="flex items-center gap-2 mb-8">
                <Stars rating={novel.rating} size={18} />
              </div>

              {/* 5. CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={lhref(`/novel/${novel.slug}/chapter-1`)}
                  className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm cursor-pointer transition-all hover:brightness-110 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}
                >
                  <Book1 size={20} variant="Bold" color="#ffffff" />
                  {t("pt.novel.readch1")}
                </Link>
                {novel.trailerThumbnail && (
                  <button
                    className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm cursor-pointer transition-all hover:bg-white/20 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <PlayCircle size={20} variant="Bulk" color="#ffffff" />
                    {t("pt.novel.trailer")}
                  </button>
                )}
                <Link
                  href={lhref("/")}
                  className="ml-auto flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold text-sm cursor-pointer transition-all hover:bg-white/20 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <ArrowLeft2 size={18} variant="Linear" color="#ffffff" />
                  {t("pt.novel.back") ?? "Back"}
                </Link>
              </div>
            </div>

            {/* Right column — Cover image (desktop only) */}
            <div className="hidden lg:block lg:w-[30%] xl:w-[32%] flex-shrink-0">
              <button
                onClick={() => setLightboxIndex(0)}
                className="relative block w-full aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={novel.coverImage}
                  alt={localize(novel.title, lang)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="50vw"
                  priority
                />
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Prev / Next novel arrows — desktop only, appear on gutter hover */}
        <style>{`
          .novel-nav-zone .novel-nav-btn { opacity: 0; transform: translateY(-50%) scale(0.8); }
          .novel-nav-zone:hover .novel-nav-btn { opacity: 1; transform: translateY(-50%) scale(1); }
        `}</style>
        {prevNovel && (
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 z-20" style={{ width: "calc((100% - 1152px) / 2 + 48px)" }}>
            <Link
              href={lhref(`/novel/${prevNovel.slug}`)}
              className="novel-nav-zone block absolute inset-0 cursor-pointer"
              title={localize(prevNovel.title, lang)}
            >
              <div className="novel-nav-btn page-nav-arrow absolute top-1/2 right-8 transition-all duration-300">
                <ArrowLeft2 size={20} variant="Linear" color="currentColor" />
              </div>
            </Link>
          </div>
        )}
        {nextNovel && (
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 z-20" style={{ width: "calc((100% - 1152px) / 2 + 48px)" }}>
            <Link
              href={lhref(`/novel/${nextNovel.slug}`)}
              className="novel-nav-zone block absolute inset-0 cursor-pointer"
              title={localize(nextNovel.title, lang)}
            >
              <div className="novel-nav-btn page-nav-arrow absolute top-1/2 left-8 transition-all duration-300">
                <ArrowRight2 size={20} variant="Linear" color="currentColor" />
              </div>
            </Link>
          </div>
        )}
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
              <div key={i} className="relative rounded-lg overflow-hidden">
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
            <div className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
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

function ChaptersSection({ chapters, novelSlug }: { chapters: PlottaleChapter[]; novelSlug: string }) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();

  if (chapters.length === 0) return null;

  return (
    <section className="px-4 md:px-8 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Glass card wrapper */}
        <div className="p-6 md:p-8" style={GLASS_STYLE}>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-6">
            {t("pt.novel.chapters")}
          </h2>

          <div className="space-y-0">
            {chapters.map((ch, i) => (
              <div
                key={ch.id}
                style={{ animation: `cardEnter 0.5s var(--ease-spring) ${i * 0.06}s both` }}
              >
                {i > 0 && (
                  <div className="border-t border-neutral-200/60 dark:border-white/10" />
                )}
                <Link
                  href={lhref(`/novel/${novelSlug}/chapter-${ch.number}`)}
                  className="group flex gap-5 md:gap-8 py-5 px-2 rounded-xl hover:bg-neutral-100/50 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Number */}
                  <span className="text-3xl md:text-4xl font-extrabold text-neutral-800 dark:text-white/80 w-12 flex-shrink-0 pt-1 tabular-nums">
                    {String(ch.number).padStart(2, "0")}.
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-neutral-800 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {localize(ch.title, lang)}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {localize(ch.description, lang)}
                    </p>
                  </div>

                  {/* Reading time */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0 self-center">
                    <Clock size={14} />
                    <span>{ch.readingTime} {t("pt.novel.readtime")}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 4 — RELATED NOVELS                                        */
/* ================================================================== */

function RelatedNovelsSection({ novel }: { novel: PlottaleNovel }) {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();

  const allNovels = getAllNovels();
  const novelGenreKeys = novel.genres.map((g) => g.en);

  // Find novels that share at least one genre, excluding current
  const related = allNovels
    .filter((n) => n.id !== novel.id && n.genres.some((g) => novelGenreKeys.includes(g.en)))
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="px-4 md:px-8 lg:px-12 py-10 pb-20">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-8">
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
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {localize(n.title, lang)}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
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
