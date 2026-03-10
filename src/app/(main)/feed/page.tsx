"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageText1,
  Send2,
  Verify,
  Bookmark,
  Link1,
  EyeSlash,
  Flag,
  Play,
  PlayCircle,
  Gallery as GalleryIcon,
  VideoPlay,
  Chart21,
  Global,
  EmojiHappy,
  Location,
  ArrowDown2,
  Star1,
} from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import {
  type PlottaleCharacter,
  type PlottalePost,
  type PlottaleNovel,
  type PlottaleActivity,
  getAllPosts,
  getAllCharacters,
  getAllNovels,
  getCharacterById,
  getMockUserProfile,
  getMockActivities,
  localize,
} from "@/data/plottale-content";
import { GLASS_STYLE, THAI_HEADER_STYLE } from "../_components/shared-constants";
import { formatCount } from "../_components/shared-utils";

/* ================================================================== */
/*  POST COMPONENTS (inline — same pattern as home page PostCard)       */
/* ================================================================== */

function PostMoreMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
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
      style={{ ...GLASS_STYLE, borderRadius: "calc(var(--glass-radius-lg) * 0.5)", animation: "cardEnter 0.22s var(--ease-spring) both" }}
    >
      {items.map(({ icon: Icon, label }) => (
        <button key={label} onClick={onClose} className="w-full px-3 py-2 flex items-center gap-2.5 text-[12px] font-[500] text-gray-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer rounded-lg mx-0">
          <Icon size={16} variant="Linear" color="currentColor" />
          {label}
        </button>
      ))}
    </div>
  );
}

