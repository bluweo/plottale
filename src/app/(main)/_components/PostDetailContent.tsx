"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Heart, MessageText1, Send2, Verify, More, Bookmark, Link1, EyeSlash, Flag } from "iconsax-react";
import type { PlottalePost, PlottaleCharacter } from "@/data/plottale-content";
import { localize } from "@/data/plottale-content";
import { useLanguage } from "@/context/LanguageContext";
import MediaPanel from "./MediaPanel";
import CommentSection from "./CommentSection";

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

/* ------------------------------------------------------------------ */
/*  PostDetailContent                                                  */
/* ------------------------------------------------------------------ */

export default function PostDetailContent({
  post,
  character,
  isModal = true,
  leftPanelWidth,
  rightPanelWidth,
  modalHeight,
  onSlideChange,
}: {
  post: PlottalePost;
  character: PlottaleCharacter;
  isModal?: boolean;
  leftPanelWidth?: number;
  rightPanelWidth?: number;
  modalHeight?: number | null;
  onSlideChange?: (index: number) => void;
}) {
  const { lang, t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const timestamp = localize(post.timestamp, lang);
  const text = post.text ? localize(post.text, lang) : undefined;
  const hasMedia = post.type !== "text";

  const handleLike = useCallback(() => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 350);
  }, []);

  /* ── Right panel content ── */
  const rightPanel = (
    <div
      className={`flex flex-col ${
        isModal
          ? hasMedia
            ? "md:flex-shrink-0"
            : "w-full"
          : "w-full max-w-[520px]"
      } ${isModal ? "h-full" : ""}`}
      style={
        isModal && hasMedia && rightPanelWidth
          ? {
              width: `${rightPanelWidth}px`,
              maxWidth: "100%",
              ...(modalHeight != null
                ? { maxHeight: `${modalHeight}px` }
                : { maxHeight: "90vh" }),
              transition:
                "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }
          : isModal
            ? modalHeight != null
              ? {
                  maxHeight: `${modalHeight}px`,
                  transition:
                    "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }
              : { maxHeight: "90vh" }
            : undefined
      }
    >
      {/* Character header */}
      <div
        className="flex items-start gap-3 px-5 pt-5 pb-3"
        style={{ borderBottom: "1px solid var(--glass-border)" }}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={character.avatar}
            alt={localize(character.name, lang)}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-[700] text-gray-900 dark:text-white/92">
              {localize(character.name, lang)}
            </span>
            {character.verified && (
              <Verify size={14} variant="Bold" color="#22c55e" />
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-[450] text-gray-500 dark:text-white/45">
            <span>{character.handle}</span>
            <span>·</span>
            <span>{timestamp}</span>
            {post.pinned && (
              <>
                <span>·</span>
                <span className="text-amber-500/80 font-[600]">
                  {t("pt.feed.pinned")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Post text */}
        {text && (
          <div className="px-5 pt-4 pb-2">
            <p className="text-[14px] font-[450] text-gray-700 dark:text-white/75 leading-[1.7] whitespace-pre-line">
              {post.type === "text" && (
                <span className="text-gray-400 dark:text-white/30 mr-1">&ldquo;</span>
              )}
              {text}
              {post.type === "text" && (
                <span className="text-gray-400 dark:text-white/30 ml-1">&rdquo;</span>
              )}
            </p>
          </div>
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pb-3">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] font-[500] text-amber-600/80 dark:text-amber-400/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div
          className="flex items-center gap-1 px-3 py-2 mx-5 mb-3 rounded-lg"
          style={{ borderBottom: "1px solid var(--glass-border)" }}
        >
          {/* Like */}
          <button
            onClick={handleLike}
            className="social-btn flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          >
            <span
              style={{
                display: "inline-flex",
                transform: likeAnim ? "scale(1.3)" : "scale(1)",
                transition:
                  "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <Heart
                size={20}
                variant={liked ? "Bold" : "Linear"}
                color={liked ? "#ef4444" : "currentColor"}
              />
            </span>
            <span className="social-count text-[12px] font-[500] text-gray-500 dark:text-white/50">
              {formatCount(likeCount)}
            </span>
          </button>

          {/* Comment */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 dark:text-white/50">
            <MessageText1 size={20} variant="Linear" color="currentColor" />
            <span className="text-[12px] font-[500]">
              {formatCount(post.comments)}
            </span>
          </div>

          {/* Share */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 dark:text-white/50">
            <Send2 size={18} variant="Linear" color="currentColor" />
            <span className="text-[12px] font-[500]">
              {formatCount(post.shares)}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-500 dark:text-white/50"
            >
              <More size={18} variant="Linear" color="currentColor" />
            </button>
            {menuOpen && (
              <MoreMenu onClose={() => setMenuOpen(false)} />
            )}
          </div>
        </div>

        {/* Comments section */}
        <CommentSection postId={post.id} />
      </div>
    </div>
  );

  /* ── Text-only: center the right panel ── */
  if (!hasMedia) {
    return (
      <div className="flex items-stretch justify-center w-full h-full">
        {rightPanel}
      </div>
    );
  }

  /* ── Media posts: left + right ── */
  return (
    <>
      {/* Left panel — media */}
      <div
        className="w-full h-[300px] md:h-auto flex-shrink-0 relative overflow-hidden"
        style={
          leftPanelWidth
            ? {
                width: `${leftPanelWidth}px`,
                maxWidth: "100%",
                ...(modalHeight != null
                  ? { height: `${modalHeight}px`, minHeight: `${modalHeight}px` }
                  : {}),
                transition:
                  "width 0.35s cubic-bezier(0.4, 0, 0.2, 1), height 0.35s cubic-bezier(0.4, 0, 0.2, 1), min-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }
            : undefined
        }
      >
        <MediaPanel post={post} onSlideChange={onSlideChange} />
      </div>

      {/* Right panel */}
      {rightPanel}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  MoreMenu (inline)                                                  */
/* ------------------------------------------------------------------ */

function MoreMenu({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  const items = [
    { icon: Bookmark, label: t("pt.feed.bookmark") },
    { icon: Link1, label: t("pt.feed.copylink") },
    { icon: EyeSlash, label: t("pt.feed.notinterested") },
    { icon: Flag, label: t("pt.feed.report") },
  ];

  return (
    <div
      className="absolute right-0 bottom-full mb-1 z-50 w-44 py-1.5"
      style={{
        borderRadius: "calc(var(--glass-radius-lg) * 0.5)",
        background: "var(--glass-bg-strong)",
        backdropFilter:
          "blur(var(--glass-blur-strong)) saturate(var(--glass-saturation))",
        WebkitBackdropFilter:
          "blur(var(--glass-blur-strong)) saturate(var(--glass-saturation))",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow-elevated)",
        animation: "cardEnter 0.22s var(--ease-spring) both",
      }}
    >
      {items.map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={onClose}
          className="flex items-center gap-2.5 w-full px-3.5 py-2 text-[12px] font-[500] text-gray-600 dark:text-white/65 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Icon size={16} variant="Linear" color="currentColor" />
          {label}
        </button>
      ))}
    </div>
  );
}
