"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SearchNormal1,
  Star1,
  ArrowDown2,
  CloseCircle,
  Setting4,
  ArrowLeft2,
  ArrowRight2,
  BookSaved,
  ExportSquare,
  VideoPlay,
  Book1,
} from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { useBackground } from "@/context/BackgroundContext";
import {
  type PlottaleNovel,
  type LocalizedString,
  getAllNovels,
  GENRE,
  localize,
} from "@/data/plottale-content";

/* ================================================================== */
/*  CONSTANTS                                                          */
/* ================================================================== */

const GLASS_STYLE: React.CSSProperties = {
  borderRadius: "var(--glass-radius-lg)",
  background: "var(--glass-bg)",
  backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
};

/** Inner-card glass — +20% opacity vs section wrapper, capped at 100% */
const GLASS_STYLE_INNER: React.CSSProperties = {
  borderRadius: "var(--glass-radius-lg)",
  background: "var(--glass-bg-strong)",
  backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
};

const THAI_HEADER_FONT =
  "'Noto Sans Thai Looped', 'Noto Sans Thai', 'Sukhumvit Set', 'IBM Plex Sans Thai', sans-serif";
const THAI_HEADER_STYLE = { fontFamily: THAI_HEADER_FONT, lineHeight: 1.35 } as const;

const SORT_OPTIONS = [
  { key: "rating", label: "pt.library.sortRating" },
  { key: "az", label: "pt.library.sortTitleAZ" },
  { key: "za", label: "pt.library.sortTitleZA" },
] as const;

const RATING_THRESHOLDS = [0, 4.6, 4.7, 4.8, 4.9] as const;

const CONTENT_RATINGS = ["PG-13", "TV-14", "TV-MA"] as const;

/* ================================================================== */
/*  HELPERS                                                            */
/* ================================================================== */

/** Extract unique authors from novels */
function getUniqueAuthors(novels: PlottaleNovel[]) {
  const seen = new Map<string, { name: LocalizedString; avatar: string; count: number }>();
  for (const n of novels) {
    const key = n.author.en;
    if (seen.has(key)) {
      seen.get(key)!.count++;
    } else {
      seen.set(key, { name: n.author, avatar: n.authorAvatar, count: 1 });
    }
  }
  return Array.from(seen.values());
}

/** All genre keys from the GENRE map */
const ALL_GENRES = Object.values(GENRE);

/* ================================================================== */
/*  IMAGE CAROUSEL (from home page pattern)                            */
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

  useEffect(() => {
    if (totalSlides <= 1) return;
    const delay = Math.random() * 4000;
    const interval = 8000 + Math.random() * 8000;
    let timer: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      timer = setInterval(() => setCurrent((prev) => (prev + 1) % totalSlides), interval);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [totalSlides]);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < totalSlides) setCurrent(idx);
  }, [totalSlides]);

  return (
    <div className="relative w-full aspect-[9/16] overflow-hidden group/carousel rounded-t-[var(--glass-radius-lg)]">
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
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const sibling = target.nextElementSibling as HTMLElement;
                    if (sibling) sibling.style.display = "flex";
                  }}
                />
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
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: placeholderGradient }}>
                <div className="flex flex-col items-center gap-2 opacity-25">
                  <BookSaved size={36} variant="Bulk" color="white" />
                  <span className="text-[12px] font-[500] text-white/40">{t("pt.card.scene")} {idx + 1}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); goTo(idx); }}
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

      {totalSlides > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); goTo(current > 0 ? current - 1 : totalSlides - 1); }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/55 transition-all duration-200 cursor-pointer z-10"
          >
            <ArrowLeft2 size={14} variant="Linear" color="white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); goTo(current < totalSlides - 1 ? current + 1 : 0); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/55 transition-all duration-200 cursor-pointer z-10"
          >
            <ArrowRight2 size={14} variant="Linear" color="white" />
          </button>
        </>
      )}
    </div>
  );
}

/* ================================================================== */
/*  NOVEL CARD                                                         */
/* ================================================================== */