function PostActionBar({ post, menuOpen, onMenuToggle }: { post: PlottalePost; menuOpen: boolean; onMenuToggle: () => void }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);

  const handleLike = useCallback(() => {
    setLiked((prev) => { setLikeCount((c) => (prev ? c - 1 : c + 1)); return !prev; });
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 350);
  }, []);

  return (
    <div className="flex items-center justify-between px-3 py-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-0.5">
        <button onClick={handleLike} className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
          <span style={{ display: "inline-flex", transform: likeAnim ? "scale(1.3)" : "scale(1)", transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            <Heart size={18} variant={liked ? "Bold" : "Linear"} color={liked ? "#ef4444" : "currentColor"} />
          </span>
          <span className="social-count text-[11px] font-[500] text-gray-500 dark:text-white/50">{formatCount(likeCount)}</span>
        </button>
        <button className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
          <MessageText1 size={18} variant="Linear" color="currentColor" />
          <span className="social-count text-[11px] font-[500] text-gray-500 dark:text-white/50">{formatCount(post.comments)}</span>
        </button>
        <button className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
          <Send2 size={16} variant="Linear" color="currentColor" />
        </button>
      </div>
      <div className="relative">
        <button onClick={onMenuToggle} className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer">
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

function PostImageGrid({ images }: { images: string[] }) {
  const imgs = images.slice(0, 4);
  const splitAt = imgs.length <= 3 ? 1 : 2;
  const left = imgs.slice(0, splitAt);
  const right = imgs.slice(splitAt);

  return (
    <div className="flex gap-1.5 mx-3 overflow-hidden" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.55)" }}>
      <div className="flex-1 flex flex-col gap-1.5">
        {left.map((img, i) => (
          <Image key={i} src={img} alt="" width={400} height={500} className="w-full h-auto" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.35)" }} />
        ))}
      </div>
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

function PostVideoThumbnail({ thumbnail, duration }: { thumbnail: string; duration?: string }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg mx-3" style={{ width: "calc(100% - 24px)" }}>
      <Image src={thumbnail} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
          <Play size={24} variant="Bold" color="#ffffff" />
        </div>
      </div>
      {duration && (
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-[600] text-white backdrop-blur-sm">{duration}</div>
      )}
    </div>
  );
}

function PostHeader({ character, timestamp, pinned }: { character: PlottaleCharacter; timestamp: string; pinned?: boolean }) {
  const { lang, t } = useLanguage();
  return (
    <div className="flex items-start gap-2.5 px-3 pt-3 pb-1">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 relative">
        <Image src={character.avatar} alt={localize(character.name, lang)} width={32} height={32} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[13px] font-[700] text-gray-900 dark:text-white truncate">{localize(character.name, lang)}</span>
          {character.verified && <Verify size={12} variant="Bold" color="#22c55e" />}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-[450] text-gray-400 dark:text-white/40">
          <span>{character.handle}</span>
          <span>&middot;</span>
          <span>{timestamp}</span>
          {pinned && (<><span>&middot;</span><span className="text-amber-500/80 font-[550]">{t("pt.feed.pinned")}</span></>)}
        </div>
      </div>
    </div>
  );
}

function FeedPostCard({ post, index }: { post: PlottalePost; index: number }) {
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

  const renderContent = () => {
    switch (post.type) {
      case "text":
        return (
          <>
            <PostHeader character={character} timestamp={timestamp} pinned={post.pinned} />
            {text && (
              <p className="text-[17px] font-[550] text-gray-800 dark:text-white/80 leading-[1.7] px-3 py-4">
                <span className="text-gray-400 dark:text-white/30">{"\u201C"}</span>{text}<span className="text-gray-400 dark:text-white/30">{"\u201D"}</span>
              </p>
            )}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      case "image":
        return (
          <div className="relative" style={{ borderRadius: "var(--glass-radius-lg)", overflow: menuOpen ? "visible" : "hidden" }}>
            {post.images?.[0] && <Image src={post.images[0]} alt="" width={800} height={1000} className="w-full h-auto block" />}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.92) 100%)" }} />
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
                    <span>{character.handle}</span><span>&middot;</span><span>{timestamp}</span>
                    {post.pinned && (<><span>&middot;</span><span className="text-amber-400/80 font-[550]">{t("pt.feed.pinned")}</span></>)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-0.5">
                  <button onClick={() => { setLiked((prev) => { setLikeCount((c) => (prev ? c - 1 : c + 1)); return !prev; }); setLikeAnim(true); setTimeout(() => setLikeAnim(false), 350); }} className="social-btn flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer">
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

      case "image-text":
        return (
          <>
            {post.images?.[0] && (
              <div className="overflow-hidden" style={{ borderRadius: "var(--glass-radius-lg) var(--glass-radius-lg) 0 0" }}>
                <Image src={post.images[0]} alt="" width={800} height={1000} className="w-full h-auto block" />
              </div>
            )}
            <div className="relative px-3 -mt-8 mb-2 z-10">
              <div className="px-3.5 py-3" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.6)", background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))", WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))", border: "1px solid var(--glass-border)", boxShadow: "var(--glass-shadow)" }}>
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
                      <span>{character.handle}</span><span>&middot;</span><span>{timestamp}</span>
                      {post.pinned && (<><span>&middot;</span><span className="text-amber-500/80 dark:text-amber-400/80 font-[550]">{t("pt.feed.pinned")}</span></>)}
                    </div>
                  </div>
                </div>
                {text && <p className="text-[13px] font-[450] text-gray-700 dark:text-white/70 leading-[1.6]">{text}</p>}
              </div>
            </div>
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      case "gallery":
        return (
          <>
            <PostHeader character={character} timestamp={timestamp} pinned={post.pinned} />
            {post.images && <PostImageGrid images={post.images} />}
            {text && <p className="text-[13px] font-[450] text-gray-700 dark:text-white/70 leading-[1.6] px-3 py-1.5">{text}</p>}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      case "video":
        return (
          <>
            {post.videoThumbnail && (
              <div className="px-1.5 pt-1.5">
                <div className="relative overflow-hidden" style={{ borderRadius: "calc(var(--glass-radius-lg) * 0.45)" }}>
                  <Image src={post.videoThumbnail} alt="" width={800} height={1000} className="w-full h-auto block" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
                  <div className="play-pill absolute bottom-3 right-3 flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px) saturate(1.6)", WebkitBackdropFilter: "blur(12px) saturate(1.6)" }} onClick={(e) => e.stopPropagation()}>
                    <PlayCircle size={22} variant="Bulk" color="#ffffff" />
                    <span className="text-[13px] font-[600] text-white">{post.videoDuration ?? "Play"}</span>
                  </div>
                </div>
              </div>
            )}
            <PostHeader character={character} timestamp={timestamp} pinned={post.pinned} />
            {text && <p className="text-[13px] font-[450] text-gray-700 dark:text-white/70 leading-[1.6] px-3 py-1.5">{text}</p>}
            <PostActionBar post={post} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="break-inside-avoid mb-4" style={{ animation: `cardEnter 0.5s var(--ease-spring) ${index * 0.04}s both`, position: "relative", zIndex: menuOpen ? 40 : "auto" }}>
      <div className="relative transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 cursor-pointer" style={{ ...(post.type === "image" ? {} : GLASS_STYLE), border: "none" }} onClick={handleCardClick}>
        {renderContent()}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  LEFT SIDEBAR — User Profile Card                                   */
/* ================================================================== */

function UserProfileCard() {
  const { lang, t } = useLanguage();
  const profile = getMockUserProfile();

  return (
    <div className="overflow-hidden" style={GLASS_STYLE}>
      {/* Banner area with avatar */}
      <div className="relative h-20 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-yellow-900/30">
        {/* Decorative pen/notebook illustration area */}
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 70% 40%, rgba(245,158,11,0.4) 0%, transparent 60%)" }} />
      </div>

      {/* Avatar — overlapping banner */}
      <div className="flex flex-col items-center -mt-10 px-4 pb-4">
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden ring-4 ring-white dark:ring-neutral-900 shadow-lg relative z-10">
          <Image src={profile.avatar} alt={localize(profile.name, lang)} width={72} height={72} className="w-full h-full object-cover" />
        </div>

        {/* Name + handle */}
        <h3 className="mt-2 text-[15px] font-[700] text-gray-900 dark:text-white text-center">
          {localize(profile.name, lang)}
        </h3>
        <p className="text-[12px] font-[450] text-gray-400 dark:text-white/40 text-center">
          {profile.handle}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-0 mt-3 w-full">
          <div className="flex-1 text-center">
            <div className="text-[15px] font-[700] text-gray-900 dark:text-white">{formatCount(profile.postsCount)}</div>
            <div className="text-[10px] font-[450] text-gray-400 dark:text-white/40">{t("pt.feedpage.profile.posts")}</div>
          </div>
          <div className="w-px h-8 bg-neutral-200 dark:bg-white/10" />
          <div className="flex-1 text-center">
            <div className="text-[15px] font-[700] text-gray-900 dark:text-white">{formatCount(profile.followersCount)}</div>
            <div className="text-[10px] font-[450] text-gray-400 dark:text-white/40">{t("pt.feedpage.profile.followers")}</div>
          </div>
          <div className="w-px h-8 bg-neutral-200 dark:bg-white/10" />
          <div className="flex-1 text-center">
            <div className="text-[15px] font-[700] text-gray-900 dark:text-white">{formatCount(profile.followingCount)}</div>
            <div className="text-[10px] font-[450] text-gray-400 dark:text-white/40">{t("pt.feedpage.profile.following")}</div>
          </div>
        </div>

        {/* My Profile button */}
        <button className="mt-4 w-full py-2.5 rounded-xl text-[13px] font-[600] text-sky-500 dark:text-sky-400 border-2 border-sky-500/30 dark:border-sky-400/30 hover:bg-sky-500/5 dark:hover:bg-sky-400/5 transition-colors cursor-pointer">
          {t("pt.feedpage.profile.myprofile")}
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  LEFT SIDEBAR — Shortcuts (Following list)                          */
/* ================================================================== */

function ShortcutsList() {
  const { lang, t } = useLanguage();
  const lhref = useLocalizedHref();
  const profile = getMockUserProfile();
  const allChars = getAllCharacters();
  const followedChars = allChars.filter((c) => profile.followingCharacterIds.includes(c.id)).slice(0, 4);

  return (
    <div className="px-1">
      <div className="flex items-center justify-between px-3 mb-3">
        <h4 className="text-[13px] font-[600] text-gray-900 dark:text-white">{t("pt.feedpage.yourshortcuts")}</h4>
        <span className="text-[12px] font-[500] text-gray-400 dark:text-white/40 cursor-pointer hover:text-gray-600 dark:hover:text-white/60 transition-colors">
          {t("pt.feedpage.following.seeall")}
        </span>
      </div>

      <div className="space-y-0.5">
        {followedChars.map((char) => (
          <Link
            key={char.id}
            href={lhref(`/novel/${getAllNovels().find((n) => char.novelIds.includes(n.id))?.slug || ""}`)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <Image src={char.avatar} alt={localize(char.name, lang)} width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <span className="text-[13px] font-[550] text-gray-700 dark:text-white/80 truncate">
              {localize(char.name, lang)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MIDDLE — Create Post Input                                         */
/* ================================================================== */

function CreatePostInput() {
  const { t, lang } = useLanguage();
  const profile = getMockUserProfile();

  return (
    <div className="p-4" style={GLASS_STYLE}>
      {/* Input row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src={profile.avatar} alt={localize(profile.name, lang)} width={40} height={40} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-white/5 text-[13px] font-[450] text-gray-400 dark:text-white/30 cursor-text">
          {t("pt.feedpage.create.placeholder")}
        </div>
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <EmojiHappy size={20} variant="Linear" color="currentColor" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-200/60 dark:bg-white/5 mb-3" />

      {/* Action row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-[12px] font-[550] text-gray-500 dark:text-white/50">
            <GalleryIcon size={18} variant="Bulk" color="currentColor" />
            {t("pt.feedpage.create.image")}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-[12px] font-[550] text-gray-500 dark:text-white/50">
            <VideoPlay size={18} variant="Bulk" color="currentColor" />
            {t("pt.feedpage.create.video")}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-[12px] font-[550] text-gray-500 dark:text-white/50">
            <Chart21 size={18} variant="Bulk" color="currentColor" />
            {t("pt.feedpage.create.poll")}
          </button>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-[12px] font-[550] text-gray-500 dark:text-white/50">
          <Global size={16} variant="Linear" color="currentColor" />
          {t("pt.feedpage.create.public")}
          <ArrowDown2 size={12} variant="Linear" color="currentColor" />
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MIDDLE — Sort Control                                              */
/* ================================================================== */

function FeedSortControl() {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState("recent");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const SORT_OPTIONS = [
    { key: "recent", label: "pt.feedpage.sort.recent" },
    { key: "popular", label: "pt.feedpage.sort.popular" },
    { key: "oldest", label: "pt.feedpage.sort.oldest" },
  ];

  const currentLabel = SORT_OPTIONS.find((o) => o.key === sortBy)?.label ?? "";

  return (
    <div className="flex items-center justify-end py-2 px-1" ref={ref}>
      <div className="relative">
        <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 text-[13px] font-[500] text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70 cursor-pointer transition-colors">
          {t("pt.feedpage.sort.label")}
          <span className="font-[700] text-gray-900 dark:text-white">{t(currentLabel)}</span>
          <ArrowDown2 size={14} variant="Linear" color="currentColor" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-40 p-1.5 flex flex-col gap-0.5 z-50 overflow-hidden" style={{ ...GLASS_STYLE, borderRadius: "calc(var(--glass-radius-lg) * 0.55)" }}>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setSortBy(opt.key); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 text-[13px] font-[550] rounded-lg transition-colors cursor-pointer ${
                  sortBy === opt.key
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
    </div>
  );
}

/* ================================================================== */
/*  RIGHT SIDEBAR — Activity                                           */
/* ================================================================== */

function ActivitySection() {
  const { lang, t } = useLanguage();
  const activities = getMockActivities();
  const todayActivities = activities.slice(0, 2);
  const yesterdayActivities = activities.slice(2);

  return (
    <div className="overflow-hidden" style={GLASS_STYLE}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[14px] font-[700] text-gray-900 dark:text-white">{t("pt.feedpage.activity.title")}</h4>
          <span className="text-[12px] font-[500] text-gray-400 dark:text-white/40 cursor-pointer hover:text-gray-600 dark:hover:text-white/60 transition-colors">
            {t("pt.feedpage.activity.seeall")}
          </span>
        </div>

        {/* Today */}
        <div className="space-y-3">
          {todayActivities.map((act) => {
            const char = getCharacterById(act.characterId);
            if (!char) return null;
            return (
              <div key={act.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={char.avatar} alt={localize(char.name, lang)} width={36} height={36} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-gray-700 dark:text-white/70 leading-snug">
                    <span className="font-[700]">{localize(char.name, lang)}</span>{" "}
                    <span className="font-[400]">
                      {act.type === "follow"
                        ? t("pt.feedpage.activity.followed")
                        : act.targetText
                        ? localize(act.targetText, lang)
                        : ""}
                    </span>{" "}
                    <span className="text-gray-400 dark:text-white/40">{localize(act.timestamp, lang)}</span>
                  </p>
                </div>
                {act.type === "follow" ? (
                  <button className="px-3 py-1 rounded-lg text-[11px] font-[600] text-sky-500 hover:bg-sky-500/5 transition-colors cursor-pointer">
                    {t("pt.feedpage.activity.follow")}
                  </button>
                ) : act.thumbnailImage ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={act.thumbnailImage} alt="" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Yesterday */}
        {yesterdayActivities.length > 0 && (
          <>
            <p className="text-[11px] font-[600] text-gray-400 dark:text-white/30 mt-4 mb-2">{t("pt.feedpage.activity.yesterday")}</p>
            <div className="space-y-3">
              {yesterdayActivities.map((act) => {
                const char = getCharacterById(act.characterId);
                if (!char) return null;
                return (
                  <div key={act.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={char.avatar} alt={localize(char.name, lang)} width={36} height={36} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-gray-700 dark:text-white/70 leading-snug">
                        <span className="font-[700]">{localize(char.name, lang)}</span>{" "}
                        <span className="font-[400]">
                          {act.targetText ? localize(act.targetText, lang) : t("pt.feedpage.activity.followed")}
                        </span>{" "}
                        <span className="text-gray-400 dark:text-white/40">{localize(act.timestamp, lang)}</span>
                      </p>
                    </div>
                    {act.thumbnailImage ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={act.thumbnailImage} alt="" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  RIGHT SIDEBAR — Suggested Characters                               */
/* ================================================================== */

function SuggestedCharactersSection() {
  const { lang, t } = useLanguage();
  const profile = getMockUserProfile();
  const allChars = getAllCharacters();
  const [followedIds, setFollowedIds] = useState<Set<string>>(new Set());

  // Characters the user does NOT follow (first 10 main chars only)
  const suggestedChars = allChars
    .filter((c) => !profile.followingCharacterIds.includes(c.id))
    .filter((c) => parseInt(c.id.replace("c", "")) <= 10)
    .slice(0, 4);

  const followedCharNames = allChars
    .filter((c) => profile.followingCharacterIds.includes(c.id))
    .map((c) => localize(c.name, lang));

  const toggleFollow = (id: string) => {
    setFollowedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="overflow-hidden" style={GLASS_STYLE}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[14px] font-[700] text-gray-900 dark:text-white">{t("pt.feedpage.suggested.title")}</h4>
          <span className="text-[12px] font-[500] text-gray-400 dark:text-white/40 cursor-pointer hover:text-gray-600 dark:hover:text-white/60 transition-colors">
            {t("pt.feedpage.suggested.seeall")}
          </span>
        </div>

        <div className="space-y-3">
          {suggestedChars.map((char, idx) => {
            const isFollowed = followedIds.has(char.id);
            return (
              <div key={char.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={char.avatar} alt={localize(char.name, lang)} width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-[700] text-gray-900 dark:text-white truncate">{localize(char.name, lang)}</p>
                  <p className="text-[10px] font-[400] text-gray-400 dark:text-white/40 truncate">
                    {idx % 2 === 0
                      ? `${t("pt.feedpage.suggested.followedby")} ${followedCharNames[idx % followedCharNames.length]}`
                      : t("pt.feedpage.suggested.foryou")}
                  </p>
                </div>
                <button
                  onClick={() => toggleFollow(char.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-[600] transition-colors cursor-pointer ${
                    isFollowed
                      ? "text-gray-500 dark:text-white/50"
                      : "text-sky-500 hover:bg-sky-500/5"
                  }`}
                >
                  {isFollowed ? t("pt.feedpage.suggested.followed") : t("pt.feedpage.suggested.follow")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  RIGHT SIDEBAR — Novel Recommendations                              */
/* ================================================================== */

function NovelRecommendations() {
  const { lang, t } = useLanguage();
  const lhref = useLocalizedHref();
  const novels = getAllNovels().slice(0, 3);

  return (
    <div className="overflow-hidden" style={GLASS_STYLE}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[14px] font-[700] text-gray-900 dark:text-white">{t("pt.feedpage.novels.title")}</h4>
          <Link
            href={lhref("/novels")}
            className="text-[12px] font-[500] text-gray-400 dark:text-white/40 cursor-pointer hover:text-gray-600 dark:hover:text-white/60 transition-colors"
          >
            {t("pt.feedpage.novels.seeall")}
          </Link>
        </div>

        <div className="space-y-3">
          {novels.map((novel) => (
            <Link
              key={novel.id}
              href={lhref(`/novel/${novel.slug}`)}
              className="flex items-center gap-3 group"
            >
              {/* Cover thumbnail */}
              <div className="w-[50px] h-[70px] rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image
                  src={novel.coverImage}
                  alt={localize(novel.title, lang)}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-[650] text-gray-900 dark:text-white truncate group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {localize(novel.title, lang)}
                </p>
                <p className="text-[11px] font-[450] text-gray-400 dark:text-white/40 truncate">
                  {localize(novel.author, lang)}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star1 size={11} variant="Bold" color="#fbbf24" />
                  <span className="text-[11px] font-[600] text-gray-500 dark:text-white/50">{novel.rating}</span>
                  <span className="text-[10px] font-[400] text-gray-300 dark:text-white/20 mx-1">&middot;</span>
                  <span className="text-[10px] font-[400] text-gray-400 dark:text-white/30">
                    {novel.genres.map((g) => localize(g, lang)).join(", ")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function FeedPage() {
  const { lang } = useLanguage();
  const profile = getMockUserProfile();
  const allPosts = getAllPosts();

  // Filter posts to only show characters the user follows
  const feedPosts = allPosts.filter((p) =>
    profile.followingCharacterIds.includes(p.characterId)
  );

  return (
    <>
      {/* Social button animation styles */}
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

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 max-w-[1400px] mx-auto px-4 md:px-8 lg:pl-28 lg:pr-10 xl:pl-32 xl:pr-12 pt-20 pb-24 lg:pb-8">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto thin-scrollbar">
            <UserProfileCard />
            <ShortcutsList />
          </div>
        </aside>

        {/* ── MIDDLE FEED ── */}
        <main className="min-w-0">
          <CreatePostInput />
          <FeedSortControl />

          {/* Masonry post grid */}
          <div className="columns-1 xl:columns-2 gap-4">
            {feedPosts.map((post, i) => (
              <FeedPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto thin-scrollbar">
            <ActivitySection />
            <SuggestedCharactersSection />
            <NovelRecommendations />
          </div>
        </aside>
      </div>
    </>
  );
}
