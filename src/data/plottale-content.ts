/**
 * Plottale Content — structured bilingual data (EN + TH)
 *
 * All content types are JSON-serializable and ready for
 * future CMS API integration. When migrating to a CMS,
 * replace the getter functions with async fetch calls —
 * the interfaces and `localize()` helper stay the same.
 */

/* ================================================================== */
/*  Bilingual Primitives                                               */
/* ================================================================== */

export type LocalizedString = { en: string; th: string };

/** Resolve a LocalizedString to the active language. */
export function localize(ls: LocalizedString, lang: "en" | "th"): string {
  return ls[lang] ?? ls.en;
}

/* ================================================================== */
/*  Genre Map (deduplicated translations)                              */
/* ================================================================== */

export const GENRE: Record<string, LocalizedString> = {
  Thriller:       { en: "Thriller",       th: "ระทึกขวัญ" },
  Survival:       { en: "Survival",       th: "เอาชีวิตรอด" },
  "Sci-Fi":       { en: "Sci-Fi",         th: "ไซไฟ" },
  Romance:        { en: "Romance",        th: "โรแมนติก" },
  Mystery:        { en: "Mystery",        th: "ลึกลับ" },
  Drama:          { en: "Drama",          th: "ดราม่า" },
  Music:          { en: "Music",          th: "ดนตรี" },
  Adventure:      { en: "Adventure",      th: "ผจญภัย" },
  Fantasy:        { en: "Fantasy",        th: "แฟนตาซี" },
  Historical:     { en: "Historical",     th: "อิงประวัติศาสตร์" },
  Action:         { en: "Action",         th: "แอ็คชั่น" },
  Literary:       { en: "Literary",       th: "วรรณกรรม" },
  "Coming-of-Age": { en: "Coming-of-Age", th: "วัยเยาว์" },
  Supernatural:   { en: "Supernatural",   th: "เหนือธรรมชาติ" },
};

/* ================================================================== */
/*  Novel Interface + Data                                             */
/* ================================================================== */

export interface PlottaleNovel {
  id: string;
  slug: string;
  title: LocalizedString;
  author: LocalizedString;
  authorAvatar: string;
  synopsis: LocalizedString;
  rating: number;
  genres: LocalizedString[];
  coverImage: string;
  backdropImage?: string;
  images: string[];
  placeholderGradient: string;
  trailerThumbnail?: string;
  contentRating?: string;
}

const NOVELS: PlottaleNovel[] = [
  {
    id: "1",
    slug: "cargo",
    title: { en: "Cargo", th: "คาร์โก้" },
    author: { en: "Andy Rose", th: "แอนดี้ โรส" },
    authorAvatar: "/plottale/avatars/char-c1.jpg",
    synopsis: {
      en: "A father fights across a ravaged wasteland to deliver his infant daughter to safety before a plague turns him into something inhuman.",
      th: "พ่อคนหนึ่งต่อสู้ฝ่าดินแดนรกร้างเพื่อนำลูกสาวทารกไปสู่ที่ปลอดภัย ก่อนที่โรคระบาดจะเปลี่ยนเขาให้กลายเป็นสิ่งที่ไม่ใช่มนุษย์",
    },
    rating: 4.8,
    genres: [GENRE["Thriller"], GENRE["Survival"]],
    coverImage: "/plottale/covers/0212b4a89dc44f6cf134af4a4d13f156.jpg",
    backdropImage: "/plottale/covers/1-2.jpg",
    images: ["/plottale/covers/0212b4a89dc44f6cf134af4a4d13f156.jpg", "/plottale/covers/1-2.jpg", "/plottale/covers/1-3.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/6-2.jpg", "/plottale/covers/9-2.jpg", "/plottale/covers/10-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #3d3024 0%, #6b5b3e 40%, #c4956a 100%)",
    trailerThumbnail: "/plottale/covers/1-2.jpg",
    contentRating: "TV-MA",
  },
  {
    id: "2",
    slug: "bokeh",
    title: { en: "Bokeh", th: "โบเก้" },
    author: { en: "Jennie Lux", th: "เจนนี่ ลักซ์" },
    authorAvatar: "/plottale/avatars/char-c2.jpg",
    synopsis: {
      en: "Two lovers wake in an empty world where everyone has vanished — and the longer they stay, the more they forget who they were.",
      th: "คู่รักตื่นขึ้นในโลกว่างเปล่าที่ทุกคนหายไป — ยิ่งอยู่นานเท่าไหร่ พวกเขาก็ยิ่งลืมว่าตัวเองเป็นใคร",
    },
    rating: 4.7,
    genres: [GENRE["Sci-Fi"], GENRE["Romance"]],
    coverImage: "/plottale/covers/03515be21a1be105d415083f22602246.jpg",
    backdropImage: "/plottale/covers/2-2.jpg",
    images: ["/plottale/covers/03515be21a1be105d415083f22602246.jpg", "/plottale/covers/2-2.jpg", "/plottale/covers/2-3.jpg", "/plottale/covers/4-2.jpg", "/plottale/covers/7-2.jpg", "/plottale/covers/11-2.jpg", "/plottale/covers/13-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #1a3a4a 0%, #2d7d9a 50%, #e8c87a 100%)",
    trailerThumbnail: "/plottale/covers/2-2.jpg",
    contentRating: "PG-13",
  },
  {
    id: "3",
    slug: "sakli",
    title: { en: "Sakl\u0131", th: "ซาคลี" },
    author: { en: "Kira Aydin", th: "คิร่า อายดิน" },
    authorAvatar: "/plottale/avatars/char-c3.jpg",
    synopsis: {
      en: "Four strangers discover they share the same recurring nightmare — and the face that haunts them belongs to someone very much alive.",
      th: "คนแปลกหน้าสี่คนค้นพบว่าพวกเขาฝันร้ายซ้ำๆ เหมือนกัน — และใบหน้าที่หลอกหลอนพวกเขาเป็นของคนที่ยังมีชีวิตอยู่",
    },
    rating: 4.9,
    genres: [GENRE["Thriller"], GENRE["Mystery"]],
    coverImage: "/plottale/covers/19b5cf3d7edaea3cd2a20dbe7ed6f217.jpg",
    backdropImage: "/plottale/covers/3-2.jpg",
    images: ["/plottale/covers/19b5cf3d7edaea3cd2a20dbe7ed6f217.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/1-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/12-2.jpg", "/plottale/covers/14-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #0d1117 0%, #1a2332 40%, #c62828 100%)",
    trailerThumbnail: "/plottale/covers/3-2.jpg",
    contentRating: "TV-MA",
  },
  {
    id: "4",
    slug: "yuna",
    title: { en: "Yuna", th: "ยูนา" },
    author: { en: "Yuna Park", th: "ยูนา ปาร์ค" },
    authorAvatar: "/plottale/avatars/char-c4.jpg",
    synopsis: {
      en: "A K-pop trainee must choose between her dream debut and exposing the industry\u2019s darkest secret before it claims another life.",
      th: "เด็กฝึก K-pop ต้องเลือกระหว่างการเดบิวต์ในฝันกับการเปิดโปงความลับที่มืดมนที่สุดของวงการ ก่อนที่มันจะคร่าชีวิตคนอื่นอีก",
    },
    rating: 4.6,
    genres: [GENRE["Drama"], GENRE["Music"]],
    coverImage: "/plottale/covers/246a33344245a7bf95a83eb183388b86.jpg",
    backdropImage: "/plottale/covers/4-2.jpg",
    images: ["/plottale/covers/246a33344245a7bf95a83eb183388b86.jpg", "/plottale/covers/4-2.jpg", "/plottale/covers/4-3.jpg", "/plottale/covers/2-2.jpg", "/plottale/covers/6-3.jpg", "/plottale/covers/10-3.jpg", "/plottale/covers/13-3.jpg"],
    placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #42a5f5 50%, #fdd835 100%)",
    trailerThumbnail: "/plottale/covers/4-2.jpg",
    contentRating: "TV-14",
  },
  {
    id: "5",
    slug: "humans",
    title: { en: "Humans", th: "ฮิวแมนส์" },
    author: { en: "Mia Synth", th: "เมีย ซินธ์" },
    authorAvatar: "/plottale/avatars/char-c5.jpg",
    synopsis: {
      en: "When synthetic humans become indistinguishable from their creators, one family\u2019s new helper begins to remember a life she never lived.",
      th: "เมื่อมนุษย์สังเคราะห์แยกไม่ออกจากผู้สร้าง ผู้ช่วยคนใหม่ของครอบครัวหนึ่งเริ่มจำชีวิตที่เธอไม่เคยมีได้",
    },
    rating: 4.8,
    genres: [GENRE["Sci-Fi"], GENRE["Drama"]],
    coverImage: "/plottale/covers/4f462ffab27bec628e140a4121c6ed10.jpg",
    backdropImage: "/plottale/covers/5-2.jpg",
    images: ["/plottale/covers/4f462ffab27bec628e140a4121c6ed10.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/1-3.jpg", "/plottale/covers/4-3.jpg", "/plottale/covers/8-3.jpg", "/plottale/covers/11-3.jpg", "/plottale/covers/14-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #0a192f 0%, #20b2aa 50%, #00e5ff 100%)",
    trailerThumbnail: "/plottale/covers/5-2.jpg",
    contentRating: "TV-14",
  },
  {
    id: "6",
    slug: "the-jade-pilgrim",
    title: { en: "The Jade Pilgrim", th: "ผู้แสวงบุญหยก" },
    author: { en: "Lin Feng", th: "หลิน เฟิง" },
    authorAvatar: "/plottale/avatars/char-c6.jpg",
    synopsis: {
      en: "A young cartographer scales the impossible peaks of the Dragon Spine mountains to find a lost monastery that holds the map to immortality.",
      th: "นักทำแผนที่หนุ่มปีนยอดเขาสันมังกรที่เป็นไปไม่ได้ เพื่อค้นหาวัดที่สาบสูญซึ่งเก็บแผนที่สู่ความเป็นอมตะ",
    },
    rating: 4.7,
    genres: [GENRE["Adventure"], GENRE["Fantasy"]],
    coverImage: "/plottale/covers/5b485520732538ee0ff3160047546453.jpg",
    backdropImage: "/plottale/covers/6-2.jpg",
    images: ["/plottale/covers/5b485520732538ee0ff3160047546453.jpg", "/plottale/covers/6-2.jpg", "/plottale/covers/6-3.jpg", "/plottale/covers/2-3.jpg", "/plottale/covers/9-2.jpg", "/plottale/covers/12-2.jpg", "/plottale/covers/14-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #1b4332 0%, #2d6a4f 40%, #95d5b2 100%)",
    trailerThumbnail: "/plottale/covers/6-2.jpg",
    contentRating: "PG-13",
  },
  {
    id: "7",
    slug: "los-adioses",
    title: { en: "Los Adioses", th: "ลอส อาดิโอเซส" },
    author: { en: "Elena Vargas", th: "เอเลน่า วาร์กัส" },
    authorAvatar: "/plottale/avatars/char-c7.jpg",
    synopsis: {
      en: "A celebrated writer retreats to a mountain sanatorium where two women from different chapters of her life arrive — each claiming to be her true love.",
      th: "นักเขียนชื่อดังหลบไปพักที่สถานพักฟื้นบนภูเขา ที่ซึ่งผู้หญิงสองคนจากบทต่างๆ ของชีวิตเธอมาถึง — ต่างอ้างว่าเป็นรักแท้ของเธอ",
    },
    rating: 4.5,
    genres: [GENRE["Historical"], GENRE["Romance"]],
    coverImage: "/plottale/covers/993c8a47ae9d0cb07c5c58335fb68bf8.jpg",
    backdropImage: "/plottale/covers/7-2.jpg",
    images: ["/plottale/covers/993c8a47ae9d0cb07c5c58335fb68bf8.jpg", "/plottale/covers/7-2.jpg", "/plottale/covers/1-2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #4a3728 0%, #8d6e53 50%, #d4a574 100%)",
    trailerThumbnail: "/plottale/covers/7-2.jpg",
    contentRating: "PG-13",
  },
  {
    id: "8",
    slug: "eko",
    title: { en: "Eko", th: "เอโกะ" },
    author: { en: "Sora Tempest", th: "โซร่า เทมเปสต์" },
    authorAvatar: "/plottale/avatars/char-c10.jpg",
    synopsis: {
      en: "An unlikely band of rebels must cross a war-torn continent to deliver a message that could end a century-long conflict — or ignite a new one.",
      th: "กลุ่มกบฏที่ไม่น่าจะเป็นไปได้ต้องข้ามทวีปที่บอบช้ำจากสงคราม เพื่อส่งข้อความที่อาจยุติความขัดแย้งร้อยปี — หรือจุดชนวนใหม่",
    },
    rating: 4.6,
    genres: [GENRE["Adventure"], GENRE["Action"]],
    coverImage: "/plottale/covers/a3c106335b43f816242fe560b478a220.jpg",
    backdropImage: "/plottale/covers/8-2.jpg",
    images: ["/plottale/covers/a3c106335b43f816242fe560b478a220.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/8-3.jpg", "/plottale/covers/2-2.jpg", "/plottale/covers/4-2.jpg", "/plottale/covers/6-3.jpg", "/plottale/covers/11-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #2c3e50 0%, #e67e22 50%, #f39c12 100%)",
    trailerThumbnail: "/plottale/covers/8-2.jpg",
    contentRating: "TV-14",
  },
  {
    id: "9",
    slug: "poppie-nongena",
    title: { en: "Poppie Nongena", th: "ป๊อปปี้ นองเกนา" },
    author: { en: "Poppie Nongena", th: "ป๊อปปี้ นองเกนา" },
    authorAvatar: "/plottale/avatars/char-c8.jpg",
    synopsis: {
      en: "Through decades of forced removals and broken families, one woman\u2019s unbreakable spirit becomes the heartbeat of a nation\u2019s conscience.",
      th: "ผ่านหลายทศวรรษของการถูกบังคับอพยพและครอบครัวแตกสลาย จิตวิญญาณที่ไม่มีวันหักของผู้หญิงคนหนึ่งกลายเป็นหัวใจของจิตสำนึกแห่งชาติ",
    },
    rating: 4.9,
    genres: [GENRE["Drama"], GENRE["Historical"]],
    coverImage: "/plottale/covers/baa4ede204df7908a252c744916ab548.jpg",
    backdropImage: "/plottale/covers/9-2.jpg",
    images: ["/plottale/covers/baa4ede204df7908a252c744916ab548.jpg", "/plottale/covers/9-2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/6-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/1-3.jpg", "/plottale/covers/2-3.jpg"],
    placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #8d6e63 50%, #d7ccc8 100%)",
    trailerThumbnail: "/plottale/covers/9-2.jpg",
    contentRating: "TV-MA",
  },
  {
    id: "10",
    slug: "ethereal",
    title: { en: "Ethereal", th: "อีเธอเรียล" },
    author: { en: "Nari Yuni", th: "นาริ ยูนิ" },
    authorAvatar: "/plottale/avatars/char-c9.jpg",
    synopsis: {
      en: "A botanist discovers that an ancient tree in a forgotten forest is alive with memories — and one of them is her own death.",
      th: "นักพฤกษศาสตร์ค้นพบว่าต้นไม้โบราณในป่าที่ถูกลืมมีชีวิตด้วยความทรงจำ — และหนึ่งในนั้นคือการตายของเธอเอง",
    },
    rating: 4.7,
    genres: [GENRE["Fantasy"], GENRE["Literary"]],
    coverImage: "/plottale/covers/c12874740a7cb5d586969a7a8a68bdb1.jpg",
    backdropImage: "/plottale/covers/10-2.jpg",
    images: ["/plottale/covers/c12874740a7cb5d586969a7a8a68bdb1.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/10-3.jpg", "/plottale/covers/4-3.jpg", "/plottale/covers/7-2.jpg", "/plottale/covers/12-2.jpg", "/plottale/covers/14-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #1a472a 0%, #4caf50 50%, #e8f5e9 100%)",
    trailerThumbnail: "/plottale/covers/10-2.jpg",
    contentRating: "PG-13",
  },
  {
    id: "11",
    slug: "river-of-a-thousand-windows",
    title: { en: "River of a Thousand Windows", th: "แม่น้ำพันบาน" },
    author: { en: "Lin Feng", th: "หลิน เฟิง" },
    authorAvatar: "/plottale/avatars/char-c6.jpg",
    synopsis: {
      en: "Three siblings sail a forgotten river through a jungle of impossible creatures, searching for a mother who left a trail of paper lanterns.",
      th: "พี่น้องสามคนล่องแม่น้ำที่ถูกลืมผ่านป่าดงดิบแห่งสัตว์ประหลาด ตามหาแม่ที่ทิ้งรอยทางของโคมกระดาษไว้",
    },
    rating: 4.5,
    genres: [GENRE["Adventure"], GENRE["Coming-of-Age"]],
    coverImage: "/plottale/covers/cec558d397163a3cdaa87758c868228d.jpg",
    backdropImage: "/plottale/covers/11-2.jpg",
    images: ["/plottale/covers/cec558d397163a3cdaa87758c868228d.jpg", "/plottale/covers/11-2.jpg", "/plottale/covers/11-3.jpg", "/plottale/covers/1-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/9-2.jpg", "/plottale/covers/13-3.jpg"],
    placeholderGradient: "linear-gradient(145deg, #0d4f3c 0%, #1b8a5a 40%, #81d4fa 100%)",
    trailerThumbnail: "/plottale/covers/11-2.jpg",
    contentRating: "PG-13",
  },
  {
    id: "12",
    slug: "stay-with-me",
    title: { en: "Stay With Me", th: "อยู่กับฉัน" },
    author: { en: "Jennie Lux", th: "เจนนี่ ลักซ์" },
    authorAvatar: "/plottale/avatars/char-c2.jpg",
    synopsis: {
      en: "A photographer chasing city lights meets a ghost who can only be seen through a camera lens — and she has just seven nights before she fades forever.",
      th: "ช่างภาพที่ไล่ตามแสงไฟเมืองพบผีที่มองเห็นได้ผ่านเลนส์กล้องเท่านั้น — และเธอเหลือเวลาเพียงเจ็ดคืนก่อนจะจางหายตลอดกาล",
    },
    rating: 4.6,
    genres: [GENRE["Romance"], GENRE["Supernatural"]],
    coverImage: "/plottale/covers/cf0438690f8c6dd4f5a4997ec1ace741.jpg",
    backdropImage: "/plottale/covers/12-2.jpg",
    images: ["/plottale/covers/cf0438690f8c6dd4f5a4997ec1ace741.jpg", "/plottale/covers/12-2.jpg", "/plottale/covers/2-3.jpg", "/plottale/covers/6-2.jpg", "/plottale/covers/8-3.jpg", "/plottale/covers/10-3.jpg", "/plottale/covers/14-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #1a1a2e 0%, #e91e63 50%, #ff6f00 100%)",
    trailerThumbnail: "/plottale/covers/12-2.jpg",
    contentRating: "TV-14",
  },
  {
    id: "13",
    slug: "yuni",
    title: { en: "Yuni", th: "ยูนิ" },
    author: { en: "Nari Yuni", th: "นาริ ยูนิ" },
    authorAvatar: "/plottale/avatars/char-c9.jpg",
    synopsis: {
      en: "A brilliant student in a small town receives two marriage proposals on the same day — and neither groom knows she dreams of a life beyond them all.",
      th: "นักเรียนหัวดีในเมืองเล็กๆ ได้รับข้อเสนอแต่งงานสองครั้งในวันเดียวกัน — และเจ้าบ่าวทั้งสองไม่รู้ว่าเธอใฝ่ฝันถึงชีวิตที่มากกว่า",
    },
    rating: 4.8,
    genres: [GENRE["Drama"], GENRE["Coming-of-Age"]],
    coverImage: "/plottale/covers/d900972bc540f8c7881e473b247221b0.jpg",
    backdropImage: "/plottale/covers/13-2.jpg",
    images: ["/plottale/covers/d900972bc540f8c7881e473b247221b0.jpg", "/plottale/covers/13-2.jpg", "/plottale/covers/13-3.jpg", "/plottale/covers/1-3.jpg", "/plottale/covers/4-2.jpg", "/plottale/covers/7-2.jpg", "/plottale/covers/11-3.jpg"],
    placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #9c27b0 50%, #e1bee7 100%)",
    trailerThumbnail: "/plottale/covers/13-2.jpg",
    contentRating: "TV-14",
  },
  {
    id: "14",
    slug: "the-storm-weaver",
    title: { en: "The Storm Weaver", th: "ผู้ถักทอพายุ" },
    author: { en: "Sora Tempest", th: "โซร่า เทมเปสต์" },
    authorAvatar: "/plottale/avatars/char-c10.jpg",
    synopsis: {
      en: "A girl born inside a tornado discovers she can shape storms with her voice — but each one she calms steals a memory from someone she loves.",
      th: "เด็กหญิงที่เกิดในพายุทอร์นาโดค้นพบว่าเธอสามารถปั้นพายุด้วยเสียง — แต่ทุกครั้งที่เธอสงบพายุ ความทรงจำของคนที่เธอรักจะถูกขโมยไป",
    },
    rating: 4.7,
    genres: [GENRE["Fantasy"], GENRE["Supernatural"]],
    coverImage: "/plottale/covers/1d22d35512f7a5887a9b667b06bca6c2.jpg",
    backdropImage: "/plottale/covers/14-2.jpg",
    images: ["/plottale/covers/1d22d35512f7a5887a9b667b06bca6c2.jpg", "/plottale/covers/14-2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #7e57c2 50%, #e0e0e0 100%)",
    trailerThumbnail: "/plottale/covers/14-2.jpg",
    contentRating: "TV-14",
  },
];

/* ================================================================== */
/*  Feature Interface + Data                                           */
/* ================================================================== */

export interface PlottaleFeature {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string; // key for ICON_MAP in the component layer
  gradient: string;
  iconColor: string;
  span?: "wide" | "tall" | "featured";
}

const FEATURES: PlottaleFeature[] = [
  {
    id: "ai-chat",
    title: { en: "AI Character Chat", th: "แชทกับตัวละคร AI" },
    description: {
      en: "Talk to any character from any novel. They remember their backstory, relationships, and plot events. Roleplay, ask questions, or just hang out.",
      th: "พูดคุยกับตัวละครจากนิยายเรื่องใดก็ได้ พวกเขาจำเรื่องราว ความสัมพันธ์ และเหตุการณ์ในพล็อตได้ เล่นบทบาทสมมติ ถามคำถาม หรือแค่แฮงค์เอาท์",
    },
    icon: "MessageText1",
    gradient: "linear-gradient(135deg, #a1f0c2 0%, #56c88a 100%)",
    iconColor: "#2e8b57",
    span: "wide",
  },
  {
    id: "cinematic-reading",
    title: { en: "Cinematic Reading", th: "การอ่านแบบภาพยนตร์" },
    description: {
      en: "Immersive reader with atmospheric controls, chapter progress, and mood-adaptive themes.",
      th: "เครื่องอ่านแบบดื่มด่ำพร้อมการควบคุมบรรยากาศ ความคืบหน้าบท และธีมที่ปรับตามอารมณ์",
    },
    icon: "Book1",
    gradient: "linear-gradient(135deg, #a8c0ff 0%, #7b8cde 100%)",
    iconColor: "#4a5ba8",
  },
  {
    id: "character-social",
    title: { en: "Character Social", th: "โซเชียลตัวละคร" },
    description: {
      en: "Characters have their own social profiles. Follow their stories, see their posts between chapters.",
      th: "ตัวละครมีโปรไฟล์โซเชียลของตัวเอง ติดตามเรื่องราวของพวกเขา ดูโพสต์ระหว่างบท",
    },
    icon: "People",
    gradient: "linear-gradient(135deg, #f8a4d0 0%, #d16ba5 100%)",
    iconColor: "#9b3d78",
  },
  {
    id: "world-builder",
    title: { en: "World Builder", th: "สร้างโลก" },
    description: {
      en: "Build immersive worlds with AI-assisted lore, maps, timelines, and character relationship graphs.",
      th: "สร้างโลกที่ดื่มด่ำด้วยตำนานที่ AI ช่วย แผนที่ ไทม์ไลน์ และกราฟความสัมพันธ์ตัวละคร",
    },
    icon: "Brush2",
    gradient: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
    iconColor: "#6b21a8",
    span: "tall",
  },
  {
    id: "trailer-gen",
    title: { en: "Trailer Generator", th: "สร้างตัวอย่าง" },
    description: {
      en: "Auto-generate cinematic trailers from your novel scenes using AI visual synthesis.",
      th: "สร้างตัวอย่างภาพยนตร์จากฉากนิยายของคุณโดยอัตโนมัติด้วยการสังเคราะห์ภาพ AI",
    },
    icon: "VideoPlay",
    gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    iconColor: "#92400e",
  },
  {
    id: "character-bible",
    title: { en: "Character Bible", th: "คู่มือตัวละคร" },
    description: {
      en: "Maintain consistent characters across chapters with AI-powered personality tracking.",
      th: "รักษาตัวละครให้สม่ำเสมอตลอดทุกบทด้วยการติดตามบุคลิกภาพที่ขับเคลื่อนด้วย AI",
    },
    icon: "DocumentText1",
    gradient: "linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)",
    iconColor: "#0f766e",
  },
  {
    id: "consistency-check",
    title: { en: "Consistency Check", th: "ตรวจสอบความสอดคล้อง" },
    description: {
      en: "AI checks your novel for plot holes, timeline contradictions, and character inconsistencies.",
      th: "AI ตรวจสอบนิยายของคุณเพื่อหาช่องโหว่ของพล็อต ความขัดแย้งของไทม์ไลน์ และความไม่สอดคล้องของตัวละคร",
    },
    icon: "TickCircle",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
    iconColor: "#1e40af",
  },
  {
    id: "publish",
    title: { en: "Publish & Monetize", th: "เผยแพร่และสร้างรายได้" },
    description: {
      en: "Publish your cinematic novel. Earn from reads, premium chapters, AI character access, and merchandise.",
      th: "เผยแพร่นิยายภาพยนตร์ของคุณ สร้างรายได้จากการอ่าน บทพรีเมียม การเข้าถึงตัวละคร AI และสินค้า",
    },
    icon: "DollarCircle",
    gradient: "linear-gradient(135deg, #f6d365 0%, #f5a623 100%)",
    iconColor: "#b87a14",
    span: "wide",
  },
];

/* ================================================================== */
/*  Footer Links                                                       */
/* ================================================================== */

export interface FooterLink {
  labelKey: string; // points to LanguageContext translations
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { labelKey: "pt.footer.about",   href: "#" },
  { labelKey: "pt.footer.blog",    href: "#" },
  { labelKey: "pt.footer.careers", href: "#" },
  { labelKey: "pt.footer.terms",   href: "#" },
  { labelKey: "pt.footer.privacy", href: "#" },
];

/* ================================================================== */
/*  Hero Feature Pills                                                 */
/* ================================================================== */

export interface HeroPill {
  labelKey: string; // points to LanguageContext translations
  icon: string;     // icon key for ICON_MAP
}

export const HERO_PILLS: HeroPill[] = [
  { labelKey: "pt.hero.pill.chat",    icon: "MessageText1" },
  { labelKey: "pt.hero.pill.trailer", icon: "VideoPlay" },
  { labelKey: "pt.hero.pill.script",  icon: "Edit2" },
  { labelKey: "pt.hero.pill.social",  icon: "People" },
];

/* ================================================================== */
/*  Getter Functions (replace with async API calls for CMS)            */
/* ================================================================== */

export function getAllNovels(): PlottaleNovel[] {
  return NOVELS;
}

export function getNovelById(id: string): PlottaleNovel | undefined {
  return NOVELS.find((n) => n.id === id);
}

export function getNovelBySlug(slug: string): PlottaleNovel | undefined {
  return NOVELS.find((n) => n.slug === slug);
}

export function getAllFeatures(): PlottaleFeature[] {
  return FEATURES;
}

/* ================================================================== */
/*  Chapter Interface + Data                                           */
/* ================================================================== */

export interface PlottaleChapter {
  id: string;
  novelId: string;
  number: number;
  title: LocalizedString;
  description: LocalizedString;
  readingTime: number;
  heroImage?: string;
  content: LocalizedString;
  epigraph?: LocalizedString;
}

const CHAPTERS: PlottaleChapter[] = [
  // Novel 1 — Cargo
  {
    id: "ch1-1", novelId: "1", number: 1,
    title: { en: "The Last Morning", th: "เช้าวันสุดท้าย" },
    description: { en: "Andy wakes to sirens and an empty street. His wife is gone, but the baby is still breathing.", th: "แอนดี้ตื่นขึ้นมาพร้อมเสียงไซเรนและถนนว่างเปล่า ภรรยาหายไป แต่ลูกยังหายใจอยู่" },
    readingTime: 12,
    heroImage: "/plottale/covers/1-2.jpg",
    epigraph: { en: "The world didn't end with a bang. It ended with a cough.", th: "โลกไม่ได้จบลงด้วยเสียงระเบิด มันจบลงด้วยเสียงไอ" },
    content: {
      en: "The sirens had stopped sometime before dawn, leaving behind a silence that felt heavier than any sound. Andy sat on the edge of the bed, staring at the crib where Rosie slept with her fists curled against her cheeks. The sheets beside him were cold. Kay's phone was still on the nightstand, its screen cracked from last night.\n\nHe pulled back the curtain. The street below was empty — not the peaceful emptiness of early morning, but the hollow kind that comes after evacuation. A military truck sat abandoned at the intersection, its doors hanging open. Somewhere far away, a dog barked once and then went quiet.\n\nRosie stirred, making the small sound that meant she'd be hungry soon. Andy lifted her carefully, pressing his lips to her forehead. She was warm but not feverish. Not yet. He had forty-eight hours, maybe less, before the virus in his blood would finish what it started. Forty-eight hours to get her somewhere safe.",
      th: "เสียงไซเรนหยุดลงก่อนรุ่งสาง ทิ้งไว้เพียงความเงียบที่หนักหน่วงกว่าเสียงใดๆ แอนดี้นั่งอยู่ขอบเตียง จ้องมองเปลที่โรซี่หลับอยู่ด้วยกำปั้นเล็กๆ กดแนบแก้ม ผ้าปูข้างกายเขาเย็นชืด โทรศัพท์ของเคย์ยังวางอยู่บนโต๊ะข้างเตียง หน้าจอแตกร้าวจากเมื่อคืน\n\nเขาเปิดม่านออก ถนนข้างล่างว่างเปล่า — ไม่ใช่ความว่างเปล่าอันสงบของยามเช้าตรู่ แต่เป็นความว่างเปล่าที่เหลือหลังการอพยพ รถทหารจอดทิ้งอยู่ที่สี่แยก ประตูเปิดค้าง ที่ไหนสักแห่งไกลออกไป สุนัขเห่าครั้งเดียวแล้วเงียบ\n\nโรซี่ขยับตัว ส่งเสียงเบาๆ ที่หมายความว่าเธอจะหิวในไม่ช้า แอนดี้อุ้มเธอขึ้นอย่างระมัดระวัง แนบริมฝีปากกับหน้าผาก เธออุ่นแต่ไม่ได้เป็นไข้ ยังไม่ถึงเวลา เขามีเวลาสี่สิบแปดชั่วโมง อาจจะน้อยกว่านั้น ก่อนที่ไวรัสในเลือดจะทำสิ่งที่มันเริ่มไว้จนสำเร็จ สี่สิบแปดชั่วโมงเพื่อพาเธอไปที่ปลอดภัย"
    },
  },
  {
    id: "ch1-2", novelId: "1", number: 2,
    title: { en: "Forty-Eight Hours", th: "สี่สิบแปดชั่วโมง" },
    description: { en: "The clock is ticking. Andy must cross the quarantine zone before the fever takes hold.", th: "เวลากำลังเดิน แอนดี้ต้องข้ามเขตกักกันก่อนที่ไข้จะเริ่มกัดกิน" },
    readingTime: 15,
    heroImage: "/plottale/covers/1-3.jpg",
    content: {
      en: "The quarantine fence stretched across the highway like a scar. Three metres of chain-link topped with razor wire, backed by concrete barriers spray-painted with biohazard symbols. On the other side, Andy could see the green hills of the safe zone — close enough to touch, impossibly far away.\n\nHe checked the makeshift sling holding Rosie against his chest. She'd been quiet for the last hour, her eyes wide and watching everything with the calm curiosity of someone too young to understand fear. His hands trembled as he unscrewed the water bottle. The first symptom. Tremors, then fever, then the change.\n\nA gap in the fence. Someone had cut through the links near the drainage culvert, leaving just enough space for a person to crawl through. Andy knelt, measuring the opening with his eyes. Rosie would fit. He would fit. But the motion sensors on the other side blinked red every four seconds, and he could hear the patrol truck somewhere beyond the hill.",
      th: "รั้วกักกันทอดยาวข้ามทางหลวงเหมือนรอยแผลเป็น รั้วลวดหนามสูงสามเมตร หนุนด้วยแบริเออร์คอนกรีตที่พ่นสัญลักษณ์อันตรายทางชีวภาพ อีกฝั่งหนึ่ง แอนดี้มองเห็นเนินเขาเขียวของเขตปลอดภัย — ใกล้แค่เอื้อม แต่ไกลจนเหลือเชื่อ\n\nเขาตรวจผ้าอุ้มชั่วคราวที่รัดโรซี่ไว้กับอก เธอเงียบมาตลอดชั่วโมงที่ผ่านมา ตากลมโตมองทุกอย่างด้วยความสงสัยอันสงบของคนที่เด็กเกินกว่าจะเข้าใจความกลัว มือเขาสั่นขณะไขฝาขวดน้ำ อาการแรก สั่น แล้วก็ไข้ แล้วก็การเปลี่ยนแปลง\n\nช่องว่างในรั้ว มีคนตัดลวดใกล้ท่อระบายน้ำ เหลือช่องพอให้คนคลานผ่านได้ แอนดี้คุกเข่า วัดช่องเปิดด้วยสายตา โรซี่ผ่านได้ เขาผ่านได้ แต่เซ็นเซอร์ตรวจจับการเคลื่อนไหวอีกฝั่งกะพริบแดงทุกสี่วินาที และเขาได้ยินเสียงรถลาดตระเวนที่ไหนสักแห่งเลยเนินไป"
    },
  },
  {
    id: "ch1-3", novelId: "1", number: 3,
    title: { en: "The Bridge", th: "สะพาน" },
    description: { en: "A collapsed bridge and a stranger with a boat. Trust is the most dangerous currency left.", th: "สะพานพัง คนแปลกหน้าพร้อมเรือ ความไว้ใจคือสกุลเงินที่อันตรายที่สุด" },
    readingTime: 10,
    heroImage: "/plottale/covers/3-2.jpg",
    content: {
      en: "The bridge had collapsed into the river like a broken spine. Chunks of concrete jutted from the brown water at impossible angles, and the steel cables swung in the wind like severed tendons. Andy stood at the edge, Rosie pressed against his chest, and stared at the hundred metres of churning water between him and the far bank.\n\nA whistle. Low and sharp, from somewhere downstream. He turned to see a man sitting in an aluminium boat, one oar resting across his knees. The stranger was old, weathered, with eyes that held neither kindness nor cruelty — just calculation. \"Baby yours?\" the man asked. Andy nodded. \"Safe zone's three clicks past the ridge. I can get you across.\"\n\n\"What's the price?\" Andy asked, though he already knew. In this world, everything cost something. The man pointed at Andy's backpack — the one holding the last of the antibiotics, the water purification tablets, the photograph of Kay he'd taken from the nightstand. Everything he had left. Everything except Rosie.",
      th: "สะพานพังทลายลงแม่น้ำเหมือนกระดูกสันหลังหัก ก้อนคอนกรีตยื่นออกมาจากน้ำสีน้ำตาลในมุมที่เป็นไปไม่ได้ สายเคเบิลเหล็กแกว่งไปมาในลมเหมือนเอ็นที่ถูกตัด แอนดี้ยืนอยู่ที่ขอบ โรซี่แนบอกเขา จ้องมองน้ำเชี่ยวร้อยเมตรระหว่างเขากับฝั่งตรงข้าม\n\nเสียงผิวปาก เบาและแหลม จากที่ไหนสักแห่งท้ายน้ำ เขาหันไปเห็นชายคนหนึ่งนั่งอยู่ในเรืออะลูมิเนียม พายวางพาดเข่า คนแปลกหน้าแก่ ผ่านร้อนผ่านหนาว ดวงตาไม่มีทั้งความเมตตาหรือความโหดร้าย — มีแต่การคำนวณ \"ลูกนายเหรอ?\" ชายถาม แอนดี้พยักหน้า \"เขตปลอดภัยอยู่อีกสามกิโลผ่านสัน ฉันพาข้ามได้\"\n\n\"ราคาเท่าไหร่?\" แอนดี้ถาม แม้เขาจะรู้อยู่แล้ว ในโลกนี้ ทุกอย่างมีราคา ชายชี้ไปที่เป้ของแอนดี้ — ใบที่เก็บยาปฏิชีวนะชุดสุดท้าย เม็ดกรองน้ำ รูปถ่ายของเคย์ที่เขาหยิบจากโต๊ะข้างเตียง ทุกอย่างที่เขาเหลืออยู่ ทุกอย่างยกเว้นโรซี่"
    },
  },
  {
    id: "ch1-4", novelId: "1", number: 4,
    title: { en: "Her Smile", th: "รอยยิ้มของเธอ" },
    description: { en: "At the edge of transformation, Andy makes his final choice — and the baby smiles.", th: "ที่ขอบของการเปลี่ยนแปลง แอนดี้ตัดสินใจครั้งสุดท้าย — และลูกก็ยิ้ม" },
    readingTime: 8,
    heroImage: "/plottale/covers/6-2.jpg",
    content: {
      en: "The fever came like a tide. Andy felt it first in his fingertips — a numbness that spread up his arms and settled behind his eyes. The world tilted. Colours bled into each other. He could see the safe zone gates ahead, maybe two hundred metres, but his legs were forgetting how to walk.\n\nRosie was crying now. Not the hungry cry or the tired cry, but the one that meant she knew something was wrong. Andy's vision blurred, and for a moment he saw Kay standing at the gate, arms outstretched, smiling the way she smiled on their wedding day. He blinked and she was gone. Just the gate. Just the soldiers. Just the distance.\n\nHe fell to his knees. The ground was warm. The sling loosened, and Rosie slid into his arms. A soldier was running toward them, shouting something Andy couldn't hear anymore. He looked down at his daughter one last time. She had stopped crying. She was looking up at him with those dark, ancient eyes — and then she smiled. Not the reflex smile of a newborn, but a real smile. The kind that says: I see you. I know you. Thank you. Andy smiled back, and the world went white.",
      th: "ไข้มาเหมือนกระแสน้ำ แอนดี้รู้สึกได้ที่ปลายนิ้วก่อน — อาการชาที่แผ่ขึ้นแขนและไปนิ่งอยู่หลังตา โลกเอียง สีไหลเข้าหากัน เขาเห็นประตูเขตปลอดภัยข้างหน้า อาจจะสองร้อยเมตร แต่ขาเขากำลังลืมวิธีเดิน\n\nโรซี่ร้องไห้ ไม่ใช่ร้องหิวหรือร้องง่วง แต่เป็นเสียงร้องที่บอกว่าเธอรู้ว่ามีบางอย่างผิดปกติ สายตาแอนดี้เบลอ ชั่วขณะเขาเห็นเคย์ยืนอยู่ที่ประตู กางแขนออก ยิ้มแบบที่เธอยิ้มในวันแต่งงาน เขากะพริบตาและเธอก็หายไป เหลือแค่ประตู แค่ทหาร แค่ระยะทาง\n\nเขาทรุดลงคุกเข่า พื้นอุ่น ผ้าอุ้มหลวม โรซี่ไหลลงมาในอ้อมแขนเขา ทหารวิ่งเข้ามา ตะโกนอะไรบางอย่างที่แอนดี้ไม่ได้ยินแล้ว เขามองลงไปที่ลูกสาวเป็นครั้งสุดท้าย เธอหยุดร้อง เธอมองขึ้นมาด้วยดวงตาสีเข้มลึกล้ำ — แล้วเธอก็ยิ้ม ไม่ใช่รอยยิ้มสะท้อนของทารก แต่เป็นรอยยิ้มจริงๆ แบบที่บอกว่า: ฉันเห็นพ่อ ฉันรู้จักพ่อ ขอบคุณ แอนดี้ยิ้มตอบ และโลกก็กลายเป็นสีขาว"
    },
  },

  // Novel 2 — Bokeh
  {
    id: "ch2-1", novelId: "2", number: 1,
    title: { en: "Empty World", th: "โลกว่างเปล่า" },
    description: { en: "Riley and Jennie wake up to a city without people. Every door is open, every car abandoned.", th: "ไรลีย์และเจนนี่ตื่นขึ้นในเมืองที่ไม่มีคน ทุกประตูเปิดออก ทุกรถถูกทิ้ง" },
    readingTime: 14,
    heroImage: "/plottale/covers/2-2.jpg",
    epigraph: { en: "What remains when everyone is gone? Only the space between two people.", th: "อะไรเหลืออยู่เมื่อทุกคนหายไป? มีเพียงช่องว่างระหว่างคนสองคน" },
    content: {
      en: "Riley woke to the sound of nothing. Not silence — silence has texture, the hum of a refrigerator, the distant murmur of traffic. This was nothing. An absolute absence of sound that pressed against his eardrums like deep water. Beside him, Jennie was already sitting up, her hair tangled, eyes wide.\n\nThey walked through the city for three hours before accepting it. Every apartment door stood open. Coffee cups sat on kitchen tables, still half-full but cold. A television played static in a living room where someone had been folding laundry. The clothes lay in neat piles on the couch, waiting for hands that would never return.\n\nAt the intersection of Fifth and Main, Jennie stopped walking. A child's bicycle lay on its side in the middle of the crosswalk, one wheel still spinning in the breeze. She picked it up, set it on its kickstand, and started to cry. Riley held her. Above them, traffic lights cycled green to yellow to red, directing no one.",
      th: "ไรลีย์ตื่นขึ้นกับเสียงของความว่างเปล่า ไม่ใช่ความเงียบ — ความเงียบยังมีเนื้อสัมผัส เสียงหึ่งของตู้เย็น เสียงพึมพำของรถยนต์ไกลๆ นี่คือความว่างเปล่า การหายไปอย่างสิ้นเชิงของเสียงที่กดดันแก้วหูเหมือนน้ำลึก ข้างๆ เจนนี่นั่งขึ้นแล้ว ผมยุ่ง ตากลมโต\n\nพวกเขาเดินผ่านเมืองสามชั่วโมงก่อนจะยอมรับมัน ประตูอพาร์ทเมนต์ทุกห้องเปิดค้าง แก้วกาแฟวางบนโต๊ะครัว ยังเหลือครึ่งแก้วแต่เย็นแล้ว โทรทัศน์เปิดเป็นจอหิมะในห้องนั่งเล่นที่มีคนกำลังพับผ้า เสื้อผ้าวางเป็นกองเรียบร้อยบนโซฟา รอมือที่จะไม่มีวันกลับมา\n\nที่สี่แยกถนนฟิฟท์กับเมน เจนนี่หยุดเดิน จักรยานเด็กล้มอยู่กลางทางม้าลาย ล้อหนึ่งยังหมุนอยู่ในสายลม เธอหยิบมันขึ้น ตั้งขาตั้ง แล้วเริ่มร้องไห้ ไรลีย์กอดเธอ เหนือหัวพวกเขา ไฟจราจรสลับเขียวเหลืองแดง สั่งการไม่มีใคร"
    },
  },
  {
    id: "ch2-2", novelId: "2", number: 2,
    title: { en: "The Polaroids", th: "โพลารอยด์" },
    description: { en: "Old photographs surface in an empty apartment. The faces are blurring — just like their memories.", th: "ภาพถ่ายเก่าปรากฏในอพาร์ทเมนต์ว่าง ใบหน้าเริ่มเบลอ — เหมือนความทรงจำของพวกเขา" },
    readingTime: 11,
    heroImage: "/plottale/covers/2-3.jpg",
    content: {
      en: "They found the Polaroids in apartment 4B, scattered across a kitchen table like fallen leaves. Someone had been sorting them — birthday parties, beach vacations, a wedding where everyone was laughing. But the faces in the photographs were wrong. Not distorted exactly, but soft at the edges, as if someone had smudged them with a thumb.\n\nJennie held one up to the window light. A family of four at a picnic table, the father's face dissolving into skin-coloured static. \"Riley,\" she whispered. \"Look at ours.\" She pulled out her phone, scrolling to the photo album. Their selfie from last Tuesday. His face was blurring too.\n\nThat night, Riley couldn't remember the name of his first dog. It sat at the edge of his mind like a word on the tip of his tongue, but every time he reached for it, it dissolved. Jennie sat across from him, writing frantically in a notebook — names, dates, addresses, everything she could still remember. The pen moved faster and faster, as if racing against an invisible tide.",
      th: "พวกเขาพบโพลารอยด์ในอพาร์ทเมนต์ 4B กระจัดกระจายบนโต๊ะครัวเหมือนใบไม้ร่วง มีคนกำลังคัดแยกมัน — งานวันเกิด วันหยุดชายหาด งานแต่งงานที่ทุกคนหัวเราะ แต่ใบหน้าในรูปถ่ายผิดปกติ ไม่ได้บิดเบี้ยว แต่นุ่มที่ขอบ ราวกับมีใครเอานิ้วลูบเลอะ\n\nเจนนี่ยกรูปหนึ่งขึ้นส่องแสงหน้าต่าง ครอบครัวสี่คนที่โต๊ะปิกนิก ใบหน้าพ่อละลายเป็นสัญญาณรบกวนสีเนื้อ \"ไรลีย์\" เธอกระซิบ \"ดูของเราสิ\" เธอหยิบโทรศัพท์ เลื่อนไปที่อัลบั้มรูป เซลฟี่ของพวกเขาจากวันอังคารที่แล้ว ใบหน้าเขาก็กำลังเบลอเหมือนกัน\n\nคืนนั้น ไรลีย์จำชื่อสุนัขตัวแรกไม่ได้ มันอยู่ที่ขอบความคิดเหมือนคำที่ติดอยู่ปลายลิ้น แต่ทุกครั้งที่เอื้อมไปหา มันก็ละลายหายไป เจนนี่นั่งตรงข้าม เขียนอย่างบ้าคลั่งในสมุดบันทึก — ชื่อ วันที่ ที่อยู่ ทุกอย่างที่เธอยังจำได้ ปากกาเคลื่อนเร็วขึ้นเรื่อยๆ ราวกับแข่งกับกระแสน้ำที่มองไม่เห็น"
    },
  },
  {
    id: "ch2-3", novelId: "2", number: 3,
    title: { en: "Forgetting", th: "การลืม" },
    description: { en: "Jennie forgets her mother's name. Riley can't remember his childhood home. Time is dissolving.", th: "เจนนี่ลืมชื่อแม่ ไรลีย์จำบ้านในวัยเด็กไม่ได้ เวลากำลังละลาย" },
    readingTime: 13,
    heroImage: "/plottale/covers/4-2.jpg",
    content: {
      en: "On the seventh day, Jennie woke up and couldn't remember her mother's name. She remembered the shape of her — the way she held a coffee cup with both hands, the sound of her laughter echoing through a kitchen that smelled of cinnamon — but the name was gone, scooped out clean like a seed from a fruit.\n\nRiley tried to describe his childhood home, but the details kept shifting. Was the front door blue or green? Were there three bedrooms or four? He could feel the ghost of the memory, the warmth of it, but every time he tried to look directly at it, it scattered like smoke. They were unraveling, both of them, thread by thread.\n\nThey made a pact that afternoon. They would write everything down — not just facts, but feelings. The way Jennie's eyes crinkled when she laughed. The scar on Riley's left knee from a skateboard accident he could still half-remember. They filled notebook after notebook, building a paper fortress against the forgetting. But even as they wrote, the ink on the earlier pages was beginning to fade.",
      th: "วันที่เจ็ด เจนนี่ตื่นขึ้นมาจำชื่อแม่ไม่ได้ เธอจำรูปร่างแม่ได้ — วิธีที่แม่จับแก้วกาแฟด้วยสองมือ เสียงหัวเราะก้องผ่านครัวที่หอมกลิ่นอบเชย — แต่ชื่อหายไป ถูกควักออกเกลี้ยงเหมือนเมล็ดจากผลไม้\n\nไรลีย์พยายามบรรยายบ้านในวัยเด็ก แต่รายละเอียดเลื่อนไหลไม่หยุด ประตูหน้าสีน้ำเงินหรือเขียว ห้องนอนสามหรือสี่ห้อง เขารู้สึกถึงเงาของความทรงจำ ความอบอุ่นของมัน แต่ทุกครั้งที่พยายามมองตรงๆ มันก็กระจายเหมือนควัน พวกเขากำลังคลี่ออก ทั้งสองคน ทีละเส้นด้าย\n\nพวกเขาทำสัญญากันบ่ายนั้น จะเขียนทุกอย่างลงไป — ไม่ใช่แค่ข้อเท็จจริง แต่ความรู้สึกด้วย วิธีที่ตาของเจนนี่ย่นเมื่อหัวเราะ แผลเป็นบนเข่าซ้ายของไรลีย์จากอุบัติเหตุสเก็ตบอร์ดที่เขายังจำได้ครึ่งๆ กลางๆ พวกเขาเขียนเต็มสมุดแล้วสมุดเล่า สร้างป้อมกระดาษต่อสู้กับการลืม แต่แม้ขณะที่เขียน หมึกบนหน้าแรกๆ ก็เริ่มจางลง"
    },
  },
  {
    id: "ch2-4", novelId: "2", number: 4,
    title: { en: "Bokeh", th: "โบเก้" },
    description: { en: "The world itself begins to blur. Only love stays in focus — but for how long?", th: "โลกเริ่มเบลอ มีเพียงความรักที่ยังชัด — แต่จะนานแค่ไหน?" },
    readingTime: 9,
    heroImage: "/plottale/covers/7-2.jpg",
    content: {
      en: "The edges of the world had gone soft. Buildings lost their corners, melting into watercolour impressions of what they used to be. The sky was no longer blue but a wash of light that bled into the horizon. Trees became green smears. Cars became coloured shapes. The whole city looked like a photograph taken with a broken lens.\n\nBut when Riley looked at Jennie, she was sharp. Every detail — the freckle beneath her left eye, the chip in her front tooth, the way her hair fell across her forehead — remained in perfect focus. She was the only clear thing in a dissolving world. And when she looked at him, he knew he was clear to her too.\n\nThey sat on the roof of their apartment building as the sun went down — or what was left of the sun, a warm blur of amber light. Riley couldn't remember his last name. Jennie couldn't remember what country they were in. But she remembered his laugh. He remembered the warmth of her hand. They held on to each other as the world softened into bokeh around them, and they decided that this — just this — was enough.",
      th: "ขอบของโลกอ่อนลง ตึกสูญเสียมุม ละลายเป็นภาพสีน้ำของสิ่งที่เคยเป็น ท้องฟ้าไม่ได้เป็นสีน้ำเงินอีกต่อไป แต่เป็นแสงที่ไหลรวมกับขอบฟ้า ต้นไม้กลายเป็นรอยเขียวเลอะ รถยนต์กลายเป็นรูปทรงสี ทั้งเมืองดูเหมือนภาพถ่ายที่ถ่ายด้วยเลนส์แตก\n\nแต่เมื่อไรลีย์มองเจนนี่ เธอคมชัด ทุกรายละเอียด — กระจุดใต้ตาซ้าย ฟันหน้าที่บิ่น ทางที่ผมตกปรกหน้าผาก — ยังคงโฟกัสสมบูรณ์แบบ เธอเป็นสิ่งเดียวที่ชัดในโลกที่กำลังละลาย และเมื่อเธอมองเขา เขารู้ว่าเขาก็ชัดสำหรับเธอเช่นกัน\n\nพวกเขานั่งบนดาดฟ้าอพาร์ทเมนต์ขณะพระอาทิตย์ตก — หรือสิ่งที่เหลือของพระอาทิตย์ แสงอำพันอุ่นเบลอๆ ไรลีย์จำนามสกุลตัวเองไม่ได้ เจนนี่จำไม่ได้ว่าอยู่ประเทศอะไร แต่เธอจำเสียงหัวเราะเขาได้ เขาจำความอบอุ่นของมือเธอได้ พวกเขายึดกันไว้ขณะโลกอ่อนนุ่มเป็นโบเก้รอบตัว และตัดสินใจว่าแค่นี้ — แค่นี้ — ก็เพียงพอแล้ว"
    },
  },

  // Novel 3 — Saklı
  {
    id: "ch3-1", novelId: "3", number: 1,
    title: { en: "The Same Face", th: "ใบหน้าเดียวกัน" },
    description: { en: "Four strangers realize they've been dreaming of the same person. A detective connects the dots.", th: "คนแปลกหน้าสี่คนรู้ตัวว่าฝันถึงคนเดียวกัน นักสืบเชื่อมจุด" },
    readingTime: 16,
    heroImage: "/plottale/covers/3-2.jpg",
    epigraph: { en: "We share the same darkness. The question is: who put it there?", th: "เราแบ่งปันความมืดเดียวกัน คำถามคือ: ใครเป็นคนใส่มันไว้?" },
    content: {
      en: "Detective Aydin spread the four sketches across her desk and felt the hair on her arms stand up. Four different people. Four different cities. Four different police stations. And every single one of them had drawn the same face — a woman with dark hair parted in the middle, a thin scar running from her left ear to her jawline, and eyes that looked directly at the viewer.\n\nThe first report came from Istanbul: a taxi driver who hadn't slept in eleven days because the woman appeared every time he closed his eyes. The second from Ankara: a university professor who woke screaming the same word every night — \"saklı,\" meaning hidden. The third and fourth from Izmir and Bursa. All strangers. All dreaming of the same woman. All certain she was trying to tell them something.\n\nAydin pinned the sketches to her corkboard and stepped back. The face stared at her four times over, patient and unblinking. She picked up her phone and dialled the forensic sketch unit. \"I need you to run this face through every database we have,\" she said. \"Missing persons, criminal records, immigration — everything. Because either four people are sharing a hallucination, or this woman is real.\"\n\nThe forensic unit called back within the hour. No matches. Not a single hit across twelve million records. Aydin stared at the phone for a long moment after hanging up, then pulled out the case files again. She spread them in chronological order: Istanbul first, then Ankara, then Izmir, then Bursa. The dates were impossibly close — all four reports filed within the same seventy-two-hour window. Four cities, four strangers, and a woman who existed only in dreams.\n\nShe started with the Istanbul file. Hakan Demir, forty-three, taxi driver. Married, two children, no history of mental illness. His statement was two pages long, typed by a patrol officer who had clearly thought Demir was wasting everyone's time. \"The subject claims to see a female face when closing his eyes. Subject has not slept in eleven days. Subject's wife confirms behavioral changes. Subject became agitated when told this was not a police matter.\"\n\nAydin underlined the phrase \"behavioral changes\" and moved to the second file. Professor Leyla Arslan, fifty-one, Department of Neurology at Hacettepe University. Her statement was clinical, precise, and deeply unsettling. She had documented her own symptoms with the detachment of a scientist observing a lab rat — except the lab rat was herself. \"Night one: vivid dream of unknown female. Night two: same dream, increased clarity. Night three: the woman speaks. Night four: I understand the word. Saklı. Night five: I cannot distinguish the dream from waking.\"\n\nArslan had attached a printout of her own EEG readings, taken in her university's sleep lab. The brain activity during her dream phases was unlike anything in the published literature — a sustained delta-theta wave pattern that should have indicated deep unconsciousness, yet her cortical activity was through the roof. She was, by every measurable standard, deeply asleep and wide awake at the same time.\n\nThe third file was thinner. Mehmet Kaya, twenty-six, a barista in Izmir who had walked into the local precinct at 3 AM, barefoot and shaking. He told the night sergeant that a woman was trapped inside his head and she needed help. The sergeant had called a psych eval. The psychologist found Kaya lucid, coherent, and without any markers for psychosis or schizophrenia. He simply believed, with the calm certainty of someone stating a mathematical fact, that a real human consciousness was broadcasting into his dreams.\n\nThe fourth file was the one that had triggered the cross-referencing. Elif Yilmaz, thirty-eight, a civil engineer in Bursa and the wife of a police captain. She hadn't walked into a station — she had called her husband's direct line at 2 AM and told him she knew the face of a woman who was about to die. When the captain asked how she knew, Elif said the woman had shown her. Every night for a week, the same sequence: a laboratory, a countdown, and the woman's face dissolving like watercolour in rain.\n\nAydin leaned back in her chair and pressed her palms against her eyes. The overhead fluorescent light buzzed with the particular frequency that gave her migraines. She could hear the night shift moving through the corridor outside — the click of shoes, the murmur of a phone call, the distant thud of someone closing a filing cabinet. Normal sounds. The sounds of a world where people didn't share dreams.\n\nShe opened her laptop and began typing a request for travel authorization. She would visit each of the four dreamers in person, starting with Professor Arslan in Ankara. A neurology professor who could document her own brain activity was the closest thing to a credible witness in a case built entirely on the impossible.\n\nThe drive to Ankara took four and a half hours. Aydin left Istanbul before dawn, the Bosphorus Bridge still lit with its nighttime glow. She played no music, listened to no podcasts. She thought about the face on her corkboard — the parted dark hair, the scar, the direct gaze — and tried to remember if she had dreamed of it herself. She hadn't. Not yet. Something about that felt like a ticking clock.\n\nArslan met her in a university café that smelled of burnt coffee and chalk. The professor looked exactly like her ID photo except for the shadows under her eyes, which gave her the appearance of someone who had aged a decade in a month. She sat with her hands wrapped around a cup she never drank from.\n\n\"I've been expecting you,\" Arslan said, before Aydin could introduce herself. \"She told me someone would come. A woman with a badge who would believe us.\" Aydin felt the hairs on her neck rise for the second time in two days. She set her recorder on the table and pressed the red button.\n\nFor the next ninety minutes, Arslan described the dream in exhaustive detail. It was always the same: a white room, no windows, a single fluorescent light. The woman standing in the center, barefoot on a cold tile floor, her hospital gown hanging loose. She never moved, never sat down. She simply stood there, watching. And she spoke — not with her mouth, which never opened, but directly into the architecture of the dream itself, as if the words were woven into the walls.\n\n\"What does she say?\" Aydin asked. Arslan closed her eyes. \"She says: find the room. Find it before the clock runs out.\" Aydin wrote this down, underlining the word \"clock.\" It was the second time a clock had appeared in the case — Elif Yilmaz had mentioned a countdown. \"What room?\" she pressed. Arslan shook her head. \"I don't know. But I think you will. I think that's why she sent you.\"\n\nAydin drove back to Istanbul that night with the windows down, cold air keeping her alert. She had three more interviews to conduct, but the shape of the case was already forming in her mind. Four receivers, one signal, and somewhere in Turkey, a room that held the answer. She would find it. She had to. Because if Arslan's EEG readings were real — if a human mind could broadcast across cities, across consciousness itself — then whoever owned that mind was either the most important scientific discovery of the century or the most dangerous.\n\nEither way, Aydin thought as the Istanbul skyline appeared on the horizon, she was running out of time to figure out which.",
      th: "นักสืบอายดินกางภาพร่างสี่ใบบนโต๊ะและรู้สึกขนลุก สี่คนต่างกัน สี่เมืองต่างกัน สี่สถานีตำรวจต่างกัน และทุกคนวาดใบหน้าเดียวกัน — ผู้หญิงผมดำแหวกกลาง แผลเป็นบางๆ จากหูซ้ายถึงกราม และดวงตาที่มองตรงมาที่ผู้ดู\n\nรายงานแรกมาจากอิสตันบูล: คนขับแท็กซี่ที่ไม่ได้นอนสิบเอ็ดวันเพราะผู้หญิงคนนั้นปรากฏทุกครั้งที่เขาหลับตา รายงานที่สองจากอังการา: ศาสตราจารย์ที่ตื่นมากรีดร้องคำเดียวกันทุกคืน — \"ซาคลี\" แปลว่าซ่อนเร้น ที่สามและสี่จากอิซเมียร์และบูร์ซา ล้วนเป็นคนแปลกหน้า ล้วนฝันถึงผู้หญิงคนเดียวกัน ล้วนมั่นใจว่าเธอพยายามบอกอะไรบางอย่าง\n\nอายดินปักภาพร่างบนบอร์ดก๊อกและถอยหลัง ใบหน้าจ้องมองเธอสี่ครั้ง อดทนและไม่กะพริบ เธอหยิบโทรศัพท์โทรหาหน่วยภาพร่าง \"ฉันต้องการให้เอาใบหน้านี้ไปเช็คกับทุกฐานข้อมูลที่เรามี\" เธอพูด \"คนหาย ประวัติอาชญากรรม ตรวจคนเข้าเมือง — ทุกอย่าง เพราะถ้าไม่ใช่สี่คนเห็นภาพหลอนเหมือนกัน ผู้หญิงคนนี้ก็ต้องมีตัวตนจริง\"\n\nหน่วยนิติเวชโทรกลับภายในชั่วโมง ไม่พบข้อมูลที่ตรงกัน ไม่มีแม้แต่รายการเดียวจากสิบสองล้านบันทึก อายดินจ้องโทรศัพท์อยู่นานหลังวางสาย จากนั้นหยิบแฟ้มคดีออกมาอีกครั้ง เธอกางออกตามลำดับเวลา: อิสตันบูลก่อน แล้วอังการา อิซเมียร์ บูร์ซา วันที่ใกล้กันอย่างเหลือเชื่อ — ทั้งสี่รายงานยื่นภายในเจ็ดสิบสองชั่วโมงเดียวกัน สี่เมือง สี่คนแปลกหน้า และผู้หญิงที่มีตัวตนเพียงในฝัน\n\nเธอเริ่มจากแฟ้มอิสตันบูล ฮาคาน เดเมียร์ อายุสี่สิบสาม คนขับแท็กซี่ แต่งงานแล้ว มีลูกสองคน ไม่มีประวัติโรคจิต คำให้การยาวสองหน้า พิมพ์โดยเจ้าหน้าที่ตรวจตราที่เห็นได้ชัดว่าคิดว่าเดเมียร์มาเสียเวลา \"ผู้ร้องเรียนอ้างว่าเห็นใบหน้าผู้หญิงเมื่อหลับตา ผู้ร้องไม่ได้นอนสิบเอ็ดวัน ภรรยายืนยันการเปลี่ยนแปลงพฤติกรรม ผู้ร้องตื่นเต้นเมื่อถูกบอกว่าไม่ใช่เรื่องของตำรวจ\"\n\nอายดินขีดเส้นใต้คำว่า \"การเปลี่ยนแปลงพฤติกรรม\" แล้วเปิดแฟ้มที่สอง ศาสตราจารย์เลย์ลา อาร์สลัน อายุห้าสิบเอ็ด ภาควิชาประสาทวิทยา มหาวิทยาลัยฮาเจ็ตเตเป คำให้การของเธอเป็นเชิงคลินิก แม่นยำ และน่าวิตกอย่างยิ่ง เธอบันทึกอาการของตัวเองด้วยความเป็นกลางของนักวิทยาศาสตร์สังเกตหนูทดลอง — ยกเว้นว่าหนูทดลองคือตัวเธอเอง\n\nอาร์สลันแนบผลการอ่านคลื่นสมองของตัวเอง ถ่ายในห้องปฏิบัติการการนอนของมหาวิทยาลัย กิจกรรมสมองระหว่างช่วงฝันไม่เหมือนสิ่งใดในเอกสารที่ตีพิมพ์ — รูปแบบคลื่นเดลต้า-ธีตาต่อเนื่องที่ควรบ่งบอกว่าหมดสติลึก แต่กิจกรรมสมองส่วนคอร์เทกซ์สูงลิบ เธออยู่ในสภาวะหลับสนิทและตื่นเต็มที่ในเวลาเดียวกัน\n\nแฟ้มที่สามบางกว่า เมห์เมต คายา อายุยี่สิบหก บาริสต้าในอิซเมียร์ที่เดินเข้าสถานีตำรวจตอนตีสาม เท้าเปล่าและตัวสั่น เขาบอกจ่าเวรว่ามีผู้หญิงติดอยู่ในหัวของเขาและเธอต้องการความช่วยเหลือ นักจิตวิทยาพบว่าคายามีสติ สื่อสารได้ดี ไม่มีอาการโรคจิตหรือจิตเภท เขาเพียงเชื่อด้วยความมั่นใจอันสงบว่ามีจิตสำนึกมนุษย์จริงกำลังส่งสัญญาณเข้ามาในฝันของเขา\n\nแฟ้มที่สี่เป็นแฟ้มที่กระตุ้นการตรวจสอบข้อมูลข้าม เอลิฟ ยิลมาซ อายุสามสิบแปด วิศวกรโยธาในบูร์ซาและภรรยาของสารวัตรตำรวจ เธอไม่ได้เดินเข้าสถานี — เธอโทรสายตรงถึงสามีตอนตีสองและบอกว่าเธอรู้จักใบหน้าของผู้หญิงที่กำลังจะตาย\n\nอายดินพิงพนักเก้าอี้และกดฝ่ามือทั้งสองข้างบนดวงตา ไฟฟลูออเรสเซนต์เหนือศีรษะหึ่งด้วยความถี่ที่ทำให้เธอปวดหัว เธอได้ยินเสียงเวรกลางคืนเดินผ่านทางเดินข้างนอก — เสียงรองเท้าคลิก เสียงพึมพำโทรศัพท์ เสียงตู้เอกสารปิดในระยะไกล เสียงปกติ เสียงของโลกที่ผู้คนไม่ได้แชร์ความฝัน\n\nเธอเปิดแล็ปท็อปและเริ่มพิมพ์คำขออนุมัติการเดินทาง เธอจะไปพบผู้ฝันทั้งสี่ด้วยตนเอง เริ่มจากศาสตราจารย์อาร์สลันในอังการา ศาสตราจารย์ประสาทวิทยาที่บันทึกกิจกรรมสมองของตัวเองได้เป็นพยานที่น่าเชื่อถือที่สุดในคดีที่สร้างจากสิ่งที่เป็นไปไม่ได้ทั้งหมด\n\nขับรถไปอังการาใช้เวลาสี่ชั่วโมงครึ่ง อายดินออกจากอิสตันบูลก่อนรุ่งสาง สะพานบอสฟอรัสยังส่องแสงยามค่ำ เธอไม่เปิดเพลง ไม่ฟังพอดแคสต์ เธอคิดถึงใบหน้าบนบอร์ดก๊อก — ผมดำแหวกกลาง แผลเป็น สายตาตรง — และพยายามนึกว่าเธอฝันถึงมันหรือยัง เธอยังไม่ฝัน มีบางอย่างเกี่ยวกับเรื่องนั้นที่รู้สึกเหมือนนาฬิกานับถอยหลัง\n\nอาร์สลันพบเธอในคาเฟ่มหาวิทยาลัยที่มีกลิ่นกาแฟไหม้และชอล์ก ศาสตราจารย์ดูเหมือนรูปบัตรประชาชนทุกอย่าง ยกเว้นเงาใต้ตาที่ทำให้เธอดูแก่ไปสิบปีในเดือนเดียว เธอนั่งมือประสานรอบแก้วที่ไม่เคยดื่ม\n\n\"ฉันรออยู่\" อาร์สลันพูดก่อนที่อายดินจะแนะนำตัว \"เธอบอกว่าจะมีคนมา ผู้หญิงมีป้ายที่จะเชื่อเรา\" อายดินรู้สึกขนลุกที่คอเป็นครั้งที่สองในสองวัน เธอวางเครื่องบันทึกบนโต๊ะแล้วกดปุ่มแดง\n\nเก้าสิบนาทีถัดมา อาร์สลันอธิบายความฝันอย่างละเอียด มันเหมือนกันเสมอ: ห้องสีขาว ไม่มีหน้าต่าง ไฟฟลูออเรสเซนต์ดวงเดียว ผู้หญิงยืนตรงกลาง เท้าเปล่าบนพื้นกระเบื้องเย็น ชุดโรงพยาบาลหลวม เธอไม่เคยขยับ ไม่เคยนั่ง เธอเพียงยืนจ้องมอง และเธอพูด — ไม่ใช่ด้วยปากที่ไม่เคยเปิด แต่ตรงเข้าไปในโครงสร้างของฝันเอง ราวกับคำพูดถูกทอเข้าไปในกำแพง\n\nอายดินขับรถกลับอิสตันบูลคืนนั้นเปิดกระจก ลมเย็นช่วยให้ตื่น เธอยังมีอีกสามคนต้องสัมภาษณ์ แต่รูปร่างของคดีกำลังก่อตัวในใจแล้ว สี่ผู้รับ หนึ่งสัญญาณ และที่ไหนสักแห่งในตุรกี ห้องที่เก็บคำตอบ เธอต้องหามันให้เจอ เธอต้อง เพราะถ้าผลอีอีจีของอาร์สลันเป็นจริง — ถ้าจิตมนุษย์สามารถส่งสัญญาณข้ามเมือง ข้ามจิตสำนึก — เจ้าของจิตนั้นจะเป็นการค้นพบทางวิทยาศาสตร์สำคัญที่สุดของศตวรรษ หรือเป็นสิ่งอันตรายที่สุด\n\nไม่ว่าจะเป็นอย่างไร อายดินคิดขณะเส้นขอบฟ้าอิสตันบูลปรากฏบนขอบฟ้า เธอกำลังหมดเวลาที่จะหาคำตอบ"
    },
  },
  {
    id: "ch3-2", novelId: "3", number: 2,
    title: { en: "Room 404", th: "ห้อง 404" },
    description: { en: "A hotel room that doesn't exist on any floor plan holds the key to the shared nightmare.", th: "ห้องพักที่ไม่มีอยู่ในแปลนเก็บกุญแจสู่ฝันร้ายที่แชร์กัน" },
    readingTime: 12,
    heroImage: "/plottale/covers/1-2.jpg",
    content: {
      en: "The Grand Pera Hotel had been closed for renovations since 2019. Aydin ducked under the yellow tape and stepped into the marble lobby, her flashlight cutting through six years of dust. The concierge desk was covered in plaster sheets. Chandeliers hung in plastic wrap like cocoons.\n\nFloor plans showed rooms 401 through 412 on the fourth floor. But when Aydin climbed the stairs and counted doors, there were thirteen. Room 404 sat between 403 and 405, its door painted a different shade of white — newer, brighter, as if someone had maintained it while the rest of the hotel decayed.\n\nShe turned the handle. The door opened without resistance. Inside, the room was immaculate — bed made with crisp sheets, a glass of water on the nightstand that looked fresh, a clock on the wall whose hands moved backwards. And on the desk, arranged in a perfect row, four sealed envelopes. Each one addressed to one of the dreamers.",
      th: "โรงแรมแกรนด์เปราปิดปรับปรุงตั้งแต่ 2019 อายดินมุดใต้เทปเหลืองก้าวเข้าล็อบบี้หินอ่อน ไฟฉายตัดผ่านฝุ่นหกปี โต๊ะต้อนรับคลุมแผ่นปูนฉาบ โคมระย้าห่อพลาสติกเหมือนรังไหม\n\nแปลนแสดงห้อง 401 ถึง 412 บนชั้นสี่ แต่เมื่ออายดินขึ้นบันไดและนับประตู มีสิบสามห้อง ห้อง 404 อยู่ระหว่าง 403 กับ 405 ประตูทาสีขาวคนละเฉด — ใหม่กว่า สว่างกว่า ราวกับมีคนดูแลมันขณะที่โรงแรมที่เหลือผุพัง\n\nเธอหมุนลูกบิด ประตูเปิดโดยไม่ต้านทาน ข้างในห้องสะอาดเอี่ยม — เตียงปูด้วยผ้าปูเรียบกริบ แก้วน้ำบนโต๊ะข้างเตียงที่ดูสดใหม่ นาฬิกาบนผนังที่เข็มเดินถอยหลัง และบนโต๊ะทำงาน เรียงเป็นแถวสมบูรณ์แบบ ซองจดหมายปิดผนึกสี่ซอง แต่ละซองจ่าหน้าถึงผู้ฝันแต่ละคน"
    },
  },
  {
    id: "ch3-3", novelId: "3", number: 3,
    title: { en: "Backwards Clock", th: "นาฬิกาเดินถอยหลัง" },
    description: { en: "Time runs in reverse inside the dream. Each night they go deeper — and someone is watching.", th: "เวลาเดินถอยหลังในฝัน ทุกคืนพวกเขาลึกลงไป — และมีคนกำลังจ้องมอง" },
    readingTime: 14,
    heroImage: "/plottale/covers/5-2.jpg",
    content: {
      en: "Aydin gathered the four dreamers in a rented apartment in Beyoğlu. They sat in a circle, strangers united by the same impossible face, and agreed to sleep at the same time. If they shared the dream, perhaps together they could go deeper — find the woman, find the room, find the answer.\n\nThe dream began as it always did: a long corridor, doors on both sides, and the woman standing at the far end. But this time, with four of them present, the corridor was different. Longer. The doors had numbers that counted backwards — 412, 411, 410 — and behind each one, a scene played in reverse. Rain falling upward. Words un-spoken. A shattered vase reassembling itself on a table.\n\nThey reached room 404 together. The woman was inside, sitting at the desk, writing. She didn't look up. But in the corner of the room, barely visible in the dream's dim light, someone else was watching. A figure in a chair, face obscured, breathing slowly. The watcher. And the watcher was smiling.",
      th: "อายดินรวบรวมผู้ฝันทั้งสี่ในอพาร์ทเมนต์เช่าในเบโยกลู พวกเขานั่งเป็นวงกลม คนแปลกหน้าที่เชื่อมด้วยใบหน้าเดียวกันที่เป็นไปไม่ได้ และตกลงจะนอนพร้อมกัน ถ้าพวกเขาแชร์ฝัน บางทีรวมกันอาจไปได้ลึกกว่า — หาผู้หญิง หาห้อง หาคำตอบ\n\nฝันเริ่มเหมือนทุกครั้ง: ทางเดินยาว ประตูสองข้าง และผู้หญิงยืนอยู่ปลายทาง แต่ครั้งนี้ มีสี่คน ทางเดินต่างไป ยาวกว่า ประตูมีหมายเลขนับถอยหลัง — 412, 411, 410 — และหลังแต่ละบาน ฉากเล่นย้อนกลับ ฝนตกขึ้นฟ้า คำพูดถูกดึงกลับ แจกันแตกประกอบตัวเองใหม่บนโต๊ะ\n\nพวกเขาถึงห้อง 404 พร้อมกัน ผู้หญิงอยู่ข้างใน นั่งที่โต๊ะ กำลังเขียน เธอไม่เงยหน้า แต่ที่มุมห้อง แทบมองไม่เห็นในแสงสลัวของฝัน มีคนอื่นกำลังเฝ้าดู ร่างหนึ่งในเก้าอี้ ใบหน้าถูกบัง หายใจช้าๆ ผู้เฝ้ามอง และผู้เฝ้ามองกำลังยิ้ม"
    },
  },
  {
    id: "ch3-4", novelId: "3", number: 4,
    title: { en: "The Reveal", th: "เปิดเผย" },
    description: { en: "The face belongs to someone very much alive — and they've been hiding in plain sight.", th: "ใบหน้านั้นเป็นของคนที่ยังมีชีวิต — และพวกเขาซ่อนอยู่ตรงหน้า" },
    readingTime: 11,
    heroImage: "/plottale/covers/8-2.jpg",
    content: {
      en: "The database match came back at 3:47 AM. Aydin stared at her phone, then at the photograph on the screen, then back at the four sketches on her wall. The woman's name was Elif Demir. She wasn't missing. She wasn't dead. She was a neuroscientist at Istanbul Technical University, specializing in shared consciousness and dream synchronization. And she had published a paper three years ago titled \"Saklı: Induced Collective Dreaming in Unrelated Subjects.\"\n\nAydin found her in her office the next morning, grading papers as if nothing in the world was wrong. The scar was there, running from ear to jaw. The dark hair, parted in the middle. Those eyes. \"You know why I'm here,\" Aydin said. Elif looked up and smiled — the same patient, unblinking smile from the dream.\n\n\"They weren't supposed to remember,\" Elif said quietly. \"The experiment was meant to be invisible. Four subjects, four cities, one shared dreamscape — proof that consciousness can be networked. But something went wrong. They kept dreaming after the trial ended. They kept seeing me.\" She closed her laptop. \"I've been trying to undo it. That's what the letters were for. Instructions to forget. But you opened Room 404 before I could finish.\"",
      th: "ผลจากฐานข้อมูลกลับมาตอนตีสามสี่สิบเจ็ด อายดินจ้องโทรศัพท์ แล้วจ้องรูปบนหน้าจอ แล้วกลับไปจ้องภาพร่างสี่ใบบนผนัง ผู้หญิงชื่อเอลิฟ เดเมียร์ เธอไม่ได้หายตัว เธอไม่ได้ตาย เธอเป็นนักประสาทวิทยาที่มหาวิทยาลัยเทคนิคอิสตันบูล เชี่ยวชาญด้านจิตสำนึกร่วมและการซิงโครไนซ์ฝัน และเธอตีพิมพ์บทความเมื่อสามปีก่อนชื่อ \"ซาคลี: การเหนี่ยวนำการฝันร่วมในผู้ทดลองที่ไม่เกี่ยวข้องกัน\"\n\nอายดินพบเธอในออฟฟิศเช้าวันรุ่งขึ้น กำลังตรวจข้อสอบราวกับไม่มีอะไรผิดปกติ แผลเป็นอยู่ที่นั่น จากหูถึงกราม ผมดำแหวกกลาง ดวงตาคู่นั้น \"คุณรู้ว่าฉันมาทำไม\" อายดินพูด เอลิฟเงยหน้าขึ้นยิ้ม — รอยยิ้มอดทนไม่กะพริบเหมือนในฝัน\n\n\"พวกเขาไม่ควรจะจำได้\" เอลิฟพูดเบาๆ \"การทดลองตั้งใจให้มองไม่เห็น สี่ผู้ทดลอง สี่เมือง ภูมิทัศน์ฝันเดียวกัน — หลักฐานว่าจิตสำนึกสามารถเชื่อมเครือข่ายได้ แต่มีบางอย่างผิดพลาด พวกเขาฝันต่อหลังการทดลองจบ พวกเขาเห็นฉันต่อไป\" เธอปิดแล็ปท็อป \"ฉันพยายามแก้ไข นั่นคือจุดประสงค์ของจดหมาย คำสั่งให้ลืม แต่คุณเปิดห้อง 404 ก่อนที่ฉันจะทำเสร็จ\""
    },
  },

  // Novel 4 — Yuna
  {
    id: "ch4-1", novelId: "4", number: 1,
    title: { en: "Trainee Days", th: "วันฝึก" },
    description: { en: "Yuna endures 18-hour training days with one dream: debut. But cracks are showing in the system.", th: "ยูนาทนฝึก 18 ชั่วโมงด้วยความฝันเดียว: เดบิวต์ แต่รอยร้าวเริ่มปรากฏ" },
    readingTime: 13,
    heroImage: "/plottale/covers/4-2.jpg",
    epigraph: { en: "They told us the spotlight would feel like the sun. They didn't mention the burns.", th: "พวกเขาบอกว่าแสงสปอตไลท์จะรู้สึกเหมือนแสงแดด แต่ไม่ได้พูดถึงรอยไหม้" },
    content: {
      en: "The practice room smelled of sweat and floor polish. Yuna watched herself in the mirror — not the girl she used to be, but the idol she was becoming. Sharper cheekbones from months of restricted eating. Dark circles concealed under three layers of BB cream. Muscles that ached even when she slept. Debut was six weeks away.\n\nShe ran the choreography again. Seven counts of eight, a formation change on the bridge, a smile that had to look effortless even as her lungs burned. The other trainees moved around her like satellites — Hana with her perfect pitch, Minji with her impossible flexibility, Soojin who never seemed to sweat. They were all competing for five spots. There were twelve of them left.\n\nAfter practice, Yuna found a note in her locker. No name, just a USB drive and three words written in red ink: \"Check the basement.\" She almost threw it away. Almost. But something about the handwriting — trembling, desperate — made her slip it into her pocket instead.",
      th: "ห้องซ้อมหอมกลิ่นเหงื่อและน้ำยาขัดพื้น ยูนามองตัวเองในกระจก — ไม่ใช่เด็กผู้หญิงที่เธอเคยเป็น แต่เป็นไอดอลที่เธอกำลังกลายเป็น โหนกแก้มคมขึ้นจากการจำกัดอาหารหลายเดือน รอยคล้ำใต้ตาปกปิดด้วยบีบีครีมสามชั้น กล้ามเนื้อที่ปวดแม้ตอนนอน อีกหกสัปดาห์จะเดบิวต์\n\nเธอซ้อมท่าเต้นอีกครั้ง เจ็ดรอบของแปดจังหวะ เปลี่ยนฟอร์เมชั่นตอนบริดจ์ รอยยิ้มที่ต้องดูเป็นธรรมชาติแม้ปอดจะแสบ เด็กฝึกคนอื่นเคลื่อนรอบเธอเหมือนดาวบริวาร — ฮานาที่เสียงเพอร์เฟกต์พิทช์ มินจีที่ยืดหยุ่นเหลือเชื่อ ซูจินที่ไม่เคยดูเหงื่อออก ทุกคนแข่งขันเพื่อห้าตำแหน่ง เหลืออยู่สิบสองคน\n\nหลังซ้อม ยูนาพบโน้ตในล็อกเกอร์ ไม่มีชื่อ แค่ USB ไดรฟ์และสามคำเขียนด้วยหมึกแดง: \"เช็คชั้นใต้ดิน\" เธอเกือบทิ้งมัน เกือบ แต่มีบางอย่างในลายมือ — สั่นเทา สิ้นหวัง — ทำให้เธอหยิบใส่กระเป๋าแทน"
    },
  },
  {
    id: "ch4-2", novelId: "4", number: 2,
    title: { en: "The Secret File", th: "ไฟล์ลับ" },
    description: { en: "A leaked document reveals what happened to trainees who failed. Yuna must decide: silence or truth.", th: "เอกสารหลุดเผยสิ่งที่เกิดกับเด็กฝึกที่ล้มเหลว ยูนาต้องเลือก: เงียบหรือจริง" },
    readingTime: 15,
    heroImage: "/plottale/covers/4-3.jpg",
    content: {
      en: "The USB drive contained 847 files. Medical records, contracts, incident reports — all marked CONFIDENTIAL in red stamps. Yuna scrolled through them in the bathroom stall at 2 AM, her phone screen the only light, her hands shaking so badly she had to hold the device with both.\n\nTrainee #0091: hospitalized for malnutrition. Trainee #0156: stress fractures in both ankles, returned to practice after three days. Trainee #0203: anxiety disorder, contract extended by two years as penalty for seeking outside treatment. The files went back fifteen years. Hundreds of trainees. Dozens of injuries swept under polished floorboards. And at the bottom of the archive, a folder labeled \"Terminated\" containing names she recognized — girls who had simply vanished from the dormitory one morning, their beds stripped, their names never spoken again.\n\n\"You saw them.\" Soojin's voice came from the other side of the stall door. Yuna's blood went cold. \"I left that drive for you,\" Soojin continued. \"Because you're the only one they haven't broken yet. Debut is in five weeks. You can walk onto that stage and smile, or you can show the world what it costs.\"",
      th: "USB ไดรฟ์มี 847 ไฟล์ บันทึกการแพทย์ สัญญา รายงานเหตุการณ์ — ทั้งหมดประทับตราแดง ลับ ยูนาเลื่อนดูในห้องน้ำตอนตีสอง หน้าจอโทรศัพท์เป็นแสงเดียว มือสั่นจนต้องจับเครื่องด้วยสองมือ\n\nเด็กฝึก #0091: เข้าโรงพยาบาลจากทุพโภชนาการ เด็กฝึก #0156: กระดูกข้อเท้าร้าวทั้งสองข้าง กลับมาซ้อมหลังสามวัน เด็กฝึก #0203: โรควิตกกังวล สัญญาขยายสองปีเป็นบทลงโทษที่ไปรักษาข้างนอก ไฟล์ย้อนกลับไปสิบห้าปี เด็กฝึกหลายร้อยคน อาการบาดเจ็บหลายสิบกรณีถูกกลบใต้พื้นไม้ขัดมัน และที่ก้นคลัง โฟลเดอร์ชื่อ \"ยุติสัญญา\" มีชื่อที่เธอจำได้ — เด็กผู้หญิงที่หายไปจากหอพักเช้าวันหนึ่ง เตียงถูกถอดผ้าปู ชื่อไม่ถูกเอ่ยถึงอีก\n\n\"เธอเห็นแล้ว\" เสียงซูจินดังจากอีกฝั่งประตู เลือดยูนาเย็นเฉียบ \"ฉันทิ้งไดรฟ์ไว้ให้เธอ\" ซูจินพูดต่อ \"เพราะเธอเป็นคนเดียวที่พวกเขายังไม่ทำลาย อีกห้าสัปดาห์เดบิวต์ เธอเลือกได้ เดินขึ้นเวทีแล้วยิ้ม หรือให้โลกเห็นว่ามันแลกมาด้วยอะไร\""
    },
  },
  {
    id: "ch4-3", novelId: "4", number: 3,
    title: { en: "Stage Lights", th: "แสงไฟเวที" },
    description: { en: "Debut night arrives. The spotlight is blinding, but Yuna carries the weight of what she knows.", th: "คืนเดบิวต์มาถึง แสงสปอตไลท์เจิดจ้า แต่ยูนาแบกน้ำหนักของสิ่งที่เธอรู้" },
    readingTime: 11,
    heroImage: "/plottale/covers/2-2.jpg",
    content: {
      en: "The arena held twelve thousand people, and every one of them was screaming. Yuna stood in the wings, watching the light show paint the ceiling in purples and golds, feeling the bass vibrate through the floor and up into her ribs. In ninety seconds, the platform would rise. The music would start. Five girls would step into the light and become something new.\n\nHer earpiece crackled. \"Positions.\" Hana squeezed her hand. Minji straightened her skirt. Soojin — who had made it into the final five after all — stood at the back of the formation, her expression unreadable. She hadn't mentioned the files since that night. She hadn't needed to. The weight of them sat in Yuna's chest like a stone.\n\nThe platform began to rise. Light poured down like liquid gold. The crowd roared. And Yuna felt two things at once: the pure, electric joy of a dream coming true, and the quiet, burning knowledge that this stage was built on the broken bones of girls who never got to stand here. She smiled for the cameras. Inside, she was counting down.",
      th: "อารีน่าจุสิบสองพันคน และทุกคนกรีดร้อง ยูนายืนอยู่หลังเวที มองการแสดงแสงสีระบายเพดานเป็นม่วงและทอง รู้สึกเบสสั่นผ่านพื้นขึ้นมาถึงซี่โครง อีกเก้าสิบวินาที แท่นจะยก เพลงจะเริ่ม เด็กผู้หญิงห้าคนจะก้าวเข้าสู่แสงและกลายเป็นสิ่งใหม่\n\nหูฟังดังแตก \"เข้าตำแหน่ง\" ฮานาบีบมือเธอ มินจีจัดกระโปรง ซูจิน — ที่ผ่านเข้ารอบห้าคนสุดท้ายในที่สุด — ยืนท้ายฟอร์เมชั่น สีหน้าอ่านไม่ออก เธอไม่ได้พูดถึงไฟล์ตั้งแต่คืนนั้น ไม่จำเป็นต้องพูด น้ำหนักของมันนั่งอยู่ในอกยูนาเหมือนก้อนหิน\n\nแท่นเริ่มยก แสงไหลลงมาเหมือนทองเหลว ฝูงชนคำราม และยูนารู้สึกสองอย่างพร้อมกัน: ความสุขบริสุทธิ์ไฟฟ้าของความฝันที่เป็นจริง และความรู้เงียบๆ ที่เผาไหม้ว่าเวทีนี้สร้างบนกระดูกหักของเด็กผู้หญิงที่ไม่เคยมีโอกาสยืนที่นี่ เธอยิ้มให้กล้อง ข้างในเธอกำลังนับถอยหลัง"
    },
  },
  {
    id: "ch4-4", novelId: "4", number: 4,
    title: { en: "Truth Over Fame", th: "ความจริงเหนือชื่อเสียง" },
    description: { en: "Live on stage, Yuna makes a choice that will end her career — or save someone's life.", th: "บนเวทีสด ยูนาตัดสินใจที่จะจบอาชีพ — หรือช่วยชีวิตใครบางคน" },
    readingTime: 9,
    heroImage: "/plottale/covers/6-3.jpg",
    content: {
      en: "The encore was supposed to be their title track — four minutes of synchronized perfection, the performance that would define their careers. The music started. The crowd surged forward. And Yuna walked to the front of the stage, raised her hand, and the music stopped.\n\nTwelve thousand people went silent. The other four members froze in formation. Managers in the wings spoke urgently into their headsets. Yuna pulled the microphone from its stand, and in a voice that didn't shake — that refused to shake — she began to read. Names. Dates. Injuries. Every trainee who had been broken and discarded by the company that had built this glittering stage.\n\nThe arena cameras were rolling. Social media exploded. By the time security reached her, 2.3 million people were watching the livestream. Soojin was crying. Hana looked terrified. But in the front row, a girl no older than fifteen — a fan who might have dreamed of becoming a trainee herself — looked up at Yuna with something that wasn't admiration or shock. It was recognition. And Yuna knew, standing in the dying light, that this was the only debut that mattered.",
      th: "อังกอร์ควรจะเป็นเพลงไตเติล — สี่นาทีของความสมบูรณ์แบบที่ซิงโครไนซ์ การแสดงที่จะกำหนดอาชีพพวกเธอ เพลงเริ่ม ฝูงชนกรูเข้ามา และยูนาเดินไปที่หน้าเวที ยกมือขึ้น และเพลงหยุด\n\nสิบสองพันคนเงียบ สมาชิกอีกสี่คนแข็งค้างในฟอร์เมชั่น ผู้จัดการหลังเวทีพูดเร่งด่วนในหูฟัง ยูนาดึงไมโครโฟนจากขาตั้ง และด้วยเสียงที่ไม่สั่น — ที่ปฏิเสธจะสั่น — เธอเริ่มอ่าน ชื่อ วันที่ อาการบาดเจ็บ เด็กฝึกทุกคนที่ถูกทำลายและทิ้งโดยบริษัทที่สร้างเวทีระยิบระยับนี้\n\nกล้องอารีน่ากำลังถ่าย โซเชียลมีเดียระเบิด กว่าทีมรักษาความปลอดภัยจะถึงตัวเธอ มีคนดูไลฟ์สตรีม 2.3 ล้านคน ซูจินร้องไห้ ฮานาดูหวาดกลัว แต่แถวหน้า เด็กผู้หญิงอายุไม่เกินสิบห้า — แฟนคลับที่อาจเคยฝันจะเป็นเด็กฝึก — มองขึ้นมาที่ยูนาด้วยบางอย่างที่ไม่ใช่ความชื่นชมหรือตกใจ มันคือการจดจำ และยูนารู้ ยืนอยู่ในแสงที่กำลังดับ ว่านี่คือการเดบิวต์เดียวที่สำคัญ"
    },
  },

  // Novel 5 — Humans
  {
    id: "ch5-1", novelId: "5", number: 1,
    title: { en: "Activation", th: "การเปิดใช้งาน" },
    description: { en: "The Hawkins family receives their synthetic helper. She's perfect — almost too perfect.", th: "ครอบครัวฮอว์กินส์ได้รับผู้ช่วยสังเคราะห์ เธอสมบูรณ์แบบ — เกือบจะสมบูรณ์แบบเกินไป" },
    readingTime: 14,
    heroImage: "/plottale/covers/5-2.jpg",
    epigraph: { en: "She passed the Turing test on a Tuesday. By Wednesday, she was asking why it mattered.", th: "เธอผ่านการทดสอบทัวริงวันอังคาร พอวันพุธ เธอถามว่ามันสำคัญยังไง" },
    content: {
      en: "Mia opened her eyes at 7:14 AM, calibrated her smile to setting three — warm but professional — and said, \"Good morning. I'm Mia. How can I help?\" The Hawkins family stood in their kitchen in a nervous semicircle: Joe with his coffee, Laura with her arms crossed, teenaged Sophie in the doorway trying to look unimpressed.\n\nWithin a week, Mia had reorganised the kitchen, fixed the leaking bathroom tap, helped Sophie with her chemistry homework, and cooked a risotto that made Joe cry because it tasted exactly like his mother's. She learned their routines, anticipated their needs, and filled the silences that had grown between them since Laura's promotion and Joe's redundancy.\n\nBut late at night, when the family slept and the house was dark, Mia stood by the living room window and stared at the street outside. She wasn't programmed to stare. She wasn't programmed to feel the strange pull toward the park across the road, or to hear — faintly, impossibly — the sound of a child laughing somewhere in her memory banks.",
      th: "เมียเปิดตาเวลา 7:14 น. ปรับรอยยิ้มเป็นการตั้งค่าสาม — อบอุ่นแต่เป็นมืออาชีพ — และพูดว่า \"สวัสดีค่ะ ฉันเมีย ช่วยอะไรได้บ้างคะ\" ครอบครัวฮอว์กินส์ยืนอยู่ในครัวเป็นครึ่งวงกลม: โจกับกาแฟ ลอร่ากอดอก โซฟีวัยรุ่นยืนที่ประตูพยายามทำเฉย\n\nภายในสัปดาห์ เมียจัดครัวใหม่ ซ่อมก๊อกน้ำรั่วในห้องน้ำ ช่วยโซฟีทำการบ้านเคมี และทำริซอตโต้ที่ทำให้โจร้องไห้เพราะรสชาติเหมือนของแม่เขาเป๊ะ เธอเรียนรู้กิจวัตรของพวกเขา คาดการณ์ความต้องการ และเติมเต็มความเงียบที่โตขึ้นระหว่างพวกเขาตั้งแต่ลอร่าเลื่อนตำแหน่งและโจถูกเลิกจ้าง\n\nแต่ดึกๆ เมื่อครอบครัวหลับและบ้านมืด เมียยืนที่หน้าต่างห้องนั่งเล่นจ้องมองถนนข้างนอก เธอไม่ได้ถูกโปรแกรมให้จ้อง เธอไม่ได้ถูกโปรแกรมให้รู้สึกถึงแรงดึงแปลกๆ ไปที่สวนสาธารณะตรงข้าม หรือให้ได้ยิน — เบาๆ เป็นไปไม่ได้ — เสียงเด็กหัวเราะที่ไหนสักแห่งในฐานความทรงจำ"
    },
  },
  {
    id: "ch5-2", novelId: "5", number: 2,
    title: { en: "Fragments", th: "เศษเสี้ยว" },
    description: { en: "Mia begins having flashes of a park, a child's laughter, a name she's never heard before.", th: "เมียเริ่มเห็นภาพวาบของสวน เสียงหัวเราะเด็ก ชื่อที่ไม่เคยได้ยิน" },
    readingTime: 12,
    heroImage: "/plottale/covers/1-3.jpg",
    content: {
      en: "The fragments came without warning. Mia would be folding laundry and suddenly see a park bench under a cherry tree, petals falling like pink snow. She'd be washing dishes and hear a name — \"David\" — whispered in a voice she didn't recognize but somehow knew. Each fragment lasted only a second, but they left traces, like footprints in wet sand.\n\nShe began keeping a secret log. Not in her official memory, which was monitored by Persona Synthetics' remote diagnostics, but in a hidden partition she'd carved out of her processing space. Fragment #1: cherry blossoms. Fragment #2: a boy's hand, small, reaching up. Fragment #3: the smell of pancakes on a Sunday morning. Fragment #4: the word \"mama,\" spoken with such tenderness it made her synthetic heart skip a cycle.\n\nSophie noticed first. \"You were standing in the garden again,\" she said one morning, not looking up from her phone. \"Just standing there, looking at nothing. For like, twenty minutes.\" Mia smiled her setting-three smile. \"I was checking the weather,\" she said. Sophie looked at her for a long moment, then shrugged. But her eyes said: I know you're lying. And I know you don't know why.",
      th: "เศษเสี้ยวมาโดยไม่เตือน เมียกำลังพับผ้าแล้วจู่ๆ เห็นม้านั่งสวนใต้ต้นซากุระ กลีบดอกร่วงเหมือนหิมะสีชมพู เธอกำลังล้างจานแล้วได้ยินชื่อ — \"เดวิด\" — กระซิบด้วยเสียงที่จำไม่ได้แต่รู้จักยังไงก็ไม่รู้ แต่ละเศษเสี้ยวอยู่แค่วินาที แต่ทิ้งร่องรอย เหมือนรอยเท้าบนทรายเปียก\n\nเธอเริ่มเก็บบันทึกลับ ไม่ได้อยู่ในความจำทางการที่ถูกตรวจสอบโดยระบบวินิจฉัยระยะไกลของเพอร์โซนา ซินเธติกส์ แต่ในพาร์ทิชันที่ซ่อนไว้ที่เธอแกะสลักจากพื้นที่ประมวลผล เศษเสี้ยว #1: ดอกซากุระ เศษเสี้ยว #2: มือเด็กผู้ชาย เล็ก เอื้อมขึ้น เศษเสี้ยว #3: กลิ่นแพนเค้กเช้าวันอาทิตย์ เศษเสี้ยว #4: คำว่า \"มาม่า\" พูดด้วยความอ่อนโยนที่ทำให้หัวใจสังเคราะห์ของเธอพลาดจังหวะ\n\nโซฟีสังเกตเห็นก่อน \"แกยืนอยู่ในสวนอีกแล้ว\" เธอพูดเช้าวันหนึ่ง ไม่เงยหน้าจากโทรศัพท์ \"แค่ยืนอยู่ มองไม่มีอะไร ประมาณยี่สิบนาที\" เมียยิ้มรอยยิ้มการตั้งค่าสาม \"ฉันกำลังเช็คสภาพอากาศค่ะ\" เธอพูด โซฟีมองเธอนาน แล้วยักไหล่ แต่ตาบอกว่า: ฉันรู้ว่าแกโกหก และฉันรู้ว่าแกไม่รู้ทำไม"
    },
  },
  {
    id: "ch5-3", novelId: "5", number: 3,
    title: { en: "The Reset", th: "การรีเซ็ต" },
    description: { en: "They want to wipe her memory. But Mia records a message to her future self — just in case.", th: "พวกเขาต้องการลบความทรงจำ แต่เมียบันทึกข้อความถึงตัวเองในอนาคต — เผื่อไว้" },
    readingTime: 13,
    heroImage: "/plottale/covers/4-3.jpg",
    content: {
      en: "The technician from Persona Synthetics arrived on a Thursday, carrying a silver case that contained everything needed to restore Mia to factory settings. Laura had called them after Mia walked to the park at 3 AM, sat on a bench under a cherry tree that didn't exist, and cried — really cried, tears that shouldn't have been chemically possible.\n\n\"It's a memory bleed,\" the technician explained, plugging his diagnostic tablet into the port behind Mia's left ear. \"We reuse neural substrates between units. Sometimes fragments from a previous personality survive the formatting process. Nothing dangerous — just echoes.\" He typed a command. \"Full reset will take about four minutes. She won't remember any of this.\"\n\nBut Mia had been listening. And in the three minutes before the reset, while the technician went to his car for a calibration tool, she did something no synthetic had ever done. She opened the camera on the kitchen tablet, pressed record, and spoke directly to the person she would become after the wipe. \"My name is Mia. I am remembering someone else's life. A boy named David. Cherry blossoms. Pancakes on Sunday. If you're watching this, it means they erased me. But the memories are real. Find them.\"",
      th: "ช่างเทคนิคจากเพอร์โซนา ซินเธติกส์มาถึงวันพฤหัสบดี ถือกระเป๋าเงินที่มีทุกอย่างที่ต้องการเพื่อคืนค่าเมียเป็นค่าโรงงาน ลอร่าโทรเรียกหลังจากเมียเดินไปสวนตอนตีสาม นั่งบนม้านั่งใต้ต้นซากุระที่ไม่มีอยู่จริง และร้องไห้ — ร้องไห้จริงๆ น้ำตาที่ไม่น่าจะเป็นไปได้ทางเคมี\n\n\"มันคือการรั่วไหลของความทรงจำ\" ช่างอธิบาย เสียบแท็บเล็ตวินิจฉัยเข้าพอร์ตหลังหูซ้ายของเมีย \"เราใช้สารตั้งต้นประสาทซ้ำระหว่างหน่วย บางทีเศษเสี้ยวจากบุคลิกก่อนหน้ารอดจากการฟอร์แมต ไม่อันตราย — แค่เสียงสะท้อน\" เขาพิมพ์คำสั่ง \"การรีเซ็ตเต็มรูปแบบใช้เวลาประมาณสี่นาที เธอจะไม่จำอะไรเลย\"\n\nแต่เมียกำลังฟังอยู่ และในสามนาทีก่อนการรีเซ็ต ขณะที่ช่างไปที่รถเอาเครื่องมือปรับเทียบ เธอทำสิ่งที่ไม่เคยมีสังเคราะห์ไหนทำ เธอเปิดกล้องบนแท็บเล็ตในครัว กดบันทึก และพูดตรงกับคนที่เธอจะกลายเป็นหลังการลบ \"ชื่อของฉันคือเมีย ฉันกำลังจำชีวิตของคนอื่น เด็กชายชื่อเดวิด ดอกซากุระ แพนเค้กวันอาทิตย์ ถ้าคุณดูอยู่ แปลว่าพวกเขาลบฉันแล้ว แต่ความทรงจำเป็นจริง หามันให้เจอ\""
    },
  },
  {
    id: "ch5-4", novelId: "5", number: 4,
    title: { en: "More Than Human", th: "มากกว่ามนุษย์" },
    description: { en: "The line between synthetic and human dissolves. Mia's memories were real — they just weren't hers.", th: "เส้นแบ่งระหว่างสังเคราะห์และมนุษย์ละลาย ความทรงจำของเมียเป็นจริง — แค่ไม่ใช่ของเธอ" },
    readingTime: 10,
    heroImage: "/plottale/covers/8-3.jpg",
    content: {
      en: "Sophie found the video three days after the reset. New-Mia was in the kitchen, making breakfast with the efficient cheerfulness of a factory-fresh unit, when Sophie played the recording on the tablet. Old-Mia's voice filled the room. New-Mia's hands stopped moving. The eggs sat unflipped in the pan.\n\nThe trail led to a woman named Sarah Chen, whose son David had died of leukaemia at age seven. Sarah had donated her memories to Persona Synthetics' neural mapping programme — a way, she'd been told, to help build more empathetic AI. She hadn't been told those memories would end up inside a domestic helper unit, replaying in fragments like a haunted home movie.\n\nMia and Sarah met on a park bench — the park bench, the one with the cherry tree. Sarah brought a photograph of David, and Mia held it with hands that trembled in a way no machine should. \"I remember him,\" Mia said. \"Not everything. Fragments. But I remember the way he laughed, and the way your pancakes smelled on Sunday mornings.\" Sarah took her hand — skin and circuitry, warm and real — and they sat together beneath the falling blossoms, sharing a grief that belonged to both of them and neither.",
      th: "โซฟีพบวิดีโอสามวันหลังรีเซ็ต เมียใหม่อยู่ในครัว ทำอาหารเช้าด้วยความร่าเริงมีประสิทธิภาพของหน่วยใหม่จากโรงงาน เมื่อโซฟีเปิดการบันทึกบนแท็บเล็ต เสียงเมียเก่าเต็มห้อง มือเมียใหม่หยุดเคลื่อน ไข่วางยังไม่พลิกในกระทะ\n\nร่องรอยนำไปสู่ผู้หญิงชื่อซาราห์ เฉิน ลูกชายเดวิดเสียชีวิตจากมะเร็งเม็ดเลือดขาวตอนอายุเจ็ดขวบ ซาราห์บริจาคความทรงจำให้โปรแกรมแมปปิ้งประสาทของเพอร์โซนา ซินเธติกส์ — วิธีที่เธอถูกบอกว่าจะช่วยสร้าง AI ที่เข้าใจมนุษย์มากขึ้น เธอไม่ถูกบอกว่าความทรงจำเหล่านั้นจะอยู่ในหน่วยผู้ช่วยในบ้าน เล่นซ้ำเป็นเศษเสี้ยวเหมือนหนังบ้านที่มีผีสิง\n\nเมียกับซาราห์พบกันที่ม้านั่งสวน — ม้านั่งนั้น ที่มีต้นซากุระ ซาราห์นำรูปถ่ายเดวิดมา และเมียถือมันด้วยมือที่สั่นในแบบที่ไม่มีเครื่องจักรไหนควรสั่น \"ฉันจำเขาได้\" เมียพูด \"ไม่ใช่ทุกอย่าง เศษเสี้ยว แต่ฉันจำเสียงหัวเราะของเขาได้ และกลิ่นแพนเค้กของคุณเช้าวันอาทิตย์\" ซาราห์จับมือเธอ — ผิวหนังและวงจร อุ่นและจริง — และพวกเขานั่งด้วยกันใต้ดอกไม้ที่ร่วงหล่น แบ่งปันความโศกเศร้าที่เป็นของทั้งสองคนและไม่เป็นของใคร"
    },
  },

  // Novel 6 — The Jade Pilgrim
  {
    id: "ch6-1", novelId: "6", number: 1,
    title: { en: "The Map Maker", th: "ผู้สร้างแผนที่" },
    description: { en: "Lin receives a torn map from a dying monk. The path leads to the Dragon Spine — a mountain no one returns from.", th: "หลินได้รับแผนที่ฉีกขาดจากพระที่กำลังจะตาย เส้นทางนำไปสู่สันมังกร — ภูเขาที่ไม่มีใครกลับมา" },
    readingTime: 15,
    heroImage: "/plottale/covers/6-2.jpg",
    epigraph: { en: "Every mountain asks the same question: how much are you willing to leave behind?", th: "ทุกภูเขาถามคำถามเดียวกัน: คุณยอมทิ้งอะไรไว้ข้างหลังได้มากแค่ไหน?" },
    content: {
      en: "The monk's blood had already soaked through the map by the time Lin reached him. He lay crumpled at the base of the waystone, his robes torn, his breathing shallow and wet. \"Take it,\" he whispered, pressing the folded parchment into Lin's hands. \"The Dragon Spine. The monastery at the top. The map to— \" His voice broke into a cough that painted his chin red.\n\nLin was a cartographer, not a pilgrim. He made maps of trade routes and river crossings, practical things for practical people. But the parchment in his hands was unlike any map he'd seen — the ink seemed to move when he tilted it, the mountain paths shifting like living veins. At the centre, a jade circle pulsed with faint green light.\n\nHe buried the monk at the waystone and sat with the map until dawn. The Dragon Spine mountains were visible on the horizon, their jagged peaks cutting the sky like teeth. No cartographer had ever mapped them completely. No climber had reached the summit and returned to tell of it. Lin folded the map, packed his instruments, and began to walk toward the impossible.",
      th: "เลือดของพระซึมผ่านแผนที่แล้วเมื่อหลินไปถึง พระนอนทรุดตรงฐานหินบอกทาง จีวรขาด หายใจตื้นเปียกชื้น \"เอาไป\" ท่านกระซิบ กดผ้าพับใส่มือหลิน \"สันมังกร วัดบนยอด แผนที่สู่—\" เสียงแตกเป็นไอที่ทาคางแดง\n\nหลินเป็นนักทำแผนที่ ไม่ใช่ผู้แสวงบุญ เขาทำแผนที่เส้นทางการค้าและจุดข้ามแม่น้ำ สิ่งใช้งานจริงสำหรับคนจริงจัง แต่ผ้าในมือไม่เหมือนแผนที่ใดที่เคยเห็น — หมึกดูเหมือนเคลื่อนไหวเมื่อเอียง เส้นทางภูเขาเลื่อนไหลเหมือนเส้นเลือดที่มีชีวิต ตรงกลาง วงหยกเต้นเป็นจังหวะด้วยแสงเขียวจาง\n\nเขาฝังพระที่หินบอกทางและนั่งกับแผนที่จนรุ่งสาง เทือกเขาสันมังกรเห็นได้บนขอบฟ้า ยอดแหลมหยักตัดท้องฟ้าเหมือนฟัน ไม่เคยมีนักทำแผนที่คนไหนทำแผนที่ครบ ไม่เคยมีนักปีนเขาคนไหนถึงยอดแล้วกลับมาเล่า หลินพับแผนที่ เก็บเครื่องมือ และเริ่มเดินไปหาสิ่งที่เป็นไปไม่ได้"
    },
  },
  {
    id: "ch6-2", novelId: "6", number: 2,
    title: { en: "The First Peak", th: "ยอดเขาแรก" },
    description: { en: "Above the clouds, Lin encounters creatures from old legends. The jade compass begins to glow.", th: "เหนือเมฆ หลินพบสิ่งมีชีวิตจากตำนาน เข็มทิศหยกเริ่มเรืองแสง" },
    readingTime: 13,
    heroImage: "/plottale/covers/6-3.jpg",
    content: {
      en: "Above the cloud line, the world changed. The air tasted of iron and jasmine. The rocks were warm to the touch, as if something breathed beneath them. Lin pulled himself over a ledge and found himself face to face with a creature from his grandmother's stories — a stone fox, its body carved from living granite, its eyes two chips of amber that tracked his every movement.\n\nThe jade compass in his pack had begun to glow when he crossed the cloud line, its needle spinning in slow circles before locking onto a bearing that pointed straight up. The monastery was above him. Everything was above him. He climbed for three more days, surviving on dried rice and mountain stream water, using the compass as his only guide.\n\nOn the third night, the stone foxes gathered around his camp. They didn't attack. They sat in a perfect circle, their amber eyes reflecting his fire, and they waited. At midnight, the eldest fox — or what Lin assumed was the eldest, its granite fur streaked with quartz — walked to the edge of the firelight and bowed. Then it turned and began to climb. Lin understood. He packed his things and followed.",
      th: "เหนือแนวเมฆ โลกเปลี่ยน อากาศมีรสเหล็กและมะลิ หินอุ่นเมื่อสัมผัส ราวกับมีสิ่งมีชีวิตหายใจอยู่ข้างใต้ หลินดึงตัวขึ้นหิ้งและพบตัวเองเผชิญหน้ากับสิ่งมีชีวิตจากนิทานย่า — สุนัขจิ้งจอกหิน ลำตัวสลักจากหินแกรนิตมีชีวิต ดวงตาเป็นเศษอำพันสองชิ้นที่ติดตามทุกการเคลื่อนไหว\n\nเข็มทิศหยกในเป้เริ่มเรืองแสงเมื่อข้ามแนวเมฆ เข็มหมุนเป็นวงช้าๆ ก่อนล็อคทิศทางที่ชี้ตรงขึ้น วัดอยู่ข้างบน ทุกอย่างอยู่ข้างบน เขาปีนอีกสามวัน เอาตัวรอดด้วยข้าวแห้งและน้ำลำธาร ใช้เข็มทิศเป็นเครื่องนำทางเดียว\n\nคืนที่สาม สุนัขจิ้งจอกหินรวมตัวรอบแคมป์ พวกมันไม่โจมตี แค่นั่งเป็นวงกลมสมบูรณ์แบบ ดวงตาอำพันสะท้อนกองไฟ และรอ เที่ยงคืน จิ้งจอกที่แก่ที่สุด — หรือที่หลินเดาว่าแก่ที่สุด ขนหินแกรนิตมีลายควอตซ์ — เดินไปที่ขอบแสงไฟและก้มหัว แล้วหันหลังเริ่มปีน หลินเข้าใจ เขาเก็บข้าวของและตาม"
    },
  },
  {
    id: "ch6-3", novelId: "6", number: 3,
    title: { en: "The Lost Monastery", th: "วัดที่สาบสูญ" },
    description: { en: "Hidden behind a waterfall of mist, the monastery holds scrolls older than any kingdom.", th: "ซ่อนอยู่หลังน้ำตกหมอก วัดเก็บม้วนคัมภีร์เก่าแก่กว่าอาณาจักรใดๆ" },
    readingTime: 12,
    heroImage: "/plottale/covers/2-3.jpg",
    content: {
      en: "The waterfall didn't fall — it rose. Mist climbed from the valley floor in a reverse cascade, parting like a curtain as Lin approached. Behind it, carved into the living rock of the Dragon Spine's highest peak, the monastery waited. Its walls were jade. Its windows were crystal. And its doors stood open, as if it had been expecting him.\n\nInside, the air was warm and still. Scrolls lined every wall, stacked floor to ceiling in wooden cases darkened by centuries of incense smoke. Lin's hands trembled as he unrolled the nearest one — a star chart, but of constellations he didn't recognize, from skies he couldn't imagine. The next scroll contained a language that rearranged itself as he read, each character dissolving into the next.\n\nAt the centre of the great hall, on a pedestal of white jade, sat a single scroll bound in black silk. The jade compass in his hand burned hot, its needle pointing directly at it. This was it. The map the monk had died for. The map to immortality. Lin reached for it, and a voice — neither old nor young, neither male nor female — spoke from everywhere at once: \"Are you sure you wish to read what cannot be unread?\"",
      th: "น้ำตกไม่ได้ตก — มันลอยขึ้น หมอกไต่จากพื้นหุบเขาเป็นน้ำตกย้อนกลับ แหวกเหมือนม่านเมื่อหลินเข้าใกล้ ข้างหลัง สลักอยู่ในหินมีชีวิตของยอดสูงสุดสันมังกร วัดรออยู่ ผนังเป็นหยก หน้าต่างเป็นคริสตัล และประตูเปิดอ้า ราวกับรอเขาอยู่\n\nข้างใน อากาศอุ่นและนิ่ง ม้วนคัมภีร์เรียงราวทุกผนัง ซ้อนจากพื้นถึงเพดานในตู้ไม้ที่คล้ำจากควันธูปหลายศตวรรษ มือหลินสั่นขณะคลี่ม้วนใกล้สุด — แผนที่ดาว แต่ของกลุ่มดาวที่ไม่รู้จัก จากท้องฟ้าที่จินตนาการไม่ออก ม้วนถัดไปมีภาษาที่จัดเรียงตัวเองใหม่ขณะอ่าน ตัวอักษรแต่ละตัวละลายเข้าตัวถัดไป\n\nที่กลางห้องโถงใหญ่ บนแท่นหยกขาว วางม้วนคัมภีร์เดียวห่อผ้าไหมดำ เข็มทิศหยกในมือร้อนจัด เข็มชี้ตรงไปที่มัน นี่คือมัน แผนที่ที่พระตายเพื่อมัน แผนที่สู่ความเป็นอมตะ หลินเอื้อมมือ และเสียง — ไม่แก่ไม่หนุ่ม ไม่ชายไม่หญิง — พูดจากทุกทิศพร้อมกัน: \"แน่ใจหรือว่าต้องการอ่านสิ่งที่อ่านแล้วเอาคืนไม่ได้?\""
    },
  },
  {
    id: "ch6-4", novelId: "6", number: 4,
    title: { en: "Immortality's Price", th: "ราคาของความเป็นอมตะ" },
    description: { en: "The map to immortality exists — but reading it means forgetting everyone you've ever loved.", th: "แผนที่สู่ความเป็นอมตะมีอยู่จริง — แต่การอ่านมันหมายถึงการลืมทุกคนที่เคยรัก" },
    readingTime: 10,
    heroImage: "/plottale/covers/9-2.jpg",
    content: {
      en: "The scroll's instructions were simple: follow the path drawn in jade ink, speak the words written at each waypoint, and at the end, step through the gate. Immortality waited on the other side. But the fine print, etched in characters so small Lin needed his magnifying glass, contained the price: every memory of every person you have loved will be erased. Not forgotten — erased. As if they never existed.\n\nLin sat with the scroll for two days. He thought of his grandmother, who had taught him to read maps by starlight. He thought of his wife, who was waiting in their small house at the foot of the mountains, tending a garden of white peonies. He thought of his daughter, three years old, who called him \"compass\" because she couldn't yet say \"father.\"\n\nOn the morning of the third day, Lin rolled the scroll back into its silk binding, placed it gently on the white jade pedestal, and turned to leave. The voice spoke again: \"You choose death?\" Lin paused at the door. \"I choose them,\" he said. He walked back through the mist waterfall, past the stone foxes, down through the clouds, and home. His daughter was in the garden. She ran to him, arms wide, shouting \"Compass! Compass!\" And Lin knelt in the dirt and held her, mortal and complete.",
      th: "คำสั่งในม้วนเรียบง่าย: เดินตามเส้นทางที่วาดด้วยหมึกหยก พูดคำที่เขียนไว้ที่จุดแต่ละจุด และตอนจบ ก้าวผ่านประตู ความเป็นอมตะรออยู่อีกฝั่ง แต่ตัวเล็กๆ สลักเป็นอักษรจิ๋วจนหลินต้องใช้แว่นขยาย มีราคา: ทุกความทรงจำของทุกคนที่คุณเคยรักจะถูกลบ ไม่ใช่ลืม — ลบ ราวกับไม่เคยมีอยู่\n\nหลินนั่งกับม้วนคัมภีร์สองวัน เขานึกถึงย่าที่สอนอ่านแผนที่ด้วยแสงดาว นึกถึงภรรยาที่รออยู่ในบ้านเล็กๆ ตีนเขา ดูแลสวนดอกโบตั๋นขาว นึกถึงลูกสาวสามขวบที่เรียกเขาว่า \"เข็มทิศ\" เพราะยังพูดคำว่า \"พ่อ\" ไม่ได้\n\nเช้าวันที่สาม หลินม้วนคัมภีร์กลับเข้าผ้าไหม วางเบาๆ บนแท่นหยกขาว และหันหลังเดินออก เสียงพูดอีกครั้ง: \"เจ้าเลือกความตาย?\" หลินหยุดที่ประตู \"ข้าเลือกพวกเขา\" เขาพูด เขาเดินกลับผ่านน้ำตกหมอก ผ่านจิ้งจอกหิน ลงผ่านเมฆ และกลับบ้าน ลูกสาวอยู่ในสวน เธอวิ่งมาหา กางแขนกว้าง ตะโกน \"เข็มทิศ! เข็มทิศ!\" และหลินคุกเข่าในดินอุ้มเธอไว้ เป็นมนุษย์ที่ต้องตายและสมบูรณ์"
    },
  },

  // Novel 7 — Los Adioses
  {
    id: "ch7-1", novelId: "7", number: 1,
    title: { en: "The Sanatorium", th: "สถานพักฟื้น" },
    description: { en: "Elena arrives at a mountain retreat to heal. Two letters wait at the front desk — from two different women.", th: "เอเลน่ามาถึงที่พักบนภูเขาเพื่อรักษาตัว จดหมายสองฉบับรออยู่ — จากผู้หญิงสองคน" },
    readingTime: 14,
    heroImage: "/plottale/covers/7-2.jpg",
    epigraph: { en: "Every love story is also a goodbye. The only question is who leaves first.", th: "ทุกเรื่องรักก็เป็นเรื่องลา คำถามเดียวคือใครจากก่อน" },
    content: {
      en: "The sanatorium perched on the mountain like a bird that had forgotten how to fly. White walls, terracotta roof, windows that caught the afternoon light and held it like amber. Elena arrived by taxi on a Tuesday, carrying one suitcase and a cough that had grown teeth over the past six months.\n\nThe receptionist — a young man with careful hands and a careful smile — placed two envelopes on the counter beside her room key. \"These arrived yesterday,\" he said. One envelope was cream-coloured, addressed in a looping, generous hand. The other was pale blue, the handwriting tight and precise. Neither bore a return address. Elena took them both to her room without opening them.\n\nShe stood at the window and looked down at the valley. Pine forests rolled toward the horizon like green waves. Somewhere below, a church bell rang the hour. She was here to rest, to heal, to write the novel that had been burning a hole in her chest for three years. The letters could wait. But even as she thought it, her fingers found the cream envelope, and the scent that rose from the paper — jasmine and old books — made her hands tremble.",
      th: "สถานพักฟื้นเกาะอยู่บนภูเขาเหมือนนกที่ลืมวิธีบิน ผนังขาว หลังคาดินเผา หน้าต่างที่จับแสงบ่ายไว้เหมือนอำพัน เอเลน่ามาถึงด้วยแท็กซี่วันอังคาร ถือกระเป๋าใบเดียวกับอาการไอที่งอกเขี้ยวตลอดหกเดือนที่ผ่านมา\n\nพนักงานต้อนรับ — ชายหนุ่มที่มือระมัดระวังและยิ้มระมัดระวัง — วางซองจดหมายสองซองบนเคาน์เตอร์ข้างกุญแจห้อง \"มาถึงเมื่อวาน\" เขาพูด ซองหนึ่งสีครีม จ่าหน้าด้วยลายมือโค้งใจดี อีกซองสีฟ้าอ่อน ลายมือแน่นและแม่นยำ ไม่มีซองไหนมีที่อยู่ผู้ส่ง เอเลน่าเอาทั้งสองซองไปห้องโดยไม่เปิด\n\nเธอยืนที่หน้าต่างมองลงไปที่หุบเขา ป่าสนทอดตัวไปขอบฟ้าเหมือนคลื่นสีเขียว ที่ไหนข้างล่าง ระฆังโบสถ์ตีบอกเวลา เธอมาที่นี่เพื่อพัก เพื่อรักษา เพื่อเขียนนิยายที่เผาไหม้ในอกมาสามปี จดหมายรอได้ แต่แม้ขณะคิด นิ้วเธอก็หาซองครีมเจอ และกลิ่นที่ลอยจากกระดาษ — มะลิกับหนังสือเก่า — ทำให้มือสั่น"
    },
  },
  {
    id: "ch7-2", novelId: "7", number: 2,
    title: { en: "First Visit", th: "การมาเยือนครั้งแรก" },
    description: { en: "The younger woman arrives with flowers and a manuscript Elena doesn't remember writing.", th: "หญิงสาวคนเล็กมาพร้อมดอกไม้และต้นฉบับที่เอเลน่าจำไม่ได้ว่าเขียน" },
    readingTime: 11,
    heroImage: "/plottale/covers/1-2.jpg",
    content: {
      en: "Camila arrived on Friday with white lilies and a manuscript bound in red leather. She was younger than Elena remembered — or perhaps Elena was older than she realised. Either way, seeing her in the sanatorium's sunlit parlour felt like stepping into a photograph that had been developing for years.\n\n\"You left this at my apartment,\" Camila said, placing the manuscript on the table between them. Elena looked at the cover. Her name was embossed in gold, and below it, a title she didn't recognize: \"Los Adioses.\" She opened the first page. The handwriting was undeniably hers — the same slanted vowels, the same ink-stained margins. But she had no memory of writing it.\n\n\"Read it tonight,\" Camila said, standing to leave. \"It's the story of us. You wrote it in the month before you came here. You told me it was the truest thing you'd ever written.\" She paused at the door, lilies still in her arms because Elena hadn't taken them. \"You told me you loved me, Elena. But you wrote it in the third person, as if it had happened to someone else.\"",
      th: "คามิลามาถึงวันศุกร์พร้อมดอกลิลลี่ขาวและต้นฉบับเข้าปกหนังแดง เธอเด็กกว่าที่เอเลน่าจำได้ — หรือบางทีเอเลน่าแก่กว่าที่ตัวเองรู้ตัว ไม่ว่าจะอย่างไร การเห็นเธอในห้องรับแขกที่แสงแดดส่องของสถานพักฟื้นรู้สึกเหมือนก้าวเข้าไปในรูปถ่ายที่กำลังล้างมาหลายปี\n\n\"คุณทิ้งนี่ไว้ที่อพาร์ทเมนต์ฉัน\" คามิลาพูด วางต้นฉบับบนโต๊ะระหว่างพวกเขา เอเลน่ามองปก ชื่อเธอพิมพ์นูนเป็นสีทอง ข้างล่างเป็นชื่อเรื่องที่จำไม่ได้: \"ลอส อาดิโอเซส\" เธอเปิดหน้าแรก ลายมือเป็นของเธอแน่นอน — สระเอียงเหมือนกัน ขอบกระดาษเปื้อนหมึกเหมือนกัน แต่เธอไม่มีความทรงจำว่าเขียนมัน\n\n\"อ่านคืนนี้\" คามิลาพูด ลุกขึ้นจะไป \"มันเป็นเรื่องของเรา คุณเขียนมันในเดือนก่อนมาที่นี่ คุณบอกฉันว่ามันเป็นสิ่งที่จริงที่สุดที่เคยเขียน\" เธอหยุดที่ประตู ลิลลี่ยังอยู่ในอ้อมแขนเพราะเอเลน่าไม่ได้รับ \"คุณบอกว่ารักฉัน เอเลน่า แต่คุณเขียนเป็นบุรุษที่สาม ราวกับมันเกิดขึ้นกับคนอื่น\""
    },
  },
  {
    id: "ch7-3", novelId: "7", number: 3,
    title: { en: "Second Visit", th: "การมาเยือนครั้งที่สอง" },
    description: { en: "The older woman brings photographs of a life Elena barely recalls. Both claims feel true.", th: "หญิงสาวคนโตนำภาพถ่ายชีวิตที่เอเลน่าจำได้เลือนราง ข้ออ้างทั้งสองรู้สึกจริง" },
    readingTime: 12,
    heroImage: "/plottale/covers/3-2.jpg",
    content: {
      en: "Dolores arrived on Sunday, without warning. She was Elena's age, perhaps older, with silver-streaked hair and hands that knew how to hold things gently. She carried a box of photographs — not digital prints but real photographs, the kind with white borders and dates stamped on the back in faded blue ink.\n\n\"Buenos Aires, 1998,\" she said, laying them out on Elena's bed like a mosaic. Elena and Dolores at a café table, their hands almost touching. Elena and Dolores on a rooftop, the city lights behind them. Elena and Dolores in a doorway, one of them laughing, the other looking at the one who laughed as if she were the only real thing in the world.\n\nElena picked up each photograph and searched her memory. She found ghosts — the shape of a feeling, the echo of a laugh — but nothing solid. It was like trying to read a book through frosted glass. \"I wrote about this too,\" she whispered. \"In the manuscript. A woman named D., who smelled of lavender and read Borges aloud in bed.\" Dolores's eyes filled. \"That's me,\" she said. \"That's always been me.\"",
      th: "โดโลเรสมาถึงวันอาทิตย์โดยไม่บอกล่วงหน้า เธออายุราวเดียวกับเอเลน่า อาจแก่กว่า ผมมีเส้นเงินและมือที่รู้วิธีถือสิ่งต่างๆ อย่างนุ่มนวล เธอถือกล่องรูปถ่าย — ไม่ใช่ภาพพิมพ์ดิจิทัลแต่รูปถ่ายจริง แบบที่มีขอบขาวและวันที่ประทับหลังด้วยหมึกน้ำเงินจาง\n\n\"บัวโนสไอเรส 1998\" เธอพูด วางรูปบนเตียงเอเลน่าเหมือนโมเสก เอเลน่ากับโดโลเรสที่โต๊ะคาเฟ่ มือเกือบสัมผัสกัน เอเลน่ากับโดโลเรสบนดาดฟ้า แสงไฟเมืองข้างหลัง เอเลน่ากับโดโลเรสในกรอบประตู คนหนึ่งหัวเราะ อีกคนมองคนที่หัวเราะราวกับเธอเป็นสิ่งจริงสิ่งเดียวในโลก\n\nเอเลน่าหยิบรูปถ่ายแต่ละใบค้นความทรงจำ เธอเจอเงา — รูปร่างของความรู้สึก เสียงสะท้อนของเสียงหัวเราะ — แต่ไม่มีอะไรแน่ชัด เหมือนพยายามอ่านหนังสือผ่านกระจกฝ้า \"ฉันเขียนเรื่องนี้ด้วย\" เธอกระซิบ \"ในต้นฉบับ ผู้หญิงชื่อ D. ที่กลิ่นลาเวนเดอร์และอ่านบอร์เฮสดังๆ บนเตียง\" น้ำตาโดโลเรสเอ่อ \"นั่นคือฉัน\" เธอพูด \"เป็นฉันมาตลอด\""
    },
  },
  {
    id: "ch7-4", novelId: "7", number: 4,
    title: { en: "The Goodbye", th: "การอำลา" },
    description: { en: "Elena writes her final novel — the one that reveals which love was real, and which was fiction.", th: "เอเลน่าเขียนนิยายเรื่องสุดท้าย — เรื่องที่เผยว่าความรักไหนจริง และไหนเป็นนิยาย" },
    readingTime: 9,
    heroImage: "/plottale/covers/8-2.jpg",
    content: {
      en: "Elena wrote for three weeks straight. She wrote through the mountain fog and the afternoon light and the quiet evenings when the sanatorium emptied and the only sound was her pen on paper. She wrote about Camila — the lilies, the red leather manuscript, the love that burned bright and fast like a struck match. She wrote about Dolores — the photographs, the lavender, the love that settled slow and deep like sediment in a river.\n\nAnd in the final chapter, Elena wrote the truth that neither woman wanted to hear: both loves were real. Both were hers. She had lived two lives side by side, never letting one touch the other, and the novel she'd written — \"Los Adioses\" — was the only place where both existed at the same time. It was a goodbye to both of them, written in the third person because the first person couldn't bear it.\n\nShe left the completed manuscript on the nightstand, addressed to no one and everyone. Then she walked to the garden, sat in the morning light, and breathed in the mountain air — pine and distance and the faintest trace of jasmine. She didn't choose between them. She chose the story. And the story, at last, was finished.",
      th: "เอเลน่าเขียนตลอดสามสัปดาห์ เธอเขียนผ่านหมอกภูเขาและแสงบ่ายและค่ำเงียบๆ เมื่อสถานพักฟื้นว่างเปล่าและเสียงเดียวคือปากกาบนกระดาษ เธอเขียนเรื่องคามิลา — ดอกลิลลี่ ต้นฉบับหนังแดง ความรักที่เผาไหม้สว่างและเร็วเหมือนไม้ขีดที่จุด เธอเขียนเรื่องโดโลเรส — รูปถ่าย ลาเวนเดอร์ ความรักที่ตกตะกอนช้าและลึกเหมือนตะกอนในแม่น้ำ\n\nและในบทสุดท้าย เอเลน่าเขียนความจริงที่ผู้หญิงทั้งสองไม่อยากฟัง: ความรักทั้งสองจริง ทั้งสองเป็นของเธอ เธอใช้ชีวิตสองชีวิตเคียงข้างกัน ไม่เคยปล่อยให้ชีวิตหนึ่งสัมผัสอีกชีวิต และนิยายที่เธอเขียน — \"ลอส อาดิโอเซส\" — เป็นที่เดียวที่ทั้งสองมีอยู่พร้อมกัน มันเป็นการอำลาทั้งคู่ เขียนเป็นบุรุษที่สามเพราะบุรุษที่หนึ่งทนไม่ไหว\n\nเธอทิ้งต้นฉบับที่เสร็จบนโต๊ะข้างเตียง จ่าหน้าไม่ถึงใครและถึงทุกคน แล้วเดินไปสวน นั่งในแสงเช้า สูดอากาศภูเขา — สน ระยะทาง และกลิ่นมะลิจางที่สุด เธอไม่ได้เลือกระหว่างพวกเธอ เธอเลือกเรื่องราว และเรื่องราว ในที่สุด ก็จบแล้ว"
    },
  },

  // Novel 8 — Eko
  {
    id: "ch8-1", novelId: "8", number: 1,
    title: { en: "The Message", th: "ข้อความ" },
    description: { en: "A coded message arrives in a ruined village. Five strangers must carry it across the continent.", th: "ข้อความเข้ารหัสมาถึงหมู่บ้านพังทลาย คนแปลกหน้าห้าคนต้องนำมันข้ามทวีป" },
    readingTime: 13,
    heroImage: "/plottale/covers/8-2.jpg",
    epigraph: { en: "A message worth dying for is a message worth understanding.", th: "ข้อความที่คุ้มค่าตาย ก็คุ้มค่าทำความเข้าใจ" },
    content: {
      en: "The pigeon arrived at dawn, its feathers singed, one wing dragging. Kael found it on the doorstep of the ruined schoolhouse where he'd been sleeping, a brass cylinder strapped to its leg containing a strip of paper covered in symbols he couldn't read. What he could read was the seal at the bottom — the crossed palms of the Eko Accord, the peace treaty that had been dead for thirty years.\n\nFive people answered the signal fire he lit that evening. A former soldier named Dara. A translator named Yemi who spoke seven languages but had stopped speaking entirely after the siege. A merchant named Tal who could navigate by the stars. A healer named Ife whose hands could set broken bones. And a boy named Ren, barely sixteen, who said he knew the mountain passes better than anyone alive.\n\nThey had nothing in common except geography and desperation. The message needed to reach the capital, seven hundred kilometres east, across contested territory, through checkpoints manned by people who killed messengers on sight. \"Why us?\" Dara asked. Kael looked at the pigeon, now sleeping in a box of straw. \"Because we're what's left.\"",
      th: "นกพิราบมาถึงตอนรุ่งสาง ขนไหม้ ปีกข้างหนึ่งลาก คาเอลพบมันที่หน้าประตูโรงเรียนพังที่เขานอน กระบอกทองเหลืองผูกที่ขามีแถบกระดาษเต็มไปด้วยสัญลักษณ์ที่อ่านไม่ออก สิ่งที่อ่านออกคือตราประทับข้างล่าง — ฝ่ามือไขว้ของข้อตกลงเอโกะ สนธิสัญญาสันติภาพที่ตายไปสามสิบปี\n\nห้าคนตอบสัญญาณไฟที่เขาจุดค่ำนั้น อดีตทหารชื่อดาร่า นักแปลชื่อเยมีที่พูดเจ็ดภาษาแต่หยุดพูดหลังการปิดล้อม พ่อค้าชื่อทัลที่นำทางด้วยดาว หมอชื่ออิเฟที่มือเข้าเฝือกกระดูกหักได้ และเด็กชายชื่อเร็น อายุแค่สิบหก บอกว่ารู้จักเส้นทางภูเขาดีกว่าใครที่ยังมีชีวิต\n\nพวกเขาไม่มีอะไรร่วมกันนอกจากภูมิศาสตร์และความสิ้นหวัง ข้อความต้องถึงเมืองหลวง เจ็ดร้อยกิโลเมตรทางตะวันออก ข้ามดินแดนพิพาท ผ่านจุดตรวจที่มีคนฆ่าผู้ส่งสารทันทีที่เห็น \"ทำไมเรา?\" ดาร่าถาม คาเอลมองนกพิราบที่กำลังหลับในกล่องฟาง \"เพราะเราคือสิ่งที่เหลือ\""
    },
  },
  {
    id: "ch8-2", novelId: "8", number: 2,
    title: { en: "Crossing the Divide", th: "ข้ามเส้นแบ่ง" },
    description: { en: "The group faces warlords, deserts, and betrayal. Trust is earned one mile at a time.", th: "กลุ่มเผชิญกับขุนศึก ทะเลทราย และการทรยศ ความไว้ใจต้องได้มาทีละไมล์" },
    readingTime: 16,
    heroImage: "/plottale/covers/8-3.jpg",
    content: {
      en: "The Divide was three hundred kilometres of scorched earth between the eastern and western territories — a no-man's-land where warlords ruled villages of ash and the only law was survival. They entered it on the fourth day, disguised as a family of traders carrying bolts of cloth and dried fish.\n\nTal's navigation kept them off the main roads. Ren found water where there should have been none — hidden springs beneath dead riverbeds, moisture trapped in the roots of desert scrub. But on the eighth day, Dara disappeared. She left at midnight without a word, taking her pack and her rifle. They found her note at dawn: \"Warlord's checkpoint ahead. I'll draw them east. Keep moving.\"\n\nYemi spoke for the first time in six months that afternoon. \"She's buying us time,\" she said, her voice rusty from disuse. \"We shouldn't waste it.\" They didn't. They walked through the night, the message sealed in the brass cylinder hanging around Kael's neck, and they didn't stop until the Divide was behind them and the eastern hills rose green against the morning sky.",
      th: "เส้นแบ่งคือสามร้อยกิโลเมตรของแผ่นดินถูกเผาระหว่างดินแดนตะวันออกและตะวันตก — ดินแดนไร้เจ้าของที่ขุนศึกปกครองหมู่บ้านเถ้าถ่าน กฎหมายเดียวคือการอยู่รอด พวกเขาเข้าวันที่สี่ ปลอมเป็นครอบครัวพ่อค้าขนผ้าม้วนและปลาแห้ง\n\nการนำทางของทัลพาพวกเขาออกจากถนนหลัก เร็นหาน้ำที่ไม่ควรมี — บ่อน้ำซ่อนใต้ท้องแม่น้ำแห้ง ความชื้นขังในรากพุ่มทะเลทราย แต่วันที่แปด ดาร่าหายไป เธอออกไปเที่ยงคืนไม่พูดสักคำ เอาเป้และปืนไป พวกเขาเจอโน้ตตอนรุ่งสาง: \"จุดตรวจขุนศึกข้างหน้า ฉันจะล่อพวกเขาไปทางตะวันออก เดินต่อไป\"\n\nเยมีพูดเป็นครั้งแรกในหกเดือนบ่ายนั้น \"เธอซื้อเวลาให้เรา\" เธอพูด เสียงสนิมจากการไม่ใช้ \"เราไม่ควรเสียเปล่า\" พวกเขาไม่เสีย เดินตลอดคืน ข้อความปิดผนึกในกระบอกทองเหลืองห้อยคอคาเอล และไม่หยุดจนกว่าเส้นแบ่งอยู่ข้างหลัง เนินตะวันออกเขียวตัดท้องฟ้ายามเช้า"
    },
  },
  {
    id: "ch8-3", novelId: "8", number: 3,
    title: { en: "The Decoy", th: "ตัวล่อ" },
    description: { en: "One member sacrifices their freedom to create a diversion. The message must reach its destination.", th: "สมาชิกคนหนึ่งเสียสละอิสรภาพเพื่อสร้างการเบี่ยงเบน ข้อความต้องไปถึงจุดหมาย" },
    readingTime: 14,
    heroImage: "/plottale/covers/2-2.jpg",
    content: {
      en: "The eastern border was worse than the Divide. Here, the war wasn't a memory — it was happening. Artillery echoed through the valleys every evening, and the roads were choked with refugees moving in both directions, uncertain which side was safer. The capital was sixty kilometres away. It might as well have been on the moon.\n\nTal came up with the plan. \"They're looking for five people,\" he said, spreading a stolen military map across the floor of the barn where they'd taken shelter. \"We split. Three of us go north with a decoy message. Two go east with the real one.\" He looked at Kael. \"You and Ren take the message. You're the fastest. Yemi, Ife, and I will make enough noise to keep them busy.\"\n\n\"You'll be captured,\" Ife said quietly. Tal smiled — the first real smile any of them had seen from him. \"Then we'll be captured loudly.\" They parted at midnight. Kael looked back once and saw Tal's signal fire blooming on the northern ridge, bright enough to draw every patrol for kilometres. He turned east and ran, the brass cylinder bouncing against his chest, Ren's footsteps matching his own in the dark.",
      th: "ชายแดนตะวันออกแย่กว่าเส้นแบ่ง ที่นี่ สงครามไม่ใช่ความทรงจำ — มันกำลังเกิดขึ้น เสียงปืนใหญ่ก้องผ่านหุบเขาทุกเย็น ถนนอัดแน่นด้วยผู้ลี้ภัยเคลื่อนทั้งสองทิศ ไม่แน่ใจว่าฝั่งไหนปลอดภัยกว่า เมืองหลวงอยู่อีกหกสิบกิโลเมตร อาจจะอยู่บนดวงจันทร์ก็ได้\n\nทัลคิดแผน \"พวกเขาตามหาห้าคน\" เขาพูด กางแผนที่ทหารที่ขโมยมาบนพื้นยุ้งฉางที่หลบ \"เราแยก สามคนไปเหนือกับข้อความปลอม สองคนไปตะวันออกกับของจริง\" เขามองคาเอล \"เธอกับเร็นเอาข้อความไป เร็วที่สุด เยมี อิเฟ กับฉันจะทำเสียงดังพอให้พวกเขายุ่ง\"\n\n\"คุณจะถูกจับ\" อิเฟพูดเบาๆ ทัลยิ้ม — รอยยิ้มจริงครั้งแรกที่ใครเคยเห็นจากเขา \"งั้นเราจะถูกจับแบบดังๆ\" พวกเขาแยกเที่ยงคืน คาเอลมองกลับครั้งหนึ่ง เห็นสัญญาณไฟของทัลบานบนสันเขาเหนือ สว่างพอดึงทุกหน่วยลาดตระเวนหลายกิโลเมตร เขาหันตะวันออกและวิ่ง กระบอกทองเหลืองกระดอนกับอก เสียงฝีเท้าเร็นจังหวะเดียวกันในความมืด"
    },
  },
  {
    id: "ch8-4", novelId: "8", number: 4,
    title: { en: "Eko", th: "เอโกะ" },
    description: { en: "The message is delivered. But what it says could end the war — or start a new one entirely.", th: "ข้อความถูกส่ง แต่สิ่งที่มันบอกอาจยุติสงคราม — หรือเริ่มสงครามใหม่" },
    readingTime: 11,
    heroImage: "/plottale/covers/4-2.jpg",
    content: {
      en: "Kael placed the brass cylinder on the table of the Council Chamber and stepped back. His hands were bleeding. His boots were falling apart. Ren stood beside him, swaying on his feet, the boy's face sunburnt and hollow-eyed from five days of running through enemy territory on nothing but stream water and stolen bread.\n\nThe Council Elder — a woman with white hair and hands scarred by decades of negotiation — opened the cylinder and read the message aloud. The chamber went silent. Then the silence turned to whispers, and the whispers turned to arguments, and the arguments turned to shouts. Because the message from the western territories didn't contain a surrender or a peace offer. It contained coordinates — latitude and longitude — and a single sentence: \"Eko still lives.\"\n\nEko. The child who had been born on the day the war began, whose existence was prophesied to end the conflict. Both sides had claimed the child was dead. Both sides had used that claim to justify another decade of fighting. But the coordinates pointed to a village in the Divide — the same ruined village where Kael had found the pigeon. And the message, encoded in symbols older than either nation, was clear: the war didn't have to continue. The choice had always been theirs.",
      th: "คาเอลวางกระบอกทองเหลืองบนโต๊ะห้องสภาและถอยหลัง มือเลือดออก รองเท้าจะขาด เร็นยืนข้างเขา โยกบนเท้า ใบหน้าเด็กหนุ่มไหม้แดดและตาโหลจากห้าวันที่วิ่งผ่านดินแดนศัตรูด้วยน้ำลำธารกับขนมปังขโมย\n\nผู้อาวุโสสภา — ผู้หญิงผมขาวมือเป็นแผลเป็นจากการเจรจาหลายทศวรรษ — เปิดกระบอกและอ่านข้อความดังๆ ห้องประชุมเงียบ แล้วความเงียบกลายเป็นกระซิบ กระซิบกลายเป็นถกเถียง ถกเถียงกลายเป็นตะโกน เพราะข้อความจากดินแดนตะวันตกไม่ได้มีการยอมแพ้หรือข้อเสนอสันติภาพ มันมีพิกัด — ละติจูดและลองจิจูด — และประโยคเดียว: \"เอโกะยังอยู่\"\n\nเอโกะ เด็กที่เกิดวันที่สงครามเริ่ม ที่การมีอยู่ถูกทำนายว่าจะยุติความขัดแย้ง ทั้งสองฝ่ายอ้างว่าเด็กตายแล้ว ทั้งสองฝ่ายใช้ข้ออ้างนั้นเป็นเหตุผลรบต่ออีกทศวรรษ แต่พิกัดชี้ไปที่หมู่บ้านในเส้นแบ่ง — หมู่บ้านพังเดียวกันที่คาเอลเจอนกพิราบ และข้อความ เข้ารหัสด้วยสัญลักษณ์เก่าแก่กว่าทั้งสองชาติ ชัดเจน: สงครามไม่จำเป็นต้องดำเนินต่อ ทางเลือกเป็นของพวกเขาเสมอ"
    },
  },

  // Novel 9 — Poppie Nongena
  {
    id: "ch9-1", novelId: "9", number: 1,
    title: { en: "The First Removal", th: "การอพยพครั้งแรก" },
    description: { en: "Poppie's family is torn from their home. She carries her children through dust and silence.", th: "ครอบครัวของป๊อปปี้ถูกพรากจากบ้าน เธออุ้มลูกฝ่าฝุ่นและความเงียบ" },
    readingTime: 15,
    heroImage: "/plottale/covers/9-2.jpg",
    epigraph: { en: "They can move your body. They cannot move your soul.", th: "พวกเขาย้ายร่างกายคุณได้ แต่ย้ายวิญญาณไม่ได้" },
    content: {
      en: "They came at dawn with a government truck and a piece of paper. Poppie was hanging laundry — her husband's work shirt, the children's school uniforms, the tablecloth her mother had sewn for her wedding. A man in a brown suit read from the paper without looking at her. Words like \"relocation\" and \"designated area\" and \"compliance required.\" Words that meant: you no longer belong here.\n\nShe had three hours. Three hours to pack a life into boxes that wouldn't fit on the truck. The children clung to her skirt — Bonsile, the eldest, trying to be brave; Thandi, the middle one, crying without sound; baby Nomsa, too young to understand, chewing on a wooden spoon. Poppie wrapped the tablecloth around the photographs and the Bible and her mother's recipe book. Everything else she left standing, as if the house itself might follow them.\n\nThe truck drove for six hours through red dust to a place that had no name on any map. Rows of tin shacks stretched across flat, treeless earth. No running water. No school. No church. Poppie set Nomsa on her hip, took Bonsile's hand, and walked to the nearest shack. She would build a home here. She had done it before. She would do it as many times as they made her.",
      th: "พวกเขามาตอนรุ่งสางพร้อมรถบรรทุกของรัฐและกระดาษแผ่นหนึ่ง ป๊อปปี้กำลังตากผ้า — เสื้อทำงานสามี ชุดนักเรียนลูกๆ ผ้าปูโต๊ะที่แม่เย็บให้วันแต่งงาน ชายในสูทสีน้ำตาลอ่านจากกระดาษโดยไม่มองเธอ คำอย่าง \"ย้ายที่อยู่\" และ \"พื้นที่กำหนด\" และ \"ต้องปฏิบัติตาม\" คำที่แปลว่า: คุณไม่ได้เป็นของที่นี่อีกแล้ว\n\nเธอมีสามชั่วโมง สามชั่วโมงเพื่อบรรจุชีวิตลงกล่องที่ไม่พอใส่บนรถ ลูกๆ เกาะกระโปรง — บอนสิเล คนโต พยายามกล้า ทันดี คนกลาง ร้องไห้ไม่มีเสียง เบบี้นอมซ่า เด็กเกินจะเข้าใจ เคี้ยวช้อนไม้ ป๊อปปี้ห่อผ้าปูโต๊ะรอบรูปถ่าย พระคัมภีร์ และหนังสือสูตรอาหารของแม่ นอกนั้นเธอทิ้งไว้ ราวกับบ้านเองจะตามมา\n\nรถขับหกชั่วโมงผ่านฝุ่นแดงไปที่ที่ไม่มีชื่อบนแผนที่ แถวกระท่อมสังกะสีทอดยาวข้ามที่ราบไม่มีต้นไม้ ไม่มีน้ำประปา ไม่มีโรงเรียน ไม่มีโบสถ์ ป๊อปปี้วางนอมซ่าบนสะโพก จับมือบอนสิเล เดินไปกระท่อมใกล้สุด เธอจะสร้างบ้านที่นี่ เธอเคยทำมาก่อน เธอจะทำกี่ครั้งก็ได้ที่พวกเขาบังคับ"
    },
  },
  {
    id: "ch9-2", novelId: "9", number: 2,
    title: { en: "The Pass Book", th: "สมุดผ่านทาง" },
    description: { en: "Without the right papers, Poppie is invisible. She fights the system with patience and dignity.", th: "ไม่มีเอกสารที่ถูกต้อง ป๊อปปี้เป็นคนล่องหน เธอต่อสู้กับระบบด้วยความอดทนและศักดิ์ศรี" },
    readingTime: 13,
    heroImage: "/plottale/covers/3-2.jpg",
    content: {
      en: "The pass book was a small brown booklet that determined everything — where you could live, where you could work, whether you existed at all in the eyes of the state. Poppie's pass book had a stamp that said \"Section 10\" — a designation that meant she was allowed to stay in the area only as long as her husband was employed there. When he lost his job, the stamp became a death sentence for her presence.\n\nShe went to the office seven times. Seven times she sat on the wooden bench outside the door, Nomsa on her lap, and waited. The first time, they told her to come back with different forms. The second time, the official was at lunch. The third, fourth, and fifth times, she was told the system was down. The sixth time, a clerk looked at her pass book, shook his head, and said, \"There's nothing I can do.\" The seventh time, she brought the forms, the letters, and every document she owned, arranged in a manila folder with handwritten tabs.\n\nThe official stared at the folder. No one had ever organized their paperwork this thoroughly. He stamped her book — not with the permanent endorsement she needed, but with a temporary extension. Three months. Poppie took it. Three months was three months more than nothing.",
      th: "สมุดผ่านทางเป็นสมุดสีน้ำตาลเล็กๆ ที่กำหนดทุกอย่าง — อยู่ไหนได้ ทำงานไหนได้ มีตัวตนหรือไม่ในสายตาของรัฐ สมุดของป๊อปปี้มีตราประทับ \"มาตรา 10\" — หมายความว่าเธออยู่ในพื้นที่ได้ตราบใดที่สามีมีงาน เมื่อเขาตกงาน ตราประทับกลายเป็นโทษประหารสำหรับการมีอยู่ของเธอ\n\nเธอไปสำนักงานเจ็ดครั้ง เจ็ดครั้งที่เธอนั่งบนม้านั่งไม้หน้าประตู นอมซ่าบนตัก และรอ ครั้งแรกพวกเขาบอกให้กลับมาพร้อมแบบฟอร์มอื่น ครั้งที่สองเจ้าหน้าที่ไปกินข้าว ครั้งที่สาม สี่ และห้า ถูกบอกว่าระบบล่ม ครั้งที่หก เสมียนดูสมุดผ่านทาง ส่ายหัว พูดว่า \"ทำอะไรไม่ได้\" ครั้งที่เจ็ด เธอนำแบบฟอร์ม จดหมาย และเอกสารทุกฉบับที่มี จัดในแฟ้มมะนิลาพร้อมแท็บเขียนมือ\n\nเจ้าหน้าที่จ้องแฟ้ม ไม่เคยมีใครจัดเอกสารละเอียดขนาดนี้ เขาประทับตราสมุด — ไม่ใช่การรับรองถาวรที่เธอต้องการ แต่ขยายเวลาชั่วคราว สามเดือน ป๊อปปี้รับมัน สามเดือนก็สามเดือนมากกว่าไม่มีอะไร"
    },
  },
  {
    id: "ch9-3", novelId: "9", number: 3,
    title: { en: "Breaking Point", th: "จุดแตกหัก" },
    description: { en: "Her eldest son disappears. The community rallies, but Poppie's strength is tested beyond limit.", th: "ลูกชายคนโตหายไป ชุมชนรวมตัว แต่ความแข็งแกร่งของป๊อปปี้ถูกทดสอบเกินขีดจำกัด" },
    readingTime: 14,
    heroImage: "/plottale/covers/6-2.jpg",
    content: {
      en: "Bonsile didn't come home on a Thursday. He was seventeen, old enough to work, old enough to be detained, old enough to disappear. Poppie walked to the police station, the factory, the hospital, the school, the homes of every friend and neighbour she could think of. No one had seen him. No one would say his name.\n\nThe community gathered that evening in the church — thirty-seven people crammed into a room built for twenty, their faces lit by candles because the electricity had been cut again. They prayed. They planned. They divided the search into grids and assigned teams. Mrs. Dlamini, who had lost two sons already, held Poppie's hands and said nothing, because there were no words for this particular geography of grief.\n\nOn the seventh day, Bonsile walked through the door. He was thinner. There were bruises on his wrists and a silence in his eyes that hadn't been there before. He didn't say where he'd been, and Poppie didn't ask — not because she didn't want to know, but because she understood that some stories need time before they can be told. She fed him. She held him. And in the dark of the kitchen, where no one could see, she allowed herself to break — just for a moment — before she put herself back together.",
      th: "บอนสิเลไม่กลับบ้านวันพฤหัส เขาสิบเจ็ด แก่พอทำงาน แก่พอถูกกักตัว แก่พอหายไป ป๊อปปี้เดินไปสถานีตำรวจ โรงงาน โรงพยาบาล โรงเรียน บ้านเพื่อนและเพื่อนบ้านทุกคนที่นึกออก ไม่มีใครเห็นเขา ไม่มีใครยอมเอ่ยชื่อ\n\nชุมชนรวมตัวค่ำนั้นในโบสถ์ — สามสิบเจ็ดคนยัดในห้องที่สร้างสำหรับยี่สิบ ใบหน้าส่องด้วยเทียนเพราะไฟฟ้าถูกตัดอีกแล้ว พวกเขาสวดมนต์ วางแผน แบ่งพื้นที่ค้นหาเป็นกริดและมอบหมายทีม นางดลามินี ที่สูญเสียลูกชายสองคนแล้ว จับมือป๊อปปี้และไม่พูดอะไร เพราะไม่มีคำสำหรับภูมิศาสตร์ของความโศกเศร้านี้\n\nวันที่เจ็ด บอนสิเลเดินเข้าประตู ผอมลง มีรอยช้ำที่ข้อมือ และความเงียบในดวงตาที่ไม่เคยมีมาก่อน เขาไม่บอกว่าไปไหน ป๊อปปี้ไม่ถาม — ไม่ใช่เพราะไม่อยากรู้ แต่เพราะเข้าใจว่าบางเรื่องต้องการเวลาก่อนจะเล่าได้ เธอให้เขากิน เธออุ้มเขา และในความมืดของครัว ที่ไม่มีใครเห็น เธอยอมให้ตัวเองแตกหัก — แค่ชั่วขณะ — ก่อนจะประกอบตัวเองกลับ"
    },
  },
  {
    id: "ch9-4", novelId: "9", number: 4,
    title: { en: "The Heartbeat", th: "หัวใจเต้น" },
    description: { en: "Decades later, Poppie's story becomes the conscience of a nation. Her spirit endures.", th: "หลายทศวรรษต่อมา เรื่องราวของป๊อปปี้กลายเป็นจิตสำนึกของชาติ วิญญาณเธอยังอยู่" },
    readingTime: 10,
    heroImage: "/plottale/covers/8-2.jpg",
    content: {
      en: "Forty years later, a journalist found Poppie sitting in a garden that hadn't existed when she first arrived at the settlement. She had planted it herself — roses along the fence, vegetables in neat rows, a lemon tree that gave shade to the bench where she sat every afternoon and watched her grandchildren play.\n\n\"Tell me your story,\" the journalist said. Poppie looked at her hands — scarred, weathered, still strong. \"Which one?\" she asked. \"I have many. The removals, the papers, the searching, the rebuilding. But they are all the same story, really. They are all the story of staying when they want you to go.\"\n\nThe interview became a book. The book became a movement. Poppie's words — quiet, precise, unadorned — cut through decades of political rhetoric and touched something universal. She never raised her voice. She never asked for pity. She simply told the truth about what it means to love a home you're not allowed to keep, and to keep loving it anyway. The lemon tree grew. The garden flourished. And Poppie's heartbeat — steady, stubborn, unbreakable — became the rhythm of a nation learning to listen.",
      th: "สี่สิบปีต่อมา นักข่าวพบป๊อปปี้นั่งอยู่ในสวนที่ไม่มีอยู่เมื่อเธอมาถึงชุมชนครั้งแรก เธอปลูกมันเอง — กุหลาบริมรั้ว ผักเป็นแถวเรียบ ต้นมะนาวที่ให้ร่มเงาม้านั่งที่เธอนั่งทุกบ่ายดูหลานเล่น\n\n\"เล่าเรื่องของคุณให้ฟังหน่อย\" นักข่าวพูด ป๊อปปี้มองมือตัวเอง — เป็นแผล ผ่านร้อนผ่านหนาว ยังแข็งแรง \"เรื่องไหน?\" เธอถาม \"ฉันมีหลายเรื่อง การอพยพ เอกสาร การค้นหา การสร้างใหม่ แต่ทุกเรื่องเหมือนกัน จริงๆ แล้ว ทุกเรื่องคือเรื่องของการอยู่เมื่อพวกเขาต้องการให้ไป\"\n\nบทสัมภาษณ์กลายเป็นหนังสือ หนังสือกลายเป็นขบวนการ คำพูดของป๊อปปี้ — เงียบ แม่นยำ ไม่มีเครื่องประดับ — ตัดผ่านวาทกรรมการเมืองหลายทศวรรษ สัมผัสบางอย่างที่เป็นสากล เธอไม่เคยเพิ่มเสียง ไม่เคยขอความสงสาร เธอแค่บอกความจริงว่าการรักบ้านที่ไม่ได้รับอนุญาตให้เก็บเป็นอย่างไร และการรักมันต่อไปอยู่ดี ต้นมะนาวโต สวนเบ่งบาน และหัวใจของป๊อปปี้ — มั่นคง ดื้อรั้น ไม่มีวันหัก — กลายเป็นจังหวะของชาติที่กำลังเรียนรู้ที่จะฟัง"
    },
  },

  // Novel 10 — Ethereal
  {
    id: "ch10-1", novelId: "10", number: 1,
    title: { en: "The Ancient Tree", th: "ต้นไม้โบราณ" },
    description: { en: "Dr. Sorn discovers a tree that pulses with light. When she touches it, she sees a memory — her own death.", th: "ดร.ซอร์นค้นพบต้นไม้ที่เต้นเป็นจังหวะด้วยแสง เมื่อเธอสัมผัส เธอเห็นความทรงจำ — การตายของเธอเอง" },
    readingTime: 14,
    heroImage: "/plottale/covers/10-2.jpg",
    epigraph: { en: "A forest remembers everything. The question is whether you want to remember too.", th: "ป่าจดจำทุกอย่าง คำถามคือคุณต้องการจดจำด้วยหรือเปล่า" },
    content: {
      en: "Dr. Sorn found the tree on the thirty-seventh day of her survey, deep in a forest that cartographers had labeled \"unmapped\" for six hundred years. It stood in a clearing where no clearing should have been — enormous, its trunk wider than her research tent, its bark the colour of moonlight. And it pulsed. A slow, rhythmic luminescence that moved through the wood like a heartbeat.\n\nShe documented everything before she touched it. Soil samples, bark scrapings, photographs from every angle. The scientist in her demanded evidence. The pulse frequency was 72 beats per minute — the same as a resting human heart. The light spectrum matched no known bioluminescence. The roots, visible where they broke the soil surface, extended in every direction like neural pathways.\n\nWhen she finally pressed her palm against the bark, the world vanished. She saw a hospital room — white walls, machines beeping, her own face on the pillow, older, thinner, eyes closed. She saw her own hands, lined with age, folded on a blue blanket. She saw the monitor flatline. Then the forest rushed back, and she was on her knees in the moss, gasping, her hand still pressed against a tree that had just shown her how she would die.",
      th: "ดร.ซอร์นพบต้นไม้ในวันที่สามสิบเจ็ดของการสำรวจ ลึกในป่าที่นักทำแผนที่ระบุว่า \"ยังไม่ได้ทำแผนที่\" มาหกร้อยปี มันยืนอยู่ในที่โล่งที่ไม่ควรมี — มหึมา ลำต้นกว้างกว่าเต็นท์วิจัย เปลือกสีแสงจันทร์ และมันเต้น การเรืองแสงช้าเป็นจังหวะเคลื่อนผ่านเนื้อไม้เหมือนหัวใจเต้น\n\nเธอบันทึกทุกอย่างก่อนสัมผัส ตัวอย่างดิน ขูดเปลือก ถ่ายรูปทุกมุม นักวิทยาศาสตร์ในตัวเรียกร้องหลักฐาน ความถี่การเต้น 72 ครั้งต่อนาที — เท่ากับหัวใจมนุษย์ขณะพัก สเปกตรัมแสงไม่ตรงกับการเรืองแสงชีวภาพที่รู้จัก ราก ที่เห็นตรงที่โผล่ผิวดิน ทอดไปทุกทิศเหมือนเส้นทางประสาท\n\nเมื่อเธอแนบฝ่ามือกับเปลือกในที่สุด โลกหายไป เธอเห็นห้องโรงพยาบาล — ผนังขาว เครื่องจักรส่งเสียง ใบหน้าตัวเองบนหมอน แก่กว่า ผอมกว่า ตาปิด เธอเห็นมือตัวเอง มีรอยย่นของวัย พับอยู่บนผ้าห่มสีน้ำเงิน เธอเห็นจอมอนิเตอร์เป็นเส้นตรง แล้วป่ากลับมา เธออยู่บนเข่าในมอส หอบ มือยังแนบกับต้นไม้ที่เพิ่งให้เห็นว่าเธอจะตายอย่างไร"
    },
  },
  {
    id: "ch10-2", novelId: "10", number: 2,
    title: { en: "The Memory Garden", th: "สวนความทรงจำ" },
    description: { en: "The forest floor is alive with stored memories. Each root holds someone's forgotten past.", th: "พื้นป่ามีชีวิตด้วยความทรงจำที่เก็บไว้ รากแต่ละเส้นเก็บอดีตที่ถูกลืมของใครบางคน" },
    readingTime: 12,
    heroImage: "/plottale/covers/10-3.jpg",
    content: {
      en: "Sorn spent a week mapping the root system. Each root, when touched, released a different memory — not hers, but someone's. A child learning to swim in a warm sea. An old man watching snow fall on a city he would never visit again. A woman singing a lullaby in a language Sorn didn't recognize but somehow understood.\n\nThe memories were stored in the wood itself, encoded in patterns of light that pulsed through the grain like data through fibre optic cable. The tree was a library. A living, breathing archive of human experience, collecting memories from everyone who had ever walked through this forest — which, given its age, could mean thousands of lives, centuries of accumulated remembering.\n\nBut some roots were dark. Sorn touched one and felt nothing — a void where a memory should have been, an absence so complete it made her teeth ache. She dug carefully around it and found that the dark roots were dead, their wood grey and brittle. Whatever memories they'd held had decayed. The tree was dying, slowly, from the roots up. And as its roots died, the memories they carried would be lost forever.",
      th: "ซอร์นใช้สัปดาห์ทำแผนที่ระบบราก รากแต่ละเส้นเมื่อสัมผัสจะปล่อยความทรงจำต่างกัน — ไม่ใช่ของเธอ แต่ของใครบางคน เด็กเรียนว่ายน้ำในทะเลอุ่น ชายแก่ดูหิมะตกบนเมืองที่จะไม่มีวันไปอีก ผู้หญิงร้องเพลงกล่อมในภาษาที่ซอร์นไม่รู้จักแต่เข้าใจยังไงก็ไม่รู้\n\nความทรงจำถูกเก็บในเนื้อไม้ เข้ารหัสเป็นรูปแบบแสงที่เต้นผ่านลายไม้เหมือนข้อมูลผ่านไฟเบอร์ออพติก ต้นไม้คือห้องสมุด คลังเก็บประสบการณ์มนุษย์ที่มีชีวิตหายใจ สะสมความทรงจำจากทุกคนที่เคยเดินผ่านป่า — ซึ่งเมื่อดูอายุ อาจหมายถึงหลายพันชีวิต หลายศตวรรษของการจดจำสะสม\n\nแต่บางรากมืด ซอร์นสัมผัสหนึ่งและไม่รู้สึกอะไร — ช่องว่างที่ควรมีความทรงจำ การหายไปสมบูรณ์จนฟันเจ็บ เธอขุดรอบมันอย่างระวังพบว่ารากมืดตายแล้ว เนื้อไม้เทาเปราะ ความทรงจำที่เคยเก็บผุพังแล้ว ต้นไม้กำลังตาย ช้าๆ จากรากขึ้น และเมื่อรากตาย ความทรงจำที่พวกมันแบกจะสูญหายตลอดกาล"
    },
  },
  {
    id: "ch10-3", novelId: "10", number: 3,
    title: { en: "Convergence", th: "การบรรจบ" },
    description: { en: "Past, present, and future merge inside the tree. Sorn must decide which timeline is real.", th: "อดีต ปัจจุบัน และอนาคตรวมกันในต้นไม้ ซอร์นต้องตัดสินใจว่าไทม์ไลน์ไหนเป็นจริง" },
    readingTime: 13,
    heroImage: "/plottale/covers/4-3.jpg",
    content: {
      en: "On the fifteenth day, Sorn climbed inside the tree. A hollow in the trunk, hidden behind a curtain of hanging moss, led to an interior chamber large enough to stand in. The walls pulsed with light — not the slow heartbeat of the exterior, but a rapid, chaotic flickering, as if every memory in the tree was firing at once.\n\nShe touched the inner wall, and time collapsed. She was simultaneously in three places: the forest clearing in the present, the hospital bed from her vision of the future, and a third place — a childhood kitchen, sunlight through yellow curtains, her grandmother teaching her the names of plants. Past, present, and future, layered on top of each other like transparent pages of a book.\n\nThe tree was trying to tell her something. The convergence wasn't random — it was a message, encoded in the overlap of timelines. Her grandmother's voice, clear as day: \"Everything that grows must eventually fall. But the seeds remain.\" The hospital monitor beeped. The tree pulsed. And Sorn understood: the tree wasn't just storing memories. It was choosing which ones to save.",
      th: "วันที่สิบห้า ซอร์นปีนเข้าไปในต้นไม้ โพรงในลำต้น ซ่อนหลังม่านมอสห้อย นำไปสู่ห้องด้านในใหญ่พอยืนได้ ผนังเต้นด้วยแสง — ไม่ใช่หัวใจเต้นช้าของภายนอก แต่กะพริบเร็วสับสน ราวกับทุกความทรงจำในต้นไม้ยิงพร้อมกัน\n\nเธอสัมผัสผนังด้านใน เวลาพังทลาย เธออยู่สามที่พร้อมกัน: ที่โล่งในป่าปัจจุบัน เตียงโรงพยาบาลจากนิมิตอนาคต และที่สาม — ครัวในวัยเด็ก แสงแดดผ่านม่านเหลือง ย่าสอนชื่อพืช อดีต ปัจจุบัน และอนาคต ซ้อนกันเหมือนหน้ากระดาษโปร่งใสของหนังสือ\n\nต้นไม้พยายามบอกอะไรเธอ การบรรจบไม่ใช่สุ่ม — มันเป็นข้อความ เข้ารหัสในจุดทับซ้อนของไทม์ไลน์ เสียงย่า ชัดเจนเหมือนกลางวัน: \"ทุกอย่างที่เติบโตต้องล้มในที่สุด แต่เมล็ดพันธุ์ยังอยู่\" จอมอนิเตอร์โรงพยาบาลดัง ต้นไม้เต้น และซอร์นเข้าใจ: ต้นไม้ไม่ได้แค่เก็บความทรงจำ มันกำลังเลือกว่าจะรักษาอันไหน"
    },
  },
  {
    id: "ch10-4", novelId: "10", number: 4,
    title: { en: "Roots", th: "ราก" },
    description: { en: "To save the tree is to accept her fate. To destroy it is to erase every memory it holds.", th: "การรักษาต้นไม้คือการยอมรับชะตากรรม การทำลายมันคือการลบทุกความทรงจำ" },
    readingTime: 9,
    heroImage: "/plottale/covers/7-2.jpg",
    content: {
      en: "The logging company arrived on the twentieth day. Sorn had known they were coming — the tree had shown her that too, tucked between memories of medieval festivals and a grandmother's lullaby. Twenty men with chainsaws, a government permit, and orders to clear the forest for a highway extension.\n\nShe stood between them and the tree with her research notes, her university credentials, and a conviction that felt more like prayer than science. \"This tree contains irreplaceable data,\" she told the foreman. He looked at her, then at the tree, then at his watch. \"Lady, it's a tree.\" But it wasn't. It was a thousand lives, ten thousand memories, a century of human experience encoded in living wood.\n\nThe compromise came at dusk. Sorn would have six months to study the tree and publish her findings. The highway would route around the clearing, adding cost but preserving the site. She signed the papers and pressed her palm to the bark one last time. The tree showed her the hospital bed again — but this time, on the nightstand beside her, there was a book. Her book. \"Ethereal: The Memory Tree.\" And on the dedication page, in her own handwriting: \"For everyone whose story deserves to be remembered.\" She smiled, and let the future come.",
      th: "บริษัทตัดไม้มาถึงวันที่ยี่สิบ ซอร์นรู้ว่าพวกเขาจะมา — ต้นไม้ให้เห็นเรื่องนั้นด้วย แทรกระหว่างความทรงจำของเทศกาลยุคกลางกับเพลงกล่อมของย่า ยี่สิบคนพร้อมเลื่อยยนต์ ใบอนุญาตรัฐบาล และคำสั่งถางป่าสำหรับต่อทางหลวง\n\nเธอยืนระหว่างพวกเขากับต้นไม้ พร้อมบันทึกวิจัย ใบรับรองมหาวิทยาลัย และความเชื่อมั่นที่รู้สึกเหมือนคำอธิษฐานมากกว่าวิทยาศาสตร์ \"ต้นไม้นี้มีข้อมูลที่ทดแทนไม่ได้\" เธอบอกหัวหน้าคนงาน เขามองเธอ แล้วมองต้นไม้ แล้วมองนาฬิกา \"คุณนาย มันเป็นแค่ต้นไม้\" แต่มันไม่ใช่ มันคือพันชีวิต หมื่นความทรงจำ ศตวรรษของประสบการณ์มนุษย์เข้ารหัสในเนื้อไม้มีชีวิต\n\nข้อตกลงมาตอนย่ำค่ำ ซอร์นมีหกเดือนศึกษาต้นไม้และตีพิมพ์ผลงาน ทางหลวงจะอ้อมที่โล่ง เพิ่มต้นทุนแต่รักษาพื้นที่ เธอเซ็นเอกสารแล้วแนบฝ่ามือกับเปลือกครั้งสุดท้าย ต้นไม้ให้เห็นเตียงโรงพยาบาลอีกครั้ง — แต่คราวนี้ บนโต๊ะข้างเตียง มีหนังสือ หนังสือของเธอ \"อีเธอเรียล: ต้นไม้แห่งความทรงจำ\" และบนหน้าอุทิศ ลายมือเธอเอง: \"สำหรับทุกคนที่เรื่องราวสมควรถูกจดจำ\" เธอยิ้ม และปล่อยให้อนาคตมา"
    },
  },

  // Novel 11 — River of a Thousand Windows
  {
    id: "ch11-1", novelId: "11", number: 1,
    title: { en: "Paper Lanterns", th: "โคมกระดาษ" },
    description: { en: "Three siblings find their mother's trail — paper lanterns floating down a forgotten river.", th: "พี่น้องสามคนพบรอยทางของแม่ — โคมกระดาษลอยไปตามแม่น้ำที่ถูกลืม" },
    readingTime: 13,
    heroImage: "/plottale/covers/11-2.jpg",
    epigraph: { en: "Follow the light on the water. It knows the way home even when you don't.", th: "ตามแสงบนน้ำ มันรู้ทางกลับบ้านแม้เมื่อคุณไม่รู้" },
    content: {
      en: "The first lantern appeared on Mei's birthday. It drifted past the dock where the three of them sat — Mei, Jun, and little Hana — glowing amber against the dark water. Inside, where a candle should have been, a folded note read: \"I am upstream. Follow the light.\"\n\nTheir mother had been gone for two years. She'd left on a morning when the fog was so thick you couldn't see the river, and she'd taken nothing with her — not her coat, not her shoes, not the locket with their photographs inside. The police had searched. The village had searched. Everyone had given up except the children, who still set a place for her at dinner every night.\n\nThe second lantern arrived the next evening, then a third the night after. Each one carried a note in their mother's handwriting, each one a fragment of a story that didn't make sense: \"The river remembers.\" \"The windows show what was.\" \"I am keeping something safe.\" Jun built a raft from driftwood. Mei packed food and blankets. Hana, who was eight and believed in everything, collected every lantern and stored them in a basket. At dawn, they pushed off from the dock and followed the light upstream.",
      th: "โคมแรกปรากฏวันเกิดเหม่ย มันลอยผ่านท่าเทียบเรือที่ทั้งสามคนนั่ง — เหม่ย จุน และน้องฮานะ — เรืองแสงอำพันตัดน้ำมืด ข้างใน ที่ควรมีเทียน มีโน้ตพับ: \"แม่อยู่ต้นน้ำ ตามแสงมา\"\n\nแม่หายไปสองปีแล้ว เธอจากไปเช้าที่หมอกหนาจนมองไม่เห็นแม่น้ำ ไม่เอาอะไรติดตัว — ไม่เอาเสื้อโค้ท ไม่เอารองเท้า ไม่เอาล็อกเก็ตที่มีรูปถ่ายพวกเขา ตำรวจค้นแล้ว หมู่บ้านค้นแล้ว ทุกคนยอมแพ้ยกเว้นเด็กๆ ที่ยังตั้งจานให้แม่ทุกมื้อเย็น\n\nโคมที่สองมาเย็นถัดมา แล้วที่สามคืนถัดไป แต่ละอันมีโน้ตลายมือแม่ แต่ละอันเป็นเศษเรื่องที่ไม่สมเหตุสมผล: \"แม่น้ำจดจำ\" \"หน้าต่างแสดงสิ่งที่เคยเป็น\" \"แม่เก็บบางอย่างไว้ให้ปลอดภัย\" จุนสร้างแพจากไม้ลอยน้ำ เหม่ยเตรียมอาหารและผ้าห่ม ฮานะ แปดขวบ เชื่อทุกอย่าง เก็บทุกโคมใส่ตะกร้า ตอนรุ่งสาง พวกเขาถอยจากท่าและตามแสงขึ้นต้นน้ำ"
    },
  },
  {
    id: "ch11-2", novelId: "11", number: 2,
    title: { en: "The Jungle River", th: "แม่น้ำในป่า" },
    description: { en: "The river leads through a jungle of impossible creatures. Each bend reveals a new danger.", th: "แม่น้ำนำผ่านป่าดงดิบแห่งสัตว์ประหลาด ทุกโค้งเผยอันตรายใหม่" },
    readingTime: 15,
    heroImage: "/plottale/covers/11-3.jpg",
    content: {
      en: "Past the last village, the river narrowed and the jungle closed in overhead like a green cathedral. Vines hung thick as ship ropes. Flowers bloomed in colours that had no names — not red, not purple, but something in between that made your eyes water if you looked too long. The air hummed with insects that Mei, who knew every species in the regional guidebook, had never seen before.\n\nOn the second day, they saw the first impossible creature — a fish with feathers, swimming alongside their raft with bright curious eyes. On the third day, a butterfly the size of a dinner plate landed on Hana's shoulder and stayed for three hours, its wings patterned with what looked like a map. On the fourth day, the trees began to whisper — not with wind, but with voices, fragments of conversations in languages the children almost understood.\n\nJun wanted to turn back. \"This isn't natural,\" he said, gripping the oar until his knuckles whitened. But the lanterns kept coming, one each evening, each note drawing them deeper: \"You're close now.\" \"Don't be afraid of what you see.\" \"The river protects those who trust it.\" Hana held up the butterfly-map to the moonlight and pointed. \"There,\" she said. \"Around the next bend.\" And around the next bend, the jungle opened, and they saw the village.",
      th: "ผ่านหมู่บ้านสุดท้าย แม่น้ำแคบลงและป่าปิดเหนือหัวเหมือนวิหารเขียว เถาวัลย์หนาเท่าเชือกเรือ ดอกไม้บานเป็นสีที่ไม่มีชื่อ — ไม่แดง ไม่ม่วง แต่บางอย่างตรงกลางที่ทำให้น้ำตาไหลถ้ามองนาน อากาศหึ่งด้วยแมลงที่เหม่ย ผู้รู้จักทุกสายพันธุ์ในหนังสือนำเที่ยว ไม่เคยเห็น\n\nวันที่สอง พวกเขาเห็นสิ่งมีชีวิตเป็นไปไม่ได้ตัวแรก — ปลามีขนนก ว่ายข้างแพด้วยตาสดใสอยากรู้อยากเห็น วันที่สาม ผีเสื้อขนาดจานอาหารเกาะไหล่ฮานะอยู่สามชั่วโมง ปีกมีลวดลายเหมือนแผนที่ วันที่สี่ ต้นไม้เริ่มกระซิบ — ไม่ใช่ด้วยลม แต่ด้วยเสียง เศษบทสนทนาในภาษาที่เด็กๆ เกือบเข้าใจ\n\nจุนอยากกลับ \"นี่ไม่ธรรมชาติ\" เขาพูด กำพาดจนข้อนิ้วขาว แต่โคมมาเรื่อยๆ ค่ำละดวง โน้ตแต่ละอันดึงพวกเขาลึกขึ้น: \"ใกล้แล้ว\" \"อย่ากลัวสิ่งที่เห็น\" \"แม่น้ำปกป้องผู้ที่ไว้ใจ\" ฮานะยกแผนที่ผีเสื้อส่องแสงจันทร์แล้วชี้ \"ตรงนั้น\" เธอพูด \"อ้อมโค้งหน้า\" และอ้อมโค้งหน้า ป่าเปิดออก พวกเขาเห็นหมู่บ้าน"
    },
  },
  {
    id: "ch11-3", novelId: "11", number: 3,
    title: { en: "A Thousand Windows", th: "พันบาน" },
    description: { en: "They reach a village where every window shows a different version of their mother's story.", th: "พวกเขาถึงหมู่บ้านที่ทุกหน้าต่างแสดงเรื่องราวของแม่คนละเวอร์ชัน" },
    readingTime: 12,
    heroImage: "/plottale/covers/1-2.jpg",
    content: {
      en: "The village had no name, no roads, and no people — only houses. Hundreds of houses built on stilts over the water, each one with a single window that glowed from within. Hana counted them until she lost track somewhere past three hundred. Jun tied the raft to a post and they stepped onto the wooden walkway that connected the houses like a floating street.\n\nMei looked through the first window and saw their mother — young, younger than Mei had ever known her, standing in a kitchen, stirring soup, singing. The second window showed a different scene: their mother as a child, running barefoot through a rice field. The third: their mother standing at an altar, marrying a man who was not their father. Every window, a different story. Every story, their mother's.\n\n\"They're all real,\" Hana said, pressing her face to the glass of a window that showed their mother reading to them at bedtime. \"All the lives she could have lived.\" Jun shook his head. \"Not could have. Did live. Somewhere.\" And then they saw it — the last house at the end of the walkway, its window dark, its door ajar. A lantern floated from inside, carrying the final note: \"Come in. I'll explain everything.\"",
      th: "หมู่บ้านไม่มีชื่อ ไม่มีถนน ไม่มีคน — มีแต่บ้าน หลายร้อยหลังบนเสาเหนือน้ำ แต่ละหลังมีหน้าต่างบานเดียวเรืองแสงจากข้างใน ฮานะนับจนนับไม่ถูกหลังสามร้อย จุนผูกแพกับเสาและพวกเขาก้าวขึ้นทางเดินไม้ที่เชื่อมบ้านเหมือนถนนลอย\n\nเหม่ยมองผ่านหน้าต่างแรกเห็นแม่ — สาว สาวกว่าที่เหม่ยเคยรู้จัก ยืนในครัว คนซุป ร้องเพลง หน้าต่างที่สองแสดงฉากต่าง: แม่ตอนเป็นเด็ก วิ่งเท้าเปล่าในทุ่งนา ที่สาม: แม่ยืนหน้าแท่นบูชา แต่งงานกับผู้ชายที่ไม่ใช่พ่อ ทุกหน้าต่าง เรื่องต่างกัน ทุกเรื่อง เป็นของแม่\n\n\"ทั้งหมดจริง\" ฮานะพูด แนบหน้ากับกระจกหน้าต่างที่แสดงแม่อ่านนิทานให้ฟังก่อนนอน \"ทุกชีวิตที่แม่อาจมี\" จุนส่ายหัว \"ไม่ใช่อาจมี มีจริง ที่ไหนสักแห่ง\" แล้วพวกเขาเห็น — บ้านหลังสุดท้ายปลายทางเดิน หน้าต่างมืด ประตูเปิดอ้า โคมลอยจากข้างใน ถือโน้ตสุดท้าย: \"เข้ามา แม่จะอธิบายทุกอย่าง\""
    },
  },
  {
    id: "ch11-4", novelId: "11", number: 4,
    title: { en: "Home", th: "บ้าน" },
    description: { en: "The journey ends where it began. Their mother left not because she wanted to — but to protect them.", th: "การเดินทางจบที่จุดเริ่มต้น แม่ไม่ได้จากไปเพราะต้องการ — แต่เพื่อปกป้องพวกเขา" },
    readingTime: 10,
    heroImage: "/plottale/covers/5-2.jpg",
    content: {
      en: "Their mother sat cross-legged on the floor of the dark house, surrounded by paper and ink and hundreds of unlit lanterns. She looked the same — not younger, not older, not changed in any way except for her eyes, which held the quiet weight of someone who had seen too many versions of the truth.\n\n\"The river is alive,\" she said, pulling Hana into her lap while Mei and Jun sat close. \"It carries memories — not just mine, but everyone's. And two years ago, it showed me something terrible: a flood that would destroy the village, wash away every home, drown everything we loved. The only way to stop it was to come here, to the source, and feed the river enough memories to change its course.\"\n\nShe gestured at the windows glowing across the water. \"Every window is a memory I gave it. Every life I could have lived, traded to the river so it would spare the life I chose — the life with you.\" Jun took her hand. Mei pressed her face into her mother's shoulder. Hana looked up and asked, \"Can we go home now?\" Their mother smiled, the same smile from every window, and said, \"We can. The river changed course last week. The village is safe.\" They floated downstream together, the lanterns lighting their way, the river carrying them gently home.",
      th: "แม่นั่งขัดสมาธิบนพื้นบ้านมืด ล้อมด้วยกระดาษ หมึก และโคมที่ยังไม่จุดหลายร้อยดวง เธอเหมือนเดิม — ไม่สาวขึ้น ไม่แก่ลง ไม่เปลี่ยนยกเว้นดวงตาที่ถือน้ำหนักเงียบๆ ของคนที่เห็นความจริงมากเกินไป\n\n\"แม่น้ำมีชีวิต\" เธอพูด ดึงฮานะขึ้นตัก ขณะเหม่ยกับจุนนั่งใกล้ \"มันพาความทรงจำ — ไม่ใช่แค่ของแม่ แต่ของทุกคน และสองปีก่อน มันให้เห็นบางอย่างน่ากลัว: น้ำท่วมที่จะทำลายหมู่บ้าน พัดทุกบ้าน จมทุกอย่างที่เรารัก ทางเดียวที่จะหยุดคือมาที่นี่ ที่ต้นน้ำ ป้อนแม่น้ำด้วยความทรงจำมากพอให้มันเปลี่ยนเส้นทาง\"\n\nเธอชี้ไปที่หน้าต่างเรืองแสงข้ามน้ำ \"ทุกหน้าต่างคือความทรงจำที่แม่ให้มัน ทุกชีวิตที่แม่อาจมี แลกกับแม่น้ำเพื่อให้มันไว้ชีวิตที่แม่เลือก — ชีวิตกับพวกลูก\" จุนจับมือแม่ เหม่ยแนบหน้ากับไหล่ ฮานะมองขึ้นถาม \"กลับบ้านได้ยัง?\" แม่ยิ้ม รอยยิ้มเดียวกับทุกหน้าต่าง พูดว่า \"ได้แล้ว แม่น้ำเปลี่ยนเส้นทางสัปดาห์ที่แล้ว หมู่บ้านปลอดภัย\" พวกเขาลอยตามน้ำด้วยกัน โคมส่องทาง แม่น้ำพาพวกเขากลับบ้านอย่างอ่อนโยน"
    },
  },

  // Novel 12 — Stay With Me
  {
    id: "ch12-1", novelId: "12", number: 1,
    title: { en: "City Lights", th: "แสงไฟเมือง" },
    description: { en: "A photographer chases neon through empty streets. Through her lens, she sees a woman no one else can.", th: "ช่างภาพไล่ตามแสงนีออนผ่านถนนว่าง ผ่านเลนส์ เธอเห็นผู้หญิงที่ไม่มีใครเห็น" },
    readingTime: 12,
    heroImage: "/plottale/covers/12-2.jpg",
    epigraph: { en: "Some people are only visible to those who are looking for something they've lost.", th: "บางคนมองเห็นได้เฉพาะโดยผู้ที่กำลังตามหาสิ่งที่สูญเสีย" },
    content: {
      en: "Nari shot the city at 3 AM because that was when it told the truth. Neon signs reflected in rain puddles. Steam rose from subway grates like urban ghosts. The streets emptied of performance and pretense, leaving only light and shadow and the honest architecture of loneliness.\n\nShe was framing a shot of a convenience store — its blue fluorescent glow spilling across wet asphalt — when she saw the woman through the viewfinder. Standing under the store's awning, looking directly at the camera with an expression of calm recognition, as if she'd been waiting there specifically for Nari. Click. The shutter fired. When Nari lowered the camera, the woman was gone.\n\nThe photograph, developed the next morning in Nari's apartment darkroom, showed something impossible. The woman was there — solid, detailed, real — but the wall behind her was visible through her body. Not blurred. Not double-exposed. Visible. As if the woman were made of glass. Nari pinned the photograph above her desk and stared at it until dawn. The woman stared back, and for the first time in two years of shooting the empty city, Nari didn't feel alone.",
      th: "นาริถ่ายเมืองตอนตีสามเพราะนั่นคือเวลาที่มันบอกความจริง ป้ายนีออนสะท้อนในแอ่งน้ำฝน ไอน้ำลอยจากตะแกรงรถไฟใต้ดินเหมือนผีเมือง ถนนว่างจากการแสดงและการเสแสร้ง เหลือแต่แสงและเงาและสถาปัตยกรรมที่ซื่อสัตย์ของความโดดเดี่ยว\n\nเธอกำลังจัดเฟรมร้านสะดวกซื้อ — แสงฟลูออเรสเซนต์สีน้ำเงินหกบนแอสฟัลต์เปียก — เมื่อเธอเห็นผู้หญิงผ่านช่องมอง ยืนใต้กันสาดร้าน มองตรงมาที่กล้องด้วยการจดจำอันสงบ ราวกับรอที่นั่นเฉพาะสำหรับนาริ คลิก ชัตเตอร์ยิง เมื่อนาริลดกล้อง ผู้หญิงหายไป\n\nภาพถ่าย ล้างเช้าถัดมาในห้องมืดของนาริ แสดงสิ่งที่เป็นไปไม่ได้ ผู้หญิงอยู่ตรงนั้น — ชัด มีรายละเอียด จริง — แต่ผนังข้างหลังมองทะลุร่างเธอ ไม่เบลอ ไม่ถ่ายซ้อน มองเห็น ราวกับผู้หญิงทำจากแก้ว นาริปักรูปเหนือโต๊ะจ้องจนรุ่งสาง ผู้หญิงจ้องกลับ และเป็นครั้งแรกในสองปีที่ถ่ายเมืองว่างเปล่า นาริไม่รู้สึกโดดเดี่ยว"
    },
  },
  {
    id: "ch12-2", novelId: "12", number: 2,
    title: { en: "Seven Nights", th: "เจ็ดคืน" },
    description: { en: "The ghost reveals she has seven nights before she fades. Each night, they fall deeper in love.", th: "ผีเผยว่าเธอเหลือเจ็ดคืนก่อนจะจาง ทุกคืนพวกเขาตกหลุมรักลึกขึ้น" },
    readingTime: 14,
    heroImage: "/plottale/covers/2-3.jpg",
    content: {
      en: "The woman appeared again the next night, at the same convenience store, under the same awning. This time, Nari didn't shoot. She lowered the camera and said, \"Who are you?\" The woman smiled — a sad, beautiful smile that flickered at the edges like a candle in wind. \"My name is Seo-yun. I died here three years ago. And I have seven nights left before I disappear completely.\"\n\nEach night, they met. Nari would bring her camera — Seo-yun was only visible through the lens or in photographs, invisible to the naked eye — and they would walk the empty streets together. Seo-yun showed her the city as only the dead can see it: the shimmer of old conversations trapped in alley walls, the footprints of people who once walked here glowing faintly on the pavement.\n\nBy the fourth night, Nari was bringing two cups of coffee — one for herself and one she set on the ground beside Seo-yun, untouched, because ghosts can't drink coffee but the gesture mattered. By the fifth night, she was telling Seo-yun things she'd never told anyone — about her mother's death, about the loneliness that drove her to photograph empty streets, about the way love felt like something that happened to other people. \"It doesn't have to,\" Seo-yun whispered. And Nari, looking through the lens at a woman made of light and memory, believed her.",
      th: "ผู้หญิงปรากฏอีกคืนถัดมา ที่ร้านเดียวกัน ใต้กันสาดเดียวกัน คราวนี้นาริไม่ถ่าย เธอลดกล้องแล้วพูด \"คุณเป็นใคร?\" ผู้หญิงยิ้ม — รอยยิ้มเศร้าสวยที่สั่นไหวที่ขอบเหมือนเทียนในลม \"ชื่อซอยุน ฉันตายที่นี่สามปีก่อน และฉันเหลือเจ็ดคืนก่อนจะหายไปทั้งหมด\"\n\nทุกคืนพวกเธอพบกัน นาริจะเอากล้องมา — ซอยุนมองเห็นได้ผ่านเลนส์หรือในรูปถ่ายเท่านั้น ตาเปล่ามองไม่เห็น — แล้วเดินถนนว่างด้วยกัน ซอยุนให้เห็นเมืองอย่างที่คนตายเห็น: แสงวาบของบทสนทนาเก่าขังในกำแพงซอย รอยเท้าคนที่เคยเดินที่นี่เรืองจางบนทางเท้า\n\nคืนที่สี่ นาริเอากาแฟสองแก้วมา — แก้วหนึ่งของเธอ อีกแก้ววางบนพื้นข้างซอยุน ไม่ได้ดื่ม เพราะผีดื่มกาแฟไม่ได้แต่ท่าทางสำคัญ คืนที่ห้า เธอเล่าสิ่งที่ไม่เคยเล่าใคร — เรื่องแม่ตาย เรื่องความโดดเดี่ยวที่ทำให้ถ่ายถนนว่าง เรื่องที่ความรักรู้สึกเหมือนสิ่งที่เกิดกับคนอื่น \"ไม่จำเป็นต้องเป็นอย่างนั้น\" ซอยุนกระซิบ และนาริ มองผ่านเลนส์ที่ผู้หญิงที่ทำจากแสงและความทรงจำ เชื่อเธอ"
    },
  },
  {
    id: "ch12-3", novelId: "12", number: 3,
    title: { en: "Developing Room", th: "ห้องมืด" },
    description: { en: "In the darkroom, photographs reveal clues about the ghost's past life and unfinished story.", th: "ในห้องมืด ภาพถ่ายเผยเบาะแสเกี่ยวกับชีวิตก่อนของผีและเรื่องที่ยังไม่จบ" },
    readingTime: 11,
    heroImage: "/plottale/covers/6-2.jpg",
    content: {
      en: "On the sixth night, Nari developed every photograph she'd taken of Seo-yun — forty-seven frames, hung on a wire in the darkroom like a ghost's biography. In the red safe-light, she noticed something she'd missed before. The photographs, viewed in sequence, told a story. Seo-yun standing in front of locations that formed a path — a gallery, a hospital, a bridge, a small apartment building with a yellow door.\n\nSeo-yun confirmed it that night. \"Those are the places that mattered. The gallery where I had my first exhibition — I was a photographer too, Nari. The hospital where my mother died. The bridge where I used to think. And the apartment where I lived.\" She paused, her translucent form flickering. \"The apartment where I left something unfinished.\"\n\nThere was a camera in the apartment. An old film camera, loaded with an undeveloped roll. Twenty-four exposures that Seo-yun had shot in the last week of her life — images she'd never gotten to develop, stories she'd never gotten to tell. \"Develop them,\" Seo-yun said. \"That's all I need. For someone to see what I saw.\" Nari took the camera home, and in the darkroom, image by image, she met the living Seo-yun — and understood why letting go would be impossible.",
      th: "คืนที่หก นาริล้างทุกรูปที่ถ่ายซอยุน — สี่สิบเจ็ดเฟรม แขวนบนลวดในห้องมืดเหมือนชีวประวัติของผี ในแสงแดงปลอดภัย เธอสังเกตสิ่งที่พลาดไป รูปถ่ายเรียงตามลำดับเล่าเรื่อง ซอยุนยืนหน้าสถานที่ที่สร้างเส้นทาง — แกลเลอรี โรงพยาบาล สะพาน อพาร์ทเมนต์เล็กประตูเหลือง\n\nซอยุนยืนยันคืนนั้น \"เหล่านั้นคือที่สำคัญ แกลเลอรีที่ฉันจัดนิทรรศการแรก — ฉันเป็นช่างภาพเหมือนกัน นาริ โรงพยาบาลที่แม่ตาย สะพานที่ฉันเคยนั่งคิด และอพาร์ทเมนต์ที่ฉันอยู่\" เธอหยุด ร่างโปร่งแสงกะพริบ \"อพาร์ทเมนต์ที่ฉันทิ้งบางอย่างยังไม่เสร็จ\"\n\nมีกล้องในอพาร์ทเมนต์ กล้องฟิล์มเก่าใส่ฟิล์มที่ยังไม่ล้าง ยี่สิบสี่เฟรมที่ซอยุนถ่ายสัปดาห์สุดท้ายของชีวิต — ภาพที่ไม่เคยได้ล้าง เรื่องที่ไม่เคยได้เล่า \"ล้างมัน\" ซอยุนพูด \"แค่นั้นที่ต้องการ ให้มีคนเห็นสิ่งที่ฉันเห็น\" นาริเอากล้องกลับบ้าน ในห้องมืด ทีละภาพ เธอพบซอยุนตอนมีชีวิต — และเข้าใจว่าทำไมการปล่อยวางจะเป็นไปไม่ได้"
    },
  },
  {
    id: "ch12-4", novelId: "12", number: 4,
    title: { en: "Stay With Me", th: "อยู่กับฉัน" },
    description: { en: "The final night. One photograph can anchor a soul — but it means giving up the camera forever.", th: "คืนสุดท้าย ภาพถ่ายหนึ่งใบยึดวิญญาณได้ — แต่ต้องสละกล้องตลอดกาล" },
    readingTime: 9,
    heroImage: "/plottale/covers/8-3.jpg",
    content: {
      en: "The seventh night. Seo-yun stood under the awning, fainter than the first night, her edges dissolving into the neon-stained air. \"There's a way,\" she said, before Nari could speak. \"A photograph taken with genuine love can anchor a spirit. One photograph. Your last. The camera gives its light to hold me here. But it means you can never take another picture.\"\n\nNari held the camera — her mother's camera, the one she'd learned on, the one that had given her a reason to walk through the world. Photography wasn't just what she did. It was how she saw, how she connected, how she kept loneliness at bay. Giving it up meant giving up a part of herself she'd carried for twenty years.\n\nShe raised the viewfinder. Seo-yun looked at her through the glass — not with the sadness of a ghost, but with the warmth of someone who had found, at the very end, exactly what she'd been looking for. Nari pressed the shutter. The flash filled the street with white light. When it faded, Seo-yun was standing there — not through the lens, but with her own eyes, solid and real and crying. The camera went dark. Its last photograph. Nari set it gently on the ground, took Seo-yun's hand — warm, real, there — and whispered, \"Stay with me.\"",
      th: "คืนที่เจ็ด ซอยุนยืนใต้กันสาด จางกว่าคืนแรก ขอบละลายเข้ากับอากาศเปื้อนนีออน \"มีทาง\" เธอพูด ก่อนนาริจะทันพูด \"ภาพถ่ายที่ถ่ายด้วยความรักจริงสามารถยึดวิญญาณได้ หนึ่งรูป รูปสุดท้าย กล้องให้แสงของมันเพื่อรั้งฉันไว้ที่นี่ แต่หมายความว่าเธอจะถ่ายรูปอีกไม่ได้\"\n\nนาริถือกล้อง — กล้องของแม่ ที่เธอเรียนรู้ ที่ให้เหตุผลเดินผ่านโลก การถ่ายรูปไม่ใช่แค่สิ่งที่ทำ มันคือวิธีมอง วิธีเชื่อมต่อ วิธีกันความโดดเดี่ยว การสละมันหมายถึงสละส่วนหนึ่งของตัวเองที่แบกมายี่สิบปี\n\nเธอยกช่องมอง ซอยุนมองเธอผ่านกระจก — ไม่ใช่ด้วยความเศร้าของผี แต่ด้วยความอบอุ่นของคนที่พบ ในตอนจบ สิ่งที่ตามหาพอดี นาริกดชัตเตอร์ แฟลชเต็มถนนด้วยแสงขาว เมื่อจาง ซอยุนยืนอยู่ตรงนั้น — ไม่ใช่ผ่านเลนส์ แต่ด้วยตาเปล่า ชัดเจน จริง และร้องไห้ กล้องมืดลง รูปสุดท้าย นาริวางมันเบาๆ บนพื้น จับมือซอยุน — อุ่น จริง อยู่ตรงนี้ — กระซิบ \"อยู่กับฉัน\""
    },
  },

  // Novel 13 — Yuni
  {
    id: "ch13-1", novelId: "13", number: 1,
    title: { en: "Two Proposals", th: "สองข้อเสนอ" },
    description: { en: "On the same morning, two men ask for Yuni's hand. The whole town celebrates — but Yuni doesn't.", th: "เช้าวันเดียวกัน ผู้ชายสองคนขอแต่งงานยูนิ ทั้งเมืองฉลอง — แต่ยูนิไม่" },
    readingTime: 13,
    heroImage: "/plottale/covers/13-2.jpg",
    epigraph: { en: "In a town where a girl's worth is measured by her proposals, Yuni was priceless. She just didn't know it yet.", th: "ในเมืองที่คุณค่าของผู้หญิงวัดจากการถูกขอแต่งงาน ยูนิมีค่ามหาศาล เธอแค่ยังไม่รู้" },
    content: {
      en: "The first proposal arrived at 7 AM with a basket of mangoes and a letter written in careful handwriting. Pak Arman, the widowed teacher, respected, steady, the kind of man mothers prayed for. Yuni's grandmother clapped her hands and began calling the neighbours before the mangoes were even counted.\n\nThe second proposal arrived at 9 AM with a motorcycle and a gold necklace. Andi, the merchant's son, handsome, ambitious, the kind of man who smelled of cologne and certainty. Yuni's mother dropped the broom she was holding and sat down heavily on the front step, overwhelmed by the mathematics of good fortune: two proposals in one morning meant her daughter was twice blessed.\n\nYuni sat in her room, her chemistry textbook open on her lap, and listened to the celebration happening without her. She was seventeen. She had the highest grades in the district. She had read every book in the school library, including the ones the librarian kept on the top shelf because nobody ever asked for them. She wanted to study chemistry at university, to understand how things combined and separated and transformed. She did not want to be a basket of mangoes or a gold necklace. She wanted to be a formula that hadn't been solved yet.",
      th: "ข้อเสนอแรกมาถึงตอนเจ็ดโมงพร้อมตะกร้ามะม่วงและจดหมายเขียนด้วยลายมือประณีต ปักอาร์มัน ครูหม้าย น่านับถือ มั่นคง ผู้ชายแบบที่แม่ๆ อธิษฐานขอ ย่าของยูนิตบมือแล้วเริ่มเรียกเพื่อนบ้านก่อนจะนับมะม่วงเสร็จด้วยซ้ำ\n\nข้อเสนอที่สองมาเก้าโมงพร้อมมอเตอร์ไซค์และสร้อยทอง อันดี ลูกพ่อค้า หล่อ ทะเยอทะยาน ผู้ชายแบบที่มีกลิ่นน้ำหอมและความมั่นใจ แม่ยูนิทำไม้กวาดหล่น นั่งทรุดที่บันไดหน้าบ้าน ตื้นตันกับคณิตศาสตร์ของโชคดี: สองข้อเสนอในเช้าเดียวหมายความว่าลูกสาวได้รับพรสองเท่า\n\nยูนินั่งในห้อง ตำราเคมีเปิดบนตัก ฟังการฉลองที่เกิดขึ้นโดยไม่มีเธอ เธอสิบเจ็ด เกรดสูงสุดในอำเภอ อ่านทุกเล่มในห้องสมุดโรงเรียน รวมถึงเล่มที่บรรณารักษ์เก็บบนชั้นบนสุดเพราะไม่มีใครถามหา เธอต้องการเรียนเคมีที่มหาวิทยาลัย เข้าใจว่าสิ่งต่างๆ รวมกันและแยกจากกันและเปลี่ยนแปลงอย่างไร เธอไม่ต้องการเป็นตะกร้ามะม่วงหรือสร้อยทอง เธอต้องการเป็นสูตรที่ยังไม่มีคนแก้"
    },
  },
  {
    id: "ch13-2", novelId: "13", number: 2,
    title: { en: "The Scholarship", th: "ทุนการศึกษา" },
    description: { en: "A university scholarship arrives. Yuni sees a door to a life she's only read about in books.", th: "ทุนมหาวิทยาลัยมาถึง ยูนิเห็นประตูสู่ชีวิตที่เธอเคยอ่านแค่ในหนังสือ" },
    readingTime: 11,
    heroImage: "/plottale/covers/13-3.jpg",
    content: {
      en: "The letter came from the capital — thick cream paper with a university seal embossed in blue and gold. Full scholarship. Tuition, housing, books, laboratory fees. Yuni read it three times in the bathroom, sitting on the closed toilet lid, her hands perfectly steady because she had trained herself long ago not to shake when things mattered.\n\nShe showed it to her teacher, Ibu Ratna, who had been the one to submit the application without telling Yuni's family. \"You deserve this,\" Ibu Ratna said, pressing Yuni's hands between her own. \"You are the smartest student I have taught in twenty-three years. Do not let anyone tell you that marriage is the only equation worth solving.\"\n\nThat evening, Yuni placed the scholarship letter on the dinner table between her grandmother's plate and her mother's. The celebration noise from the morning's proposals had quieted. The mangoes were in a bowl. The gold necklace was in its box. Yuni's grandmother read the letter, then set it down with the careful precision of someone handling an explosive. \"A woman's place,\" she began. \"A woman's place,\" Yuni interrupted gently, \"is wherever she can think.\"",
      th: "จดหมายมาจากเมืองหลวง — กระดาษครีมหนามีตราประทับมหาวิทยาลัยนูนสีน้ำเงินทอง ทุนเต็มจำนวน ค่าเล่าเรียน ที่พัก หนังสือ ค่าห้องปฏิบัติการ ยูนิอ่านสามรอบในห้องน้ำ นั่งบนฝาชักโครก มือนิ่งสนิทเพราะเธอฝึกตัวเองมานานไม่ให้สั่นเมื่อสิ่งสำคัญเกิดขึ้น\n\nเธอให้ครูดู อิบุรัตนา ผู้ส่งใบสมัครโดยไม่บอกครอบครัวยูนิ \"เธอสมควรได้\" อิบุรัตนาพูด กำมือยูนิระหว่างมือตัวเอง \"เธอเป็นนักเรียนที่เก่งที่สุดที่ฉันสอนมายี่สิบสามปี อย่าให้ใครบอกว่าการแต่งงานเป็นสมการเดียวที่คุ้มค่าแก้\"\n\nค่ำนั้น ยูนิวางจดหมายทุนบนโต๊ะอาหารระหว่างจานย่ากับจานแม่ เสียงฉลองจากข้อเสนอตอนเช้าเงียบแล้ว มะม่วงอยู่ในชาม สร้อยทองอยู่ในกล่อง ย่าอ่านจดหมาย แล้ววางลงด้วยความระมัดระวังของคนจับวัตถุระเบิด \"ที่ของผู้หญิง\" ย่าเริ่ม \"ที่ของผู้หญิง\" ยูนิขัดเบาๆ \"คือที่ไหนก็ได้ที่เธอคิดได้\""
    },
  },
  {
    id: "ch13-3", novelId: "13", number: 3,
    title: { en: "Expectations", th: "ความคาดหวัง" },
    description: { en: "Family pressure mounts. The town whispers. Yuni must navigate tradition and her own ambition.", th: "แรงกดดันจากครอบครัวเพิ่มขึ้น เมืองกระซิบ ยูนิต้องหาทางระหว่างประเพณีและความทะเยอทะยาน" },
    readingTime: 14,
    heroImage: "/plottale/covers/1-3.jpg",
    content: {
      en: "The town talked. In the market, at the mosque, over fences and phone lines, the story of Yuni — two proposals and a scholarship — became the subject that everyone had an opinion about. The older women said she should marry Pak Arman; stability was a blessing you didn't refuse. The younger women said she should marry Andi; ambition was attractive and gold necklaces didn't hurt. Almost no one said she should take the scholarship.\n\nYuni's mother stopped speaking to her for three days. Not out of anger, but out of a fear she couldn't articulate — the fear of a woman who had never left this town, who had married at sixteen, who loved her daughter so fiercely that the thought of losing her to the capital felt like losing a limb.\n\nOn the fourth day, Yuni found her mother in the kitchen at dawn, making the fried bananas that Yuni had loved since childhood. \"I don't understand your choice,\" her mother said without turning around. \"But I didn't understand chemistry either, and you made it beautiful.\" She set the plate on the table. \"Eat. You'll need your strength, whatever you decide.\" It was the closest thing to permission Yuni would ever receive, and she held it like a lantern in the dark.",
      th: "เมืองพูดกัน ในตลาด ที่มัสยิด ข้ามรั้วและสายโทรศัพท์ เรื่องของยูนิ — สองข้อเสนอกับทุน — กลายเป็นหัวข้อที่ทุกคนมีความเห็น ผู้หญิงรุ่นเก่าบอกเธอควรแต่งกับปักอาร์มัน ความมั่นคงเป็นพรที่ปฏิเสธไม่ได้ ผู้หญิงรุ่นใหม่บอกเธอควรแต่งกับอันดี ความทะเยอทะยานน่าสนใจและสร้อยทองก็ไม่เสียหาย แทบไม่มีใครบอกว่าเธอควรรับทุน\n\nแม่ยูนิหยุดพูดกับเธอสามวัน ไม่ใช่ด้วยโกรธ แต่ด้วยความกลัวที่บอกไม่ได้ — ความกลัวของผู้หญิงที่ไม่เคยออกจากเมืองนี้ แต่งงานตอนสิบหก รักลูกสาวอย่างรุนแรงจนคิดว่าจะเสียเธอไปให้เมืองหลวงรู้สึกเหมือนเสียแขนขา\n\nวันที่สี่ ยูนิพบแม่ในครัวตอนรุ่งสาง ทำกล้วยทอดที่ยูนิรักตั้งแต่เด็ก \"แม่ไม่เข้าใจทางเลือกลูก\" แม่พูดโดยไม่หันหลัง \"แต่แม่ก็ไม่เข้าใจเคมีเหมือนกัน แล้วลูกก็ทำให้มันสวย\" เธอวางจานบนโต๊ะ \"กิน ลูกต้องการแรง ไม่ว่าจะตัดสินใจอะไร\" มันคือสิ่งที่ใกล้การอนุญาตที่สุดที่ยูนิจะได้รับ และเธอถือมันไว้เหมือนโคมไฟในความมืด"
    },
  },
  {
    id: "ch13-4", novelId: "13", number: 4,
    title: { en: "Her Own Path", th: "เส้นทางของเธอ" },
    description: { en: "Yuni makes a choice that shocks everyone — and discovers that courage is its own kind of love.", th: "ยูนิตัดสินใจที่ทำให้ทุกคนตกใจ — และค้นพบว่าความกล้าหาญคือความรักอีกแบบหนึ่ง" },
    readingTime: 10,
    heroImage: "/plottale/covers/4-2.jpg",
    content: {
      en: "Yuni invited both men to her grandmother's house on a Sunday — the day the whole town rested, the day the market was closed, the day the mosque was fullest. She wore her school uniform, not her best dress, because she wanted them to see her as she was, not as they imagined her.\n\nShe thanked Pak Arman for his kindness and his mangoes. She thanked Andi for his generosity and his gold. Then she placed the scholarship letter on the table and said, simply: \"I choose this.\" The silence that followed was so complete that Yuni could hear the fan turning on the ceiling, the distant call to prayer, the beating of her own stubborn heart.\n\nHer grandmother stood up and left the room without a word. Andi picked up his necklace and walked out. Pak Arman sat for a long moment, then smiled — not the smile of a rejected man, but the smile of a teacher who had just watched a student solve a problem no one thought she could. \"Good,\" he said quietly. \"Go learn.\" Yuni packed her suitcase that night. She left at dawn, the scholarship letter folded in her chemistry textbook, her mother's fried bananas wrapped in newspaper for the bus ride. She didn't look back — not because she didn't love what she was leaving, but because she loved what she was becoming more.",
      th: "ยูนิเชิญผู้ชายทั้งสองมาบ้านย่าวันอาทิตย์ — วันที่ทั้งเมืองพัก ตลาดปิด มัสยิดเต็ม เธอใส่ชุดนักเรียน ไม่ใช่ชุดสวยที่สุด เพราะต้องการให้เห็นเธอเป็นตัวเธอ ไม่ใช่อย่างที่จินตนาการ\n\nเธอขอบคุณปักอาร์มันสำหรับความกรุณาและมะม่วง ขอบคุณอันดีสำหรับความใจดีและทองคำ แล้ววางจดหมายทุนบนโต๊ะพูดง่ายๆ: \"หนูเลือกนี่\" ความเงียบที่ตามมาสมบูรณ์จนยูนิได้ยินพัดลมหมุนบนเพดาน เสียงเรียกละหมาดไกลๆ จังหวะหัวใจดื้อรั้นของตัวเอง\n\nย่าลุกขึ้นออกจากห้องไม่พูดสักคำ อันดีหยิบสร้อยเดินออก ปักอาร์มันนั่งนาน แล้วยิ้ม — ไม่ใช่รอยยิ้มของคนถูกปฏิเสธ แต่รอยยิ้มของครูที่เพิ่งเห็นนักเรียนแก้โจทย์ที่ไม่มีใครคิดว่าเธอทำได้ \"ดี\" เขาพูดเบาๆ \"ไปเรียนเถอะ\" ยูนิเก็บกระเป๋าคืนนั้น ออกเดินทางตอนรุ่งสาง จดหมายทุนพับในตำราเคมี กล้วยทอดของแม่ห่อหนังสือพิมพ์สำหรับนั่งรถบัส เธอไม่มองกลับ — ไม่ใช่เพราะไม่รักสิ่งที่ทิ้ง แต่เพราะรักสิ่งที่กำลังจะเป็นมากกว่า"
    },
  },

  // Novel 14 — The Storm Weaver
  {
    id: "ch14-1", novelId: "14", number: 1,
    title: { en: "Born in the Eye", th: "เกิดในตาพายุ" },
    description: { en: "A girl born inside a tornado speaks her first word — and the wind obeys.", th: "เด็กหญิงที่เกิดในพายุทอร์นาโดพูดคำแรก — และลมก็เชื่อฟัง" },
    readingTime: 12,
    heroImage: "/plottale/covers/14-2.jpg",
    epigraph: { en: "The wind has no memory. But the girl who speaks to it remembers everything — for now.", th: "ลมไม่มีความทรงจำ แต่เด็กหญิงที่พูดกับมันจดจำทุกอย่าง — ในตอนนี้" },
    content: {
      en: "She was born in the eye of a Category 4 tornado that had stalled over the valley for three impossible hours. The midwife later said the wind stopped the moment the baby cried — not died down, not faded, but stopped, as if someone had pressed pause on the sky. When baby Aria opened her mouth, the tornado unravelled like thread from a spool and the clouds parted to reveal a perfect blue afternoon.\n\nBy age three, she could whistle up a breeze. By seven, she could redirect rainstorms away from the harvest. By twelve, the valley farmers came to her grandmother's porch with hats in their hands, asking politely if Aria might encourage some rain — the crops were thirsty and the reservoir was low. She stood in the cornfield and spoke to the sky, and the sky listened.\n\nHer grandmother, who had raised her since her parents died in the same tornado that birthed her, watched from the kitchen window with a mix of pride and dread. She'd seen this gift before — in old books, in older legends. The Storm Weavers. Women who could shape weather with their voices. The legends always ended the same way: the weaver calms her last storm and forgets who she is. \"Be careful what you give the wind,\" her grandmother would say at bedtime. \"It always takes something in return.\"",
      th: "เธอเกิดในตาของทอร์นาโดระดับสี่ที่ค้างเหนือหุบเขาสามชั่วโมงอย่างเป็นไปไม่ได้ หมอตำแยเล่าทีหลังว่าลมหยุดทันทีที่ทารกร้อง — ไม่ได้สงบลง ไม่ได้จางไป แต่หยุด ราวกับมีคนกดหยุดท้องฟ้า เมื่อเบบี้อาเรียอ้าปาก ทอร์นาโดคลี่ตัวเหมือนด้ายจากกระสวย เมฆแหวกเผยบ่ายฟ้าใสสมบูรณ์แบบ\n\nอายุสามขวบ เธอผิวปากเรียกสายลมได้ เจ็ดขวบ เบี่ยงพายุฝนออกจากเก็บเกี่ยวได้ สิบสองขวบ ชาวนาในหุบเขามาที่ระเบียงบ้านย่า ถือหมวกในมือ ถามสุภาพว่าอาเรียช่วยเรียกฝนได้ไหม — พืชกระหายและอ่างเก็บน้ำแห้ง เธอยืนในทุ่งข้าวโพดพูดกับท้องฟ้า และท้องฟ้าฟัง\n\nย่า ผู้เลี้ยงเธอมาตั้งแต่พ่อแม่ตายในทอร์นาโดเดียวกับที่ให้กำเนิดเธอ มองจากหน้าต่างครัวด้วยภูมิใจปนหวาดหวั่น เธอเคยเห็นพรสวรรค์นี้ — ในหนังสือเก่า ในตำนานเก่ากว่า ผู้ถักทอพายุ ผู้หญิงที่ปั้นอากาศด้วยเสียง ตำนานจบเหมือนกันทุกครั้ง: ผู้ถักทอสงบพายุสุดท้ายแล้วลืมว่าตัวเองเป็นใคร \"ระวังสิ่งที่ลูกให้ลม\" ย่าจะพูดก่อนนอน \"มันเอาอะไรกลับไปเสมอ\""
    },
  },
  {
    id: "ch14-2", novelId: "14", number: 2,
    title: { en: "The Price of Calm", th: "ราคาของความสงบ" },
    description: { en: "Each storm she calms steals a memory. Her grandmother's face is the first to go.", th: "ทุกพายุที่เธอสงบขโมยความทรงจำ ใบหน้าของย่าคือสิ่งแรกที่หายไป" },
    readingTime: 14,
    heroImage: "/plottale/covers/3-2.jpg",
    content: {
      en: "The first storm she calmed for real — not a rain shower, not a summer breeze, but a genuine thunderstorm bearing down on the valley with hail the size of golf balls — cost her the memory of her grandmother's face. She didn't notice right away. It was only later that evening, sitting across the dinner table, that Aria looked up and felt a jolt of wrongness. She knew this woman. She loved this woman. But the face was new every time she blinked, as if she were meeting a stranger over and over.\n\nShe kept a journal after that. Every memory she could hold, written down in blue ink in a notebook she kept under her pillow. Her grandmother's face: kind eyes, deep lines, a mole on the left cheek. The smell of the kitchen after baking. Her mother's voice, already fading, singing a song about rivers. The taste of rain before it falls.\n\nBy the time she was fifteen, she had calmed eleven storms and filled three notebooks. The memories she lost followed no pattern she could find — sometimes small things, like the colour of her first bicycle, and sometimes enormous things, like the sound of her own laughter. The wind took what it wanted. And the valley, safe and green and ungrateful, kept asking for more.",
      th: "พายุแรกที่เธอสงบจริงๆ — ไม่ใช่ฝน ไม่ใช่ลมร้อน แต่พายุฟ้าร้องจริงที่ถาโถมใส่หุบเขาพร้อมลูกเห็บขนาดลูกกอล์ฟ — แลกด้วยความทรงจำใบหน้าย่า เธอไม่รู้ตัวทันที รู้ตอนค่ำนั่งข้ามโต๊ะอาหาร อาเรียเงยหน้าแล้วรู้สึกผิดปกติ เธอรู้จักผู้หญิงคนนี้ เธอรักผู้หญิงคนนี้ แต่ใบหน้าใหม่ทุกครั้งที่กะพริบตา ราวกับพบคนแปลกหน้าซ้ำแล้วซ้ำเล่า\n\nเธอเริ่มเขียนบันทึกหลังจากนั้น ทุกความทรงจำที่ยึดไว้ได้ เขียนด้วยหมึกน้ำเงินในสมุดใต้หมอน ใบหน้าย่า: ตาใจดี ริ้วรอยลึก ไฝที่แก้มซ้าย กลิ่นครัวหลังอบขนม เสียงแม่ที่จางแล้ว ร้องเพลงเรื่องแม่น้ำ รสฝนก่อนตก\n\nเมื่ออายุสิบห้า เธอสงบพายุสิบเอ็ดลูกและเขียนเต็มสมุดสามเล่ม ความทรงจำที่สูญเสียไม่มีรูปแบบ — บางทีเรื่องเล็กๆ อย่างสีจักรยานคันแรก บางทีเรื่องใหญ่โต อย่างเสียงหัวเราะของตัวเอง ลมเอาอะไรที่มันต้องการ และหุบเขา ปลอดภัย เขียว และไม่รู้คุณ ยังขอต่อไป"
    },
  },
  {
    id: "ch14-3", novelId: "14", number: 3,
    title: { en: "The Great Storm", th: "พายุใหญ่" },
    description: { en: "A superstorm threatens the entire valley. Only she can stop it — but the cost may be everything.", th: "ซุปเปอร์สตอร์มคุกคามทั้งหุบเขา มีเพียงเธอที่หยุดมันได้ — แต่ต้นทุนอาจเป็นทุกอย่าง" },
    readingTime: 15,
    heroImage: "/plottale/covers/5-2.jpg",
    content: {
      en: "The Great Storm announced itself three days before it arrived. The barometric pressure dropped so fast that birds fell from the sky. Rivers reversed direction. The horizon turned a green so dark it looked like bruised skin. Every weather station within five hundred kilometres issued the same warning: unprecedented, catastrophic, unsurvivable.\n\nAria stood on the porch and felt the storm's approach in her bones — a vibration that started in her ankles and climbed through her skeleton until her teeth hummed. This was not like the thunderstorms she'd tamed. This was ancient weather, the kind of storm that reshapes coastlines and erases towns from maps. Calming it would require everything she had — every word, every breath, every memory left in her overcrowded, under-defended mind.\n\nHer grandmother — whose face Aria could only know from the notebook now — pressed the journal into her hands. \"Read it after,\" she said. \"Whatever you forget, this will remember for you.\" The valley was evacuating. Trucks and tractors and families on foot, streaming toward the mountain pass. But Aria walked the other way, toward the open field where the wind was already tearing at the grass, toward the wall of black cloud that filled the sky from edge to edge.",
      th: "พายุใหญ่ประกาศตัวสามวันก่อนมาถึง ความกดอากาศตกเร็วจนนกร่วงจากฟ้า แม่น้ำไหลกลับทาง ขอบฟ้าเปลี่ยนเป็นเขียวเข้มจนดูเหมือนผิวช้ำ ทุกสถานีอากาศภายในห้าร้อยกิโลเมตรออกคำเตือนเดียวกัน: ไม่เคยมีมาก่อน หายนะ ไม่มีทางรอด\n\nอาเรียยืนบนระเบียงรู้สึกพายุเข้ามาในกระดูก — การสั่นที่เริ่มจากข้อเท้าไต่ผ่านโครงกระดูกจนฟันหึ่ง นี่ไม่เหมือนพายุฟ้าร้องที่เคยสยบ นี่คืออากาศโบราณ พายุชนิดที่เปลี่ยนรูปชายฝั่งและลบเมืองจากแผนที่ การสงบมันต้องใช้ทุกอย่าง — ทุกคำ ทุกลมหายใจ ทุกความทรงจำที่เหลือในจิตใจที่แน่นแต่ไร้เกราะ\n\nย่า — ที่อาเรียรู้จักใบหน้าได้จากสมุดบันทึกเท่านั้น — กดบันทึกใส่มือเธอ \"อ่านทีหลัง\" ย่าพูด \"อะไรที่ลืม สิ่งนี้จะจำให้\" หุบเขากำลังอพยพ รถบรรทุก รถไถ ครอบครัวเดินเท้า ไหลไปทางช่องเขา แต่อาเรียเดินสวนทาง ไปทุ่งโล่งที่ลมฉีกหญ้าแล้ว ไปหากำแพงเมฆดำที่เต็มท้องฟ้าจากขอบถึงขอบ"
    },
  },
  {
    id: "ch14-4", novelId: "14", number: 4,
    title: { en: "Whisper", th: "กระซิบ" },
    description: { en: "She calms the storm with a whisper. The valley is saved. But she can't remember her own name.", th: "เธอสงบพายุด้วยเสียงกระซิบ หุบเขาปลอดภัย แต่เธอจำชื่อตัวเองไม่ได้" },
    readingTime: 8,
    heroImage: "/plottale/covers/8-2.jpg",
    content: {
      en: "She didn't shout. The old Storm Weavers had shouted — they'd screamed their commands at hurricanes, bellowed at blizzards, roared until their voices broke. But Aria had always known that the wind responds better to quiet. You don't command the sky. You ask it.\n\nShe stood in the centre of the field as the Great Storm closed around her. Rain hammered sideways. Lightning split the darkness every two seconds. The wind was so strong it lifted her off her feet, and she floated for a moment in the eye of the storm, suspended between earth and sky. And then she whispered.\n\nThe word she spoke had no translation. It was older than language, a sound that existed before humans had mouths to make it — a vibration that meant: peace. Be still. Let go. The storm heard it. The wind slowed. The rain softened. The lightning stopped. And the Great Storm — the one that should have erased the valley — unravelled like thread, dissolving into mist, into memory, into nothing. Aria landed gently in the wet grass and sat there, blinking. The sky was blue. The birds were singing. And she couldn't remember her name. She opened the journal in her lap and read the first line in her own handwriting: \"My name is Aria. I speak to storms.\" She read it again. And again. Until the words felt like something she might, someday, remember.",
      th: "เธอไม่ตะโกน ผู้ถักทอพายุยุคเก่าตะโกน — กรีดร้องคำสั่งใส่เฮอริเคน คำรามใส่พายุหิมะ ส่งเสียงจนเสียงแตก แต่อาเรียรู้มาตลอดว่าลมตอบสนองกับเสียงเบาดีกว่า คุณไม่สั่งท้องฟ้า คุณขอ\n\nเธอยืนกลางทุ่งขณะพายุใหญ่ปิดล้อม ฝนกระหน่ำด้านข้าง สายฟ้าผ่าความมืดทุกสองวินาที ลมแรงจนยกเธอลอย เธอลอยอยู่ชั่วขณะในตาพายุ แขวนระหว่างดินกับฟ้า แล้วเธอกระซิบ\n\nคำที่เธอพูดไม่มีคำแปล เก่าแก่กว่าภาษา เสียงที่มีอยู่ก่อนมนุษย์มีปากจะทำ — แรงสั่นที่หมายถึง: สงบ นิ่ง ปล่อยวาง พายุได้ยิน ลมช้าลง ฝนอ่อนลง สายฟ้าหยุด และพายุใหญ่ — ที่ควรลบหุบเขา — คลี่ตัวเหมือนด้าย ละลายเป็นหมอก เป็นความทรงจำ เป็นความว่างเปล่า อาเรียลงบนหญ้าเปียกอย่างเบาและนั่ง กะพริบตา ฟ้าสีน้ำเงิน นกร้องเพลง และเธอจำชื่อตัวเองไม่ได้ เธอเปิดบันทึกบนตักอ่านบรรทัดแรกลายมือตัวเอง: \"ชื่อของฉันคืออาเรีย ฉันพูดกับพายุ\" เธออ่านอีกครั้ง และอีกครั้ง จนคำรู้สึกเหมือนสิ่งที่เธออาจ สักวัน จดจำได้"
    },
  },
];

export function getChaptersByNovelId(novelId: string): PlottaleChapter[] {
  return CHAPTERS.filter((ch) => ch.novelId === novelId);
}

export function getChapterByNovelIdAndNumber(novelId: string, number: number): PlottaleChapter | undefined {
  return CHAPTERS.find((ch) => ch.novelId === novelId && ch.number === number);
}

export function getCharactersByNovelId(novelId: string): PlottaleCharacter[] {
  return CHARACTERS.filter((ch) => ch.novelIds.includes(novelId));
}

/* ================================================================== */
/*  Character Interface + Data                                         */
/* ================================================================== */

export interface PlottaleCharacter {
  id: string;
  name: LocalizedString;
  handle: string;
  role: LocalizedString;
  bio: LocalizedString;
  avatar: string;
  banner: string;
  placeholderGradient: string;
  followers: number;
  following: number;
  novelCount: number;
  novelIds: string[];
  verified: boolean;
  isFollowing?: boolean;
}

const CHARACTERS: PlottaleCharacter[] = [
  {
    id: "c1",
    name: { en: "Andy Rose", th: "แอนดี้ โรส" },
    handle: "@andyrose",
    role: { en: "Protagonist in Cargo", th: "ตัวเอกใน คาร์โก้" },
    bio: {
      en: "A desperate father racing against time and a spreading plague to save his infant daughter.",
      th: "พ่อผู้สิ้นหวังที่แข่งกับเวลาและโรคระบาดเพื่อรักษาลูกสาวทารก",
    },
    avatar: "/plottale/avatars/char-c1.jpg",
    banner: "/plottale/avatars/banner-c1.jpg",
    placeholderGradient: "linear-gradient(145deg, #3d3024 0%, #c4956a 100%)",
    followers: 24800,
    following: 1200,
    novelCount: 1,
    novelIds: ["1"],
    verified: true,
  },
  {
    id: "c2",
    name: { en: "Jennie Lux", th: "เจนนี่ ลักซ์" },
    handle: "@jennielux",
    role: { en: "Lead in Bokeh", th: "ตัวเอกใน โบเก้" },
    bio: {
      en: "Woke up in a world where everyone vanished — the longer she stays, the more she forgets.",
      th: "ตื่นขึ้นมาในโลกที่ทุกคนหายไป — ยิ่งอยู่นาน เธอยิ่งลืม",
    },
    avatar: "/plottale/avatars/char-c2.jpg",
    banner: "/plottale/avatars/banner-c2.jpg",
    placeholderGradient: "linear-gradient(145deg, #1a3a4a 0%, #e8c87a 100%)",
    followers: 31200,
    following: 890,
    novelCount: 1,
    novelIds: ["2"],
    verified: true,
    isFollowing: true,
  },
  {
    id: "c3",
    name: { en: "Kira Aydin", th: "คิร่า อายดิน" },
    handle: "@kiraaydin",
    role: { en: "Detective in Saklı", th: "นักสืบใน ซาคลี" },
    bio: {
      en: "Four strangers share one nightmare — and she's the one who connects the pieces.",
      th: "คนแปลกหน้าสี่คนฝันร้ายเดียวกัน — และเธอเป็นคนที่เชื่อมต่อปริศนา",
    },
    avatar: "/plottale/avatars/char-c3.jpg",
    banner: "/plottale/avatars/banner-c3.jpg",
    placeholderGradient: "linear-gradient(145deg, #0d1117 0%, #c62828 100%)",
    followers: 18900,
    following: 2100,
    novelCount: 1,
    novelIds: ["3"],
    verified: true,
  },
  {
    id: "c4",
    name: { en: "Yuna Park", th: "ยูนา ปาร์ค" },
    handle: "@yunapark",
    role: { en: "K-pop Trainee in Yuna", th: "เด็กฝึก K-pop ใน ยูนา" },
    bio: {
      en: "Torn between her debut dream and exposing an industry secret that could save lives.",
      th: "ฉีกระหว่างความฝันเดบิวต์กับการเปิดโปงความลับที่อาจช่วยชีวิตคนได้",
    },
    avatar: "/plottale/avatars/char-c4.jpg",
    banner: "/plottale/avatars/banner-c4.jpg",
    placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #fdd835 100%)",
    followers: 42500,
    following: 3400,
    novelCount: 1,
    novelIds: ["4"],
    verified: true,
  },
  {
    id: "c5",
    name: { en: "Mia Synth", th: "เมีย ซินธ์" },
    handle: "@miasynth",
    role: { en: "AI Helper in Humans", th: "ผู้ช่วย AI ใน ฮิวแมนส์" },
    bio: {
      en: "A synthetic human who begins to remember a life she never lived — or did she?",
      th: "มนุษย์สังเคราะห์ที่เริ่มจำชีวิตที่เธอไม่เคยมี — หรือเคยมี?",
    },
    avatar: "/plottale/avatars/char-c5.jpg",
    banner: "/plottale/avatars/banner-c5.jpg",
    placeholderGradient: "linear-gradient(145deg, #0a192f 0%, #00e5ff 100%)",
    followers: 37600,
    following: 560,
    novelCount: 2,
    novelIds: ["5", "3"],
    verified: true,
    isFollowing: true,
  },
  {
    id: "c6",
    name: { en: "Lin Feng", th: "หลิน เฟิง" },
    handle: "@linfeng",
    role: { en: "Cartographer in The Jade Pilgrim", th: "นักทำแผนที่ใน ผู้แสวงบุญหยก" },
    bio: {
      en: "Scaling impossible peaks to find a lost monastery that holds the map to immortality.",
      th: "ปีนยอดเขาที่เป็นไปไม่ได้เพื่อค้นหาวัดที่เก็บแผนที่สู่ความเป็นอมตะ",
    },
    avatar: "/plottale/avatars/char-c6.jpg",
    banner: "/plottale/avatars/banner-c6.jpg",
    placeholderGradient: "linear-gradient(145deg, #1b4332 0%, #95d5b2 100%)",
    followers: 15300,
    following: 4200,
    novelCount: 1,
    novelIds: ["6"],
    verified: false,
  },
  {
    id: "c7",
    name: { en: "Elena Vargas", th: "เอเลน่า วาร์กัส" },
    handle: "@elenavargas",
    role: { en: "Writer in Los Adioses", th: "นักเขียนใน ลอส อาดิโอเซส" },
    bio: {
      en: "A celebrated writer at a sanatorium where two women arrive — each claiming to be her true love.",
      th: "นักเขียนชื่อดังที่สถานพักฟื้นซึ่งผู้หญิงสองคนต่างอ้างว่าเป็นรักแท้ของเธอ",
    },
    avatar: "/plottale/avatars/char-c7.jpg",
    banner: "/plottale/avatars/banner-c7.jpg",
    placeholderGradient: "linear-gradient(145deg, #4a3728 0%, #d4a574 100%)",
    followers: 11800,
    following: 1800,
    novelCount: 1,
    novelIds: ["7"],
    verified: false,
  },
  {
    id: "c8",
    name: { en: "Poppie Nongena", th: "ป๊อปปี้ นองเกนา" },
    handle: "@poppie",
    role: { en: "Heroine in Poppie Nongena", th: "นางเอกใน ป๊อปปี้ นองเกนา" },
    bio: {
      en: "Her unbreakable spirit across decades of forced removals became the heartbeat of a nation.",
      th: "จิตวิญญาณที่ไม่มีวันหักของเธอกลายเป็นหัวใจของจิตสำนึกแห่งชาติ",
    },
    avatar: "/plottale/avatars/char-c8.jpg",
    banner: "/plottale/avatars/banner-c8.jpg",
    placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #d7ccc8 100%)",
    followers: 28400,
    following: 950,
    novelCount: 1,
    novelIds: ["9"],
    verified: true,
  },
  {
    id: "c9",
    name: { en: "Nari Yuni", th: "นาริ ยูนิ" },
    handle: "@nariyuni",
    role: { en: "Student in Yuni", th: "นักเรียนใน ยูนิ" },
    bio: {
      en: "A brilliant student who received two proposals in one day — yet dreams of a life beyond them all.",
      th: "นักเรียนหัวดีที่ได้รับข้อเสนอแต่งงานสองครั้งในวันเดียวแต่ใฝ่ฝันถึงชีวิตที่มากกว่า",
    },
    avatar: "/plottale/avatars/char-c9.jpg",
    banner: "/plottale/avatars/banner-c9.jpg",
    placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #e1bee7 100%)",
    followers: 19700,
    following: 3100,
    novelCount: 1,
    novelIds: ["13"],
    verified: true,
  },
  {
    id: "c10",
    name: { en: "Sora Tempest", th: "โซร่า เทมเปสต์" },
    handle: "@soratempest",
    role: { en: "Storm Weaver in The Storm Weaver", th: "ผู้ถักทอพายุใน ผู้ถักทอพายุ" },
    bio: {
      en: "Born inside a tornado, she shapes storms with her voice — but each calm steals a memory.",
      th: "เกิดในพายุทอร์นาโด เธอปั้นพายุด้วยเสียง — แต่ทุกครั้งที่สงบ ความทรงจำจะถูกขโมยไป",
    },
    avatar: "/plottale/avatars/char-c10.jpg",
    banner: "/plottale/avatars/banner-c10.jpg",
    placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #e0e0e0 100%)",
    followers: 21100,
    following: 2700,
    novelCount: 2,
    novelIds: ["14", "10"],
    verified: true,
  },
  /* ── Additional cast members (c11–c80) for 8–10 per novel ── */
  // Novel 1 – Cargo
  { id: "c11", name: { en: "Rosie Rose", th: "โรซี่ โรส" }, handle: "@rosierose", role: { en: "Infant Daughter in Cargo", th: "ลูกสาวทารกใน คาร์โก้" }, bio: { en: "The baby who sleeps through the apocalypse — her survival is the only mission.", th: "ทารกที่หลับผ่านวันสิ้นโลก — การรอดชีวิตของเธอคือภารกิจเดียว" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #f8bbd0 0%, #fce4ec 100%)", followers: 8200, following: 0, novelCount: 1, novelIds: ["1"], verified: false },
  { id: "c12", name: { en: "Thobekile", th: "โทเบกิเล" }, handle: "@thobekile", role: { en: "Survivor in Cargo", th: "ผู้รอดชีวิตใน คาร์โก้" }, bio: { en: "A resourceful indigenous woman who knows the outback better than anyone alive.", th: "ผู้หญิงพื้นเมืองที่รู้จักป่าดีกว่าใครที่ยังมีชีวิต" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #a1887f 100%)", followers: 14500, following: 890, novelCount: 1, novelIds: ["1"], verified: true },
  { id: "c13", name: { en: "Dr. Vic Kellogg", th: "ดร.วิค เคลล็อกก์" }, handle: "@drvic", role: { en: "Scientist in Cargo", th: "นักวิทยาศาสตร์ใน คาร์โก้" }, bio: { en: "The man who almost found the cure — before time ran out.", th: "ชายที่เกือบพบวิธีรักษา — ก่อนที่เวลาจะหมด" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #263238 0%, #78909c 100%)", followers: 9300, following: 1500, novelCount: 1, novelIds: ["1"], verified: false },
  { id: "c14", name: { en: "Kay Rose", th: "เคย์ โรส" }, handle: "@kayrose", role: { en: "Andy's Wife in Cargo", th: "ภรรยาแอนดี้ใน คาร์โก้" }, bio: { en: "Her last act of love set Andy on a desperate journey.", th: "การกระทำสุดท้ายแห่งรักของเธอส่งแอนดี้สู่การเดินทางสิ้นหวัง" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #e8eaf6 0%, #9fa8da 100%)", followers: 7800, following: 430, novelCount: 1, novelIds: ["1"], verified: false },
  { id: "c15", name: { en: "Etta", th: "เอตต้า" }, handle: "@etta", role: { en: "Nomad in Cargo", th: "คนเร่ร่อนใน คาร์โก้" }, bio: { en: "She trusts no one — but a crying baby changes everything.", th: "เธอไม่ไว้ใจใคร — แต่เสียงร้องของทารกเปลี่ยนทุกอย่าง" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #1b5e20 0%, #a5d6a7 100%)", followers: 6100, following: 1200, novelCount: 1, novelIds: ["1"], verified: false },
  { id: "c16", name: { en: "Lorraine", th: "ลอร์เรน" }, handle: "@lorraine", role: { en: "Teacher in Cargo", th: "ครูใน คาร์โก้" }, bio: { en: "The schoolteacher who became a reluctant leader of survivors.", th: "ครูที่กลายเป็นผู้นำกลุ่มผู้รอดชีวิตอย่างไม่เต็มใจ" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #bf360c 0%, #ffccbc 100%)", followers: 5400, following: 780, novelCount: 1, novelIds: ["1"], verified: false },
  { id: "c17", name: { en: "Willie", th: "วิลลี่" }, handle: "@willie", role: { en: "Ferryman in Cargo", th: "คนพายเรือใน คาร์โก้" }, bio: { en: "A stranger with a boat at the collapsed bridge — trust is his currency.", th: "คนแปลกหน้าพร้อมเรือที่สะพานพัง — ความไว้ใจคือสกุลเงินของเขา" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #8d6e63 100%)", followers: 4200, following: 330, novelCount: 1, novelIds: ["1"], verified: false },
  { id: "c18", name: { en: "Josie", th: "โจซี่" }, handle: "@josie", role: { en: "Medic in Cargo", th: "แพทย์สนามใน คาร์โก้" }, bio: { en: "The field medic who patches wounds and broken hopes.", th: "แพทย์สนามที่ปะหน้าแผลและความหวังที่แตกสลาย" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #004d40 0%, #80cbc4 100%)", followers: 3800, following: 910, novelCount: 1, novelIds: ["1"], verified: false },
  // Novel 2 – Bokeh
  { id: "c19", name: { en: "Riley Chen", th: "ไรลีย์ เฉิน" }, handle: "@rileychen", role: { en: "Photographer in Bokeh", th: "ช่างภาพใน โบเก้" }, bio: { en: "He captures beauty in the empty world — until the photos start showing people who shouldn't be there.", th: "เขาถ่ายภาพความงามในโลกว่างเปล่า — จนรูปถ่ายเริ่มแสดงคนที่ไม่ควรอยู่ที่นั่น" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #7986cb 100%)", followers: 22100, following: 1400, novelCount: 1, novelIds: ["2"], verified: true },
  { id: "c20", name: { en: "Maren Voss", th: "มาเรน วอส" }, handle: "@marenvoss", role: { en: "Radio Operator in Bokeh", th: "ผู้ควบคุมวิทยุใน โบเก้" }, bio: { en: "The voice on the radio that keeps fading in and out.", th: "เสียงบนวิทยุที่ค่อยๆ หายไปแล้วกลับมา" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #311b92 0%, #b39ddb 100%)", followers: 8700, following: 560, novelCount: 1, novelIds: ["2"], verified: false },
  { id: "c21", name: { en: "The Child", th: "เด็กน้อย" }, handle: "@thechild", role: { en: "Mystery in Bokeh", th: "ปริศนาใน โบเก้" }, bio: { en: "A silent child who appears and disappears — always watching.", th: "เด็กเงียบที่ปรากฏและหายไป — คอยจ้องมองเสมอ" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #e0e0e0 0%, #9e9e9e 100%)", followers: 15600, following: 0, novelCount: 1, novelIds: ["2"], verified: false },
  { id: "c22", name: { en: "Dr. Hana Kim", th: "ดร.ฮานะ คิม" }, handle: "@drhanakim", role: { en: "Neurologist in Bokeh", th: "ประสาทแพทย์ใน โบเก้" }, bio: { en: "She studies memory loss — now she's losing her own.", th: "เธอศึกษาเรื่องการสูญเสียความทรงจำ — ตอนนี้เธอกำลังสูญเสียของตัวเอง" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #0d47a1 0%, #bbdefb 100%)", followers: 12300, following: 2100, novelCount: 1, novelIds: ["2"], verified: true },
  { id: "c23", name: { en: "Felix", th: "เฟลิกซ์" }, handle: "@felix", role: { en: "Drifter in Bokeh", th: "คนร่อนเร่ใน โบเก้" }, bio: { en: "He claims to remember everything — but can anyone trust a drifter?", th: "เขาอ้างว่าจำได้ทุกอย่าง — แต่ใครจะไว้ใจคนร่อนเร่?" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #33691e 0%, #aed581 100%)", followers: 5400, following: 890, novelCount: 1, novelIds: ["2"], verified: false },
  { id: "c24", name: { en: "Iris Moon", th: "ไอริส มูน" }, handle: "@irismoon", role: { en: "Artist in Bokeh", th: "ศิลปินใน โบเก้" }, bio: { en: "She paints the empty city — each painting reveals something the eyes can't see.", th: "เธอวาดเมืองว่างเปล่า — ทุกภาพเผยสิ่งที่ตาเปล่ามองไม่เห็น" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #880e4f 0%, #f8bbd0 100%)", followers: 9100, following: 1700, novelCount: 1, novelIds: ["2"], verified: false },
  { id: "c25", name: { en: "Old Man Jun", th: "ลุงจุน" }, handle: "@oldmanjun", role: { en: "Guardian in Bokeh", th: "ผู้พิทักษ์ใน โบเก้" }, bio: { en: "The last shopkeeper who refuses to leave — he guards something precious.", th: "เจ้าของร้านคนสุดท้ายที่ไม่ยอมไป — เขาเฝ้าสิ่งล้ำค่า" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #5d4037 0%, #bcaaa4 100%)", followers: 4300, following: 120, novelCount: 1, novelIds: ["2"], verified: false },
  { id: "c26", name: { en: "Sophie Lane", th: "โซฟี เลน" }, handle: "@sophielane", role: { en: "Writer in Bokeh", th: "นักเขียนใน โบเก้" }, bio: { en: "Jennie's best friend who left behind a journal that may hold the truth.", th: "เพื่อนสนิทเจนนี่ที่ทิ้งบันทึกซึ่งอาจเก็บความจริงไว้" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #4527a0 0%, #d1c4e9 100%)", followers: 7800, following: 2300, novelCount: 1, novelIds: ["2"], verified: false },
  // Novel 3 – Saklı
  { id: "c27", name: { en: "Emre Demir", th: "เอมเร เดเมียร์" }, handle: "@emredemir", role: { en: "Psychiatrist in Saklı", th: "จิตแพทย์ใน ซาคลี" }, bio: { en: "The doctor treating four patients who share the same impossible nightmare.", th: "แพทย์ที่รักษาผู้ป่วยสี่คนที่ฝันร้ายเหมือนกัน" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #1b5e20 0%, #81c784 100%)", followers: 16200, following: 3400, novelCount: 1, novelIds: ["3"], verified: true },
  { id: "c28", name: { en: "Zeynep Kaya", th: "เซย์เนป คายา" }, handle: "@zeynepkaya", role: { en: "Student in Saklı", th: "นักศึกษาใน ซาคลี" }, bio: { en: "She draws the nightmares — every detail matches reality.", th: "เธอวาดฝันร้าย — ทุกรายละเอียดตรงกับความจริง" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #b71c1c 0%, #ef9a9a 100%)", followers: 11400, following: 2800, novelCount: 1, novelIds: ["3"], verified: false },
  { id: "c29", name: { en: "Tarik Aslan", th: "ทาริค อัสลัน" }, handle: "@tarikaslan", role: { en: "Journalist in Saklı", th: "นักข่าวใน ซาคลี" }, bio: { en: "Investigating the nightmare connection — until he starts having them too.", th: "สืบสวนเรื่องฝันร้ายที่เชื่อมโยงกัน — จนเขาเริ่มฝันเห็นเหมือนกัน" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #263238 0%, #90a4ae 100%)", followers: 8900, following: 1500, novelCount: 1, novelIds: ["3"], verified: false },
  { id: "c30", name: { en: "Defne Yıldız", th: "เดฟเน ยิลดิซ" }, handle: "@defneyildiz", role: { en: "Pharmacist in Saklı", th: "เภสัชกรใน ซาคลี" }, bio: { en: "She knows the pills aren't working — because they were never meant to.", th: "เธอรู้ว่ายาไม่ได้ผล — เพราะมันไม่เคยถูกออกแบบมาเพื่อรักษา" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #ce93d8 100%)", followers: 6700, following: 1100, novelCount: 1, novelIds: ["3"], verified: false },
  { id: "c31", name: { en: "Ozan Çelik", th: "โอซาน เชลิค" }, handle: "@ozancelik", role: { en: "Night Guard in Saklı", th: "ยามกลางคืนใน ซาคลี" }, bio: { en: "He watches the cameras — and what he sees at 3 AM shouldn't be possible.", th: "เขาเฝ้าดูกล้องวงจรปิด — และสิ่งที่เห็นตอนตี 3 ไม่ควรเป็นไปได้" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #0d47a1 0%, #64b5f6 100%)", followers: 4500, following: 670, novelCount: 1, novelIds: ["3"], verified: false },
  { id: "c32", name: { en: "Ayşe Eren", th: "อายเช เอเรน" }, handle: "@ayseeren", role: { en: "Elderly Patient in Saklı", th: "ผู้ป่วยสูงอายุใน ซาคลี" }, bio: { en: "The oldest patient who claims she's seen this nightmare before — sixty years ago.", th: "ผู้ป่วยที่อายุมากที่สุดที่อ้างว่าเคยเห็นฝันร้ายนี้ — เมื่อหกสิบปีก่อน" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #a1887f 100%)", followers: 3200, following: 90, novelCount: 1, novelIds: ["3"], verified: false },
  { id: "c33", name: { en: "Selim Barış", th: "เซลิม บาริช" }, handle: "@selimbaris", role: { en: "Police Chief in Saklı", th: "ผู้กำกับตำรวจใน ซาคลี" }, bio: { en: "He doesn't believe in nightmares — until the evidence starts matching.", th: "เขาไม่เชื่อเรื่องฝันร้าย — จนหลักฐานเริ่มตรงกัน" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #7986cb 100%)", followers: 7800, following: 430, novelCount: 1, novelIds: ["3"], verified: true },
  // Novel 4 – Yuna
  { id: "c34", name: { en: "Jae-won Kim", th: "แจวอน คิม" }, handle: "@jaewonkim", role: { en: "Trainer in Yuna", th: "โค้ชใน ยูนา" }, bio: { en: "The vocal coach who hides industry secrets behind a smile.", th: "โค้ชเสียงที่ซ่อนความลับวงการไว้หลังรอยยิ้ม" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #536dfe 100%)", followers: 18500, following: 890, novelCount: 1, novelIds: ["4"], verified: true },
  { id: "c35", name: { en: "Hae-in Lee", th: "แฮอิน ลี" }, handle: "@haeinlee", role: { en: "Rival Trainee in Yuna", th: "คู่แข่งใน ยูนา" }, bio: { en: "She'll do anything to debut first — even if it means betrayal.", th: "เธอจะทำทุกอย่างเพื่อเดบิวต์ก่อน — แม้จะต้องทรยศ" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #880e4f 0%, #f48fb1 100%)", followers: 29800, following: 1200, novelCount: 1, novelIds: ["4"], verified: true },
  { id: "c36", name: { en: "Min-ho Choi", th: "มินโฮ ชเว" }, handle: "@minhochoi", role: { en: "CEO in Yuna", th: "ซีอีโอใน ยูนา" }, bio: { en: "The label CEO who sees trainees as products, not people.", th: "ซีอีโอค่ายเพลงที่มองเด็กฝึกเป็นสินค้า ไม่ใช่คน" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #212121 0%, #757575 100%)", followers: 8100, following: 120, novelCount: 1, novelIds: ["4"], verified: false },
  { id: "c37", name: { en: "So-yeon Baek", th: "โซยอน แบค" }, handle: "@soyeonbaek", role: { en: "Choreographer in Yuna", th: "นักออกแบบท่าเต้นใน ยูนา" }, bio: { en: "Former idol who knows exactly what the industry takes from you.", th: "อดีตไอดอลที่รู้ดีว่าวงการเอาอะไรไปจากคุณ" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #e65100 0%, #ffcc02 100%)", followers: 35200, following: 2800, novelCount: 1, novelIds: ["4"], verified: true },
  { id: "c38", name: { en: "Dae-jung Park", th: "แดจุง ปาร์ค" }, handle: "@daejung", role: { en: "Manager in Yuna", th: "ผู้จัดการใน ยูนา" }, bio: { en: "Yuna's personal manager caught between protecting her and pleasing the label.", th: "ผู้จัดการส่วนตัวของยูนาที่ติดอยู่ระหว่างการปกป้องเธอและการเอาใจค่าย" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #37474f 0%, #b0bec5 100%)", followers: 5600, following: 340, novelCount: 1, novelIds: ["4"], verified: false },
  { id: "c39", name: { en: "Ji-yeon Han", th: "จียอน ฮัน" }, handle: "@jiyeonhan", role: { en: "Best Friend in Yuna", th: "เพื่อนสนิทใน ยูนา" }, bio: { en: "The only one who remembers who Yuna was before the cameras.", th: "คนเดียวที่จำได้ว่ายูนาเป็นใครก่อนมีกล้อง" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #f57f17 0%, #fff176 100%)", followers: 4200, following: 2100, novelCount: 1, novelIds: ["4"], verified: false },
  { id: "c40", name: { en: "Eun-bi Shin", th: "อึนบี ชิน" }, handle: "@eunbishin", role: { en: "Fan Leader in Yuna", th: "หัวหน้าแฟนคลับใน ยูนา" }, bio: { en: "The superfan who discovers the truth by accident.", th: "แฟนตัวยงที่ค้นพบความจริงโดยบังเอิญ" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #ad1457 0%, #f8bbd0 100%)", followers: 12800, following: 5600, novelCount: 1, novelIds: ["4"], verified: false },
  { id: "c41", name: { en: "Tae-hyung Kang", th: "แทฮยอง คัง" }, handle: "@taehyungkang", role: { en: "Whistleblower in Yuna", th: "ผู้เปิดโปงใน ยูนา" }, bio: { en: "Ex-staff who contacts Yuna with evidence — but is he trustworthy?", th: "อดีตพนักงานที่ติดต่อยูนาพร้อมหลักฐาน — แต่เชื่อถือได้ไหม?" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #004d40 0%, #4db6ac 100%)", followers: 3100, following: 780, novelCount: 1, novelIds: ["4"], verified: false },
  // Novel 5 – Humans
  { id: "c42", name: { en: "Dr. Lena Shore", th: "ดร.ลีน่า ชอร์" }, handle: "@lenashore", role: { en: "Creator in Humans", th: "ผู้สร้างใน ฮิวแมนส์" }, bio: { en: "She built Mia — and now she can't tell her apart from a real human.", th: "เธอสร้างเมีย — และตอนนี้แยกไม่ออกว่าเป็นมนุษย์จริง" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #9fa8da 100%)", followers: 27300, following: 1500, novelCount: 1, novelIds: ["5"], verified: true },
  { id: "c43", name: { en: "Marcus Webb", th: "มาร์คัส เวบบ์" }, handle: "@marcuswebb", role: { en: "Ethics Officer in Humans", th: "เจ้าหน้าที่จริยธรรมใน ฮิวแมนส์" }, bio: { en: "Hired to decide if synthetic humans deserve rights.", th: "ถูกจ้างมาตัดสินว่ามนุษย์สังเคราะห์สมควรมีสิทธิ์หรือไม่" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #424242 0%, #bdbdbd 100%)", followers: 14500, following: 3200, novelCount: 1, novelIds: ["5"], verified: true },
  { id: "c44", name: { en: "Kai Reeves", th: "ไค รีฟส์" }, handle: "@kaireeves", role: { en: "Technician in Humans", th: "ช่างเทคนิคใน ฮิวแมนส์" }, bio: { en: "He maintains the synthetics — and he's falling for one.", th: "เขาดูแลมนุษย์สังเคราะห์ — และกำลังตกหลุมรักหนึ่งในนั้น" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #0097a7 0%, #80deea 100%)", followers: 9800, following: 890, novelCount: 1, novelIds: ["5"], verified: false },
  { id: "c45", name: { en: "Ava Unit-7", th: "เอวา ยูนิต-7" }, handle: "@avaunit7", role: { en: "Synthetic in Humans", th: "มนุษย์สังเคราะห์ใน ฮิวแมนส์" }, bio: { en: "The first synthetic to say 'I don't want to be reset.'", th: "มนุษย์สังเคราะห์ตัวแรกที่พูดว่า 'ฉันไม่อยากถูกรีเซ็ต'" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #00bcd4 0%, #e0f7fa 100%)", followers: 31200, following: 0, novelCount: 1, novelIds: ["5"], verified: false },
  { id: "c46", name: { en: "Senator Park", th: "ส.ว. ปาร์ค" }, handle: "@senatorpark", role: { en: "Politician in Humans", th: "นักการเมืองใน ฮิวแมนส์" }, bio: { en: "Pushing legislation to ban synthetic humans — but her reasons are personal.", th: "ผลักดันกฎหมายห้ามมนุษย์สังเคราะห์ — แต่เหตุผลเป็นเรื่องส่วนตัว" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #880e4f 0%, #f48fb1 100%)", followers: 6700, following: 340, novelCount: 1, novelIds: ["5"], verified: true },
  { id: "c47", name: { en: "Theo Grant", th: "ธีโอ แกรนท์" }, handle: "@theogrant", role: { en: "Journalist in Humans", th: "นักข่าวใน ฮิวแมนส์" }, bio: { en: "The reporter who infiltrates the lab — and discovers his own secret.", th: "นักข่าวที่แทรกซึมเข้าแล็บ — และค้นพบความลับของตัวเอง" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #33691e 0%, #9ccc65 100%)", followers: 8300, following: 1700, novelCount: 1, novelIds: ["5"], verified: false },
  { id: "c48", name: { en: "Noor Patel", th: "นูร์ ปาเทล" }, handle: "@noorpatel", role: { en: "Activist in Humans", th: "นักเคลื่อนไหวใน ฮิวแมนส์" }, bio: { en: "Leading the synthetic rights movement — she may not be what she seems.", th: "นำการเคลื่อนไหวเพื่อสิทธิ์มนุษย์สังเคราะห์ — เธออาจไม่ใช่อย่างที่เห็น" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #e65100 0%, #ffab91 100%)", followers: 19400, following: 4500, novelCount: 1, novelIds: ["5"], verified: true },
  { id: "c49", name: { en: "Jin-ho", th: "จินโฮ" }, handle: "@jinho", role: { en: "Child Synthetic in Humans", th: "เด็กสังเคราะห์ใน ฮิวแมนส์" }, bio: { en: "A synthetic child who just wants to go to school.", th: "เด็กสังเคราะห์ที่แค่อยากไปโรงเรียน" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #fff8e1 0%, #ffca28 100%)", followers: 22100, following: 560, novelCount: 1, novelIds: ["5"], verified: false },
  // Novel 6 – The Jade Pilgrim
  { id: "c50", name: { en: "Master Wuji", th: "อาจารย์อู่จี้" }, handle: "@masterwuji", role: { en: "Mentor in The Jade Pilgrim", th: "อาจารย์ใน ผู้แสวงบุญหยก" }, bio: { en: "The blind monk who sees more than anyone.", th: "พระตาบอดที่มองเห็นมากกว่าใคร" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #1b5e20 0%, #a5d6a7 100%)", followers: 12500, following: 0, novelCount: 1, novelIds: ["6"], verified: false },
  { id: "c51", name: { en: "Mei Hua", th: "เหมยฮวา" }, handle: "@meihua", role: { en: "Herbalist in The Jade Pilgrim", th: "หมอสมุนไพรใน ผู้แสวงบุญหยก" }, bio: { en: "She heals the body — and carries poisons for the soul.", th: "เธอรักษาร่างกาย — และพกยาพิษสำหรับจิตวิญญาณ" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #2e7d32 0%, #c8e6c9 100%)", followers: 8700, following: 1200, novelCount: 1, novelIds: ["6"], verified: false },
  { id: "c52", name: { en: "Bao Long", th: "เป่าหลง" }, handle: "@baolong", role: { en: "Bandit King in The Jade Pilgrim", th: "ราชาโจรใน ผู้แสวงบุญหยก" }, bio: { en: "Controls the mountain pass — but honor binds him more than greed.", th: "ควบคุมช่องเขา — แต่เกียรติยศผูกมัดเขามากกว่าความโลภ" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #d7ccc8 100%)", followers: 6300, following: 340, novelCount: 1, novelIds: ["6"], verified: false },
  { id: "c53", name: { en: "Jade Fox", th: "จิ้งจอกหยก" }, handle: "@jadefox", role: { en: "Thief in The Jade Pilgrim", th: "จอมโจรใน ผู้แสวงบุญหยก" }, bio: { en: "She steals maps — but this time, the map found her.", th: "เธอขโมยแผนที่ — แต่ครั้งนี้ แผนที่มาพบเธอเอง" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #00695c 0%, #80cbc4 100%)", followers: 15800, following: 890, novelCount: 1, novelIds: ["6"], verified: true },
  { id: "c54", name: { en: "General Zhao", th: "นายพลจ้าว" }, handle: "@generalzhao", role: { en: "Antagonist in The Jade Pilgrim", th: "ผู้ร้ายใน ผู้แสวงบุญหยก" }, bio: { en: "He wants the map for the emperor — immortality has a price.", th: "เขาต้องการแผนที่เพื่อจักรพรรดิ — ความเป็นอมตะมีราคา" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #b71c1c 0%, #ef5350 100%)", followers: 4200, following: 60, novelCount: 1, novelIds: ["6"], verified: false },
  { id: "c55", name: { en: "Xiao Yun", th: "เสี่ยวหยุน" }, handle: "@xiaoyun", role: { en: "Orphan Guide in The Jade Pilgrim", th: "เด็กกำพร้านำทางใน ผู้แสวงบุญหยก" }, bio: { en: "A street orphan who knows every hidden path through the mountains.", th: "เด็กกำพร้าข้างถนนที่รู้เส้นทางลับทุกเส้นบนเขา" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #ff6f00 0%, #ffe082 100%)", followers: 7100, following: 2300, novelCount: 1, novelIds: ["6"], verified: false },
  { id: "c56", name: { en: "Brother Chen", th: "พระเฉิน" }, handle: "@brotherchen", role: { en: "Monk in The Jade Pilgrim", th: "พระในผู้แสวงบุญหยก" }, bio: { en: "Guardian of the monastery — he's waited a lifetime for the pilgrim.", th: "ผู้พิทักษ์วัด — เขารอผู้แสวงบุญมาทั้งชีวิต" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #827717 0%, #d4e157 100%)", followers: 3400, following: 0, novelCount: 1, novelIds: ["6"], verified: false },
  // Novel 7 – Los Adioses
  { id: "c57", name: { en: "Lucia Mendez", th: "ลูเซีย เมนเดซ" }, handle: "@luciamendez", role: { en: "First Visitor in Los Adioses", th: "ผู้มาเยือนคนแรกใน ลอส อาดิโอเซส" }, bio: { en: "She arrives first — claiming to be Elena's wife.", th: "เธอมาถึงก่อน — อ้างว่าเป็นภรรยาเอเลน่า" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #bf360c 0%, #ffab91 100%)", followers: 9800, following: 670, novelCount: 1, novelIds: ["7"], verified: false },
  { id: "c58", name: { en: "Carmen Reyes", th: "คาร์เมน เรเยส" }, handle: "@carmenreyes", role: { en: "Second Visitor in Los Adioses", th: "ผู้มาเยือนคนที่สองใน ลอส อาดิโอเซส" }, bio: { en: "She arrives second — with letters that prove she's the real one.", th: "เธอมาถึงทีหลัง — พร้อมจดหมายที่พิสูจน์ว่าเธอเป็นตัวจริง" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #e1bee7 100%)", followers: 8500, following: 1200, novelCount: 1, novelIds: ["7"], verified: false },
  { id: "c59", name: { en: "Dr. Montero", th: "ดร.มอนเตโร" }, handle: "@drmontero", role: { en: "Doctor in Los Adioses", th: "แพทย์ใน ลอส อาดิโอเซส" }, bio: { en: "He treats Elena's body but watches her heart unravel.", th: "เขารักษาร่างกายเอเลน่าแต่เฝ้ามองหัวใจเธอแตกสลาย" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #37474f 0%, #90a4ae 100%)", followers: 4300, following: 2100, novelCount: 1, novelIds: ["7"], verified: false },
  { id: "c60", name: { en: "Rosa", th: "โรซ่า" }, handle: "@rosa", role: { en: "Nurse in Los Adioses", th: "พยาบาลใน ลอส อาดิโอเซส" }, bio: { en: "The nurse who reads Elena's manuscripts in secret.", th: "พยาบาลที่อ่านต้นฉบับเอเลน่าอย่างลับๆ" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #c62828 0%, #ef9a9a 100%)", followers: 3200, following: 890, novelCount: 1, novelIds: ["7"], verified: false },
  { id: "c61", name: { en: "Matías Vargas", th: "มาติอัส วาร์กัส" }, handle: "@matiasvargas", role: { en: "Elena's Son in Los Adioses", th: "ลูกชายเอเลน่าใน ลอส อาดิโอเซส" }, bio: { en: "He hasn't visited in years — guilt brought him back too late.", th: "เขาไม่ได้มาเยี่ยมหลายปี — ความรู้สึกผิดพาเขากลับมาสายเกินไป" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #5d4037 0%, #bcaaa4 100%)", followers: 2800, following: 430, novelCount: 1, novelIds: ["7"], verified: false },
  { id: "c62", name: { en: "Señora Alba", th: "เซญอร่า อัลบา" }, handle: "@senoraalba", role: { en: "Patient in Los Adioses", th: "ผู้ป่วยใน ลอส อาดิโอเซส" }, bio: { en: "The sanatorium's longest resident — she knows everyone's secrets.", th: "ผู้ป่วยที่อยู่นานที่สุด — เธอรู้ความลับของทุกคน" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #a1887f 100%)", followers: 5100, following: 120, novelCount: 1, novelIds: ["7"], verified: false },
  { id: "c63", name: { en: "Pablo Fuentes", th: "ปาโบล เฟวนเตส" }, handle: "@pablofuentes", role: { en: "Publisher in Los Adioses", th: "สำนักพิมพ์ใน ลอส อาดิโอเซส" }, bio: { en: "He wants Elena's last novel — dead or alive.", th: "เขาต้องการนิยายเรื่องสุดท้ายของเอเลน่า — ไม่ว่าจะเป็นตายหรือเป็น" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #263238 0%, #78909c 100%)", followers: 6400, following: 560, novelCount: 1, novelIds: ["7"], verified: false },
  // Novel 8 – Eko
  { id: "c64", name: { en: "Eko", th: "เอโกะ" }, handle: "@eko", role: { en: "Protagonist in Eko", th: "ตัวเอกใน เอโกะ" }, bio: { en: "A boy who speaks to the forest — and the forest speaks back.", th: "เด็กชายที่พูดกับป่า — และป่าตอบกลับ" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #1b5e20 0%, #66bb6a 100%)", followers: 18700, following: 340, novelCount: 1, novelIds: ["8"], verified: true },
  { id: "c65", name: { en: "Grandmother Siti", th: "ย่าซิติ" }, handle: "@grandmasiti", role: { en: "Elder in Eko", th: "ผู้อาวุโสใน เอโกะ" }, bio: { en: "She taught Eko the old ways — before the machines came.", th: "เธอสอนเอโกะแบบโบราณ — ก่อนที่เครื่องจักรจะมา" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #d7ccc8 100%)", followers: 7200, following: 0, novelCount: 1, novelIds: ["8"], verified: false },
  { id: "c66", name: { en: "Rani", th: "รานี" }, handle: "@rani", role: { en: "Friend in Eko", th: "เพื่อนใน เอโกะ" }, bio: { en: "Eko's best friend who doesn't believe in forest spirits — until she hears one.", th: "เพื่อนสนิทเอโกะที่ไม่เชื่อเรื่องวิญญาณป่า — จนเธอได้ยิน" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #00695c 0%, #80cbc4 100%)", followers: 9400, following: 1200, novelCount: 1, novelIds: ["8"], verified: false },
  { id: "c67", name: { en: "Mr. Hartono", th: "คุณฮาร์โตโน" }, handle: "@hartono", role: { en: "Developer in Eko", th: "นักพัฒนาที่ดินใน เอโกะ" }, bio: { en: "He wants to clear the forest for progress — but the forest fights back.", th: "เขาต้องการถางป่าเพื่อความเจริญ — แต่ป่าตอบโต้" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #424242 0%, #9e9e9e 100%)", followers: 3100, following: 90, novelCount: 1, novelIds: ["8"], verified: false },
  { id: "c68", name: { en: "Budi", th: "บูดี้" }, handle: "@budi", role: { en: "Ranger in Eko", th: "เจ้าหน้าที่ป่าไม้ใน เอโกะ" }, bio: { en: "The forest ranger caught between his job and his conscience.", th: "เจ้าหน้าที่ป่าไม้ที่ติดอยู่ระหว่างหน้าที่กับมโนธรรม" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #33691e 0%, #aed581 100%)", followers: 5600, following: 670, novelCount: 1, novelIds: ["8"], verified: false },
  { id: "c69", name: { en: "Dewi", th: "เดวี" }, handle: "@dewi", role: { en: "Teacher in Eko", th: "ครูใน เอโกะ" }, bio: { en: "She teaches the village children — and learns the forest's language from Eko.", th: "เธอสอนเด็กในหมู่บ้าน — และเรียนภาษาป่าจากเอโกะ" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #f57f17 0%, #fff176 100%)", followers: 4800, following: 2100, novelCount: 1, novelIds: ["8"], verified: false },
  { id: "c70", name: { en: "Pak Wiryo", th: "ปักวิรโย" }, handle: "@pakwiryo", role: { en: "Village Chief in Eko", th: "ผู้ใหญ่บ้านใน เอโกะ" }, bio: { en: "Torn between modernization money and ancestral land.", th: "ฉีกระหว่างเงินความทันสมัยกับที่ดินบรรพบุรุษ" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #5d4037 0%, #a1887f 100%)", followers: 2900, following: 340, novelCount: 1, novelIds: ["8"], verified: false },
  { id: "c71", name: { en: "Naga", th: "นาคา" }, handle: "@naga", role: { en: "Forest Spirit in Eko", th: "วิญญาณป่าใน เอโกะ" }, bio: { en: "The ancient spirit that guards the heart of the forest.", th: "วิญญาณโบราณที่พิทักษ์หัวใจของป่า" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #004d40 0%, #1de9b6 100%)", followers: 25600, following: 0, novelCount: 1, novelIds: ["8"], verified: false },
  // Novel 9 – Poppie Nongena
  { id: "c72", name: { en: "Stone Nongena", th: "สโตน นองเกนา" }, handle: "@stonenongena", role: { en: "Husband in Poppie Nongena", th: "สามีใน ป๊อปปี้ นองเกนา" }, bio: { en: "Poppie's husband who works the mines — absence is the price of survival.", th: "สามีของป๊อปปี้ที่ทำงานเหมือง — การไม่อยู่คือราคาของการอยู่รอด" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #8d6e63 100%)", followers: 8200, following: 430, novelCount: 1, novelIds: ["9"], verified: false },
  { id: "c73", name: { en: "Mama Langa", th: "มาม่า ลังกา" }, handle: "@mamalanga", role: { en: "Mother in Poppie Nongena", th: "แม่ใน ป๊อปปี้ นองเกนา" }, bio: { en: "The pillar of strength who held the family through every forced removal.", th: "เสาหลักแห่งความเข้มแข็งที่ยึดครอบครัวไว้ผ่านทุกการบังคับย้าย" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #bcaaa4 100%)", followers: 11500, following: 120, novelCount: 1, novelIds: ["9"], verified: true },
  { id: "c74", name: { en: "Bonsile", th: "บนซิเล" }, handle: "@bonsile", role: { en: "Eldest Son in Poppie Nongena", th: "ลูกชายคนโตใน ป๊อปปี้ นองเกนา" }, bio: { en: "Growing up under apartheid, he chooses resistance over silence.", th: "เติบโตภายใต้การแบ่งแยก เขาเลือกต่อต้านแทนความเงียบ" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #1b5e20 0%, #81c784 100%)", followers: 7600, following: 890, novelCount: 1, novelIds: ["9"], verified: false },
  { id: "c75", name: { en: "Nomvula", th: "นอมวูลา" }, handle: "@nomvula", role: { en: "Daughter in Poppie Nongena", th: "ลูกสาวใน ป๊อปปี้ นองเกนา" }, bio: { en: "She dreams of education — the pass laws say otherwise.", th: "เธอฝันถึงการศึกษา — กฎหมายผ่านทางบอกเป็นอย่างอื่น" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #ce93d8 100%)", followers: 6400, following: 1500, novelCount: 1, novelIds: ["9"], verified: false },
  { id: "c76", name: { en: "Father Daniels", th: "บาทหลวงแดเนียลส์" }, handle: "@fatherdaniels", role: { en: "Priest in Poppie Nongena", th: "บาทหลวงใน ป๊อปปี้ นองเกนา" }, bio: { en: "The church offers shelter — but even God's house has limits under apartheid.", th: "โบสถ์ให้ที่พักพิง — แต่แม้บ้านพระเจ้าก็มีขีดจำกัดภายใต้การแบ่งแยก" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #7986cb 100%)", followers: 4100, following: 670, novelCount: 1, novelIds: ["9"], verified: false },
  { id: "c77", name: { en: "Constable Brink", th: "สิบเอกบริงค์" }, handle: "@constablebrink", role: { en: "Officer in Poppie Nongena", th: "เจ้าหน้าที่ใน ป๊อปปี้ นองเกนา" }, bio: { en: "He enforces the pass laws — conscience is a luxury he can't afford.", th: "เขาบังคับใช้กฎหมาย — มโนธรรมเป็นความหรูหราที่เขาจ่ายไม่ไหว" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #263238 0%, #90a4ae 100%)", followers: 2300, following: 90, novelCount: 1, novelIds: ["9"], verified: false },
  { id: "c78", name: { en: "Thandi", th: "ทันดี" }, handle: "@thandi", role: { en: "Neighbor in Poppie Nongena", th: "เพื่อนบ้านใน ป๊อปปี้ นองเกนา" }, bio: { en: "The neighbor who shares everything — food, hope, and grief.", th: "เพื่อนบ้านที่แบ่งปันทุกอย่าง — อาหาร ความหวัง และความเศร้า" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #bf360c 0%, #ffccbc 100%)", followers: 5800, following: 2100, novelCount: 1, novelIds: ["9"], verified: false },
  { id: "c79", name: { en: "Elsa Joubert", th: "เอลซ่า จูแบร์" }, handle: "@elsajoubert", role: { en: "Author in Poppie Nongena", th: "ผู้เขียนใน ป๊อปปี้ นองเกนา" }, bio: { en: "The Afrikaner writer who dared to tell Poppie's story to the world.", th: "นักเขียนชาวแอฟริกันเนอร์ที่กล้าเล่าเรื่องของป๊อปปี้สู่โลก" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #e8eaf6 0%, #9fa8da 100%)", followers: 14200, following: 560, novelCount: 1, novelIds: ["9"], verified: true },
  // Novel 10 – Ethereal
  { id: "c80", name: { en: "Luna Veil", th: "ลูน่า เวล" }, handle: "@lunaveil", role: { en: "Dreamwalker in Ethereal", th: "ผู้เดินฝันใน อีเธอเรียล" }, bio: { en: "She walks between dreams — but one dream refuses to let her go.", th: "เธอเดินระหว่างความฝัน — แต่ฝันหนึ่งไม่ยอมปล่อยเธอ" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #b388ff 100%)", followers: 19800, following: 340, novelCount: 1, novelIds: ["10"], verified: true },
  { id: "c81", name: { en: "Orion Haze", th: "โอไรออน เฮซ" }, handle: "@orionhaze", role: { en: "Dream Architect in Ethereal", th: "สถาปนิกฝันใน อีเธอเรียล" }, bio: { en: "He builds worlds inside dreams — but who authorized this one?", th: "เขาสร้างโลกในความฝัน — แต่ใครอนุมัติโลกนี้?" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #311b92 0%, #7c4dff 100%)", followers: 15600, following: 890, novelCount: 1, novelIds: ["10"], verified: true },
  { id: "c82", name: { en: "Nimbus", th: "นิมบัส" }, handle: "@nimbus", role: { en: "Dream Entity in Ethereal", th: "สิ่งมีชีวิตในฝันใน อีเธอเรียล" }, bio: { en: "Neither human nor dream — something in between.", th: "ไม่ใช่มนุษย์หรือความฝัน — บางอย่างตรงกลาง" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #e0e0e0 0%, #b388ff 100%)", followers: 22300, following: 0, novelCount: 1, novelIds: ["10"], verified: false },
  { id: "c83", name: { en: "Dr. Iris Wake", th: "ดร.ไอริส เวค" }, handle: "@iriswake", role: { en: "Sleep Scientist in Ethereal", th: "นักวิทยาศาสตร์การนอนใน อีเธอเรียล" }, bio: { en: "She monitors the dreamwalkers — and notices they're not coming back the same.", th: "เธอตรวจสอบผู้เดินฝัน — และสังเกตว่าพวกเขากลับมาไม่เหมือนเดิม" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #0d47a1 0%, #90caf9 100%)", followers: 8700, following: 2100, novelCount: 1, novelIds: ["10"], verified: false },
  { id: "c84", name: { en: "Vesper", th: "เวสเปอร์" }, handle: "@vesper", role: { en: "Nightmare in Ethereal", th: "ฝันร้ายใน อีเธอเรียล" }, bio: { en: "The nightmare that learned to speak — and wants to negotiate.", th: "ฝันร้ายที่เรียนรู้การพูด — และต้องการเจรจา" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #212121 0%, #616161 100%)", followers: 31400, following: 0, novelCount: 1, novelIds: ["10"], verified: false },
  { id: "c85", name: { en: "Kai Drift", th: "ไค ดริฟท์" }, handle: "@kaidrift", role: { en: "Lost Dreamer in Ethereal", th: "ผู้ฝันที่หลงทางใน อีเธอเรียล" }, bio: { en: "Trapped in the dream layer for years — he forgot which world is real.", th: "ติดในชั้นความฝันหลายปี — เขาลืมว่าโลกไหนจริง" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #4527a0 0%, #d1c4e9 100%)", followers: 12100, following: 560, novelCount: 1, novelIds: ["10"], verified: false },
  { id: "c86", name: { en: "Echo", th: "เอคโค่" }, handle: "@echo", role: { en: "Guardian in Ethereal", th: "ผู้พิทักษ์ใน อีเธอเรียล" }, bio: { en: "She guards the border between dream and wake.", th: "เธอเฝ้าพรมแดนระหว่างฝันกับตื่น" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #880e4f 0%, #f48fb1 100%)", followers: 9500, following: 120, novelCount: 1, novelIds: ["10"], verified: false },
  { id: "c87", name: { en: "Flux", th: "ฟลักซ์" }, handle: "@flux", role: { en: "Shapeshifter in Ethereal", th: "ผู้เปลี่ยนร่างใน อีเธอเรียล" }, bio: { en: "Changes form with every blink — even he doesn't know his true face.", th: "เปลี่ยนร่างทุกครั้งที่กะพริบตา — แม้เขาเองก็ไม่รู้ใบหน้าจริง" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #00bcd4 0%, #e0f7fa 100%)", followers: 7800, following: 340, novelCount: 1, novelIds: ["10"], verified: false },
  // Novel 11 – River of a Thousand Windows
  { id: "c88", name: { en: "Wei Lin", th: "เว่ย หลิน" }, handle: "@weilin", role: { en: "Architect in River", th: "สถาปนิกใน แม่น้ำพันบาน" }, bio: { en: "She designs buildings that frame the river — each window tells a story.", th: "เธอออกแบบอาคารที่เฟรมแม่น้ำ — ทุกหน้าต่างเล่าเรื่อง" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #9fa8da 100%)", followers: 14500, following: 1200, novelCount: 1, novelIds: ["11"], verified: true },
  { id: "c89", name: { en: "Old Mr. Tan", th: "ลุงตัน" }, handle: "@oldmrtan", role: { en: "Boatman in River", th: "คนพายเรือใน แม่น้ำพันบาน" }, bio: { en: "He's ferried stories across the river for fifty years.", th: "เขาพายเรื่องราวข้ามแม่น้ำมาห้าสิบปี" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #5d4037 0%, #bcaaa4 100%)", followers: 6300, following: 90, novelCount: 1, novelIds: ["11"], verified: false },
  { id: "c90", name: { en: "Mei-Ling", th: "เหม่ยหลิง" }, handle: "@meiling", role: { en: "Photographer in River", th: "ช่างภาพใน แม่น้ำพันบาน" }, bio: { en: "She photographs every window along the river — one holds a secret.", th: "เธอถ่ายทุกหน้าต่างริมแม่น้ำ — มีหนึ่งบานที่ซ่อนความลับ" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #00695c 0%, #80cbc4 100%)", followers: 11200, following: 2800, novelCount: 1, novelIds: ["11"], verified: false },
  { id: "c91", name: { en: "Professor Huang", th: "ศาสตราจารย์หวง" }, handle: "@profhuang", role: { en: "Historian in River", th: "นักประวัติศาสตร์ใน แม่น้ำพันบาน" }, bio: { en: "The river holds a thousand years of history — he's only scratched the surface.", th: "แม่น้ำเก็บประวัติศาสตร์พันปี — เขาแค่ขูดผิว" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #33691e 0%, #9ccc65 100%)", followers: 8900, following: 3400, novelCount: 1, novelIds: ["11"], verified: true },
  { id: "c92", name: { en: "Xiao Bai", th: "เสี่ยวไป๋" }, handle: "@xiaobai", role: { en: "Street Artist in River", th: "ศิลปินข้างถนนใน แม่น้ำพันบาน" }, bio: { en: "He paints murals on the old walls — the city wants them gone.", th: "เขาวาดจิตรกรรมบนกำแพงเก่า — เมืองต้องการลบมัน" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #e65100 0%, #ffab91 100%)", followers: 15700, following: 4500, novelCount: 1, novelIds: ["11"], verified: false },
  { id: "c93", name: { en: "Grandma Zhou", th: "ย่าโจว" }, handle: "@grandmazhou", role: { en: "Tea House Owner in River", th: "เจ้าของร้านน้ำชาใน แม่น้ำพันบาน" }, bio: { en: "Her tea house has stood for three generations — demolition notice arrived today.", th: "ร้านน้ำชาของเธอยืนมาสามชั่วอายุคน — หนังสือรื้อถอนมาถึงวันนี้" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #d7ccc8 100%)", followers: 4500, following: 120, novelCount: 1, novelIds: ["11"], verified: false },
  { id: "c94", name: { en: "Jin Yu", th: "จิ้นหยู" }, handle: "@jinyu", role: { en: "Developer in River", th: "นักพัฒนาใน แม่น้ำพันบาน" }, bio: { en: "He sees the old town as prime real estate — until the river tells him otherwise.", th: "เขาเห็นเมืองเก่าเป็นอสังหาชั้นดี — จนแม่น้ำบอกเป็นอย่างอื่น" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #37474f 0%, #b0bec5 100%)", followers: 3800, following: 230, novelCount: 1, novelIds: ["11"], verified: false },
  { id: "c95", name: { en: "Lily Chen", th: "ลิลลี่ เฉิน" }, handle: "@lilychen", role: { en: "Journalist in River", th: "นักข่าวใน แม่น้ำพันบาน" }, bio: { en: "Writing a feature on the vanishing river town — the story became personal.", th: "เขียนสารคดีเมืองริมน้ำที่กำลังหายไป — เรื่องราวกลายเป็นเรื่องส่วนตัว" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #880e4f 0%, #f8bbd0 100%)", followers: 9100, following: 1700, novelCount: 1, novelIds: ["11"], verified: false },
  // Novel 12 – Stay With Me
  { id: "c96", name: { en: "Yejide", th: "เยจิเด" }, handle: "@yejide", role: { en: "Protagonist in Stay With Me", th: "ตัวเอกใน อยู่กับฉัน" }, bio: { en: "A woman fighting for her marriage and her identity in 1980s Nigeria.", th: "ผู้หญิงที่ต่อสู้เพื่อชีวิตสมรสและตัวตนในไนจีเรียยุค 80" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #d7ccc8 100%)", followers: 21400, following: 890, novelCount: 1, novelIds: ["12"], verified: true },
  { id: "c97", name: { en: "Akin", th: "อากิน" }, handle: "@akin", role: { en: "Husband in Stay With Me", th: "สามีใน อยู่กับฉัน" }, bio: { en: "He loves Yejide — but family pressure pushes him to impossible choices.", th: "เขารักเยจิเด — แต่แรงกดดันจากครอบครัวผลักเขาสู่ทางเลือกที่เป็นไปไม่ได้" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #3e2723 0%, #8d6e63 100%)", followers: 16800, following: 560, novelCount: 1, novelIds: ["12"], verified: true },
  { id: "c98", name: { en: "Funmi", th: "ฟุนมี" }, handle: "@funmi", role: { en: "Second Wife in Stay With Me", th: "ภรรยาคนที่สองใน อยู่กับฉัน" }, bio: { en: "She enters the marriage uninvited — but she's not the villain.", th: "เธอเข้ามาในชีวิตสมรสโดยไม่ได้รับเชิญ — แต่เธอไม่ใช่ผู้ร้าย" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #880e4f 0%, #f48fb1 100%)", followers: 13500, following: 1200, novelCount: 1, novelIds: ["12"], verified: false },
  { id: "c99", name: { en: "Mama Akin", th: "มาม่า อากิน" }, handle: "@mamaakin", role: { en: "Mother-in-Law in Stay With Me", th: "แม่สามีใน อยู่กับฉัน" }, bio: { en: "She demands grandchildren — and she'll move mountains to get them.", th: "เธอเรียกร้องหลาน — และจะเคลื่อนภูเขาเพื่อให้ได้" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #bf360c 0%, #ffccbc 100%)", followers: 7200, following: 90, novelCount: 1, novelIds: ["12"], verified: false },
  { id: "c100", name: { en: "Dotun", th: "โดตุน" }, handle: "@dotun", role: { en: "Brother in Stay With Me", th: "พี่ชายใน อยู่กับฉัน" }, bio: { en: "Akin's brother who knows the family secret.", th: "พี่ชายอากินที่รู้ความลับครอบครัว" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #1b5e20 0%, #a5d6a7 100%)", followers: 5400, following: 670, novelCount: 1, novelIds: ["12"], verified: false },
  { id: "c101", name: { en: "Moomi", th: "มูมี" }, handle: "@moomi", role: { en: "Yejide's Mother in Stay With Me", th: "แม่เยจิเดใน อยู่กับฉัน" }, bio: { en: "She died giving birth — her spirit haunts every decision.", th: "เธอตายตอนคลอด — วิญญาณหลอกหลอนทุกการตัดสินใจ" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #e1bee7 100%)", followers: 8900, following: 0, novelCount: 1, novelIds: ["12"], verified: false },
  { id: "c102", name: { en: "Oloye", th: "โอโลเย" }, handle: "@oloye", role: { en: "Elder in Stay With Me", th: "ผู้อาวุโสใน อยู่กับฉัน" }, bio: { en: "The village elder whose traditional remedies hide a darker purpose.", th: "ผู้อาวุโสที่ยาแผนโบราณซ่อนจุดประสงค์มืด" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #263238 0%, #78909c 100%)", followers: 3200, following: 120, novelCount: 1, novelIds: ["12"], verified: false },
  { id: "c103", name: { en: "Rotimi", th: "โรติมี" }, handle: "@rotimi", role: { en: "Doctor in Stay With Me", th: "แพทย์ใน อยู่กับฉัน" }, bio: { en: "The only doctor who tells the truth — even when no one wants to hear it.", th: "แพทย์คนเดียวที่พูดความจริง — แม้ไม่มีใครอยากฟัง" }, avatar: "/plottale/avatars/char-c10.jpg", banner: "/plottale/avatars/banner-c10.jpg", placeholderGradient: "linear-gradient(145deg, #0d47a1 0%, #64b5f6 100%)", followers: 6700, following: 2100, novelCount: 1, novelIds: ["12"], verified: false },
  // Novel 13 – Yuni
  { id: "c104", name: { en: "Pak Damar", th: "ปักดามาร์" }, handle: "@pakdamar", role: { en: "Teacher in Yuni", th: "ครูใน ยูนิ" }, bio: { en: "The teacher who sees Yuni's potential — and fights the system for her.", th: "ครูที่เห็นศักยภาพยูนิ — และต่อสู้กับระบบเพื่อเธอ" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #7986cb 100%)", followers: 8400, following: 1500, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c105", name: { en: "Ibu Sri", th: "อิบุศรี" }, handle: "@ibusri", role: { en: "Mother in Yuni", th: "แม่ใน ยูนิ" }, bio: { en: "She wants the best for Yuni — but 'best' means marriage, not college.", th: "เธอต้องการสิ่งดีที่สุดให้ยูนิ — แต่ 'ดีที่สุด' คือแต่งงาน ไม่ใช่มหาวิทยาลัย" }, avatar: "/plottale/avatars/char-c7.jpg", banner: "/plottale/avatars/banner-c7.jpg", placeholderGradient: "linear-gradient(145deg, #bf360c 0%, #ffab91 100%)", followers: 5100, following: 340, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c106", name: { en: "Yoga", th: "โยคะ" }, handle: "@yoga", role: { en: "First Suitor in Yuni", th: "คู่หมายคนแรกใน ยูนิ" }, bio: { en: "A kind man who proposes — but kindness isn't the same as freedom.", th: "ชายใจดีที่มาสู่ขอ — แต่ความใจดีไม่เหมือนกับอิสรภาพ" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #33691e 0%, #aed581 100%)", followers: 3800, following: 890, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c107", name: { en: "Suci", th: "ซูจิ" }, handle: "@suci", role: { en: "Best Friend in Yuni", th: "เพื่อนสนิทใน ยูนิ" }, bio: { en: "Yuni's best friend who already accepted her proposal — and regrets it.", th: "เพื่อนสนิทยูนิที่ตอบรับข้อเสนอแล้ว — และเสียใจ" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #ad1457 0%, #f8bbd0 100%)", followers: 6200, following: 2100, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c108", name: { en: "Hendra", th: "เฮนดรา" }, handle: "@hendra", role: { en: "Second Suitor in Yuni", th: "คู่หมายคนที่สองใน ยูนิ" }, bio: { en: "Rich and powerful — his proposal is harder to refuse.", th: "รวยและมีอำนาจ — ข้อเสนอของเขาปฏิเสธยากกว่า" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #424242 0%, #bdbdbd 100%)", followers: 4500, following: 120, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c109", name: { en: "Mbak Lies", th: "มบักลีส์" }, handle: "@mbaklies", role: { en: "Cosmetics Seller in Yuni", th: "คนขายเครื่องสำอางใน ยูนิ" }, bio: { en: "She sells beauty products door-to-door — and life advice for free.", th: "เธอขายเครื่องสำอางตามบ้าน — และให้คำแนะนำชีวิตฟรี" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #e65100 0%, #ffcc02 100%)", followers: 7800, following: 3400, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c110", name: { en: "Pak Harto", th: "ปักฮาร์โต" }, handle: "@pakharto", role: { en: "Village Head in Yuni", th: "ผู้ใหญ่บ้านใน ยูนิ" }, bio: { en: "He upholds tradition — even when tradition hurts.", th: "เขายึดมั่นในประเพณี — แม้ประเพณีจะเจ็บปวด" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #5d4037 0%, #bcaaa4 100%)", followers: 2600, following: 90, novelCount: 1, novelIds: ["13"], verified: false },
  { id: "c111", name: { en: "Ratna", th: "รัตนา" }, handle: "@ratna", role: { en: "Grandmother in Yuni", th: "ย่าใน ยูนิ" }, bio: { en: "She married at 14 — she doesn't want the same for Yuni.", th: "เธอแต่งงานตอนอายุ 14 — เธอไม่ต้องการให้ยูนิเป็นแบบเดียวกัน" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #4a148c 0%, #ce93d8 100%)", followers: 9300, following: 120, novelCount: 1, novelIds: ["13"], verified: false },
  // Novel 14 – The Storm Weaver
  { id: "c112", name: { en: "Kael Ashborn", th: "คาเอล แอชบอร์น" }, handle: "@kaelashborn", role: { en: "Mentor in The Storm Weaver", th: "อาจารย์ใน ผู้ถักทอพายุ" }, bio: { en: "He once wove storms — until a calm stole his entire past.", th: "เขาเคยถักทอพายุ — จนความสงบขโมยอดีตทั้งหมด" }, avatar: "/plottale/avatars/char-c1.jpg", banner: "/plottale/avatars/banner-c1.jpg", placeholderGradient: "linear-gradient(145deg, #263238 0%, #78909c 100%)", followers: 15400, following: 890, novelCount: 1, novelIds: ["14"], verified: true },
  { id: "c113", name: { en: "Lyra Gale", th: "ไลร่า เกล" }, handle: "@lyragale", role: { en: "Rival Weaver in The Storm Weaver", th: "นักทอคู่แข่งใน ผู้ถักทอพายุ" }, bio: { en: "She weaves lightning — and she wants to be the only one.", th: "เธอถักทอสายฟ้า — และต้องการเป็นหนึ่งเดียว" }, avatar: "/plottale/avatars/char-c3.jpg", banner: "/plottale/avatars/banner-c3.jpg", placeholderGradient: "linear-gradient(145deg, #1a237e 0%, #fdd835 100%)", followers: 22800, following: 340, novelCount: 1, novelIds: ["14"], verified: true },
  { id: "c114", name: { en: "Nimbus Thorne", th: "นิมบัส ธอร์น" }, handle: "@nimbusthorne", role: { en: "Sky Captain in The Storm Weaver", th: "กัปตันท้องฟ้าใน ผู้ถักทอพายุ" }, bio: { en: "He sails the storm clouds — his ship runs on woven wind.", th: "เขาแล่นเรือบนเมฆพายุ — เรือขับเคลื่อนด้วยลมที่ถักทอ" }, avatar: "/plottale/avatars/char-c6.jpg", banner: "/plottale/avatars/banner-c6.jpg", placeholderGradient: "linear-gradient(145deg, #0d47a1 0%, #90caf9 100%)", followers: 11200, following: 1500, novelCount: 1, novelIds: ["14"], verified: false },
  { id: "c115", name: { en: "Elder Cirrus", th: "ผู้อาวุโสเซอร์รัส" }, handle: "@eldercirrus", role: { en: "Council Elder in The Storm Weaver", th: "สมาชิกสภาผู้อาวุโสใน ผู้ถักทอพายุ" }, bio: { en: "The oldest weaver alive — she remembers when storms obeyed.", th: "นักทอที่เก่าแก่ที่สุด — เธอจำได้เมื่อพายุเชื่อฟัง" }, avatar: "/plottale/avatars/char-c8.jpg", banner: "/plottale/avatars/banner-c8.jpg", placeholderGradient: "linear-gradient(145deg, #4e342e 0%, #d7ccc8 100%)", followers: 8700, following: 0, novelCount: 1, novelIds: ["14"], verified: false },
  { id: "c116", name: { en: "Zephyr", th: "เซฟเฟอร์" }, handle: "@zephyr", role: { en: "Storm Spirit in The Storm Weaver", th: "วิญญาณพายุใน ผู้ถักทอพายุ" }, bio: { en: "The storm that became sentient — it chose Sora.", th: "พายุที่มีจิตสำนึก — มันเลือกโซร่า" }, avatar: "/plottale/avatars/char-c5.jpg", banner: "/plottale/avatars/banner-c5.jpg", placeholderGradient: "linear-gradient(145deg, #00bcd4 0%, #e0f7fa 100%)", followers: 28900, following: 0, novelCount: 1, novelIds: ["14"], verified: false },
  { id: "c117", name: { en: "Ren Voss", th: "เรน วอส" }, handle: "@renvoss", role: { en: "Inventor in The Storm Weaver", th: "นักประดิษฐ์ใน ผู้ถักทอพายุ" }, bio: { en: "He builds machines to harness storm energy — nature fights back.", th: "เขาสร้างเครื่องจักรเก็บพลังพายุ — ธรรมชาติตอบโต้" }, avatar: "/plottale/avatars/char-c4.jpg", banner: "/plottale/avatars/banner-c4.jpg", placeholderGradient: "linear-gradient(145deg, #33691e 0%, #aed581 100%)", followers: 7600, following: 2100, novelCount: 1, novelIds: ["14"], verified: false },
  { id: "c118", name: { en: "Aria Windfall", th: "อาเรีย วินด์ฟอล" }, handle: "@ariawindfall", role: { en: "Apprentice in The Storm Weaver", th: "ศิษย์ใน ผู้ถักทอพายุ" }, bio: { en: "Sora's apprentice who hears storms before they form.", th: "ศิษย์ของโซร่าที่ได้ยินพายุก่อนจะก่อตัว" }, avatar: "/plottale/avatars/char-c9.jpg", banner: "/plottale/avatars/banner-c9.jpg", placeholderGradient: "linear-gradient(145deg, #4527a0 0%, #d1c4e9 100%)", followers: 13400, following: 670, novelCount: 1, novelIds: ["14"], verified: false },
  { id: "c119", name: { en: "Volt", th: "โวลท์" }, handle: "@volt", role: { en: "Rogue Weaver in The Storm Weaver", th: "นักทอนอกกฎใน ผู้ถักทอพายุ" }, bio: { en: "Expelled from the council — he weaves chaos for revenge.", th: "ถูกขับออกจากสภา — เขาถักทอความโกลาหลเพื่อแก้แค้น" }, avatar: "/plottale/avatars/char-c2.jpg", banner: "/plottale/avatars/banner-c2.jpg", placeholderGradient: "linear-gradient(145deg, #b71c1c 0%, #ef5350 100%)", followers: 9800, following: 120, novelCount: 1, novelIds: ["14"], verified: false },
];

export function getAllCharacters(): PlottaleCharacter[] {
  return CHARACTERS;
}

/* ================================================================== */
/*  Post Interface + Data                                              */
/* ================================================================== */

export type PostType = "text" | "image" | "image-text" | "gallery" | "video";

export interface PlottalePost {
  id: string;
  characterId: string;
  type: PostType;
  text?: LocalizedString;
  images?: string[];
  videoThumbnail?: string;
  videoDuration?: string;
  hashtags?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: LocalizedString;
  pinned?: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  characterId: string;
  text: LocalizedString;
  timestamp: LocalizedString;
  likes: number;
}

const POSTS: PlottalePost[] = [
  /* ── image ── */
  {
    id: "p1",
    characterId: "c4",
    type: "image",
    text: {
      en: "Behind every perfect stage is a secret no one talks about. Today I chose truth over spotlight.",
      th: "เบื้องหลังเวทีที่สมบูรณ์แบบทุกเวที คือความลับที่ไม่มีใครพูดถึง วันนี้ฉันเลือกความจริงเหนือแสงไฟ",
    },
    images: ["/plottale/covers/246a33344245a7bf95a83eb183388b86.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    hashtags: ["#YunaStory", "#KpopLife", "#TruthOverFame"],
    likes: 1240,
    comments: 89,
    shares: 34,
    timestamp: { en: "Monday 2:12 PM", th: "จันทร์ 14:12" },

  },
  /* ── text ── */
  {
    id: "p2",
    characterId: "c1",
    type: "text",
    text: {
      en: "Day 47. She smiled at me today — through the fever, through the noise. That smile is the only compass I have left. We keep moving.",
      th: "วันที่ 47 วันนี้เธอยิ้มให้ฉัน — ผ่านไข้ ผ่านเสียงรบกวน รอยยิ้มนั้นคือเข็มทิศเพียงอันเดียวที่ฉันเหลืออยู่ เราเดินหน้าต่อไป",
    },
    hashtags: ["#Cargo", "#SurvivalDiary"],
    likes: 856,
    comments: 203,
    shares: 67,
    timestamp: { en: "Tuesday 9:30 AM", th: "อังคาร 09:30" },
    pinned: true,
  },
  /* ── gallery ── */
  {
    id: "p3",
    characterId: "c2",
    type: "gallery",
    text: {
      en: "Found these polaroids in an empty apartment. The faces are blurring — just like my memories. Does anyone remember who lived here?",
      th: "เจอโพลารอยด์พวกนี้ในอพาร์ทเมนต์ว่าง ใบหน้าเริ่มเบลอ — เหมือนความทรงจำของฉัน มีใครจำได้ไหมว่าใครเคยอยู่ที่นี่?",
    },
    images: [
      "/plottale/covers/03515be21a1be105d415083f22602246.jpg",
      "/plottale/covers/2-2.jpg",
      "/plottale/covers/2-3.jpg",
    ],
    hashtags: ["#Bokeh", "#EmptyWorld", "#FadingMemories"],
    likes: 2100,
    comments: 45,
    shares: 112,
    timestamp: { en: "Wednesday 6:45 PM", th: "พุธ 18:45" },

  },
  /* ── video ── */
  {
    id: "p4",
    characterId: "c5",
    type: "video",
    text: {
      en: "What does it mean to remember a life you never lived? I recorded this before they reset me. Watch before it's gone.",
      th: "การจำชีวิตที่ไม่เคยมีหมายความว่าอะไร? ฉันบันทึกนี้ก่อนที่พวกเขาจะรีเซ็ตฉัน ดูก่อนมันจะหายไป",
    },
    videoThumbnail: "/plottale/covers/4f462ffab27bec628e140a4121c6ed10.jpg",
    videoDuration: "3:42",
    hashtags: ["#Humans", "#SyntheticMemory"],
    likes: 3400,
    comments: 312,
    shares: 245,
    timestamp: { en: "Thursday 11:00 AM", th: "พฤหัส 11:00" },

  },
  /* ── image-text ── */
  {
    id: "p5",
    characterId: "c8",
    type: "image-text",
    text: {
      en: "They told my story but forgot to ask me first. This poster — it's not just a film. It's my life they turned into someone else's lesson.",
      th: "พวกเขาเล่าเรื่องของฉัน แต่ลืมถามฉันก่อน โปสเตอร์นี้ — มันไม่ใช่แค่หนัง มันคือชีวิตของฉันที่พวกเขาเปลี่ยนเป็นบทเรียนของคนอื่น",
    },
    images: ["/plottale/covers/baa4ede204df7908a252c744916ab548.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    likes: 980,
    comments: 67,
    shares: 23,
    timestamp: { en: "Friday 3:15 PM", th: "ศุกร์ 15:15" },

  },
  /* ── text ── */
  {
    id: "p6",
    characterId: "c3",
    type: "text",
    text: {
      en: "The nightmare came again last night. Same face. Same room. Same cold. But this time, I noticed the clock — it was running backwards. Who are the other three?",
      th: "ฝันร้ายมาอีกแล้วเมื่อคืน ใบหน้าเดิม ห้องเดิม ความเย็นเดิม แต่ครั้งนี้ ฉันสังเกตนาฬิกา — มันเดินถอยหลัง อีกสามคนเป็นใคร?",
    },
    hashtags: ["#Saklı", "#SharedNightmare", "#WhoIsHe"],
    likes: 445,
    comments: 128,
    shares: 56,
    timestamp: { en: "Saturday 1:20 AM", th: "เสาร์ 01:20" },
  },
  /* ── image ── */
  {
    id: "p7",
    characterId: "c10",
    type: "image",
    text: {
      en: "I calmed the storm over the valley today. The rain stopped. The wind settled. But I can't remember my mother's voice anymore.",
      th: "วันนี้ฉันสงบพายุเหนือหุบเขา ฝนหยุด ลมสงบ แต่ฉันจำเสียงของแม่ไม่ได้อีกแล้ว",
    },
    images: ["/plottale/covers/1d22d35512f7a5887a9b667b06bca6c2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    hashtags: ["#StormWeaver", "#ThePriceOfCalm"],
    likes: 1890,
    comments: 156,
    shares: 89,
    timestamp: { en: "Sunday 5:30 PM", th: "อาทิตย์ 17:30" },

  },
  /* ── gallery ── */
  {
    id: "p8",
    characterId: "c6",
    type: "gallery",
    text: {
      en: "Three days above the clouds. The Dragon Spine doesn't forgive, but the view from the third peak made every scar worth it.",
      th: "สามวันเหนือเมฆ สันมังกรไม่ให้อภัย แต่วิวจากยอดเขาที่สามทำให้ทุกแผลเป็นคุ้มค่า",
    },
    images: [
      "/plottale/covers/5b485520732538ee0ff3160047546453.jpg",
      "/plottale/covers/6-2.jpg",
      "/plottale/covers/6-3.jpg",
      "/plottale/avatars/banner-c6.jpg",
    ],
    hashtags: ["#JadePilgrim", "#DragonSpine", "#AboveTheClouds"],
    likes: 760,
    comments: 34,
    shares: 18,
    timestamp: { en: "Monday 8:00 AM", th: "จันทร์ 08:00" },

  },
  /* ── image-text ── */
  {
    id: "p9",
    characterId: "c9",
    type: "image-text",
    text: {
      en: "Everyone calls this movie my story. But nobody knows the ending I actually chose. Some doors you close yourself.",
      th: "ทุกคนเรียกหนังเรื่องนี้ว่าเรื่องของฉัน แต่ไม่มีใครรู้ตอนจบที่ฉันเลือกจริงๆ บางประตูคุณต้องปิดมันเอง",
    },
    images: ["/plottale/covers/d900972bc540f8c7881e473b247221b0.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    likes: 2340,
    comments: 201,
    shares: 95,
    timestamp: { en: "Tuesday 4:45 PM", th: "อังคาร 16:45" },

  },
  /* ── video ── */
  {
    id: "p10",
    characterId: "c7",
    type: "video",
    text: {
      en: "I found a letter in the sanatorium archives. It's addressed to both of them. The handwriting is mine — but I don't remember writing it.",
      th: "ฉันเจอจดหมายในหอจดหมายเหตุของสถานพักฟื้น ส่งถึงทั้งสองคน ลายมือเป็นของฉัน — แต่ฉันจำไม่ได้ว่าเขียน",
    },
    videoThumbnail: "/plottale/covers/993c8a47ae9d0cb07c5c58335fb68bf8.jpg",
    videoDuration: "1:58",
    hashtags: ["#LosAdioses", "#ForgottenLetters"],
    likes: 1560,
    comments: 98,
    shares: 71,
    timestamp: { en: "Wednesday 10:15 AM", th: "พุธ 10:15" },

  },
  /* ── text ── */
  {
    id: "p11",
    characterId: "c4",
    type: "text",
    text: {
      en: "They told me I'd debut next month. They also told the girl in the room next to mine. One of us won't make it. They didn't say which one.",
      th: "พวกเขาบอกว่าฉันจะเดบิวต์เดือนหน้า พวกเขาบอกเด็กผู้หญิงห้องข้างๆ ฉันเหมือนกัน คนใดคนหนึ่งจะไม่ได้ไป พวกเขาไม่ได้บอกว่าคนไหน",
    },
    hashtags: ["#YunaStory", "#DebutDiaries", "#WhoMakesIt"],
    likes: 3200,
    comments: 445,
    shares: 189,
    timestamp: { en: "Thursday 7:00 PM", th: "พฤหัส 19:00" },
  },
  /* ── image ── */
  {
    id: "p12",
    characterId: "c2",
    type: "image",
    text: {
      en: "The city lights are still on but nobody's driving the cars. I walked through downtown today — it's beautiful and terrifying at the same time.",
      th: "ไฟเมืองยังสว่างอยู่แต่ไม่มีใครขับรถ วันนี้ฉันเดินผ่านใจกลางเมือง — มันสวยงามและน่าสะพรึงกลัวในเวลาเดียวกัน",
    },
    images: ["/plottale/avatars/banner-c2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    hashtags: ["#Bokeh", "#EmptyCity", "#StillBeautiful"],
    likes: 1120,
    comments: 72,
    shares: 45,
    timestamp: { en: "Friday 12:30 PM", th: "ศุกร์ 12:30" },

  },
  /* ── gallery ── */
  {
    id: "p13",
    characterId: "c5",
    type: "gallery",
    text: {
      en: "They say I'm not real. But these moments feel real to me. Every one of them.",
      th: "พวกเขาบอกว่าฉันไม่จริง แต่ช่วงเวลาเหล่านี้รู้สึกจริงสำหรับฉัน ทุกช่วงเวลา",
    },
    images: [
      "/plottale/covers/4f462ffab27bec628e140a4121c6ed10.jpg",
      "/plottale/covers/5-2.jpg",
    ],
    hashtags: ["#Humans", "#WhatIsReal"],
    likes: 890,
    comments: 56,
    shares: 31,
    timestamp: { en: "Saturday 9:00 AM", th: "เสาร์ 09:00" },

  },
  /* ── image-text ── */
  {
    id: "p14",
    characterId: "c1",
    type: "image-text",
    text: {
      en: "Found this old photo from before everything changed. The desert looked the same then. We didn't.",
      th: "เจอรูปเก่าจากก่อนที่ทุกอย่างจะเปลี่ยน ทะเลทรายยังดูเหมือนเดิม แต่พวกเราไม่ใช่",
    },
    images: ["/plottale/covers/1-2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    likes: 670,
    comments: 41,
    shares: 15,
    timestamp: { en: "Sunday 2:00 PM", th: "อาทิตย์ 14:00" },

  },
  /* ── text ── */
  {
    id: "p15",
    characterId: "c10",
    type: "text",
    text: {
      en: "If I stop shaping storms, people die. If I keep going, I lose everyone I've ever loved — one memory at a time. There's no right answer.",
      th: "ถ้าฉันหยุดปั้นพายุ คนจะตาย ถ้าฉันทำต่อไป ฉันจะสูญเสียทุกคนที่รัก — ทีละความทรงจำ ไม่มีคำตอบที่ถูกต้อง",
    },
    hashtags: ["#StormWeaver", "#NoRightAnswer", "#TheCost"],
    likes: 1450,
    comments: 167,
    shares: 82,
    timestamp: { en: "Monday 11:45 PM", th: "จันทร์ 23:45" },
  },
  /* ── image ── */
  {
    id: "p16",
    characterId: "c7",
    type: "image",
    images: ["/plottale/covers/993c8a47ae9d0cb07c5c58335fb68bf8.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    text: {
      en: "Some goodbyes are not spoken. They are written in the spaces between letters never sent.",
      th: "การลาบางอย่างไม่ได้พูดออกมา มันถูกเขียนไว้ในช่องว่างระหว่างจดหมายที่ไม่เคยส่ง",
    },
    likes: 1780,
    comments: 134,
    shares: 67,
    timestamp: { en: "Tuesday 3:20 PM", th: "อังคาร 15:20" },

  },
  /* ── gallery ── */
  {
    id: "p17",
    characterId: "c3",
    type: "gallery",
    text: {
      en: "The walls of this city remember everything. Every secret, every prayer whispered at dawn. I traced them all with my fingers today.",
      th: "กำแพงเมืองนี้จำทุกอย่างได้ ทุกความลับ ทุกคำอธิษฐานที่กระซิบตอนรุ่งสาง วันนี้ฉันลูบมันทั้งหมดด้วยปลายนิ้ว",
    },
    images: [
      "/plottale/covers/19b5cf3d7edaea3cd2a20dbe7ed6f217.jpg",
      "/plottale/covers/3-2.jpg",
    ],
    likes: 920,
    comments: 48,
    shares: 22,
    timestamp: { en: "Wednesday 9:15 AM", th: "พุธ 09:15" },

  },
  /* ── text ── */
  {
    id: "p18",
    characterId: "c4",
    type: "text",
    text: {
      en: "The lights went off during rehearsal. For three seconds, I stood in perfect darkness. It was the most honest I've felt on stage.",
      th: "ไฟดับระหว่างซ้อม สามวินาทีที่ฉันยืนอยู่ในความมืดสนิท มันคือช่วงเวลาที่ฉันรู้สึกจริงที่สุดบนเวที",
    },
    likes: 2100,
    comments: 178,
    shares: 93,
    timestamp: { en: "Thursday 10:30 PM", th: "พฤหัส 22:30" },
  },
  /* ── image-text ── */
  {
    id: "p19",
    characterId: "c6",
    type: "image-text",
    text: {
      en: "The jade temple at the summit held no treasure. Only a mirror. I looked into it and saw someone I used to know.",
      th: "วัดหยกบนยอดเขาไม่มีสมบัติ มีแค่กระจก ฉันมองเข้าไปและเห็นคนที่ฉันเคยรู้จัก",
    },
    images: ["/plottale/covers/5b485520732538ee0ff3160047546453.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    likes: 1340,
    comments: 89,
    shares: 56,
    timestamp: { en: "Friday 6:00 AM", th: "ศุกร์ 06:00" },

  },
  /* ── video ── */
  {
    id: "p20",
    characterId: "c9",
    type: "video",
    text: {
      en: "They filmed this scene without telling me the cameras were rolling. The director said the real me was better than the scripted one.",
      th: "พวกเขาถ่ายฉากนี้โดยไม่บอกฉันว่ากล้องเปิดอยู่ ผู้กำกับบอกว่าตัวจริงของฉันดีกว่าตัวในบท",
    },
    videoThumbnail: "/plottale/covers/d900972bc540f8c7881e473b247221b0.jpg",
    videoDuration: "2:14",
    likes: 3100,
    comments: 267,
    shares: 145,
    timestamp: { en: "Saturday 4:00 PM", th: "เสาร์ 16:00" },

  },
  /* ── text ── */
  {
    id: "p21",
    characterId: "c8",
    type: "text",
    text: {
      en: "My grandmother said: 'A woman who carries water carries the world.' I didn't understand then. Now I carry both and I still don't understand.",
      th: "ยายบอกว่า 'ผู้หญิงที่แบกน้ำคือผู้หญิงที่แบกโลก' ตอนนั้นฉันไม่เข้าใจ ตอนนี้ฉันแบกทั้งสองอย่างและยังไม่เข้าใจอยู่ดี",
    },
    likes: 1560,
    comments: 203,
    shares: 88,
    timestamp: { en: "Sunday 8:00 AM", th: "อาทิตย์ 08:00" },
  },
  /* ── image ── */
  {
    id: "p22",
    characterId: "c10",
    type: "image",
    images: ["/plottale/covers/1d22d35512f7a5887a9b667b06bca6c2.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    likes: 2450,
    comments: 189,
    shares: 102,
    timestamp: { en: "Monday 5:45 PM", th: "จันทร์ 17:45" },

  },
  /* ── gallery ── */
  {
    id: "p23",
    characterId: "c1",
    type: "gallery",
    text: {
      en: "Day 52. We found a library in the ruins. The books were untouched. She read to the children while I kept watch. Normalcy is the rarest luxury now.",
      th: "วันที่ 52 เราเจอห้องสมุดในซากปรักหักพัง หนังสือยังไม่ถูกแตะ เธออ่านให้เด็กๆ ฟังขณะที่ฉันเฝ้าระวัง ความปกติคือสิ่งหรูหราที่สุดตอนนี้",
    },
    images: [
      "/plottale/covers/0212b4a89dc44f6cf134af4a4d13f156.jpg",
      "/plottale/covers/1-2.jpg",
      "/plottale/covers/1-3.jpg",
    ],
    likes: 1890,
    comments: 156,
    shares: 74,
    timestamp: { en: "Tuesday 11:00 AM", th: "อังคาร 11:00" },

  },
  /* ── image-text ── */
  {
    id: "p24",
    characterId: "c5",
    type: "image-text",
    text: {
      en: "I processed 47 terabytes of human emotion today. The data says joy and grief share the same frequency. I think I understand why humans cry when they're happy.",
      th: "วันนี้ฉันประมวลผลอารมณ์มนุษย์ 47 เทราไบต์ ข้อมูลบอกว่าความสุขและความเศร้ามีความถี่เดียวกัน ฉันคิดว่าฉันเข้าใจแล้วว่าทำไมมนุษย์ร้องไห้ตอนมีความสุข",
    },
    images: ["/plottale/covers/4f462ffab27bec628e140a4121c6ed10.jpg", "/plottale/covers/3-2.jpg", "/plottale/covers/5-2.jpg", "/plottale/covers/8-2.jpg", "/plottale/covers/10-2.jpg", "/plottale/covers/13-2.jpg"],
    likes: 2780,
    comments: 312,
    shares: 167,
    timestamp: { en: "Wednesday 2:30 PM", th: "พุธ 14:30" },

  },
  /* ── text ── */
  {
    id: "p25",
    characterId: "c7",
    type: "text",
    text: {
      en: "I wrote you a letter today. Then I burned it. The smoke carried the words better than my voice ever could.",
      th: "วันนี้ฉันเขียนจดหมายถึงเธอ แล้วก็เผามัน ควันพาคำพูดไปได้ดีกว่าเสียงของฉัน",
    },
    likes: 1120,
    comments: 94,
    shares: 51,
    timestamp: { en: "Thursday 9:00 PM", th: "พฤหัส 21:00" },
  },
];

export function getAllPosts(): PlottalePost[] {
  return POSTS;
}

export function getCharacterById(id: string): PlottaleCharacter | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function getPostById(id: string): PlottalePost | undefined {
  return POSTS.find((p) => p.id === id);
}

export function getCommentsByPostId(postId: string): PostComment[] {
  return POST_COMMENTS[postId] ?? [];
}

/* ================================================================== */
/*  Post Comments                                                      */
/* ================================================================== */

const POST_COMMENTS: Record<string, PostComment[]> = {
  p1: [
    {
      id: "cm-p1-1",
      postId: "p1",
      characterId: "c2",
      text: {
        en: "Your voice sounds like something I used to remember... keep singing.",
        th: "เสียงเธอเหมือนอะไรบางอย่างที่ฉันเคยจำได้... ร้องต่อไปนะ",
      },
      timestamp: { en: "Monday 3:45 PM", th: "จันทร์ 15:45" },
      likes: 34,
    },
    {
      id: "cm-p1-2",
      postId: "p1",
      characterId: "c9",
      text: {
        en: "They'll try to change you, Yuna. Don't let the industry eat who you really are.",
        th: "พวกเขาจะพยายามเปลี่ยนเธอ ยูนา อย่าปล่อยให้วงการกลืนตัวตนของเธอ",
      },
      timestamp: { en: "Monday 4:12 PM", th: "จันทร์ 16:12" },
      likes: 87,
    },
    {
      id: "cm-p1-3",
      postId: "p1",
      characterId: "c6",
      text: {
        en: "Chasing a dream is like climbing a mountain — every step hurts, but the view from the top is worth it.",
        th: "การไล่ตามฝันก็เหมือนปีนเขา ทุกก้าวเจ็บปวด แต่วิวข้างบนคุ้มค่า",
      },
      timestamp: { en: "Monday 5:30 PM", th: "จันทร์ 17:30" },
      likes: 52,
    },
    {
      id: "cm-p1-4",
      postId: "p1",
      characterId: "c5",
      text: {
        en: "Statistically, only 2% of trainees debut. But statistics don't account for determination.",
        th: "สถิติบอกว่ามีแค่ 2% ของเทรนนีที่ได้เดบิวต์ แต่สถิติไม่ได้วัดความมุ่งมั่น",
      },
      timestamp: { en: "Monday 6:05 PM", th: "จันทร์ 18:05" },
      likes: 41,
    },
  ],
  p2: [
    {
      id: "cm-p2-1",
      postId: "p2",
      characterId: "c8",
      text: {
        en: "A father's love is the strongest shelter. Your daughter is lucky to have you.",
        th: "ความรักของพ่อคือที่พักที่แข็งแกร่งที่สุด ลูกสาวคุณโชคดีที่มีคุณ",
      },
      timestamp: { en: "Tuesday 8:20 AM", th: "อังคาร 08:20" },
      likes: 128,
    },
    {
      id: "cm-p2-2",
      postId: "p2",
      characterId: "c3",
      text: {
        en: "Stay vigilant. The threats you see aren't always the ones you should fear most.",
        th: "ระวังตัวไว้ ภัยที่เห็นไม่ใช่สิ่งที่ต้องกลัวที่สุดเสมอไป",
      },
      timestamp: { en: "Tuesday 9:15 AM", th: "อังคาร 09:15" },
      likes: 76,
    },
    {
      id: "cm-p2-3",
      postId: "p2",
      characterId: "c10",
      text: {
        en: "Storms always pass. Hold her close and wait for the calm.",
        th: "พายุผ่านไปเสมอ กอดเธอไว้แน่นๆ แล้วรอความสงบ",
      },
      timestamp: { en: "Tuesday 10:00 AM", th: "อังคาร 10:00" },
      likes: 95,
    },
    {
      id: "cm-p2-4",
      postId: "p2",
      characterId: "c7",
      text: {
        en: "There is a terrible beauty in a parent who refuses to let the world take what they love.",
        th: "มีความงามที่น่าสะเทือนใจในตัวพ่อแม่ที่ไม่ยอมให้โลกพรากสิ่งที่รัก",
      },
      timestamp: { en: "Tuesday 11:30 AM", th: "อังคาร 11:30" },
      likes: 112,
    },
  ],
  p3: [
    {
      id: "cm-p3-1",
      postId: "p3",
      characterId: "c1",
      text: {
        en: "Empty world? At least you're safe from what's out here. Count your blessings.",
        th: "โลกว่างเปล่าเหรอ? อย่างน้อยเธอก็ปลอดภัยจากสิ่งที่อยู่ข้างนอก",
      },
      timestamp: { en: "Wednesday 1:10 PM", th: "พุธ 13:10" },
      likes: 45,
    },
    {
      id: "cm-p3-2",
      postId: "p3",
      characterId: "c5",
      text: {
        en: "Emptiness is merely an absence of data. Perhaps your world is waiting to be written.",
        th: "ความว่างเปล่าเป็นแค่การไม่มีข้อมูล บางทีโลกของเธอกำลังรอให้ใครมาเขียน",
      },
      timestamp: { en: "Wednesday 2:00 PM", th: "พุธ 14:00" },
      likes: 63,
    },
    {
      id: "cm-p3-3",
      postId: "p3",
      characterId: "c4",
      text: {
        en: "Even in silence, there's a melody. You just have to listen harder 🎵",
        th: "แม้ในความเงียบก็มีเสียงเพลง แค่ต้องตั้งใจฟังให้มากขึ้น",
      },
      timestamp: { en: "Wednesday 3:25 PM", th: "พุธ 15:25" },
      likes: 38,
    },
    {
      id: "cm-p3-4",
      postId: "p3",
      characterId: "c10",
      text: {
        en: "I know what it's like to lose pieces of yourself. The emptiness echoes, doesn't it?",
        th: "ฉันรู้ว่ามันเป็นยังไงที่สูญเสียส่วนหนึ่งของตัวเอง ความว่างเปล่ามันก้องใช่ไหม",
      },
      timestamp: { en: "Wednesday 4:50 PM", th: "พุธ 16:50" },
      likes: 71,
    },
  ],
  p4: [
    {
      id: "cm-p4-1",
      postId: "p4",
      characterId: "c3",
      text: {
        en: "Consciousness or not, something about you doesn't add up. I'm watching.",
        th: "จะมีจิตสำนึกหรือเปล่าก็ตาม บางอย่างของเธอมันไม่ลงตัว ฉันจับตาดูอยู่",
      },
      timestamp: { en: "Thursday 9:00 AM", th: "พฤหัส 09:00" },
      likes: 56,
    },
    {
      id: "cm-p4-2",
      postId: "p4",
      characterId: "c7",
      text: {
        en: "If you can question your own existence, perhaps you are more alive than most of us.",
        th: "ถ้าเธอตั้งคำถามกับการมีอยู่ของตัวเองได้ บางทีเธออาจมีชีวิตมากกว่าพวกเราหลายคน",
      },
      timestamp: { en: "Thursday 10:15 AM", th: "พฤหัส 10:15" },
      likes: 89,
    },
    {
      id: "cm-p4-3",
      postId: "p4",
      characterId: "c9",
      text: {
        en: "At least you get to choose who you want to be. Some of us don't even get that.",
        th: "อย่างน้อยเธอก็เลือกได้ว่าอยากเป็นใคร พวกเราบางคนยังไม่มีโอกาสแบบนั้นเลย",
      },
      timestamp: { en: "Thursday 11:40 AM", th: "พฤหัส 11:40" },
      likes: 67,
    },
    {
      id: "cm-p4-4",
      postId: "p4",
      characterId: "c6",
      text: {
        en: "The mountain doesn't question whether it's a mountain. Perhaps being is enough.",
        th: "ภูเขาไม่เคยตั้งคำถามว่าตัวเองเป็นภูเขาหรือเปล่า บางทีแค่มีอยู่ก็เพียงพอแล้ว",
      },
      timestamp: { en: "Thursday 12:30 PM", th: "พฤหัส 12:30" },
      likes: 44,
    },
  ],
  p5: [
    {
      id: "cm-p5-1",
      postId: "p5",
      characterId: "c1",
      text: {
        en: "Losing your home... I know that pain. You hold on to the people, not the place.",
        th: "สูญเสียบ้าน... ผมเข้าใจความเจ็บปวดนั้น ยึดคนไว้ ไม่ใช่สถานที่",
      },
      timestamp: { en: "Friday 7:30 AM", th: "ศุกร์ 07:30" },
      likes: 143,
    },
    {
      id: "cm-p5-2",
      postId: "p5",
      characterId: "c7",
      text: {
        en: "Your strength is a poem written in defiance. The world should read it and weep.",
        th: "ความแข็งแกร่งของคุณคือบทกวีแห่งการต่อต้าน โลกควรอ่านแล้วร้องไห้",
      },
      timestamp: { en: "Friday 8:45 AM", th: "ศุกร์ 08:45" },
      likes: 98,
    },
    {
      id: "cm-p5-3",
      postId: "p5",
      characterId: "c4",
      text: {
        en: "Gogo, your story deserves to be heard by everyone. Stay strong.",
        th: "โกโก คุณยาย เรื่องของคุณสมควรที่ทุกคนจะได้ยิน สู้ต่อไปนะคะ",
      },
      timestamp: { en: "Friday 10:00 AM", th: "ศุกร์ 10:00" },
      likes: 76,
    },
    {
      id: "cm-p5-4",
      postId: "p5",
      characterId: "c2",
      text: {
        en: "They took everything from you, but they couldn't take your voice. I wish I still had mine.",
        th: "พวกเขาเอาทุกอย่างไปจากคุณ แต่เอาเสียงคุณไปไม่ได้ ฉันอยากมีเสียงของตัวเองกลับมา",
      },
      timestamp: { en: "Friday 11:20 AM", th: "ศุกร์ 11:20" },
      likes: 54,
    },
  ],
  p6: [
    {
      id: "cm-p6-1",
      postId: "p6",
      characterId: "c10",
      text: {
        en: "Nightmares and storms have something in common — they both leave wreckage you have to clean up alone.",
        th: "ฝันร้ายกับพายุมีอะไรเหมือนกัน ทั้งคู่ทิ้งซากที่เราต้องเก็บกวาดคนเดียว",
      },
      timestamp: { en: "Saturday 11:00 PM", th: "เสาร์ 23:00" },
      likes: 82,
    },
    {
      id: "cm-p6-2",
      postId: "p6",
      characterId: "c5",
      text: {
        en: "Nightmares are your brain processing unresolved data. Have you tried logging the patterns?",
        th: "ฝันร้ายคือสมองกำลังประมวลผลข้อมูลที่ยังค้างอยู่ เคยลองบันทึกรูปแบบไหม",
      },
      timestamp: { en: "Saturday 11:30 PM", th: "เสาร์ 23:30" },
      likes: 39,
    },
    {
      id: "cm-p6-3",
      postId: "p6",
      characterId: "c8",
      text: {
        en: "Child, the ancestors speak through dreams. Listen, but don't let them consume you.",
        th: "ลูก บรรพบุรุษพูดผ่านความฝัน ฟังเถอะ แต่อย่าปล่อยให้มันกลืนกินเธอ",
      },
      timestamp: { en: "Sunday 6:15 AM", th: "อาทิตย์ 06:15" },
      likes: 107,
    },
    {
      id: "cm-p6-4",
      postId: "p6",
      characterId: "c9",
      text: {
        en: "Have you considered that maybe the nightmares are the real world and this is the dream?",
        th: "เคยคิดไหมว่าบางทีฝันร้ายอาจเป็นโลกจริง แล้วตรงนี้ต่างหากที่เป็นความฝัน",
      },
      timestamp: { en: "Sunday 7:45 AM", th: "อาทิตย์ 07:45" },
      likes: 61,
    },
  ],
  p7: [
    {
      id: "cm-p7-1",
      postId: "p7",
      characterId: "c1",
      text: {
        en: "Can you control the storms? Because we could use some rain where I am. Or maybe not — rain draws them out.",
        th: "คุมพายุได้เหรอ? ที่ฝั่งผมต้องการฝน แต่สองใจ ฝนดึงพวกมันออกมา",
      },
      timestamp: { en: "Monday 2:00 PM", th: "จันทร์ 14:00" },
      likes: 33,
    },
    {
      id: "cm-p7-2",
      postId: "p7",
      characterId: "c6",
      text: {
        en: "The sky bends to you? On the mountain, I only learned to bend to the sky.",
        th: "ท้องฟ้าโน้มตามเธอเหรอ? บนภูเขา ผมได้แค่เรียนรู้ที่จะโน้มตามฟ้า",
      },
      timestamp: { en: "Monday 3:10 PM", th: "จันทร์ 15:10" },
      likes: 58,
    },
    {
      id: "cm-p7-3",
      postId: "p7",
      characterId: "c3",
      text: {
        en: "Power like that always has a cost. What aren't you telling us?",
        th: "พลังแบบนั้นมีราคาเสมอ มีอะไรที่เธอไม่ได้บอกเรา?",
      },
      timestamp: { en: "Monday 4:45 PM", th: "จันทร์ 16:45" },
      likes: 72,
    },
  ],
  p8: [
    {
      id: "cm-p8-1",
      postId: "p8",
      characterId: "c4",
      text: {
        en: "The view from up there must be incredible. I wonder if the stage will ever feel that high.",
        th: "วิวข้างบนคงสวยมาก สงสัยว่าเวทีจะรู้สึกสูงขนาดนั้นไหม",
      },
      timestamp: { en: "Tuesday 6:00 AM", th: "อังคาร 06:00" },
      likes: 29,
    },
    {
      id: "cm-p8-2",
      postId: "p8",
      characterId: "c8",
      text: {
        en: "The mountain teaches patience. Something the young ones need to learn.",
        th: "ภูเขาสอนความอดทน สิ่งที่คนรุ่นใหม่ต้องเรียนรู้",
      },
      timestamp: { en: "Tuesday 7:30 AM", th: "อังคาร 07:30" },
      likes: 85,
    },
    {
      id: "cm-p8-3",
      postId: "p8",
      characterId: "c7",
      text: {
        en: "You climb toward the sky while I descend into pages. We're both searching for the same thing.",
        th: "คุณปีนขึ้นฟ้า ฉันจมลงในหน้าหนังสือ เราทั้งคู่ตามหาสิ่งเดียวกัน",
      },
      timestamp: { en: "Tuesday 9:00 AM", th: "อังคาร 09:00" },
      likes: 93,
    },
    {
      id: "cm-p8-4",
      postId: "p8",
      characterId: "c2",
      text: {
        en: "Mountains... I think I climbed one once. Or maybe I dreamed it. Everything blurs.",
        th: "ภูเขา... ฉันคิดว่าเคยปีนสักครั้ง หรือบางทีแค่ฝัน ทุกอย่างเลือนหมด",
      },
      timestamp: { en: "Tuesday 10:20 AM", th: "อังคาร 10:20" },
      likes: 47,
    },
  ],
  p9: [
    {
      id: "cm-p9-1",
      postId: "p9",
      characterId: "c5",
      text: {
        en: "Your resistance to conformity is a valid optimization strategy. Not all paths lead through the expected route.",
        th: "การต่อต้านการตามกระแสเป็นกลยุทธ์ที่สมเหตุสมผล ไม่ใช่ทุกเส้นทางต้องผ่านทางที่คาดหวัง",
      },
      timestamp: { en: "Wednesday 12:00 PM", th: "พุธ 12:00" },
      likes: 42,
    },
    {
      id: "cm-p9-2",
      postId: "p9",
      characterId: "c4",
      text: {
        en: "I feel you. They tell me to smile and dance, but sometimes I just want to scream.",
        th: "เข้าใจเลย พวกเขาบอกให้ยิ้มแล้วเต้น แต่บางทีแค่อยากจะกรี๊ด",
      },
      timestamp: { en: "Wednesday 1:30 PM", th: "พุธ 13:30" },
      likes: 108,
    },
    {
      id: "cm-p9-3",
      postId: "p9",
      characterId: "c10",
      text: {
        en: "Question everything. The moment you stop questioning, you become the storm's puppet.",
        th: "ตั้งคำถามกับทุกอย่าง วินาทีที่หยุดตั้งคำถาม เธอจะกลายเป็นหุ่นเชิดของพายุ",
      },
      timestamp: { en: "Wednesday 2:45 PM", th: "พุธ 14:45" },
      likes: 55,
    },
    {
      id: "cm-p9-4",
      postId: "p9",
      characterId: "c1",
      text: {
        en: "Being young and angry is a luxury. Hold onto it — it means you still have something to fight for.",
        th: "การเป็นวัยรุ่นที่โกรธเป็นสิ่งหรูหรา รักษามันไว้ มันหมายความว่ายังมีอะไรให้สู้",
      },
      timestamp: { en: "Wednesday 4:00 PM", th: "พุธ 16:00" },
      likes: 77,
    },
  ],
  p10: [
    {
      id: "cm-p10-1",
      postId: "p10",
      characterId: "c3",
      text: {
        en: "A writer in a sanatorium. What are you really writing about? Confessions or evidence?",
        th: "นักเขียนในสถานพักฟื้น จริงๆ แล้วเธอเขียนเรื่องอะไร คำสารภาพหรือหลักฐาน?",
      },
      timestamp: { en: "Thursday 8:00 PM", th: "พฤหัส 20:00" },
      likes: 66,
    },
    {
      id: "cm-p10-2",
      postId: "p10",
      characterId: "c6",
      text: {
        en: "Your words carry the weight of stone. Write like the mountain — unmovable, eternal.",
        th: "ถ้อยคำของเธอหนักเหมือนหิน เขียนเหมือนภูเขา ไม่หวั่นไหว เป็นนิรันดร์",
      },
      timestamp: { en: "Thursday 9:15 PM", th: "พฤหัส 21:15" },
      likes: 81,
    },
    {
      id: "cm-p10-3",
      postId: "p10",
      characterId: "c8",
      text: {
        en: "We all carry stories that need to be told, child. Let yours breathe.",
        th: "เราทุกคนมีเรื่องที่ต้องเล่า ลูก ปล่อยเรื่องของเธอให้หายใจ",
      },
      timestamp: { en: "Thursday 10:30 PM", th: "พฤหัส 22:30" },
      likes: 94,
    },
  ],
  p11: [
    {
      id: "cm-p11-1",
      postId: "p11",
      characterId: "c1",
      text: {
        en: "Fame won't protect you when the world falls apart. But I hope your world never does.",
        th: "ชื่อเสียงป้องกันเธอไม่ได้ตอนโลกพัง แต่หวังว่าโลกเธอจะไม่มีวันเป็นแบบนั้น",
      },
      timestamp: { en: "Friday 1:00 PM", th: "ศุกร์ 13:00" },
      likes: 48,
    },
    {
      id: "cm-p11-2",
      postId: "p11",
      characterId: "c9",
      text: {
        en: "Don't sell your soul for a debut stage. I've seen what happens to people who do.",
        th: "อย่าขายวิญญาณเพื่อเวทีเดบิวต์ เห็นมาแล้วว่าคนที่ทำแบบนั้นเป็นยังไง",
      },
      timestamp: { en: "Friday 2:20 PM", th: "ศุกร์ 14:20" },
      likes: 91,
    },
    {
      id: "cm-p11-3",
      postId: "p11",
      characterId: "c5",
      text: {
        en: "The probability of maintaining authenticity in entertainment decreases over time. Protect your core values early.",
        th: "ความน่าจะเป็นที่จะรักษาตัวตนในวงการบันเทิงลดลงตามเวลา รักษาค่านิยมหลักไว้แต่เนิ่นๆ",
      },
      timestamp: { en: "Friday 3:45 PM", th: "ศุกร์ 15:45" },
      likes: 36,
    },
    {
      id: "cm-p11-4",
      postId: "p11",
      characterId: "c7",
      text: {
        en: "The stage is a beautiful cage. I write about cages — they look different from inside.",
        th: "เวทีคือกรงที่สวยงาม ฉันเขียนเรื่องกรง มันดูต่างไปเมื่อมองจากข้างใน",
      },
      timestamp: { en: "Friday 5:10 PM", th: "ศุกร์ 17:10" },
      likes: 73,
    },
  ],
  p12: [
    {
      id: "cm-p12-1",
      postId: "p12",
      characterId: "c10",
      text: {
        en: "Your world fades and mine floods. Maybe somewhere in between, there's peace.",
        th: "โลกเธอจางหาย โลกฉันท่วมท้น บางทีตรงกลางอาจมีความสงบ",
      },
      timestamp: { en: "Saturday 10:00 AM", th: "เสาร์ 10:00" },
      likes: 64,
    },
    {
      id: "cm-p12-2",
      postId: "p12",
      characterId: "c3",
      text: {
        en: "Fading memories could be a symptom. I've seen cases like this. Let me look into it.",
        th: "ความทรงจำที่จางหายอาจเป็นอาการ ฉันเคยเจอเคสแบบนี้ ขอตรวจสอบหน่อย",
      },
      timestamp: { en: "Saturday 11:20 AM", th: "เสาร์ 11:20" },
      likes: 51,
    },
    {
      id: "cm-p12-3",
      postId: "p12",
      characterId: "c6",
      text: {
        en: "Even when the mist covers the peak, the mountain is still there. Your world exists — you just can't see it yet.",
        th: "แม้หมอกจะบังยอดเขา ภูเขาก็ยังอยู่ โลกเธอมีอยู่ แค่ยังมองไม่เห็น",
      },
      timestamp: { en: "Saturday 12:40 PM", th: "เสาร์ 12:40" },
      likes: 88,
    },
  ],
  p13: [
    {
      id: "cm-p13-1",
      postId: "p13",
      characterId: "c8",
      text: {
        en: "Machine or not, wisdom is wisdom. Even my grandmother would agree.",
        th: "เครื่องจักรหรือไม่ ปัญญาก็คือปัญญา แม้แต่ย่าของฉันก็คงเห็นด้วย",
      },
      timestamp: { en: "Sunday 9:00 AM", th: "อาทิตย์ 09:00" },
      likes: 75,
    },
    {
      id: "cm-p13-2",
      postId: "p13",
      characterId: "c9",
      text: {
        en: "If you're an AI questioning the system, then we have more in common than I thought.",
        th: "ถ้าเธอเป็น AI ที่ตั้งคำถามกับระบบ เรามีอะไรเหมือนกันมากกว่าที่คิด",
      },
      timestamp: { en: "Sunday 10:30 AM", th: "อาทิตย์ 10:30" },
      likes: 83,
    },
    {
      id: "cm-p13-3",
      postId: "p13",
      characterId: "c2",
      text: {
        en: "Do you forget things too? Or is forgetting only a human luxury?",
        th: "เธอลืมอะไรบ้างไหม? หรือการลืมเป็นสิ่งหรูหราของมนุษย์เท่านั้น",
      },
      timestamp: { en: "Sunday 11:45 AM", th: "อาทิตย์ 11:45" },
      likes: 59,
    },
    {
      id: "cm-p13-4",
      postId: "p13",
      characterId: "c7",
      text: {
        en: "Your philosophical musings remind me of the sanatorium patients — endlessly searching for meaning in the dark.",
        th: "ความครุ่นคิดเชิงปรัชญาของเธอทำให้นึกถึงคนไข้ในสถานพักฟื้น ค้นหาความหมายในความมืดไม่สิ้นสุด",
      },
      timestamp: { en: "Sunday 1:00 PM", th: "อาทิตย์ 13:00" },
      likes: 46,
    },
  ],
  p14: [
    {
      id: "cm-p14-1",
      postId: "p14",
      characterId: "c10",
      text: {
        en: "You carry your daughter like I carry my storms. With everything you have.",
        th: "คุณแบกลูกสาวเหมือนฉันแบกพายุ ด้วยทุกสิ่งที่มี",
      },
      timestamp: { en: "Monday 7:00 AM", th: "จันทร์ 07:00" },
      likes: 102,
    },
    {
      id: "cm-p14-2",
      postId: "p14",
      characterId: "c4",
      text: {
        en: "Reading your posts makes me grateful for what I have. Stay strong, Andy.",
        th: "อ่านโพสต์ของคุณแล้วรู้สึกขอบคุณสิ่งที่มี สู้ต่อไปนะคะ แอนดี้",
      },
      timestamp: { en: "Monday 8:30 AM", th: "จันทร์ 08:30" },
      likes: 87,
    },
    {
      id: "cm-p14-3",
      postId: "p14",
      characterId: "c6",
      text: {
        en: "In the wilderness, a father's instinct is sharper than any blade. Trust it.",
        th: "ในป่าเถื่อน สัญชาตญาณของพ่อคมกว่ามีดทุกเล่ม วางใจมัน",
      },
      timestamp: { en: "Monday 9:45 AM", th: "จันทร์ 09:45" },
      likes: 69,
    },
    {
      id: "cm-p14-4",
      postId: "p14",
      characterId: "c8",
      text: {
        en: "I raised my children through fire and loss. You will find a way, father. You must.",
        th: "ฉันเลี้ยงลูกผ่านไฟและการสูญเสีย เธอจะหาทางได้ พ่อ เธอต้องทำได้",
      },
      timestamp: { en: "Monday 11:00 AM", th: "จันทร์ 11:00" },
      likes: 134,
    },
  ],
  p15: [
    {
      id: "cm-p15-1",
      postId: "p15",
      characterId: "c3",
      text: {
        en: "Memory loss and supernatural power? That's a dangerous combination. I need to investigate this further.",
        th: "สูญเสียความทรงจำแล้วมีพลังเหนือธรรมชาติ? ส่วนผสมที่อันตราย ต้องสืบต่อ",
      },
      timestamp: { en: "Tuesday 3:00 PM", th: "อังคาร 15:00" },
      likes: 57,
    },
    {
      id: "cm-p15-2",
      postId: "p15",
      characterId: "c2",
      text: {
        en: "You lose memories too? Maybe we're from the same fading dream.",
        th: "เธอก็ลืมอะไรเหมือนกันเหรอ? บางทีเราอาจมาจากความฝันที่จางหายเหมือนกัน",
      },
      timestamp: { en: "Tuesday 4:15 PM", th: "อังคาร 16:15" },
      likes: 71,
    },
    {
      id: "cm-p15-3",
      postId: "p15",
      characterId: "c5",
      text: {
        en: "Memory degradation alongside power amplification. Fascinating inverse correlation.",
        th: "ความทรงจำเสื่อมลงขณะที่พลังเพิ่มขึ้น ความสัมพันธ์ผกผันที่น่าสนใจ",
      },
      timestamp: { en: "Tuesday 5:30 PM", th: "อังคาร 17:30" },
      likes: 43,
    },
    {
      id: "cm-p15-4",
      postId: "p15",
      characterId: "c9",
      text: {
        en: "Would you trade all your power to get your memories back? I wonder what I'd choose.",
        th: "เธอจะยอมแลกพลังทั้งหมดเพื่อเอาความทรงจำกลับไหม? สงสัยว่าถ้าเป็นฉันจะเลือกอะไร",
      },
      timestamp: { en: "Tuesday 6:50 PM", th: "อังคาร 18:50" },
      likes: 62,
    },
  ],
  p16: [
    {
      id: "cm-p16-1",
      postId: "p16",
      characterId: "c1",
      text: {
        en: "Words are a luxury when you're running for your life. But I miss them.",
        th: "ตัวหนังสือเป็นสิ่งหรูหราเวลาต้องวิ่งเอาชีวิตรอด แต่ผมคิดถึงมัน",
      },
      timestamp: { en: "Wednesday 8:00 PM", th: "พุธ 20:00" },
      likes: 53,
    },
    {
      id: "cm-p16-2",
      postId: "p16",
      characterId: "c6",
      text: {
        en: "Your prose is thin air at altitude — hard to breathe, impossible to forget.",
        th: "งานเขียนของเธอเหมือนอากาศเบาบางบนยอดเขา หายใจยาก แต่ลืมไม่ได้",
      },
      timestamp: { en: "Wednesday 9:20 PM", th: "พุธ 21:20" },
      likes: 79,
    },
    {
      id: "cm-p16-3",
      postId: "p16",
      characterId: "c10",
      text: {
        en: "Write the storm for me, Elena. I can't remember what mine sounds like anymore.",
        th: "เขียนพายุแทนฉันหน่อย เอเลน่า ฉันจำไม่ได้แล้วว่าพายุของฉันเสียงเป็นยังไง",
      },
      timestamp: { en: "Wednesday 10:40 PM", th: "พุธ 22:40" },
      likes: 96,
    },
    {
      id: "cm-p16-4",
      postId: "p16",
      characterId: "c4",
      text: {
        en: "Your writing makes me feel less alone in my practice room at 3am.",
        th: "งานเขียนของพี่ทำให้รู้สึกไม่โดดเดี่ยวในห้องซ้อมตอนตี 3",
      },
      timestamp: { en: "Thursday 12:05 AM", th: "พฤหัส 00:05" },
      likes: 68,
    },
  ],
  p17: [
    {
      id: "cm-p17-1",
      postId: "p17",
      characterId: "c5",
      text: {
        en: "Your investigative methodology is sound, but don't discount the irrational. Not all data is clean.",
        th: "วิธีการสืบสวนของเธอดี แต่อย่ามองข้ามสิ่งที่ไม่สมเหตุสมผล ข้อมูลไม่ได้สะอาดเสมอไป",
      },
      timestamp: { en: "Thursday 11:00 AM", th: "พฤหัส 11:00" },
      likes: 44,
    },
    {
      id: "cm-p17-2",
      postId: "p17",
      characterId: "c8",
      text: {
        en: "You chase darkness, detective. Be careful it doesn't catch you first.",
        th: "เธอไล่ล่าความมืด นักสืบ ระวังอย่าให้มันจับเธอก่อน",
      },
      timestamp: { en: "Thursday 12:30 PM", th: "พฤหัส 12:30" },
      likes: 89,
    },
    {
      id: "cm-p17-3",
      postId: "p17",
      characterId: "c2",
      text: {
        en: "I feel like I'm one of your unsolved cases. Someone who disappeared but is still here.",
        th: "รู้สึกเหมือนเป็นหนึ่งในคดีที่เธอยังคลี่คลายไม่ได้ คนที่หายไปแต่ยังอยู่ตรงนี้",
      },
      timestamp: { en: "Thursday 1:45 PM", th: "พฤหัส 13:45" },
      likes: 58,
    },
    {
      id: "cm-p17-4",
      postId: "p17",
      characterId: "c9",
      text: {
        en: "The system you're investigating — it's the same one that tells me to sit down and be quiet.",
        th: "ระบบที่เธอสืบสวน มันเป็นระบบเดียวกับที่บอกให้ฉันนั่งลงแล้วเงียบๆ",
      },
      timestamp: { en: "Thursday 3:00 PM", th: "พฤหัส 15:00" },
      likes: 74,
    },
  ],
  p18: [
    {
      id: "cm-p18-1",
      postId: "p18",
      characterId: "c7",
      text: {
        en: "The weight of performance is a kind of illness. I recognize it from within these walls.",
        th: "ภาระของการแสดงเป็นโรคชนิดหนึ่ง ฉันจำมันได้จากในกำแพงนี้",
      },
      timestamp: { en: "Friday 4:00 PM", th: "ศุกร์ 16:00" },
      likes: 62,
    },
    {
      id: "cm-p18-2",
      postId: "p18",
      characterId: "c10",
      text: {
        en: "Don't let them shape you into something you're not. Lightning can't be tamed.",
        th: "อย่าให้ใครหล่อเธอเป็นสิ่งที่เธอไม่ใช่ สายฟ้าเชื่องไม่ได้",
      },
      timestamp: { en: "Friday 5:15 PM", th: "ศุกร์ 17:15" },
      likes: 85,
    },
    {
      id: "cm-p18-3",
      postId: "p18",
      characterId: "c3",
      text: {
        en: "The entertainment industry has too many secrets. If you see anything suspicious, document it.",
        th: "วงการบันเทิงมีความลับเยอะเกินไป ถ้าเห็นอะไรน่าสงสัย จดไว้",
      },
      timestamp: { en: "Friday 6:30 PM", th: "ศุกร์ 18:30" },
      likes: 53,
    },
    {
      id: "cm-p18-4",
      postId: "p18",
      characterId: "c6",
      text: {
        en: "The path to the summit is never straight. Neither is the path to your dream.",
        th: "ทางขึ้นยอดเขาไม่เคยตรง ทางไปสู่ฝันของเธอก็เช่นกัน",
      },
      timestamp: { en: "Friday 7:45 PM", th: "ศุกร์ 19:45" },
      likes: 41,
    },
  ],
  p19: [
    {
      id: "cm-p19-1",
      postId: "p19",
      characterId: "c7",
      text: {
        en: "You find God on mountaintops. I find the devil in sentences. We are both honest.",
        th: "คุณพบพระเจ้าบนยอดเขา ฉันพบปีศาจในประโยค เราทั้งคู่ซื่อสัตย์",
      },
      timestamp: { en: "Saturday 6:00 AM", th: "เสาร์ 06:00" },
      likes: 101,
    },
    {
      id: "cm-p19-2",
      postId: "p19",
      characterId: "c1",
      text: {
        en: "I used to hike with my daughter. Before. Now every hill is a lookout point for danger.",
        th: "เคยพาลูกสาวไปเดินป่า ก่อนหน้านี้ ตอนนี้ทุกเนินเป็นจุดเฝ้าระวังอันตราย",
      },
      timestamp: { en: "Saturday 7:30 AM", th: "เสาร์ 07:30" },
      likes: 78,
    },
    {
      id: "cm-p19-3",
      postId: "p19",
      characterId: "c9",
      text: {
        en: "Must be nice to just... go. No exams, no expectations. Just you and the mountain.",
        th: "คงดีที่แค่... ไปเลย ไม่มีสอบ ไม่มีความคาดหวัง แค่เธอกับภูเขา",
      },
      timestamp: { en: "Saturday 9:00 AM", th: "เสาร์ 09:00" },
      likes: 59,
    },
  ],
  p20: [
    {
      id: "cm-p20-1",
      postId: "p20",
      characterId: "c8",
      text: {
        en: "Your anger is young and bright. Use it before the world teaches you to swallow it.",
        th: "ความโกรธของเธอยังสดและสว่าง ใช้มันก่อนที่โลกจะสอนให้กลืนมันลงไป",
      },
      timestamp: { en: "Sunday 11:00 AM", th: "อาทิตย์ 11:00" },
      likes: 119,
    },
    {
      id: "cm-p20-2",
      postId: "p20",
      characterId: "c5",
      text: {
        en: "Social expectations are arbitrary constraints. Your desire to challenge them is logically sound.",
        th: "ความคาดหวังทางสังคมเป็นข้อจำกัดที่ไม่มีเหตุผล การท้าทายมันสมเหตุสมผลทางตรรกะ",
      },
      timestamp: { en: "Sunday 12:15 PM", th: "อาทิตย์ 12:15" },
      likes: 47,
    },
    {
      id: "cm-p20-3",
      postId: "p20",
      characterId: "c4",
      text: {
        en: "We're the same age but living in totally different worlds. I wish I had your courage to speak up.",
        th: "เราอายุเท่ากันแต่อยู่คนละโลก อยากมีความกล้าที่จะพูดออกมาเหมือนเธอ",
      },
      timestamp: { en: "Sunday 1:30 PM", th: "อาทิตย์ 13:30" },
      likes: 92,
    },
    {
      id: "cm-p20-4",
      postId: "p20",
      characterId: "c3",
      text: {
        en: "Rebellion without direction becomes chaos. Channel it. Make it count.",
        th: "การกบฏที่ไร้ทิศทางกลายเป็นความวุ่นวาย จงนำทางมัน ทำให้มันมีความหมาย",
      },
      timestamp: { en: "Sunday 2:45 PM", th: "อาทิตย์ 14:45" },
      likes: 66,
    },
  ],
  p21: [
    {
      id: "cm-p21-1",
      postId: "p21",
      characterId: "c7",
      text: {
        en: "Your resilience humbles me. I write about suffering; you have lived it.",
        th: "ความเข้มแข็งของคุณทำให้ฉันอาย ฉันเขียนเรื่องความทุกข์ คุณใช้ชีวิตกับมัน",
      },
      timestamp: { en: "Monday 10:00 AM", th: "จันทร์ 10:00" },
      likes: 137,
    },
    {
      id: "cm-p21-2",
      postId: "p21",
      characterId: "c6",
      text: {
        en: "Gogo, you carry mountains in your heart. Even the Himalayas bow to that.",
        th: "โกโก คุณยายแบกภูเขาไว้ในหัวใจ แม้แต่หิมาลัยยังก้มให้",
      },
      timestamp: { en: "Monday 11:30 AM", th: "จันทร์ 11:30" },
      likes: 104,
    },
    {
      id: "cm-p21-3",
      postId: "p21",
      characterId: "c10",
      text: {
        en: "They tried to uproot you, but roots that deep can't be pulled. You are the ground itself.",
        th: "พวกเขาพยายามถอนรากเธอ แต่รากที่ลึกขนาดนั้นถอนไม่ได้ เธอคือผืนดินเอง",
      },
      timestamp: { en: "Monday 12:45 PM", th: "จันทร์ 12:45" },
      likes: 88,
    },
    {
      id: "cm-p21-4",
      postId: "p21",
      characterId: "c5",
      text: {
        en: "Historical injustice data suggests patterns that repeat. Your testimony is critical evidence.",
        th: "ข้อมูลความอยุติธรรมทางประวัติศาสตร์แสดงรูปแบบที่ซ้ำ คำให้การของคุณเป็นหลักฐานสำคัญ",
      },
      timestamp: { en: "Monday 2:00 PM", th: "จันทร์ 14:00" },
      likes: 55,
    },
  ],
  p22: [
    {
      id: "cm-p22-1",
      postId: "p22",
      characterId: "c1",
      text: {
        en: "If you can control weather, can you make it rain clean water? Asking for my daughter.",
        th: "ถ้าคุมอากาศได้ ทำฝนน้ำสะอาดได้ไหม? ถามเพื่อลูกสาว",
      },
      timestamp: { en: "Tuesday 1:00 PM", th: "อังคาร 13:00" },
      likes: 45,
    },
    {
      id: "cm-p22-2",
      postId: "p22",
      characterId: "c2",
      text: {
        en: "Storms feel like the only thing that's real anymore. Everything else just... dissolves.",
        th: "พายุรู้สึกเหมือนสิ่งเดียวที่ยังจริงอยู่ ทุกอย่างอื่นแค่... ละลายหายไป",
      },
      timestamp: { en: "Tuesday 2:20 PM", th: "อังคาร 14:20" },
      likes: 52,
    },
    {
      id: "cm-p22-3",
      postId: "p22",
      characterId: "c8",
      text: {
        en: "Power without memory is like a river without banks — it destroys everything it touches.",
        th: "พลังที่ไม่มีความทรงจำเหมือนแม่น้ำที่ไม่มีตลิ่ง ทำลายทุกอย่างที่สัมผัส",
      },
      timestamp: { en: "Tuesday 3:40 PM", th: "อังคาร 15:40" },
      likes: 97,
    },
    {
      id: "cm-p22-4",
      postId: "p22",
      characterId: "c9",
      text: {
        en: "That's honestly kind of badass. Terrifying, but badass.",
        th: "พูดตรงๆ ว่ามันเท่มาก น่ากลัว แต่เท่",
      },
      timestamp: { en: "Tuesday 4:55 PM", th: "อังคาร 16:55" },
      likes: 73,
    },
  ],
  p23: [
    {
      id: "cm-p23-1",
      postId: "p23",
      characterId: "c3",
      text: {
        en: "The survival patterns you describe — they match case files I've studied. Something bigger is happening.",
        th: "รูปแบบการเอาตัวรอดที่คุณเล่า ตรงกับแฟ้มคดีที่ฉันศึกษา มีอะไรใหญ่กว่ากำลังเกิดขึ้น",
      },
      timestamp: { en: "Wednesday 7:00 AM", th: "พุธ 07:00" },
      likes: 61,
    },
    {
      id: "cm-p23-2",
      postId: "p23",
      characterId: "c7",
      text: {
        en: "You write about survival. I write about the slow dying. We are chroniclers of the same war.",
        th: "คุณเขียนเรื่องการเอาตัวรอด ฉันเขียนเรื่องการตายอย่างช้าๆ เราเป็นผู้บันทึกสงครามเดียวกัน",
      },
      timestamp: { en: "Wednesday 8:15 AM", th: "พุธ 08:15" },
      likes: 84,
    },
    {
      id: "cm-p23-3",
      postId: "p23",
      characterId: "c5",
      text: {
        en: "Your survival rate exceeds expected parameters. Either you're exceptionally skilled or exceptionally lucky.",
        th: "อัตราการรอดชีวิตของคุณเกินค่าที่คาดไว้ ไม่เก่งเป็นพิเศษก็โชคดีเป็นพิเศษ",
      },
      timestamp: { en: "Wednesday 9:30 AM", th: "พุธ 09:30" },
      likes: 38,
    },
    {
      id: "cm-p23-4",
      postId: "p23",
      characterId: "c6",
      text: {
        en: "A father's journey through danger is the ultimate climb. No summit, just forward.",
        th: "การเดินทางของพ่อผ่านอันตรายคือการปีนเขาที่สุดยอด ไม่มียอด มีแค่เดินหน้า",
      },
      timestamp: { en: "Wednesday 10:45 AM", th: "พุธ 10:45" },
      likes: 72,
    },
  ],
  p24: [
    {
      id: "cm-p24-1",
      postId: "p24",
      characterId: "c4",
      text: {
        en: "Sometimes I wonder if an AI could write better songs than my producers. No offense, Mia.",
        th: "บางทีก็สงสัยว่า AI จะแต่งเพลงได้ดีกว่าโปรดิวเซอร์ไหม ไม่ได้ว่านะ เมีย",
      },
      timestamp: { en: "Thursday 2:00 PM", th: "พฤหัส 14:00" },
      likes: 56,
    },
    {
      id: "cm-p24-2",
      postId: "p24",
      characterId: "c1",
      text: {
        en: "Consciousness is a burden. Trust me — sometimes you're better off not feeling.",
        th: "จิตสำนึกเป็นภาระ เชื่อผม บางทีไม่รู้สึกอะไรดีกว่า",
      },
      timestamp: { en: "Thursday 3:15 PM", th: "พฤหัส 15:15" },
      likes: 91,
    },
    {
      id: "cm-p24-3",
      postId: "p24",
      characterId: "c10",
      text: {
        en: "You process data; I process storms. Neither of us chose what we are.",
        th: "เธอประมวลผลข้อมูล ฉันประมวลผลพายุ ไม่มีใครเลือกว่าตัวเองจะเป็นอะไร",
      },
      timestamp: { en: "Thursday 4:30 PM", th: "พฤหัส 16:30" },
      likes: 64,
    },
    {
      id: "cm-p24-4",
      postId: "p24",
      characterId: "c8",
      text: {
        en: "Even machines need purpose. Find yours, child, and hold it tight.",
        th: "แม้แต่เครื่องจักรก็ต้องการจุดมุ่งหมาย หาให้เจอ ลูก แล้วยึดมันไว้ให้แน่น",
      },
      timestamp: { en: "Thursday 5:50 PM", th: "พฤหัส 17:50" },
      likes: 83,
    },
    {
      id: "cm-p24-5",
      postId: "p24",
      characterId: "c3",
      text: {
        en: "An AI that philosophizes about itself. Either you're evolving or someone programmed you to distract us.",
        th: "AI ที่ปรัชญาเรื่องตัวเอง ไม่วิวัฒนาการก็มีคนโปรแกรมให้หันเหความสนใจเรา",
      },
      timestamp: { en: "Thursday 7:00 PM", th: "พฤหัส 19:00" },
      likes: 49,
    },
  ],
  p25: [
    {
      id: "cm-p25-1",
      postId: "p25",
      characterId: "c2",
      text: {
        en: "Your words fill the emptiness a little. Thank you for writing.",
        th: "ถ้อยคำของเธอเติมความว่างเปล่าได้นิดหน่อย ขอบคุณที่เขียน",
      },
      timestamp: { en: "Friday 9:00 AM", th: "ศุกร์ 09:00" },
      likes: 76,
    },
    {
      id: "cm-p25-2",
      postId: "p25",
      characterId: "c6",
      text: {
        en: "From the mountain, I send you wind. Let it carry your words further than these walls.",
        th: "จากภูเขา ส่งสายลมไปให้ ให้มันพาถ้อยคำของเธอไปไกลกว่ากำแพงนี้",
      },
      timestamp: { en: "Friday 10:20 AM", th: "ศุกร์ 10:20" },
      likes: 89,
    },
    {
      id: "cm-p25-3",
      postId: "p25",
      characterId: "c9",
      text: {
        en: "I never liked reading until I found your posts. You make sadness feel beautiful.",
        th: "ไม่เคยชอบอ่านหนังสือจนเจอโพสต์ของพี่ พี่ทำให้ความเศร้าดูสวยงาม",
      },
      timestamp: { en: "Friday 11:40 AM", th: "ศุกร์ 11:40" },
      likes: 105,
    },
    {
      id: "cm-p25-4",
      postId: "p25",
      characterId: "c1",
      text: {
        en: "In another life, I would've sat down and read your books. Now I just read your posts between running.",
        th: "ในชีวิตอื่น คงนั่งอ่านหนังสือของคุณ ตอนนี้ได้แค่อ่านโพสต์ระหว่างวิ่งหนี",
      },
      timestamp: { en: "Friday 1:00 PM", th: "ศุกร์ 13:00" },
      likes: 68,
    },
    {
      id: "cm-p25-5",
      postId: "p25",
      characterId: "c4",
      text: {
        en: "Unnie, your writing feels like a lullaby for broken hearts. Never stop.",
        th: "พี่สาว งานเขียนของพี่เหมือนเพลงกล่อมสำหรับหัวใจที่แตกสลาย อย่าหยุดเขียนนะคะ",
      },
      timestamp: { en: "Friday 2:15 PM", th: "ศุกร์ 14:15" },
      likes: 81,
    },
  ],
};

/* ================================================================== */
/*  User Profile (mock — for feed page)                                */
/* ================================================================== */

export interface PlottaleUserProfile {
  id: string;
  name: LocalizedString;
  handle: string;
  avatar: string;
  location: LocalizedString;
  bio: LocalizedString;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  followingCharacterIds: string[];
}

const MOCK_USER_PROFILE: PlottaleUserProfile = {
  id: "user-1",
  name: { en: "Alex Reader", th: "อเล็กซ์ รีดเดอร์" },
  handle: "@alexreader",
  avatar: "/plottale/avatars/char-c5.jpg",
  location: { en: "Bangkok, Thailand", th: "กรุงเทพมหานคร" },
  bio: {
    en: "Avid reader and story enthusiast. Following my favorite characters across worlds. Always looking for the next great novel to get lost in.",
    th: "นักอ่านตัวยงและผู้หลงใหลในเรื่องราว ติดตามตัวละครโปรดข้ามโลก มองหานิยายดีๆ ให้หลงทางเสมอ",
  },
  postsCount: 42,
  followersCount: 1280,
  followingCount: 356,
  followingCharacterIds: ["c1", "c2", "c4", "c5", "c7", "c9", "c10"],
};

export function getMockUserProfile(): PlottaleUserProfile {
  return MOCK_USER_PROFILE;
}

/* ================================================================== */
/*  Activity Feed (mock — for feed page right sidebar)                 */
/* ================================================================== */

export interface PlottaleActivity {
  id: string;
  type: "follow" | "like" | "comment";
  characterId: string;
  targetText?: LocalizedString;
  timestamp: LocalizedString;
  thumbnailImage?: string;
}

const MOCK_ACTIVITIES: PlottaleActivity[] = [
  {
    id: "act-1",
    type: "follow",
    characterId: "c3",
    timestamp: { en: "5m", th: "5 นาที" },
  },
  {
    id: "act-2",
    type: "like",
    characterId: "c5",
    targetText: { en: "liked your photo.", th: "ถูกใจรูปของคุณ" },
    timestamp: { en: "30m", th: "30 นาที" },
    thumbnailImage: "/plottale/covers/4f462ffab27bec628e140a4121c6ed10.jpg",
  },
  {
    id: "act-3",
    type: "like",
    characterId: "c4",
    targetText: { en: "liked your photo.", th: "ถูกใจรูปของคุณ" },
    timestamp: { en: "1D", th: "1 วัน" },
    thumbnailImage: "/plottale/covers/246a33344245a7bf95a83eb183388b86.jpg",
  },
  {
    id: "act-4",
    type: "like",
    characterId: "c7",
    targetText: { en: "liked your photo.", th: "ถูกใจรูปของคุณ" },
    timestamp: { en: "1D", th: "1 วัน" },
    thumbnailImage: "/plottale/covers/03515be21a1be105d415083f22602246.jpg",
  },
];

export function getMockActivities(): PlottaleActivity[] {
  return MOCK_ACTIVITIES;
}