function NovelCard({ novel, index }: { novel: PlottaleNovel; index: number }) {
  const { lang } = useLanguage();
  const lhref = useLocalizedHref();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={lhref(`/novel/${novel.slug}`)}
      className="relative group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.04}s both`,
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div
        className="overflow-hidden flex flex-col transition-all duration-500 ease-out"
        style={{
          ...GLASS_STYLE_INNER,
          border: "none",
          transform: hovered ? "scale(1.3)" : "scale(1)",
          transformOrigin: "center center",
        }}
      >
        {/* ── Image carousel + hover overlay ── */}
        <div className="relative">
          <ImageCarousel
            images={novel.images}
            placeholderGradient={novel.placeholderGradient}
            title={localize(novel.title, lang)}
          />

          {/* Hover overlay: title + author + genres + rating + synopsis */}
          <div
            className="absolute inset-x-0 top-0 z-20 transition-all duration-500 ease-out pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.4) 80%, transparent 100%)",
              padding: "20px 12px 36px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            {/* Title + arrow */}
            <div className="flex items-center justify-between mb-1.5">
              <h3
                className="text-[16px] font-[750] text-white leading-[1.25] tracking-[-0.02em] line-clamp-1"
                style={lang === "th" ? THAI_HEADER_STYLE : undefined}
              >
                {localize(novel.title, lang)}
              </h3>
              <ExportSquare size={18} variant="Linear" color="rgba(255,255,255,0.8)" />
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20">
                <Image src={novel.authorAvatar} alt={localize(novel.author, lang)} width={24} height={24} className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-[600] text-white/90 truncate">{localize(novel.author, lang)}</span>
            </div>

            {/* Genres + rating */}
            <div className="flex items-center gap-1 flex-nowrap overflow-hidden mb-1.5">
              {novel.genres.map((g) => (
                <span key={g.en} className="shrink-0 px-2 py-[2px] rounded-full text-[10px] font-[600] text-white/75 bg-white/[0.15]">
                  {localize(g, lang)}
                </span>
              ))}
              <span className="shrink-0 flex items-center gap-0.5 px-2 py-[2px] rounded-full text-[10px] font-[650] text-white/90 bg-white/[0.15]">
                <Star1 size={10} variant="Bold" color="#fbbf24" />
                {novel.rating}
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-[12px] font-[430] text-white/75 leading-[1.5]">
              {localize(novel.synopsis, lang)}
            </p>
          </div>

          {/* Content rating badge */}
          {novel.contentRating && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-[600] text-white backdrop-blur-sm z-10">
              {novel.contentRating}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ================================================================== */
/*  FILTER MODAL                                                       */
/* ================================================================== */

interface Filters {
  genres: Set<string>;
  authors: Set<string>;
  contentRatings: Set<string>;
  minRating: number;
  hasTrailer: boolean;
}

const EMPTY_FILTERS: Filters = {
  genres: new Set(),
  authors: new Set(),
  contentRatings: new Set(),
  minRating: 0,
  hasTrailer: false,
};

function countActive(f: Filters): number {
  let c = 0;
  if (f.genres.size > 0) c++;
  if (f.authors.size > 0) c++;
  if (f.contentRatings.size > 0) c++;
  if (f.minRating > 0) c++;
  if (f.hasTrailer) c++;
  return c;
}

function applyFilters(novels: PlottaleNovel[], filters: Filters, search: string, sort: string, lang: string): PlottaleNovel[] {
  let result = [...novels];

  // Search
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter((n) => {
      const title = localize(n.title, lang).toLowerCase();
      const author = localize(n.author, lang).toLowerCase();
      const synopsis = localize(n.synopsis, lang).toLowerCase();
      return title.includes(q) || author.includes(q) || synopsis.includes(q);
    });
  }

  // Genre filter (OR within, AND with others)
  if (filters.genres.size > 0) {
    result = result.filter((n) =>
      n.genres.some((g) => filters.genres.has(g.en))
    );
  }

  // Author filter
  if (filters.authors.size > 0) {
    result = result.filter((n) => filters.authors.has(n.author.en));
  }

  // Content rating filter
  if (filters.contentRatings.size > 0) {
    result = result.filter((n) => n.contentRating && filters.contentRatings.has(n.contentRating));
  }

  // Min rating
  if (filters.minRating > 0) {
    result = result.filter((n) => n.rating >= filters.minRating);
  }

  // Has trailer
  if (filters.hasTrailer) {
    result = result.filter((n) => !!n.trailerThumbnail);
  }

  // Sort
  if (sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === "az") {
    result.sort((a, b) => localize(a.title, lang).localeCompare(localize(b.title, lang)));
  } else if (sort === "za") {
    result.sort((a, b) => localize(b.title, lang).localeCompare(localize(a.title, lang)));
  }

  return result;
}

function FilterModal({
  open,
  onClose,
  filters,
  onApply,
  novels,
  search,
  sort,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onApply: (f: Filters) => void;
  novels: PlottaleNovel[];
  search: string;
  sort: string;
}) {
  const { t, lang } = useLanguage();
  const [local, setLocal] = useState<Filters>(filters);
  const authors = useMemo(() => getUniqueAuthors(novels), [novels]);
  const contentRatingCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of CONTENT_RATINGS) counts[r] = 0;
    for (const n of novels) if (n.contentRating) counts[n.contentRating] = (counts[n.contentRating] || 0) + 1;
    return counts;
  }, [novels]);

  // Reset local when modal opens
  useEffect(() => {
    if (open) setLocal(filters);
  }, [open, filters]);

  const previewCount = useMemo(
    () => applyFilters(novels, local, search, sort, lang).length,
    [novels, local, search, sort, lang]
  );

  const toggleSet = useCallback((setter: (fn: (prev: Filters) => Filters) => void, field: keyof Filters, value: string) => {
    setter((prev) => {
      const s = new Set(prev[field] as Set<string>);
      if (s.has(value)) s.delete(value); else s.add(value);
      return { ...prev, [field]: s };
    });
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[var(--glass-blur-overlay)]" />

      {/* Modal */}
      <div
        className="glass-panel relative w-full max-w-[560px] max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "panelEnter 250ms var(--transition-apple) both" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-[18px] font-[700] text-gray-900 dark:text-white" style={lang === "th" ? THAI_HEADER_STYLE : undefined}>
            {t("pt.library.filters")}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocal({ genres: new Set(), authors: new Set(), contentRatings: new Set(), minRating: 0, hasTrailer: false })}
              className="px-3 py-1.5 rounded-full text-[12px] font-[600] text-neutral-500 dark:text-neutral-400 border border-neutral-300/60 dark:border-neutral-500/40 hover:text-gray-900 dark:hover:text-white hover:border-neutral-500 dark:hover:border-neutral-300 transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <CloseCircle size={20} variant="Linear" color="currentColor" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* ── Genre ── */}
          <div>
            <h3 className="text-[14px] font-[700] text-gray-900 dark:text-white mb-3">{t("pt.library.genre")}</h3>
            <div className="pt-0">
              <div className="flex flex-wrap gap-2">
                {/* "All" chip */}
                <button
                  onClick={() => setLocal((prev) => ({ ...prev, genres: new Set() }))}
                  className={`px-3.5 py-2 rounded-full text-[13px] font-[600] transition-all duration-200 cursor-pointer border-2 ${
                    local.genres.size === 0
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "bg-transparent text-gray-700 dark:text-neutral-300 border-black/25 dark:border-white/20 hover:border-gray-900 dark:hover:border-white"
                  }`}
                >
                  {t("pt.library.all")}
                </button>
                {ALL_GENRES.map((g) => {
                  const active = local.genres.has(g.en);
                  return (
                    <button
                      key={g.en}
                      onClick={() => toggleSet(setLocal, "genres", g.en)}
                      className={`px-3.5 py-2 rounded-full text-[13px] font-[600] transition-all duration-200 cursor-pointer border-2 ${
                        active
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                          : "bg-transparent text-gray-700 dark:text-neutral-300 border-black/25 dark:border-white/20 hover:border-gray-900 dark:hover:border-white"
                      }`}
                    >
                      {localize(g, lang)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Authors ── */}
          <div>
            <h3 className="text-[14px] font-[700] text-gray-900 dark:text-white mb-3">{t("pt.library.authors")}</h3>
            <div className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                {authors.map((a) => {
                  const key = a.name.en;
                  const active = local.authors.has(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleSet(setLocal, "authors", key)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-[var(--glass-radius-sm)] text-center transition-all duration-200 cursor-pointer border-2 ${
                        active
                          ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                          : "bg-transparent border-black/20 dark:border-white/15 hover:border-gray-900 dark:hover:border-white"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-offset-1 ring-offset-white dark:ring-offset-neutral-900 ${
                        active ? "ring-current" : "ring-transparent"
                      }`}
                      >
                        <Image src={a.avatar} alt={localize(a.name, lang)} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[11px] font-[600] leading-tight truncate w-full ${
                        active ? "text-white dark:text-gray-900" : "text-gray-700 dark:text-neutral-300"
                      }`}>
                        {localize(a.name, lang)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Content Rating ── */}
          <div>
            <h3 className="text-[14px] font-[700] text-gray-900 dark:text-white mb-3">{t("pt.library.contentRating")}</h3>
            <div className="pt-0">
              <div className="flex gap-2">
                {CONTENT_RATINGS.map((r) => {
                  const active = local.contentRatings.has(r);
                  return (
                    <button
                      key={r}
                      onClick={() => toggleSet(setLocal, "contentRatings", r)}
                      className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-[var(--glass-radius-sm)] text-center transition-all duration-200 cursor-pointer border-2 ${
                        active
                          ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                          : "bg-transparent border-black/20 dark:border-white/15 hover:border-gray-900 dark:hover:border-white"
                      }`}
                    >
                      <span className={`text-[14px] font-[700] ${active ? "text-white dark:text-gray-900" : "text-gray-900 dark:text-white"}`}>{r}</span>
                      <span className={`text-[11px] ${active ? "text-white/70 dark:text-gray-900/60" : "text-neutral-400"}`}>
                        {contentRatingCounts[r]} novels
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Minimum Rating ── */}
          <div>
            <h3 className="text-[14px] font-[700] text-gray-900 dark:text-white mb-3">{t("pt.library.minRating")}</h3>
            <div className="pt-0">
              <div className="flex gap-2">
                {RATING_THRESHOLDS.map((r) => {
                  const active = local.minRating === r;
                  const label = r === 0 ? t("pt.library.any") : `${r}+`;
                  return (
                    <button
                      key={r}
                      onClick={() => setLocal((prev) => ({ ...prev, minRating: r }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[13px] font-[600] transition-all duration-200 cursor-pointer border-2 ${
                        active
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                          : "text-gray-700 dark:text-neutral-300 border-black/20 dark:border-white/15 hover:border-gray-900 dark:hover:border-white"
                      }`}
                    >
                      {r > 0 && <Star1 size={14} variant="Bold" color={active ? (undefined) : "#fbbf24"} className={active ? "text-amber-400 dark:text-amber-500" : ""} />}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Extras ── */}
          <div>
            <h3 className="text-[14px] font-[700] text-gray-900 dark:text-white mb-3">{t("pt.library.extras")}</h3>
            <div className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-[600] text-gray-900 dark:text-white">{t("pt.library.hasTrailer")}</p>
                  <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t("pt.library.hasTrailerDesc")}</p>
                </div>
                <button
                  onClick={() => setLocal((prev) => ({ ...prev, hasTrailer: !prev.hasTrailer }))}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
                    local.hasTrailer ? "bg-gray-900 dark:bg-white" : "bg-neutral-300 dark:bg-neutral-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 shadow-md transition-transform duration-200 ${
                      local.hasTrailer ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4">
          <button
            onClick={() => { onApply(local); onClose(); }}
            className="w-full px-6 py-2.5 rounded-full text-[14px] font-[650] text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t("pt.library.showN").replace("{n}", String(previewCount))}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SORT DROPDOWN                                                      */
/* ================================================================== */

function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeLabel = SORT_OPTIONS.find((o) => o.key === value)?.label ?? SORT_OPTIONS[0].label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-[600] text-gray-700 dark:text-neutral-300 border border-neutral-800/20 dark:border-neutral-300/20 hover:border-neutral-800/60 dark:hover:border-neutral-300/60 transition-colors cursor-pointer bg-white/50 dark:bg-white/5 backdrop-blur-sm"
      >
        {t("pt.library.sort")}: {t(activeLabel)}
        <ArrowDown2 size={14} variant="Linear" color="currentColor" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-48 p-1.5 flex flex-col gap-0.5 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-800/15 dark:border-neutral-300/15 z-50 overflow-hidden"
          style={{ animation: "modalSlideUp 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => { onChange(opt.key); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-[13px] font-[550] rounded-lg transition-colors cursor-pointer ${
                value === opt.key
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-600 dark:text-neutral-400 hover:bg-neutral-800/10 dark:hover:bg-white/10"
              }`}
            >
              {t(opt.label)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function NovelsLibraryPage() {
  const { t, lang } = useLanguage();
  const { isDarkBg } = useBackground();
  const allNovels = useMemo(() => getAllNovels(), []);

  /* State */
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const [activeGenres, setActiveGenres] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [modalOpen, setModalOpen] = useState(false);

  /* Debounced search */
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  /* Merge inline genre chips with modal filters */
  const mergedFilters = useMemo<Filters>(() => ({
    ...filters,
    genres: activeGenres.size > 0 ? activeGenres : filters.genres,
  }), [filters, activeGenres]);

  /* Filtered results */
  const results = useMemo(
    () => applyFilters(allNovels, mergedFilters, debouncedSearch, sort, lang),
    [allNovels, mergedFilters, debouncedSearch, sort, lang]
  );

  /* Active filter count (for badge) */
  const filterCount = countActive(filters) + (activeGenres.size > 0 && filters.genres.size === 0 ? 1 : 0);

  /* Genre chip scroll ref */
  const chipScrollRef = useRef<HTMLDivElement>(null);

  const toggleGenre = useCallback((genreEn: string) => {
    setActiveGenres((prev) => {
      const next = new Set(prev);
      if (next.has(genreEn)) next.delete(genreEn); else next.add(genreEn);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSearch("");
    setSort("rating");
    setActiveGenres(new Set());
    setFilters(EMPTY_FILTERS);
  }, []);

  return (
    <div className="min-h-screen pb-24 lg:pl-24">
      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* ── Header ── */}
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 pt-28 md:pt-32 lg:pt-24 pb-6 max-w-[2400px] mx-auto">
        <h1
          className={`text-[28px] md:text-[40px] font-[800] tracking-[-0.03em] leading-tight ${
            isDarkBg ? "text-white" : "text-gray-900 dark:text-white"
          }`}
          style={lang === "th" ? THAI_HEADER_STYLE : undefined}
        >
          {t("pt.library.title")}
        </h1>
        <p className={`mt-2 text-[14px] md:text-[15px] font-[430] max-w-[500px] ${
          isDarkBg ? "text-white/70" : "text-black/60 dark:text-white/60"
        }`}>
          {t("pt.library.subtitle")}
        </p>
      </div>

      {/* ── Search + Sort + Filters row ── */}
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 max-w-[2400px] mx-auto space-y-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative w-full md:flex-1 md:max-w-[600px]">
            <SearchNormal1
              size={18}
              variant="Linear"
              color="currentColor"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none z-10"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("pt.library.search")}
              className="w-full h-11 pl-11 pr-4 rounded-full text-[14px] font-[500] bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-neutral-800/20 dark:border-neutral-300/20 text-gray-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-neutral-800/60 dark:focus:border-neutral-300/60 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer transition-colors"
              >
                <CloseCircle size={18} variant="Linear" color="currentColor" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <SortDropdown value={sort} onChange={setSort} />

          {/* All Filters button */}
          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-[600] text-gray-700 dark:text-neutral-300 border border-neutral-800/20 dark:border-neutral-300/20 hover:border-neutral-800/60 dark:hover:border-neutral-300/60 transition-colors cursor-pointer bg-white/50 dark:bg-white/5 backdrop-blur-sm whitespace-nowrap"
          >
            <Setting4 size={16} variant="Linear" color="currentColor" />
            {t("pt.library.filters")}
            {filterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-[700] flex items-center justify-center">
                {filterCount}
              </span>
            )}
          </button>
        </div>

        {/* Result count */}
        <p className={`text-[13px] font-[500] ${
          isDarkBg ? "text-white/50" : "text-neutral-500 dark:text-neutral-400"
        }`}>
          {t("pt.library.showing").replace("{n}", String(results.length))}
        </p>
      </div>

      {/* ── Glass panel: genre chips + novel grid ── */}
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 max-w-[2400px] mx-auto">
        <div style={GLASS_STYLE} className="p-5 md:p-8">
          {/* Genre chips row */}
          <div
            ref={chipScrollRef}
            className="flex items-center gap-2 p-1 overflow-x-auto scrollbar-hide md:overflow-visible md:flex-wrap mb-5 md:mb-6"
          >
            {/* "All" chip */}
            <button
              onClick={() => setActiveGenres(new Set())}
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-[600] transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeGenres.size === 0
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-2 border-gray-900 dark:border-white"
                  : "text-gray-600 dark:text-neutral-400 border-2 border-neutral-800/15 dark:border-neutral-300/15 hover:scale-110 hover:font-[700] hover:text-gray-900 dark:hover:text-white hover:border-neutral-800 dark:hover:border-neutral-300"
              }`}
            >
              {t("pt.library.all")}
            </button>

            {ALL_GENRES.map((g) => {
              const active = activeGenres.has(g.en);
              return (
                <button
                  key={g.en}
                  onClick={() => toggleGenre(g.en)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-[600] transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    active
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-2 border-gray-900 dark:border-white"
                      : "text-gray-600 dark:text-neutral-400 border-2 border-neutral-800/15 dark:border-neutral-300/15 hover:scale-110 hover:font-[700] hover:text-gray-900 dark:hover:text-white hover:border-neutral-800 dark:hover:border-neutral-300"
                  }`}
                >
                  {localize(g, lang)}
                </button>
              );
            })}
          </div>

          {/* Novel grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 min-[1920px]:grid-cols-7 gap-3 md:gap-4">
              {results.map((novel, i) => (
                <NovelCard key={novel.id} novel={novel} index={i} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center" style={{ animation: "cardEnter 0.5s var(--ease-spring) both" }}>
              <span className="text-gray-900 dark:text-white mb-5">
                <Book1 size={56} variant="Bulk" color="currentColor" />
              </span>
              <h3 className="text-[18px] font-[700] text-gray-900 dark:text-white mb-2" style={lang === "th" ? THAI_HEADER_STYLE : undefined}>
                {t("pt.library.empty")}
              </h3>
              <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mb-6 max-w-[300px]">
                {t("pt.library.emptyHint")}
              </p>
              <button
                onClick={clearAll}
                className="px-5 py-2.5 rounded-full text-[13px] font-[600] text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t("pt.library.clearAll")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Filter Modal ── */}
      <FilterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        filters={mergedFilters}
        onApply={(f) => {
          setFilters(f);
          // Sync genre chips with modal genres
          setActiveGenres(f.genres);
        }}
        novels={allNovels}
        search={debouncedSearch}
        sort={sort}
      />
    </div>
  );
}
