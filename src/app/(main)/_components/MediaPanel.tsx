"use client";

import Image from "next/image";
import { PlayCircle } from "iconsax-react";
import type { PlottalePost } from "@/data/plottale-content";
import GalleryCarousel from "./GalleryCarousel";

export default function MediaPanel({
  post,
  onSlideChange,
}: {
  post: PlottalePost;
  onSlideChange?: (index: number) => void;
}) {
  switch (post.type) {
    /* ── Single image or image-text ── */
    case "image":
    case "image-text": {
      const src = post.images?.[0];
      if (!src) return null;
      return (
        <div className="relative w-full h-full min-h-[300px]">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
      );
    }

    /* ── Gallery carousel ── */
    case "gallery": {
      if (!post.images?.length) return null;
      return <GalleryCarousel images={post.images} onSlideChange={onSlideChange} />;
    }

    /* ── Video thumbnail with play button ── */
    case "video": {
      const thumb = post.videoThumbnail;
      if (!thumb) return null;
      return (
        <div className="relative w-full h-full min-h-[300px]">
          <Image
            src={thumb}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          {/* Centered play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center gap-3 px-7 py-3.5 rounded-full cursor-pointer"
              style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px) saturate(1.6)",
                WebkitBackdropFilter: "blur(12px) saturate(1.6)",
              }}
            >
              <PlayCircle size={28} variant="Bulk" color="#ffffff" />
              <span className="text-[15px] font-[600] text-white">
                {post.videoDuration ?? "Play"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
