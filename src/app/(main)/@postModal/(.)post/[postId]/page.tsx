"use client";

import { use, useState, useCallback } from "react";
import { getPostById, getCharacterById } from "@/data/plottale-content";
import PostModalWrapper from "../../../_components/PostModalWrapper";
import PostDetailContent from "../../../_components/PostDetailContent";
import { useModalDimensions } from "../../../_components/useModalDimensions";
import { useImageDimensions } from "../../../_components/useImageDimensions";
import { useGalleryDimensions } from "../../../_components/useGalleryDimensions";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import Link from "next/link";

/**
 * Determine which image URL to preload for modal sizing (non-gallery posts).
 */
function getPreloadSrc(post: {
  type: string;
  images?: string[];
  videoThumbnail?: string;
}): string | null {
  switch (post.type) {
    case "image":
    case "image-text":
      return post.images?.[0] ?? null;
    case "video":
      return post.videoThumbnail ?? null;
    default:
      return null;
  }
}

export default function PostModalPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = use(params);
  const { t } = useLanguage();
  const lhref = useLocalizedHref();
  const post = getPostById(postId);

  /* ── Gallery detection ── */
  const isGallery =
    post?.type === "gallery" && (post.images?.length ?? 0) > 1;

  /* ── Gallery: preload ALL images in parallel ── */
  const galleryDimensions = useGalleryDimensions(
    isGallery ? post!.images : undefined,
  );

  /* ── Non-gallery: preload single image (existing behavior) ── */
  const preloadSrc = post && !isGallery ? getPreloadSrc(post) : null;
  const singleImageDimensions = useImageDimensions(preloadSrc);

  /* ── Gallery: track current slide index ── */
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  /* ── Derive active dimensions for the current view ── */
  const isMediaPost = post != null && post.type !== "text";
  const activeDimensions = isGallery
    ? galleryDimensions?.[currentSlideIndex] ?? undefined
    : isMediaPost
      ? (singleImageDimensions ?? undefined)
      : undefined;

  const isLoading = isMediaPost && activeDimensions == null;

  /* ── Compute modal dimensions from active slide/image ── */
  const { modalWidth, modalHeight, leftPanelWidth, rightPanelWidth } =
    useModalDimensions(activeDimensions);

  if (!post) {
    return (
      <PostModalWrapper modalWidth={550}>
        <div className="flex flex-col items-center justify-center w-full py-20 px-6 text-center">
          <p className="text-[18px] font-[700] text-gray-700 dark:text-white/80 mb-2">
            {t("pt.post.notfound")}
          </p>
          <p className="text-[13px] text-gray-500 dark:text-white/45 mb-6">
            {t("pt.post.notfound.desc")}
          </p>
          <Link
            href={lhref("/")}
            className="text-[13px] font-[600] text-blue-500 hover:text-blue-600"
          >
            {t("pt.post.backfeed")}
          </Link>
        </div>
      </PostModalWrapper>
    );
  }

  const character = getCharacterById(post.characterId);
  if (!character) return null;

  return (
    <PostModalWrapper
      modalWidth={modalWidth}
      modalHeight={modalHeight}
      isLoading={isLoading}
    >
      <PostDetailContent
        post={post}
        character={character}
        isModal
        leftPanelWidth={leftPanelWidth}
        rightPanelWidth={rightPanelWidth}
        modalHeight={modalHeight}
        onSlideChange={isGallery ? handleSlideChange : undefined}
      />
    </PostModalWrapper>
  );
}
