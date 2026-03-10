"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Book1,
  MessageText1,
  VideoPlay,
  People,
  Star1,
  Edit2,
  Brush2,
  DocumentText1,
  TickCircle,
  DollarCircle,
  ArrowRight,
  ArrowLeft2,
  ArrowRight2,
  BookSaved,
  ExportSquare,
  Verify,
  Add,
  Heart,
  Send2,
  More,
  Bookmark,
  Link1,
  EyeSlash,
  Flag,
  Play,
  PlayCircle,
  Gallery as GalleryIcon,
} from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import {
  type PlottaleNovel,
  type PlottaleFeature,
  type PlottaleCharacter,
  type PlottalePost,
  type LocalizedString,
  getAllNovels,
  getAllFeatures,
  getAllCharacters,
  getAllPosts,
  getCharacterById,
  localize,
  FOOTER_LINKS,
  HERO_PILLS,
} from "@/data/plottale-content";

/* ================================================================== */
/*  ICON MAP — resolves string keys from content data to components    */
/* ================================================================== */

const ICON_MAP: Record<string, typeof Book1> = {
  MessageText1,
  Book1,
  VideoPlay,
  People,
  Edit2,
  Brush2,
  DocumentText1,
  TickCircle,
  DollarCircle,
};

/* ================================================================== */
/*  GLASS STYLE CONSTANTS                                              */
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
/*  SECTION 1 — HERO                                                   */
/* ================================================================== */

const HERO_SLIDES = [
  {
    eyebrow: "pt.hero.eyebrow",
    headline: "pt.hero.headline",
    subheading: "pt.hero.subheading",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 20%, #f59e0b 50%, #ea580c 75%, #1a1a2e 100%)",
    gradientDark: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 25%, #f59e0b 50%, #ea580c 75%, #fbbf24 100%)",
    eyebrowColor: "rgb(245 158 11 / 0.9)",
    ctaGradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    ctaShadow: "rgba(245,158,11,0.35)",
  },
  {
    eyebrow: "pt.hero.eyebrow2",
    headline: "pt.hero.headline2",
    subheading: "pt.hero.subheading2",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f172a 15%, #6366f1 40%, #a855f7 60%, #ec4899 80%, #1a1a2e 100%)",
    gradientDark: "linear-gradient(135deg, #c7d2fe 0%, #818cf8 25%, #a855f7 50%, #ec4899 75%, #c084fc 100%)",
    eyebrowColor: "rgb(168 85 247 / 0.9)",
    ctaGradient: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
    ctaShadow: "rgba(168,85,247,0.35)",
  },
  {
    eyebrow: "pt.hero.eyebrow3",
    headline: "pt.hero.headline3",
    subheading: "pt.hero.subheading3",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #064e3b 15%, #10b981 40%, #06b6d4 60%, #3b82f6 80%, #1a1a2e 100%)",
    gradientDark: "linear-gradient(135deg, #a7f3d0 0%, #34d399 25%, #06b6d4 50%, #3b82f6 75%, #34d399 100%)",
    eyebrowColor: "rgb(16 185 129 / 0.9)",
    ctaGradient: "linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)",
    ctaShadow: "rgba(16,185,129,0.35)",
  },
];

const THAI_HEADER_FONT = "var(--font-ibm-plex-thai), var(--font-jakarta), system-ui, sans-serif";
const THAI_HEADER_STYLE = { fontFamily: THAI_HEADER_FONT, lineHeight: 1.35 } as const;

