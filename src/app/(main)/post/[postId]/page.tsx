"use client";

import { use } from "react";
import { getPostById, getCharacterById } from "@/data/plottale-content";
import PostDetailContent from "../../_components/PostDetailContent";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import Link from "next/link";
import { ArrowLeft2 } from "iconsax-react";

export default function PostFullPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = use(params);
  const { lang, t } = useLanguage();
  const lhref = useLocalizedHref();
  const post = getPostById(postId);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <p className="text-[20px] font-[700] text-gray-700 dark:text-white/80 mb-2">
          {t("pt.post.notfound")}
        </p>
        <p className="text-[14px] text-gray-500 dark:text-white/45 mb-6">
          {t("pt.post.notfound.desc")}
        </p>
        <Link
          href={lhref("/")}
          className="text-[14px] font-[600] text-blue-500 hover:text-blue-600"
        >
          {t("pt.post.backfeed")}
        </Link>
      </div>
    );
  }

  const character = getCharacterById(post.characterId);
  if (!character) return null;

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 md:px-8 flex flex-col items-center">
      {/* Back link */}
      <div className="w-full max-w-[1100px] mb-4">
        <Link
          href={lhref("/")}
          className="inline-flex items-center gap-1.5 text-[13px] font-[500] text-gray-500 dark:text-white/45 hover:text-gray-700 dark:hover:text-white/70 transition-colors"
        >
          <ArrowLeft2 size={16} />
          {t("pt.post.backfeed")}
        </Link>
      </div>

      {/* Post detail card */}
      <div
        className="w-full max-w-[1100px] overflow-hidden flex flex-col md:flex-row"
        style={{
          minHeight: "500px",
          borderRadius: "var(--glass-radius-lg)",
          background: "var(--glass-bg-strong)",
          backdropFilter:
            "blur(var(--glass-blur-strong)) saturate(var(--glass-saturation))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur-strong)) saturate(var(--glass-saturation))",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow-elevated)",
          animation: "cardEnter 0.5s var(--ease-spring) both",
        }}
      >
        <PostDetailContent post={post} character={character} isModal={false} />
      </div>
    </div>
  );
}
