"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, Verify, Send2 } from "iconsax-react";
import {
  getCommentsByPostId,
  getCharacterById,
  localize,
} from "@/data/plottale-content";
import { useLanguage } from "@/context/LanguageContext";

function formatCount(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function CommentSection({ postId }: { postId: string }) {
  const { lang, t } = useLanguage();
  const allComments = getCommentsByPostId(postId);
  const [visibleCount, setVisibleCount] = useState(3);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const showMore = useCallback(() => {
    setVisibleCount((c) => c + 5);
  }, []);

  const toggleLike = useCallback((commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  }, []);

  const visibleComments = allComments.slice(0, visibleCount);
  const hasMore = visibleCount < allComments.length;

  return (
    <div className="flex flex-col">
      {/* Comments header */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[12px] font-[600] uppercase tracking-wider text-gray-400 dark:text-white/40">
          {t("pt.post.comments")} ({allComments.length})
        </span>
      </div>

      {/* Comments list */}
      {allComments.length === 0 ? (
        <div className="px-5 py-6 text-center">
          <span className="text-[13px] text-gray-400 dark:text-white/40">
            {t("pt.post.nocomments")}
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          {visibleComments.map((comment) => {
            const char = getCharacterById(comment.characterId);
            if (!char) return null;
            const isLiked = likedComments.has(comment.id);

            return (
              <div
                key={comment.id}
                className="flex gap-2.5 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                  <Image
                    src={char.avatar}
                    alt={localize(char.name, lang)}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Comment body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-[700] text-gray-800 dark:text-white/90">
                      {localize(char.name, lang)}
                    </span>
                    {char.verified && (
                      <Verify size={10} variant="Bold" color="#22c55e" />
                    )}
                    <span className="text-[10px] text-gray-400 dark:text-white/35">
                      · {localize(comment.timestamp, lang)}
                    </span>
                  </div>
                  <p className="text-[12.5px] font-[420] text-gray-600 dark:text-white/65 leading-[1.55]">
                    {localize(comment.text, lang)}
                  </p>

                  {/* Like button for comment */}
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className="flex items-center gap-1 mt-1.5 cursor-pointer"
                  >
                    <Heart
                      size={13}
                      variant={isLiked ? "Bold" : "Linear"}
                      color={isLiked ? "#ef4444" : "currentColor"}
                      className="text-gray-400 dark:text-white/35"
                    />
                    <span className="text-[10px] text-gray-400 dark:text-white/35">
                      {formatCount(
                        comment.likes + (isLiked ? 1 : 0),
                      )}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Show more button */}
          {hasMore && (
            <button
              onClick={showMore}
              className="mx-5 my-2 py-2 text-[12px] font-[600] text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors cursor-pointer text-center rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-500/5"
            >
              {t("pt.post.showmore")}
            </button>
          )}
        </div>
      )}

      {/* Write comment input (sticky at bottom of parent) */}
      <div
        className="px-4 py-3.5 mt-auto"
        style={{
          borderTop: "1px solid var(--glass-border)",
          background: "var(--glass-bg-subtle)",
        }}
      >
        <div className="flex items-end gap-2.5">
          {/* Input wrapper */}
          <div
            className="flex-1 flex items-end min-h-[40px] px-4 py-2.5 bg-white dark:bg-white/10"
            style={{
              borderRadius: "var(--glass-radius-lg)",
              border: "1.5px solid rgba(0,0,0,0.10)",
            }}
          >
            <AutoHeightTextarea
              placeholder={t("pt.post.writecomment")}
              className="flex-1 bg-transparent text-[13px] font-[450] text-gray-700 dark:text-white/80 placeholder:text-gray-400/70 dark:placeholder:text-white/30 outline-none resize-none leading-[1.55]"
              maxRows={4}
            />
          </div>

          {/* Send button */}
          <button
            className="flex-shrink-0 w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{
              borderRadius: "var(--glass-radius)",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
            }}
          >
            <Send2 size={18} variant="Bold" color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AutoHeightTextarea                                                 */
/* ------------------------------------------------------------------ */

function AutoHeightTextarea({
  placeholder,
  className,
  maxRows = 4,
}: {
  placeholder?: string;
  className?: string;
  maxRows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const maxHeight = lineHeight * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  return (
    <textarea
      ref={ref}
      rows={1}
      placeholder={placeholder}
      className={className}
      onInput={adjustHeight}
      style={{ minHeight: "20px" }}
    />
  );
}