function HeroSection() {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const isThai = lang === "th";
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);

  /* Detect dark mode */
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  /* Auto-rotate slides */
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = HERO_SLIDES[activeIdx];
  const gradientBg = isDark ? current.gradientDark : current.gradient;

  return (
    <section className="relative flex flex-col items-center text-center px-4 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28 lg:pl-24">
      {/* Eyebrow */}
      <p
        className="text-[12px] md:text-[13px] font-[600] tracking-[0.12em] uppercase mb-4"
        style={{
          color: current.eyebrowColor,
          transition: "opacity 500ms ease-out, transform 500ms ease-out, color 600ms ease-out",
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {t(current.eyebrow)}
      </p>

      {/* Headline carousel */}
      <div className="relative w-full max-w-[900px]" style={{ minHeight: "clamp(80px, 15vw, 160px)" }}>
        <h1
          className="text-[36px] md:text-[52px] lg:text-[64px] xl:text-[72px] font-[850] tracking-[-0.04em] leading-[1.05] whitespace-pre-line bg-clip-text [-webkit-text-fill-color:transparent]"
          style={{
            backgroundImage: gradientBg,
            transition: "opacity 500ms ease-out, transform 500ms ease-out, filter 500ms ease-out, background-image 600ms ease-out",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(12px)",
            filter: fade ? "blur(0px)" : "blur(4px)",
            ...(isThai ? THAI_HEADER_STYLE : {}),
          }}
        >
          {t(current.headline)}
        </h1>
      </div>

      {/* Subheading */}
      <p
        className="mt-5 md:mt-6 text-[15px] md:text-[17px] font-[450] text-gray-500 dark:text-white/60 max-w-[560px] leading-[1.6]"
        style={{
          transition: "opacity 500ms ease-out, transform 500ms ease-out",
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {t(current.subheading)}
      </p>

      {/* Carousel dots */}
      <div className="flex items-center gap-2 mt-5">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setActiveIdx(i);
                setFade(true);
              }, 400);
            }}
            className="border-none cursor-pointer transition-all duration-300 rounded-full"
            style={{
              width: i === activeIdx ? 24 : 8,
              height: 8,
              background: i === activeIdx
                ? slide.eyebrowColor
                : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"),
              opacity: i === activeIdx ? 1 : 0.6,
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3 mt-8 md:mt-10">
        <Link
          href={lhref("/novels")}
          className="h-12 px-7 rounded-full text-[14px] font-[650] text-white flex items-center gap-2 cursor-pointer hover:scale-[1.04]"
          style={{
            background: current.ctaGradient,
            boxShadow: `0 4px 20px ${current.ctaShadow}`,
            transition: "background 600ms ease-out, box-shadow 600ms ease-out, transform 300ms ease-out",
          }}
        >
          {t("pt.hero.cta.explore")}
          <ArrowRight size={16} variant="Linear" color="currentColor" />
        </Link>
        <Link
          href={lhref("/create")}
          className="h-12 px-7 rounded-full text-[14px] font-[650] text-black dark:text-white flex items-center gap-2 cursor-pointer border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          <Add size={16} variant="Linear" color="currentColor" />
          {t("pt.hero.cta.create")}
        </Link>
      </div>

      {/* Hero feature pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-10 md:mt-14">
        {HERO_PILLS.map((item, i) => (
          <div
            key={item.labelKey}
            className="glass-panel flex items-center justify-center px-6 py-3 md:px-7 md:py-3.5 text-[14px] md:text-[15px] font-[580] text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:scale-[1.06] transition-all duration-300 cursor-default !rounded-full"
            style={{
              animation: `cardEnter 0.6s var(--ease-spring) ${i * 0.08}s both`,
            }}
          >
            {t(item.labelKey)}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 2 — NOVEL CARDS (reference: Banff travel card style)       */
/* ================================================================== */

function ImageCarousel({
  images,
  placeholderGradient,
  title,
}: {
  images: string[];
  placeholderGradient: string;
  title: string;
}) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const totalSlides = images.length;

  /* Auto-rotate: random interval 8–16s, random initial delay 0–4s */
  useEffect(() => {
    if (totalSlides <= 1) return;
    const delay = Math.random() * 4000;
    const interval = 8000 + Math.random() * 8000;
    let timer: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % totalSlides);
      }, interval);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
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
    <div className="relative w-full aspect-[9/16] overflow-hidden group/carousel rounded-t-[var(--glass-radius-lg)]">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            {img ? (
              <>
                <Image
                  src={img}
                  alt={`${title} — image ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const sibling = target.nextElementSibling as HTMLElement;
                    if (sibling) sibling.style.display = "flex";
                  }}
                />
                {/* Fallback gradient (shown on img error) */}
                <div
                  className="absolute inset-0 items-center justify-center"
                  style={{ background: placeholderGradient, display: "none" }}
                >
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <BookSaved size={36} variant="Bulk" color="white" />
                    <span className="text-[12px] font-[500] text-white/60">{t("pt.card.coverart")}</span>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: placeholderGradient }}
              >
                <div className="flex flex-col items-center gap-2 opacity-25">
                  <BookSaved size={36} variant="Bulk" color="white" />
                  <span className="text-[12px] font-[500] text-white/40">{t("pt.card.scene")} {idx + 1}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dot indicators — at TOP of image */}
      {totalSlides > 1 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
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

function NovelCard({ novel, index }: { novel: PlottaleNovel; index: number }) {
  const { lang } = useLanguage();
  const lhref = useLocalizedHref();
  const [hovered, setHovered] = useState(false);

  /* Detect dark mode (class-based) */
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* Theme-inverted colors on hover */
  const hoverBg = hovered
    ? isDark ? "rgba(255,255,255,0.95)" : "rgba(15,15,20,0.95)"
    : undefined;
  const hoverTitle = hovered
    ? isDark ? "#111827" : "#ffffff"
    : undefined;

  return (
    <Link
      href={lhref(`/novel/${novel.slug}`)}
      className="relative group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.06}s both`,
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div
        className="overflow-hidden flex flex-col transition-all duration-500 ease-out"
        style={{
          ...GLASS_STYLE,
          border: "none",
          transform: hovered ? "scale(1.3)" : "scale(1)",
          transformOrigin: "center center",
          ...(hoverBg ? { background: hoverBg } : {}),
        }}
      >
        {/* ── Top-right arrow on hover ── */}
        <div
          className="absolute top-0 right-0 transition-all duration-500 ease-out"
          style={{
            paddingTop: "calc(10px + var(--glass-radius-lg) * 0.4)",
            paddingRight: "calc(10px + var(--glass-radius-lg) * 0.4)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0, 0) scale(1)" : "translate(-4px, 4px) scale(0.5)",
          }}
        >
          <ExportSquare size={22} variant="Linear" color={hoverTitle ?? "currentColor"} />
        </div>

        {/* ── Top section: title only (constant height) ── */}
        <div className="text-left" style={{ paddingTop: "calc(10px + var(--glass-radius-lg) * 0.4)", paddingBottom: "calc(6px + var(--glass-radius-lg) * 0.15)", paddingLeft: "calc(16px + var(--glass-radius-lg) * 0.5)", paddingRight: "calc(16px + var(--glass-radius-lg) * 0.5)" }}>
          <h3
            className="text-[17px] md:text-[18px] font-[750] text-gray-900 dark:text-white leading-[1.25] tracking-[-0.02em] line-clamp-1 transition-colors duration-300"
            style={{
              ...(hoverTitle ? { color: hoverTitle } : {}),
              ...(lang === "th" ? THAI_HEADER_STYLE : {}),
            }}
          >
            {localize(novel.title, lang)}
          </h3>
        </div>

        {/* ── Image carousel + hover overlay ── */}
        <div className="relative">
          <ImageCarousel
            images={novel.images}
            placeholderGradient={novel.placeholderGradient}
            title={localize(novel.title, lang)}
          />

          {/* Hover overlay: full title + genre tags + rating + synopsis — overlays image top, above dots (z-20) */}
          <div
            className="absolute inset-x-0 top-0 z-20 transition-all duration-500 ease-out pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.4) 80%, transparent 100%)",
              padding: "10px 12px 36px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            {/* Author avatar + name */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20">
                <Image
                  src={novel.authorAvatar}
                  alt={localize(novel.author, lang)}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[12px] font-[600] text-white/90 truncate">
                {localize(novel.author, lang)}
              </span>
            </div>

            {/* Genre tags + rating */}
            <div className="flex items-center gap-1 flex-nowrap overflow-hidden mb-1.5">
              {novel.genres.map((g) => (
                <span
                  key={g.en}
                  className="shrink-0 px-2 py-[2px] rounded-full text-[10px] font-[600] text-white/75 bg-white/[0.15]"
                >
                  {localize(g, lang)}
                </span>
              ))}
              <span className="shrink-0 flex items-center gap-0.5 px-2 py-[2px] rounded-full text-[10px] font-[650] text-white/90 bg-white/[0.15]">
                <Star1 size={10} variant="Bold" color="#fbbf24" />
                {novel.rating}
              </span>
            </div>

            {/* Synopsis — full text */}
            <p className="text-[12px] font-[430] text-white/75 leading-[1.5]">
              {localize(novel.synopsis, lang)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NovelCardsSection() {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const novels = getAllNovels();

  return (
    <section className="px-4 md:px-8 lg:pl-28 lg:pr-10 xl:pl-32 xl:pr-12 pb-16 md:pb-24">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 max-w-[2400px] mx-auto">
        <div>
          <p className="text-[12px] font-[600] tracking-[0.1em] uppercase text-amber-500/80 mb-2">
            {t("pt.novels.badge")}
          </p>
          <h2 className="text-[28px] md:text-[36px] font-[800] tracking-[-0.03em] text-gray-900 dark:text-white leading-tight" style={lang === "th" ? THAI_HEADER_STYLE : undefined}>
            {t("pt.novels.title")}
          </h2>
          <p className="mt-2 text-[14px] font-[430] text-black/60 dark:text-white/60 max-w-[450px]">
            {t("pt.novels.desc")}
          </p>
        </div>
        <Link
          href={lhref("/novels")}
          className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-[600] text-black dark:text-white border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          {t("pt.novels.viewall")}
          <ArrowRight size={14} variant="Linear" color="currentColor" />
        </Link>
      </div>

      {/* Cards grid — scales up to 8 columns on ultrawide */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 min-[1920px]:grid-cols-8 gap-3 md:gap-4 max-w-[2400px] mx-auto">
        {novels.map((novel, i) => (
          <NovelCard key={novel.id} novel={novel} index={i} />
        ))}
      </div>

      {/* Mobile view all link */}
      <div className="flex justify-center mt-8 md:hidden">
        <Link
          href={lhref("/novels")}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-[600] text-black dark:text-white border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          {t("pt.novels.viewall.mobile")}
          <ArrowRight size={14} variant="Linear" color="currentColor" />
        </Link>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 2.5 — OUTSTANDING AI CHARACTERS (social cards)             */
/* ================================================================== */

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function CharacterCard({
  character,
  index,
}: {
  character: PlottaleCharacter;
  index: number;
}) {
  const { lang, t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  /* Detect dark mode */
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  /* Gel shadow for Follow button — inverted theme */
  const followGelShadow = isDark
    ? [
        "inset 0 1px 1px 0 rgba(255,255,255,0.35)",
        "inset 0 -1px 2px 0 rgba(0,0,0,0.08)",
        "0 1px 3px 0 rgba(255,255,255,0.08)",
        "0 4px 12px 0 rgba(255,255,255,0.06)",
      ].join(", ")
    : [
        "inset 0 1px 1px 0 rgba(255,255,255,0.18)",
        "inset 0 -1px 2px 0 rgba(0,0,0,0.25)",
        "0 1px 3px 0 rgba(0,0,0,0.12)",
        "0 4px 12px 0 rgba(0,0,0,0.10)",
      ].join(", ");

  return (
    <div
      className="relative group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.06}s both`,
        zIndex: hovered ? 10 : 1,
      }}
    >
      {/* Inner card — scales beyond grid cell on hover */}
      <div
        className="overflow-hidden flex flex-col transition-all duration-500 ease-out"
        style={{
          ...GLASS_STYLE,
          border: "none",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          transformOrigin: "center center",
        }}
      >
        {/* Banner — full-width gradient background, clickable */}
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full flex-shrink-0 block cursor-pointer"
          style={{
            aspectRatio: "16 / 7",
            background: character.placeholderGradient,
            borderRadius: "var(--glass-radius-lg) var(--glass-radius-lg) 0 0",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Banner image */}
          {character.banner && (
            <Image
              src={character.banner}
              alt=""
              fill
              className="object-cover"
              style={{ borderRadius: "var(--glass-radius-lg) var(--glass-radius-lg) 0 0" }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          )}
        </a>

        {/* Avatar — centered, overlapping banner, clickable */}
        <div className="relative flex justify-center" style={{ marginTop: "-28px" }}>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full overflow-hidden border-[3px] flex-shrink-0 cursor-pointer hover:scale-[1.08] transition-transform duration-200"
            style={{
              borderColor: "var(--glass-bg, rgba(255,255,255,0.8))",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {character.avatar ? (
              <Image
                src={character.avatar}
                alt={localize(character.name, lang)}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white/80 text-[22px] font-[700]"
                style={{ background: character.placeholderGradient }}
              >
                {localize(character.name, lang).charAt(0)}
              </div>
            )}
          </a>
        </div>

        {/* Content area — centered */}
        <div className="flex flex-col items-center px-3 pt-1.5 pb-3 gap-0.5">
          {/* Name + verified */}
          <div className="flex items-center gap-1">
            <h3
              className="text-[13px] md:text-[14px] font-[700] tracking-[-0.01em] line-clamp-1 text-gray-900 dark:text-white"
              style={lang === "th" ? THAI_HEADER_STYLE : undefined}
            >
              {localize(character.name, lang)}
            </h3>
            {character.verified && (
              <Verify size={13} variant="Bold" color="#22c55e" />
            )}
          </div>

          {/* Handle */}
          <p className="text-[10px] font-[450] text-gray-400 dark:text-white/40">
            {character.handle}
          </p>

          {/* Stats row — 2 columns: Followers + Novels */}
          <div className="grid grid-cols-2 w-full mt-2 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-[26px] font-[750] text-gray-900 dark:text-white leading-none">
                {formatCount(character.followers)}
              </span>
              <span className="text-[9px] font-[450] text-gray-400 dark:text-white/40 mt-0.5">
                {t("pt.chars.followers")}
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-gray-200/50 dark:border-white/10">
              <span className="text-[26px] font-[750] text-gray-900 dark:text-white leading-none">
                {character.novelCount}
              </span>
              <span className="text-[9px] font-[450] text-gray-400 dark:text-white/40 mt-0.5">
                {t("pt.chars.novels")}
              </span>
            </div>
          </div>

          {/* 2 Buttons — Follow/Following + Chat */}
          <div className="flex items-center gap-2 w-full px-1">
            {character.isFollowing ? (
              /* Following state — purple-blue gradient */
              <button
                className="flex-1 h-[30px] rounded-full text-[11px] font-[650] cursor-pointer transition-all duration-200 hover:scale-[1.04] flex items-center justify-center gap-1 text-white"
                style={{
                  background: "linear-gradient(135deg, #1e1b4b, #3730a3, #6d28d9)",
                  boxShadow: "0 2px 10px rgba(55,48,163,0.4), inset 0 1px 1px rgba(255,255,255,0.12)",
                }}
              >
                {t("pt.chars.following")}
              </button>
            ) : (
              /* Follow state — gel, inverted theme */
              <button
                className="flex-1 h-[30px] rounded-full text-[11px] font-[650] cursor-pointer transition-all duration-200 hover:scale-[1.04] flex items-center justify-center gap-1"
                style={{
                  background: isDark ? "rgba(255,255,255,0.95)" : "rgba(15,15,20,0.92)",
                  color: isDark ? "#111" : "#fff",
                  boxShadow: followGelShadow,
                }}
              >
                <Add size={13} variant="Linear" color="currentColor" />
                {t("pt.chars.follow")}
              </button>
            )}
            <button
              className="group/chat flex-1 h-[30px] rounded-full text-[11px] font-[600] cursor-pointer transition-all duration-200 border text-gray-700 dark:text-white/80 border-gray-300 dark:border-white/20 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-amber-500/20"
              style={{}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #f59e0b, #ea580c)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.color = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              {t("pt.chars.chat")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacterSection() {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const characters = getAllCharacters().slice(0, 12);

  return (
    <section className="px-4 md:px-8 lg:pl-28 lg:pr-10 xl:pl-32 xl:pr-12 pb-16 md:pb-24">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 max-w-[2400px] mx-auto">
        <div>
          <p className="text-[12px] font-[600] tracking-[0.1em] uppercase text-amber-500/80 mb-2">
            {t("pt.chars.badge")}
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-[800] tracking-[-0.03em] text-gray-900 dark:text-white leading-tight"
            style={lang === "th" ? THAI_HEADER_STYLE : undefined}
          >
            {t("pt.chars.title")}
          </h2>
          <p className="mt-2 text-[14px] font-[430] text-black/60 dark:text-white/60 max-w-[450px]">
            {t("pt.chars.desc")}
          </p>
        </div>
        <Link
          href={lhref("/characters")}
          className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-[600] text-black dark:text-white border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          {t("pt.chars.viewall")}
          <ArrowRight size={14} variant="Linear" color="currentColor" />
        </Link>
      </div>

      {/* Character cards grid — ~2 rows with 10 cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 min-[1920px]:grid-cols-8 gap-3 md:gap-4 max-w-[2400px] mx-auto">
        {characters.map((character, i) => (
          <CharacterCard key={character.id} character={character} index={i} />
        ))}
      </div>

      {/* Mobile view all link */}
      <div className="flex justify-center mt-8 md:hidden">
        <Link
          href={lhref("/characters")}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-[600] text-black dark:text-white border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          {t("pt.chars.viewall")}
          <ArrowRight size={14} variant="Linear" color="currentColor" />
        </Link>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 2.5 — POST FEED (masonry)                                  */
/* ================================================================== */

/* ── PostMoreMenu ── */

function PostMoreMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const items = [
    { icon: Bookmark, label: t("pt.feed.bookmark") },
    { icon: Link1, label: t("pt.feed.copylink") },
    { icon: EyeSlash, label: t("pt.feed.notinterested") },
    { icon: Flag, label: t("pt.feed.report") },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute right-0 bottom-full mb-1 z-50 w-44 py-1.5"
      style={{
        ...GLASS_STYLE,
        borderRadius: "calc(var(--glass-radius-lg) * 0.5)",
        animation: "cardEnter 0.22s var(--ease-spring) both",
      }}
    >
      {items.map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={onClose}
          className="w-full px-3 py-2 flex items-center gap-2.5 text-[12px] font-[500] text-gray-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer rounded-lg mx-0"
        >
          <Icon size={16} variant="Linear" color="currentColor" />
          {label}
        </button>
      ))}
    </div>
  );
}

/* ── PostActionBar ── */

function PostActionBar({
  post,
  menuOpen,
  onMenuToggle,
}: {
  post: PlottalePost;
  menuOpen: boolean;
  onMenuToggle: () => void;
}) {
  const { t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);

  const handleLike = useCallback(() => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 350);
  }, []);

  return (
    <div className="flex items-center justify-between px-3 py-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-0.5">
        {/* Love */}
        <button
          onClick={handleLike}
          className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
        >
          <span
            style={{
              display: "inline-flex",
              transform: likeAnim ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <Heart
              size={18}
              variant={liked ? "Bold" : "Linear"}
              color={liked ? "#ef4444" : "currentColor"}
            />
          </span>
          <span className="social-count text-[11px] font-[500] text-gray-500 dark:text-white/50">
            {formatCount(likeCount)}
          </span>
        </button>

        {/* Comment */}
        <button className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
          <MessageText1 size={18} variant="Linear" color="currentColor" />
          <span className="social-count text-[11px] font-[500] text-gray-500 dark:text-white/50">
            {formatCount(post.comments)}
          </span>
        </button>

        {/* Share */}
        <button className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
          <Send2 size={16} variant="Linear" color="currentColor" />
        </button>
      </div>

      {/* More menu */}
      <div className="relative">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
        >
          <span className="flex flex-col items-center justify-center gap-[3px] w-[18px] h-[18px]">
                <span className="w-[3.5px] h-[3.5px] rounded-full bg-current" />
                <span className="w-[3.5px] h-[3.5px] rounded-full bg-current" />
                <span className="w-[3.5px] h-[3.5px] rounded-full bg-current" />
              </span>
        </button>
        <PostMoreMenu open={menuOpen} onClose={onMenuToggle} />
      </div>
    </div>
  );
}

/* ── PostImageGrid ── */

function PostImageGrid({ images }: { images: string[] }) {
  const imgs = images.slice(0, 4);
  const count = imgs.length;

  /* 2 imgs: 1 + 1, 3 imgs: 1 + 2, 4 imgs: 2 + 2 */
  const splitAt = count <= 3 ? 1 : 2;
  const left = imgs.slice(0, splitAt);
  const right = imgs.slice(splitAt);

  return (
    <div className="flex gap-1.5 mx-3 overflow-hidden" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.55)" }}>
      {/* Left column */}
      <div className="flex-1 flex flex-col gap-1.5">
        {left.map((img, i) => (
          <Image key={i} src={img} alt="" width={400} height={500} className="w-full h-auto" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.35)" }} />
        ))}
      </div>
      {/* Right column */}
      {right.length > 0 && (
        <div className="flex-1 flex flex-col gap-1.5">
          {right.map((img, i) => (
            <Image key={i} src={img} alt="" width={400} height={500} className="w-full h-auto" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.35)" }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── PostVideoThumbnail ── */

function PostVideoThumbnail({
  thumbnail,
  duration,
}: {
  thumbnail: string;
  duration?: string;
}) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg mx-3" style={{ width: "calc(100% - 24px)" }}>
      <Image src={thumbnail} alt="" fill className="object-cover" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
          <Play size={24} variant="Bold" color="#ffffff" />
        </div>
      </div>
      {/* Duration badge */}
      {duration && (
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-[600] text-white backdrop-blur-sm">
          {duration}
        </div>
      )}
    </div>
  );
}

/* ── PostHeader ── */

function PostHeader({
  character,
  timestamp,
  pinned,
}: {
  character: PlottaleCharacter;
  timestamp: string;
  pinned?: boolean;
}) {
  const { lang, t } = useLanguage();

  return (
    <div className="flex items-start gap-2.5 px-3 pt-3 pb-1">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 relative">
        <Image
          src={character.avatar}
          alt={localize(character.name, lang)}
          width={32}
          height={32}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[13px] font-[700] text-gray-900 dark:text-white truncate">
            {localize(character.name, lang)}
          </span>
          {character.verified && (
            <Verify size={12} variant="Bold" color="#22c55e" />
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-[450] text-gray-400 dark:text-white/40">
          <span>{character.handle}</span>
          <span>·</span>
          <span>{timestamp}</span>
          {pinned && (
            <>
              <span>·</span>
              <span className="text-amber-500/80 font-[550]">{t("pt.feed.pinned")}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── PostCard ── */

function PostCard({ post, index }: { post: PlottalePost; index: number }) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const lhref = useLocalizedHref();
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  const character = getCharacterById(post.characterId);
  if (!character) return null;

  const timestamp = localize(post.timestamp, lang);
  const text = post.text ? localize(post.text, lang) : null;
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  const handleCardClick = useCallback(() => {
    router.push(lhref(`/post/${post.id}`), { scroll: false });
  }, [router, lhref, post.id]);

  /* Layout varies by type */
  const renderContent = () => {
    switch (post.type) {
      /* ── Text only ── */
      case "text":
        return (
          <>
            <PostHeader character={character} timestamp={timestamp} pinned={post.pinned} />
            {text && (
              <p className="text-[17px] font-[550] text-gray-800 dark:text-white/80 leading-[1.7] px-3 py-4">
                <span className="text-gray-400 dark:text-white/30">{"\u201C"}</span>
                {text}
                <span className="text-gray-400 dark:text-white/30">{"\u201D"}</span>
              </p>
            )}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      /* ── Image only (full-bleed overlay, no text) ── */
      case "image":
        return (
          <div className="relative" style={{ borderRadius: "var(--glass-radius-lg)", overflow: menuOpen ? "visible" : "hidden" }}>
            {post.images?.[0] && (
              <Image src={post.images[0]} alt="" width={800} height={1000} className="w-full h-auto block" />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.92) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col">
              <div className="flex items-start gap-2.5 px-4 pb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/25 shadow-lg">
                  <Image src={character.avatar} alt={localize(character.name, lang)} width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-[700] text-white truncate drop-shadow-sm">{localize(character.name, lang)}</span>
                    {character.verified && <Verify size={13} variant="Bold" color="#22c55e" />}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-[450] text-white/50">
                    <span>{character.handle}</span>
                    <span>·</span>
                    <span>{timestamp}</span>
                    {post.pinned && (
                      <>
                        <span>·</span>
                        <span className="text-amber-400/80 font-[550]">{t("pt.feed.pinned")}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Inline white action bar */}
              <div className="flex items-center justify-between px-3 py-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => {
                      setLiked((prev) => { setLikeCount((c) => (prev ? c - 1 : c + 1)); return !prev; });
                      setLikeAnim(true); setTimeout(() => setLikeAnim(false), 350);
                    }}
                    className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                  >
                    <span style={{ display: "inline-flex", transform: likeAnim ? "scale(1.3)" : "scale(1)", transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                      <Heart size={18} variant={liked ? "Bold" : "Linear"} color={liked ? "#ef4444" : "#ffffff"} />
                    </span>
                    <span className="social-count text-[11px] font-[500] text-white/60">{formatCount(likeCount)}</span>
                  </button>
                  <button className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer">
                    <MessageText1 size={18} variant="Linear" color="#ffffff" />
                    <span className="social-count text-[11px] font-[500] text-white/60">{formatCount(post.comments)}</span>
                  </button>
                  <button className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer">
                    <Send2 size={16} variant="Linear" color="#ffffff" />
                  </button>
                </div>
                <div className="relative">
                  <button onClick={toggleMenu} className="p-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                    <span className="flex flex-col items-center justify-center gap-[3px] w-[18px] h-[18px]">
                        <span className="w-[3.5px] h-[3.5px] rounded-full bg-white" />
                        <span className="w-[3.5px] h-[3.5px] rounded-full bg-white" />
                        <span className="w-[3.5px] h-[3.5px] rounded-full bg-white" />
                      </span>
                  </button>
                  <PostMoreMenu open={menuOpen} onClose={toggleMenu} />
                </div>
              </div>
            </div>
          </div>
        );

      /* ── Image + text (3-layer: image → floating frame → action panel) ── */
      case "image-text":
        return (
          <>
            {/* Layer 1 — Full-bleed image */}
            {post.images?.[0] && (
              <div className="overflow-hidden" style={{ borderRadius: "var(--glass-radius-lg) var(--glass-radius-lg) 0 0" }}>
                <Image src={post.images[0]} alt="" width={800} height={1000} className="w-full h-auto block" />
              </div>
            )}

            {/* Layer 2 — Floating frame (avatar + text), overlaps image */}
            <div className="relative px-3 -mt-8 mb-2 z-10">
              <div
                className="px-3.5 py-3"
                style={{
                  borderRadius: "calc(var(--glass-radius-lg) * 0.6)",
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
                  WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "var(--glass-shadow)",
                }}
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-black/5 dark:ring-white/10">
                    <Image src={character.avatar} alt={localize(character.name, lang)} width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] font-[700] text-gray-900 dark:text-white truncate">{localize(character.name, lang)}</span>
                      {character.verified && <Verify size={12} variant="Bold" color="#22c55e" />}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-[450] text-gray-400 dark:text-white/40">
                      <span>{character.handle}</span>
                      <span>·</span>
                      <span>{timestamp}</span>
                      {post.pinned && (
                        <>
                          <span>·</span>
                          <span className="text-amber-500/80 dark:text-amber-400/80 font-[550]">{t("pt.feed.pinned")}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* Text */}
                {text && (
                  <p className="text-[13px] font-[450] text-gray-700 dark:text-white/70 leading-[1.6]">
                    {text}
                  </p>
                )}
              </div>
            </div>

            {/* Layer 3 — Action bar outside frame */}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      /* ── Gallery ── */
      case "gallery":
        return (
          <>
            <PostHeader character={character} timestamp={timestamp} pinned={post.pinned} />
            {post.images && <PostImageGrid images={post.images} />}
            {text && (
              <p className="text-[13px] font-[450] text-gray-700 dark:text-white/70 leading-[1.6] px-3 py-1.5">
                {text}
              </p>
            )}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      /* ── Video ── */
      case "video":
        return (
          <>
            {/* 1 — Image (natural ratio, inset with border-radius) + play pill button */}
            {post.videoThumbnail && (
              <div className="px-1.5 pt-1.5">
                <div className="relative overflow-hidden" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.45)" }}>
                  <Image src={post.videoThumbnail} alt="" width={800} height={1000} className="w-full h-auto block" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />
                  {/* Play pill button */}
                  <div
                    className="play-pill absolute bottom-3 right-3 flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(12px) saturate(1.6)",
                      WebkitBackdropFilter: "blur(12px) saturate(1.6)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PlayCircle size={22} variant="Bulk" color="#ffffff" />
                    <span className="text-[13px] font-[600] text-white">
                      {post.videoDuration ?? "Play"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* 2 — Avatar + name */}
            <PostHeader character={character} timestamp={timestamp} pinned={post.pinned} />
            {/* 3 — Text (full, no crop) */}
            {text && (
              <p className="text-[13px] font-[450] text-gray-700 dark:text-white/70 leading-[1.6] px-3 py-1.5">
                {text}
              </p>
            )}
            {/* 4 — Social functions */}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="break-inside-avoid mb-4"
      style={{
        animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.04}s both`,
        position: "relative",
        zIndex: menuOpen ? 40 : "auto",
      }}
    >
      <div
        className="relative transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 cursor-pointer"
        style={{
          ...(post.type === "image" ? {} : GLASS_STYLE),
          border: "none",
        }}
        onClick={handleCardClick}
      >
        {renderContent()}
      </div>
    </div>
  );
}

/* ── FeedLinkCard ── */

function FeedLinkCard({ index }: { index: number }) {
  const { t } = useLanguage();
  const lhref = useLocalizedHref();

  return (
    <div
      className="break-inside-avoid mb-4"
      style={{
        animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.04}s both`,
      }}
    >
      <Link
        href={lhref("/feed")}
        className="block overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 group"
        style={{
          ...GLASS_STYLE,
          minHeight: 240,
          border: "none",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full px-5 py-10 text-center relative">
          {/* Decorative gradient orb */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at center, #f59e0b 0%, transparent 70%)",
            }}
          />

          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <GalleryIcon size={24} variant="Bulk" color="#f59e0b" />
          </div>

          <h3 className="text-[15px] font-[700] text-gray-900 dark:text-white mb-1.5">
            {t("pt.feed.viewfeed")}
          </h3>
          <p className="text-[12px] font-[430] text-gray-500 dark:text-white/50 leading-[1.5] max-w-[200px]">
            {t("pt.feed.viewfeed.desc")}
          </p>

          <div className="mt-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}>
            <ArrowRight size={16} variant="Linear" color="#ffffff" />
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ── PostFeedSection ── */

function PostFeedSection() {
  const { t, lang } = useLanguage();
  const lhref = useLocalizedHref();
  const posts = getAllPosts();

  return (
    <section className="px-4 md:px-8 lg:pl-28 lg:pr-10 xl:pl-32 xl:pr-12 pb-16 md:pb-24">
      <style>{`
        .social-btn { transition: transform 0.2s ease, color 0.2s ease; }
        .social-btn:hover { transform: scale(1.15); }
        .social-btn svg path { transition: stroke-width 0.2s ease; }
        .social-btn:hover svg path[stroke] { stroke-width: 2.2; }
        .social-btn .social-count { transition: font-weight 0.2s ease, color 0.2s ease; }
        .social-btn:hover .social-count { font-weight: 700; }
        .play-pill { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .play-pill:hover { transform: scale(1.35); }
      `}</style>
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 max-w-[2400px] mx-auto">
        <div>
          <p className="text-[12px] font-[600] tracking-[0.1em] uppercase text-amber-500/80 mb-2">
            {t("pt.feed.badge")}
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-[800] tracking-[-0.03em] text-gray-900 dark:text-white leading-tight"
            style={lang === "th" ? THAI_HEADER_STYLE : undefined}
          >
            {t("pt.feed.title")}
          </h2>
          <p className="mt-2 text-[14px] font-[430] text-black/60 dark:text-white/60 max-w-[450px]">
            {t("pt.feed.desc")}
          </p>
        </div>

        {/* Desktop View All */}
        <Link
          href={lhref("/feed")}
          className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-[600] text-black dark:text-white border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          {t("pt.feed.viewall")}
          <ArrowRight size={14} variant="Linear" color="currentColor" />
        </Link>
      </div>

      {/* Masonry grid */}
      <div
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 min-[1440px]:columns-6 gap-4 max-w-[2400px] mx-auto"
      >
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
        <FeedLinkCard index={posts.length} />
      </div>

      {/* Mobile View All */}
      <div className="flex justify-center mt-8 md:hidden">
        <Link
          href={lhref("/feed")}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-[600] text-black dark:text-white border border-black dark:border-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          {t("pt.feed.viewall.mobile")}
          <ArrowRight size={14} variant="Linear" color="currentColor" />
        </Link>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 3 — BENTO FEATURE GRID (like ref image 3)                  */
/* ================================================================== */

function BentoFeatureCard({
  feature,
  index,
}: {
  feature: PlottaleFeature;
  index: number;
}) {
  const { lang, t } = useLanguage();
  const Icon = ICON_MAP[feature.icon] ?? Book1;
  const isWide = feature.span === "wide";
  const isTall = feature.span === "tall";

  return (
    <div
      className={[
        "group relative overflow-hidden p-6 md:p-7 flex flex-col justify-between transition-all duration-400 ease-out hover:scale-[1.02] hover:-translate-y-1",
        isWide ? "md:col-span-2" : "",
        isTall ? "md:row-span-2" : "",
      ].join(" ")}
      style={{
        ...GLASS_STYLE,
        animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.06}s both`,
        minHeight: isTall ? 340 : isWide ? 180 : 200,
      }}
    >
      {/* Icon circle */}
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center [&_svg]:w-[24px] [&_svg]:h-[24px] mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: feature.gradient,
          color: feature.iconColor,
          boxShadow: `0 4px 14px ${feature.iconColor}33`,
        }}
      >
        <Icon size={24} variant="Bulk" color="currentColor" />
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[16px] md:text-[18px] font-[750] text-gray-900 dark:text-white tracking-[-0.01em] mb-2" style={lang === "th" ? THAI_HEADER_STYLE : undefined}>
          {localize(feature.title, lang)}
        </h3>
        <p className="text-[13px] font-[430] text-gray-500 dark:text-white/50 leading-[1.6] line-clamp-3">
          {localize(feature.description, lang)}
        </p>
      </div>

      {/* Arrow hint on hover */}
      <div
        className="mt-4 flex items-center gap-1.5 text-[12px] font-[600] text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
      >
        {t("pt.features.learnmore")}
        <ArrowRight size={13} variant="Linear" color="currentColor" />
      </div>

      {/* Decorative gradient orb */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 w-[120px] h-[120px] rounded-full opacity-10 blur-[30px] group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: feature.gradient }}
      />
    </div>
  );
}

function BentoFeaturesSection() {
  const { t, lang } = useLanguage();
  const features = getAllFeatures();

  return (
    <section className="px-4 md:px-8 lg:pl-28 lg:pr-10 xl:pl-32 xl:pr-12 pb-20 md:pb-28">
      {/* Section header */}
      <div className="text-center mb-10 md:mb-14 max-w-7xl mx-auto">
        <p className="text-[12px] font-[600] tracking-[0.1em] uppercase text-amber-500/80 mb-2">
          {t("pt.features.badge")}
        </p>
        <h2 className="text-[28px] md:text-[36px] font-[800] tracking-[-0.03em] text-gray-900 dark:text-white leading-tight" style={lang === "th" ? THAI_HEADER_STYLE : undefined}>
          {t("pt.features.title")}
        </h2>
        <p className="mt-3 text-[14px] md:text-[15px] font-[430] text-gray-500 dark:text-white/45 max-w-[500px] mx-auto leading-[1.6]">
          {t("pt.features.desc")}
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto auto-rows-auto">
        {features.map((feature, i) => (
          <BentoFeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="px-4 md:px-8 lg:pl-28 lg:pr-10 xl:pl-32 xl:pr-12 pb-10 md:pb-16">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={GLASS_STYLE}
        >
          {/* Left */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-3">
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white text-[14px] font-[800]"
                style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
              >
                P
              </div>
              <span className="text-[16px] font-[800] text-gray-900 dark:text-white tracking-[-0.02em]">
                Plottale
              </span>
            </div>
            <p className="text-[13px] font-[430] text-gray-400 dark:text-white/40 leading-[1.6] max-w-[340px]">
              {t("pt.footer.tagline")}
            </p>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                className="text-[12px] font-[550] text-gray-400 dark:text-white/35 hover:text-gray-700 dark:hover:text-white/70 transition-colors duration-200"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>

          {/* Decorative */}
          <div
            className="pointer-events-none absolute -top-10 -right-10 w-[180px] h-[180px] rounded-full opacity-[0.06] blur-[40px]"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}
          />
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE EXPORT                                                        */
/* ================================================================== */

export default function PlottalePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <NovelCardsSection />
      <CharacterSection />
      <PostFeedSection />
      <BentoFeaturesSection />
      <Footer />
    </div>
  );
}
