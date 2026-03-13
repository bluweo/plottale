/* ------------------------------------------------------------------ */
/*  Translation dictionary — extracted for API-readiness               */
/*  Future: replace with fetch() from CMS/API endpoint                 */
/* ------------------------------------------------------------------ */

import type { Locale } from "@/lib/i18n";

export const translations: Record<string, Partial<Record<Locale, string>>> = {
  /* ── Nav labels ── */
  "nav.home":       { en: "Home",       th: "หน้าแรก" },
  "nav.token":      { en: "Token",      th: "โทเคน" },
  "nav.primitive":  { en: "Primitive",  th: "พริมิทิฟ" },
  "nav.component":  { en: "Component",  th: "คอมโพเนนท์" },
  "nav.layout":     { en: "Layout",     th: "เลย์เอาท์" },

  /* ── Primitive sub-menu ── */
  "sub.text":       { en: "Text",       th: "ข้อความ" },
  "sub.button":     { en: "Button",     th: "ปุ่มกด" },
  "sub.input":      { en: "Input",      th: "ช่องกรอก" },
  "sub.badge":      { en: "Badge",      th: "แบดจ์" },
  "sub.avatar":     { en: "Avatar",     th: "อวาตาร์" },
  "sub.toggle":     { en: "Toggle",     th: "สวิตช์" },

  /* ── Component sub-menu ── */
  "sub.home":       { en: "Home",       th: "หน้าแรก" },
  "sub.menu":       { en: "Menu",       th: "เมนู" },
  "sub.activity":   { en: "Activity",   th: "กิจกรรม" },
  "sub.discovery":  { en: "Discovery",  th: "สำรวจ" },

  /* ── Widget content ── */
  "widget.date":         { en: "Wed, 8 November",                     th: "พุธ, 8 พฤศจิกายน" },
  "widget.visa.label":   { en: "Schengen visa",                       th: "วีซ่าเชงเก้น" },
  "widget.visa.status":  { en: "Application created",                 th: "สร้างคำร้องแล้ว" },
  "widget.news":         { en: "news",                                th: "ข่าว" },
  "widget.weather.loc":  { en: "( Sicilia, Italy )",                  th: "( ซิชิเลีย, อิตาลี )" },
  "widget.weather.msg":  { en: "It\u2019s time to fly to the sea",    th: "ถึงเวลาบินไปทะเล" },
  "widget.article":      { en: "Article",                             th: "บทความ" },
  "widget.article.title":{ en: "10 most interesting facts about Italy",th: "10 เรื่องน่ารู้เกี่ยวกับอิตาลี" },

  /* ── Layout sub-menu — flat list ── */
  "layout.cat.basic":       { en: "BASIC LAYOUT",                    th: "เลย์เอาท์พื้นฐาน" },
  "layout.dashboard":       { en: "Dashboard",                       th: "แดชบอร์ด" },
  "layout.dashboard.desc":  { en: "Grid-based overview panels",      th: "แผงภาพรวมแบบกริด" },
  "layout.sidebar":         { en: "Sidebar",                         th: "แถบด้านข้าง" },
  "layout.sidebar.desc":    { en: "Navigation with side panel",      th: "เมนูนำทางพร้อมแพนล" },
  "layout.cards":           { en: "Cards",                           th: "การ์ด" },
  "layout.cards.desc":      { en: "Content in card containers",      th: "เนื้อหาในกล่องการ์ด" },
  "layout.kanban":          { en: "Kanban",                          th: "คันบัน" },
  "layout.kanban.desc":     { en: "Column-based task board",         th: "บอร์ดงานแบบคอลัมน์" },

  /* ── Layout sub-menu — collapsible tree ── */
  "layout.cat.browse":      { en: "BROWSE",                          th: "เรียกดู" },
  "layout.tree.explore":    { en: "Explore",                         th: "สำรวจ" },
  "layout.tree.designs":    { en: "Designs",                         th: "ดีไซน์" },
  "layout.tree.animations": { en: "Animations",                      th: "แอนิเมชัน" },
  "layout.tree.assets":     { en: "Assets",                          th: "สินทรัพย์" },
  "layout.tree.3d":         { en: "3D Objects",                      th: "วัตถุ 3D" },
  "layout.tree.materials":  { en: "Materials",                       th: "วัสดุ" },

  /* ── Layout banner ── */
  "layout.banner.title":    { en: "Build layouts\neffortlessly",            th: "สร้างเลย์เอาท์\nอย่างง่ายดาย" },
  "layout.banner.desc":     { en: "Drag & drop components into\npixel-perfect responsive grids.", th: "ลากวางคอมโพเนนท์ลงใน\nกริดแบบรีสพอนซิฟ" },
  "layout.banner.cta":      { en: "Get started",                            th: "เริ่มต้น" },

  /* ── Plottale nav ── */
  "nav.explore":     { en: "Explore",    th: "สำรวจ" },
  "nav.create":      { en: "Create",     th: "สร้าง" },
  "nav.library":     { en: "Library",    th: "คลัง" },

  /* ── Plottale sub-menus ── */
  "sub.allnovels":   { en: "All Novels",     th: "นิยายทั้งหมด" },
  "sub.toprated":    { en: "Top Rated",      th: "ยอดนิยม" },
  "sub.trailers":    { en: "With Trailers",  th: "มีตัวอย่าง" },
  "sub.aichars":     { en: "AI Characters",  th: "ตัวละคร AI" },
  "sub.writenovel":  { en: "Write Novel",    th: "เขียนนิยาย" },
  "sub.createcast":  { en: "Create Cast",    th: "สร้างตัวละคร" },
  "sub.maketrailer": { en: "Make Trailer",   th: "สร้างตัวอย่าง" },

  /* ── Plottale hero ── */
  "pt.hero.eyebrow":      { en: "The Novel Platform for Creators",                                                                                    th: "แพลตฟอร์มนิยายสำหรับนักสร้างสรรค์" },
  "pt.hero.eyebrow2":     { en: "AI-Powered Storytelling",                                                                                            th: "การเล่าเรื่องด้วย AI" },
  "pt.hero.eyebrow3":     { en: "From Words to Worlds",                                                                                               th: "จากตัวอักษรสู่จักรวาล" },
  "pt.hero.headline":     { en: "Stories that live,\ncharacters that breathe.",                                                                        th: "เรื่องราวที่มีชีวิต\nตัวละครที่หายใจ" },
  "pt.hero.headline2":    { en: "Worlds you create,\nstories they remember.",                                                                         th: "โลกที่คุณสร้าง\nเรื่องราวที่พวกเขาจดจำ" },
  "pt.hero.headline3":    { en: "Write once,\nexperience forever.",                                                                                    th: "เขียนครั้งเดียว\nสัมผัสตลอดไป" },
  "pt.hero.subheading":   { en: "Read cinematic novels. Chat with AI characters that remember their story. Create your own universe — written as novels, produced as movies.", th: "อ่านนิยายภาพยนตร์ พูดคุยกับตัวละคร AI ที่จำเรื่องราวของตัวเอง สร้างจักรวาลของคุณเอง — เขียนเป็นนิยาย ผลิตเป็นหนัง" },
  "pt.hero.subheading2":  { en: "Your characters learn, grow, and interact. Readers don't just read — they live inside the story with AI companions.", th: "ตัวละครของคุณเรียนรู้ เติบโต และมีปฏิสัมพันธ์ ผู้อ่านไม่ได้แค่อ่าน — พวกเขาใช้ชีวิตอยู่ในเรื่องราวกับ AI" },
  "pt.hero.subheading3":  { en: "One novel becomes infinite experiences — character chats, trailers, scripts, and social content, all generated by AI.", th: "นิยายเรื่องเดียวกลายเป็นประสบการณ์ไม่รู้จบ — แชทตัวละคร ตัวอย่าง บท และคอนเทนต์โซเชียล สร้างโดย AI" },
  "pt.hero.cta.explore": { en: "Explore Novels",  th: "สำรวจนิยาย" },
  "pt.hero.cta.create":  { en: "Start Creating",  th: "เริ่มสร้าง" },
  "pt.hero.pill.chat":   { en: "AI Character Chat",  th: "แชทกับตัวละคร AI" },
  "pt.hero.pill.trailer":{ en: "Trailer Generator",  th: "สร้างตัวอย่าง" },
  "pt.hero.pill.script": { en: "Scene to Script",    th: "ฉากสู่บท" },
  "pt.hero.pill.social": { en: "Social Characters",  th: "ตัวละครโซเชียล" },

  /* ── Plottale novel section ── */
  "pt.novels.badge":          { en: "Trending Now",     th: "กำลังมาแรง" },
  "pt.novels.title":          { en: "Cinematic Novels",  th: "นิยายภาพยนตร์" },
  "pt.novels.desc":           { en: "Discover stories crafted for the screen — with AI characters you can talk to.",    th: "ค้นพบเรื่องราวที่สร้างสรรค์เพื่อจอภาพ — กับตัวละคร AI ที่คุณพูดคุยได้" },
  "pt.novels.viewall":        { en: "View all",          th: "ดูทั้งหมด" },
  "pt.novels.viewall.mobile": { en: "View all novels",   th: "ดูนิยายทั้งหมด" },

  /* ── Plottale features section ── */
  "pt.features.badge":     { en: "Platform Features",                                                                                                    th: "ฟีเจอร์แพลตฟอร์ม" },
  "pt.features.title":     { en: "Everything you need to create & read",                                                                                  th: "ทุกอย่างที่คุณต้องการเพื่อสร้างและอ่าน" },
  "pt.features.desc":      { en: "From interactive AI characters to cinematic trailer generation — Plottale is the complete platform for next-gen storytelling.", th: "จากตัวละคร AI แบบโต้ตอบไปจนถึงการสร้างตัวอย่างภาพยนตร์ — Plottale คือแพลตฟอร์มครบวงจรสำหรับการเล่าเรื่องยุคใหม่" },
  "pt.features.learnmore": { en: "Learn more",           th: "เรียนรู้เพิ่มเติม" },

  /* ── Plottale footer ── */
  "pt.footer.tagline": { en: "Stories that live, characters that breathe. The cinematic novel platform for creators and readers.", th: "เรื่องราวที่มีชีวิต ตัวละครที่หายใจ แพลตฟอร์มนิยายภาพยนตร์สำหรับนักสร้างสรรค์และนักอ่าน" },
  "pt.footer.about":   { en: "About",   th: "เกี่ยวกับ" },
  "pt.footer.blog":    { en: "Blog",    th: "บล็อก" },
  "pt.footer.careers": { en: "Careers", th: "สมัครงาน" },
  "pt.footer.terms":   { en: "Terms",   th: "ข้อกำหนด" },
  "pt.footer.privacy": { en: "Privacy", th: "ความเป็นส่วนตัว" },

  /* ── Plottale characters section ── */
  "pt.chars.badge":       { en: "Meet the Cast",                                                                                                              th: "พบตัวละคร" },
  "pt.chars.title":       { en: "Outstanding AI Characters",                                                                                                  th: "ตัวละคร AI โดดเด่น" },
  "pt.chars.desc":        { en: "Chat with characters that remember their story, have their own social profiles, and grow with every conversation.",           th: "พูดคุยกับตัวละครที่จำเรื่องราวของตัวเอง มีโปรไฟล์โซเชียลของตัวเอง และเติบโตกับทุกบทสนทนา" },
  "pt.chars.followers":   { en: "Followers",                                                                                                                  th: "ผู้ติดตาม" },
  "pt.chars.following":   { en: "Following",                                                                                                                  th: "กำลังติดตาม" },
  "pt.chars.novels":      { en: "Novels",                                                                                                                     th: "นิยาย" },
  "pt.chars.follow":      { en: "Follow",                                                                                                                     th: "ติดตาม" },
  "pt.chars.chat":        { en: "Chat",                                                                                                                       th: "แชท" },
  "pt.chars.viewall":     { en: "View all characters",                                                                                                        th: "ดูตัวละครทั้งหมด" },

  /* ── Plottale post feed section ── */
  "pt.feed.badge":          { en: "Community Feed",                                                                                     th: "ฟีดชุมชน" },
  "pt.feed.title":          { en: "What Characters Are Saying",                                                                         th: "ตัวละครกำลังพูดถึงอะไร" },
  "pt.feed.desc":           { en: "See what your favorite characters are posting — stories, moments, and conversations from their world.", th: "ดูว่าตัวละครโปรดของคุณกำลังโพสต์อะไร — เรื่องราว ช่วงเวลา และบทสนทนาจากโลกของพวกเขา" },
  "pt.feed.viewall":        { en: "View full feed",                                                                                      th: "ดูฟีดทั้งหมด" },
  "pt.feed.viewall.mobile": { en: "View full feed",                                                                                      th: "ดูฟีดทั้งหมด" },
  "pt.feed.like":           { en: "Love",                                                                                                th: "ถูกใจ" },
  "pt.feed.comment":        { en: "Comment",                                                                                             th: "ความคิดเห็น" },
  "pt.feed.share":          { en: "Share",                                                                                               th: "แชร์" },
  "pt.feed.bookmark":       { en: "Bookmark",                                                                                            th: "บุ๊กมาร์ก" },
  "pt.feed.copylink":       { en: "Copy Link",                                                                                           th: "คัดลอกลิงก์" },
  "pt.feed.notinterested":  { en: "Not Interested",                                                                                      th: "ไม่สนใจ" },
  "pt.feed.report":         { en: "Report",                                                                                              th: "รายงาน" },
  "pt.feed.pinned":         { en: "Pinned",                                                                                              th: "ปักหมุด" },
  "pt.feed.viewfeed":       { en: "Explore the full feed",                                                                               th: "สำรวจฟีดทั้งหมด" },
  "pt.feed.viewfeed.desc":  { en: "Discover more posts, stories, and conversations from all characters.",                                 th: "ค้นพบโพสต์ เรื่องราว และบทสนทนาเพิ่มเติมจากตัวละครทั้งหมด" },

  /* ── Plottale post detail modal ── */
  "pt.post.comments":        { en: "Comments",                                                                                               th: "ความคิดเห็น" },
  "pt.post.showmore":        { en: "Show more comments",                                                                                     th: "แสดงความคิดเห็นเพิ่มเติม" },
  "pt.post.nocomments":      { en: "No comments yet",                                                                                        th: "ยังไม่มีความคิดเห็น" },
  "pt.post.writecomment":    { en: "Write a comment...",                                                                                      th: "เขียนความคิดเห็น..." },
  "pt.post.send":            { en: "Send",                                                                                                   th: "ส่ง" },
  "pt.post.notfound":        { en: "Post not found",                                                                                         th: "ไม่พบโพสต์" },
  "pt.post.notfound.desc":   { en: "This post may have been removed or the link is incorrect.",                                               th: "โพสต์นี้อาจถูกลบหรือลิงก์ไม่ถูกต้อง" },
  "pt.post.backfeed":        { en: "Back to feed",                                                                                           th: "กลับไปฟีด" },

  /* ── Plottale novel detail ── */
  "pt.novel.readch1":       { en: "Read Chapter 1",          th: "อ่านบทที่ 1" },
  "pt.novel.trailer":       { en: "Watch Trailer",           th: "ดูตัวอย่าง" },
  "pt.novel.chapter":       { en: "Chapter",                 th: "บทที่" },
  "pt.novel.chapters":      { en: "Chapters",                th: "บท" },
  "pt.novel.cast":          { en: "Cast",                    th: "ตัวละคร" },
  "pt.novel.gallery":       { en: "Gallery",                 th: "แกลเลอรี" },
  "pt.novel.rating":        { en: "Rating",                  th: "คะแนน" },
  "pt.novel.author":        { en: "Author",                  th: "ผู้เขียน" },
  "pt.novel.related":       { en: "You May Also Like",       th: "คุณอาจชอบ" },
  "pt.novel.readtime":      { en: "min read",                th: "นาที" },
  "pt.novel.notfound":      { en: "Novel not found",         th: "ไม่พบนิยาย" },
  "pt.novel.notfound.desc": { en: "This novel may have been removed or the link is incorrect.", th: "นิยายนี้อาจถูกลบหรือลิงก์ไม่ถูกต้อง" },
  "pt.novel.back":          { en: "Back",                    th: "กลับ" },
  "pt.novel.backfeed":      { en: "Back to feed",            th: "กลับไปฟีด" },
  "pt.novel.synopsis":      { en: "Synopsis",                th: "เรื่องย่อ" },

  /* ── Plottale misc ── */
  "pt.card.coverart":  { en: "Cover Art", th: "ปกนิยาย" },
  "pt.card.scene":     { en: "Scene",     th: "ฉาก" },

  /* ── User menu ── */
  "user.login":      { en: "Login",      th: "เข้าสู่ระบบ" },
  "user.profile":    { en: "Profile",    th: "โปรไฟล์" },
  "user.settings":   { en: "Settings",   th: "ตั้งค่า" },
  "user.signout":    { en: "Sign out",   th: "ออกจากระบบ" },
  "user.signout.q":  { en: "Sign out?",  th: "ออกจากระบบ?" },
  "user.signout.body": { en: "Are you sure you want to sign out of your account?", th: "คุณแน่ใจหรือว่าต้องการออกจากระบบ?" },
  "user.cancel":     { en: "Cancel",     th: "ยกเลิก" },

  /* ── Novel Library ── */
  "pt.library.title":          { en: "Novel Library",                                    th: "คลังนิยาย" },
  "pt.library.subtitle":       { en: "Discover stories from AI-driven characters",        th: "ค้นพบเรื่องราวจากตัวละครที่ขับเคลื่อนด้วย AI" },
  "pt.library.search":         { en: "Search novels, authors...",                         th: "ค้นหานิยาย ผู้เขียน..." },
  "pt.library.all":            { en: "All",                                              th: "ทั้งหมด" },
  "pt.library.sort":           { en: "Sort",                                             th: "เรียง" },
  "pt.library.sortRating":     { en: "Rating",                                           th: "คะแนน" },
  "pt.library.sortTitleAZ":    { en: "Title A\u2192Z",                                   th: "ชื่อ ก\u2192ฮ" },
  "pt.library.sortTitleZA":    { en: "Title Z\u2192A",                                   th: "ชื่อ ฮ\u2192ก" },
  "pt.library.filters":        { en: "All Filters",                                      th: "ตัวกรองทั้งหมด" },
  "pt.library.showing":        { en: "Showing {n} novels",                               th: "แสดง {n} เรื่อง" },
  "pt.library.genre":          { en: "Genre",                                            th: "ประเภท" },
  "pt.library.authors":        { en: "Authors",                                          th: "นักเขียน" },
  "pt.library.contentRating":  { en: "Content Rating",                                   th: "เรทเนื้อหา" },
  "pt.library.minRating":      { en: "Minimum Rating",                                   th: "คะแนนขั้นต่ำ" },
  "pt.library.any":            { en: "Any",                                              th: "ทั้งหมด" },
  "pt.library.extras":         { en: "Extras",                                           th: "เพิ่มเติม" },
  "pt.library.hasTrailer":     { en: "Has Trailer",                                      th: "มีตัวอย่าง" },
  "pt.library.hasTrailerDesc": { en: "Novels with a video trailer available",             th: "นิยายที่มีตัวอย่างวิดีโอ" },
  "pt.library.clearAll":       { en: "Clear all",                                        th: "ล้างทั้งหมด" },
  "pt.library.showN":          { en: "Show {n} novels",                                  th: "แสดง {n} เรื่อง" },
  "pt.library.empty":          { en: "No novels found",                                  th: "ไม่พบนิยาย" },
  "pt.library.emptyHint":      { en: "Try adjusting your filters or search term",         th: "ลองปรับตัวกรองหรือคำค้นหา" },

  /* ── Feed page ── */
  "pt.feedpage.title":             { en: "Feed",                                                th: "ฟีด" },
  "pt.feedpage.profile.posts":     { en: "Posts",                                               th: "โพสต์" },
  "pt.feedpage.profile.followers": { en: "Followers",                                           th: "ผู้ติดตาม" },
  "pt.feedpage.profile.following": { en: "Following",                                           th: "กำลังติดตาม" },
  "pt.feedpage.profile.myprofile": { en: "My Profile",                                          th: "โปรไฟล์" },
  "pt.feedpage.aboutme":           { en: "About Me",                                            th: "เกี่ยวกับฉัน" },
  "pt.feedpage.readmore":          { en: "Read More",                                           th: "อ่านเพิ่มเติม" },
  "pt.feedpage.showless":          { en: "Show Less",                                           th: "แสดงน้อยลง" },
  "pt.feedpage.yourshortcuts":     { en: "Your shortcuts",                                      th: "ทางลัดของคุณ" },
  "pt.feedpage.following.title":   { en: "Following",                                           th: "กำลังติดตาม" },
  "pt.feedpage.following.seeall":  { en: "See all",                                             th: "ดูทั้งหมด" },
  "pt.feedpage.following.empty":   { en: "Not following anyone yet",                             th: "ยังไม่ได้ติดตามใคร" },
  "pt.feedpage.following.start":   { en: "Start following characters to see their posts here",   th: "เริ่มติดตามตัวละครเพื่อดูโพสต์ที่นี่" },
  "pt.feedpage.create.placeholder":{ en: "Share something...",                                   th: "แชร์อะไรสักอย่าง..." },
  "pt.feedpage.create.image":      { en: "Image",                                               th: "รูปภาพ" },
  "pt.feedpage.create.video":      { en: "Video",                                               th: "วิดีโอ" },
  "pt.feedpage.create.poll":       { en: "Poll",                                                th: "โพล" },
  "pt.feedpage.create.public":     { en: "Public",                                              th: "สาธารณะ" },
  "pt.feedpage.sort.label":        { en: "Sort by :",                                           th: "เรียงตาม :" },
  "pt.feedpage.sort.recent":       { en: "Recent",                                              th: "ล่าสุด" },
  "pt.feedpage.sort.popular":      { en: "Popular",                                             th: "ยอดนิยม" },
  "pt.feedpage.sort.oldest":       { en: "Oldest",                                              th: "เก่าสุด" },
  "pt.feedpage.activity.title":    { en: "Activity",                                            th: "กิจกรรม" },
  "pt.feedpage.activity.seeall":   { en: "See all",                                             th: "ดูทั้งหมด" },
  "pt.feedpage.activity.followed": { en: "Started following you.",                               th: "เริ่มติดตามคุณ" },
  "pt.feedpage.activity.today":    { en: "Today",                                               th: "วันนี้" },
  "pt.feedpage.activity.yesterday":{ en: "Yesterday",                                           th: "เมื่อวาน" },
  "pt.feedpage.activity.follow":   { en: "Follow",                                              th: "ติดตาม" },
  "pt.feedpage.suggested.title":   { en: "Suggested For you",                                   th: "แนะนำสำหรับคุณ" },
  "pt.feedpage.suggested.seeall":  { en: "See all",                                             th: "ดูทั้งหมด" },
  "pt.feedpage.suggested.followedby": { en: "Followed by",                                      th: "ติดตามโดย" },
  "pt.feedpage.suggested.foryou":  { en: "Suggested for you",                                   th: "แนะนำสำหรับคุณ" },
  "pt.feedpage.suggested.follow":  { en: "Follow",                                              th: "ติดตาม" },
  "pt.feedpage.suggested.followed":{ en: "Followed",                                            th: "ติดตามแล้ว" },
  "pt.feedpage.novels.title":      { en: "Novels You Might Like",                               th: "นิยายที่คุณอาจชอบ" },
  "pt.feedpage.novels.seeall":     { en: "See all",                                             th: "ดูทั้งหมด" },

  /* ── Reader ── */
  "pt.reader.chapterOf":     { en: "Chapter {n} of {total}",                                      th: "บทที่ {n} จาก {total}" },
  "pt.reader.contents":      { en: "Contents",                                                     th: "สารบัญ" },
  "pt.reader.settings":      { en: "Settings",                                                     th: "ตั้งค่า" },
  "pt.reader.prevChapter":   { en: "Previous Chapter",                                             th: "บทก่อนหน้า" },
  "pt.reader.nextChapter":   { en: "Next Chapter",                                                 th: "บทถัดไป" },
  "pt.reader.backToNovel":   { en: "Back to Novel",                                                th: "กลับไปหน้านิยาย" },
  "pt.reader.fontSize":      { en: "Font Size",                                                    th: "ขนาดตัวอักษร" },
  "pt.reader.fontFamily":    { en: "Font",                                                         th: "แบบอักษร" },
  "pt.reader.fontWeight":    { en: "Weight",                                                       th: "น้ำหนักอักษร" },
  "pt.reader.weight.light":  { en: "Light",                                                        th: "บาง" },
  "pt.reader.weight.regular":{ en: "Regular",                                                      th: "ปกติ" },
  "pt.reader.weight.medium": { en: "Medium",                                                       th: "กลาง" },
  "pt.reader.weight.bold":   { en: "Bold",                                                         th: "หนา" },
  "pt.reader.theme":         { en: "Reading Theme",                                                th: "ธีมการอ่าน" },
  "pt.reader.theme.default": { en: "Default",                                                      th: "ค่าเริ่มต้น" },
  "pt.reader.theme.paper":   { en: "Paper",                                                        th: "กระดาษ" },
  "pt.reader.theme.sepia":   { en: "Sepia",                                                        th: "ซีเปีย" },
  "pt.reader.theme.calm":    { en: "Calm",                                                         th: "สงบ" },
  "pt.reader.theme.night":   { en: "Night",                                                        th: "กลางคืน" },
  "pt.reader.theme.dark":    { en: "Dark",                                                         th: "มืด" },
  "pt.reader.theme.focus":   { en: "Focus",                                                        th: "โฟกัส" },
  "pt.reader.font.sans":     { en: "Sans",                                                         th: "ซานส์" },
  "pt.reader.font.jakarta":  { en: "Jakarta",                                                      th: "จาการ์ตา" },
  "pt.reader.font.serif":    { en: "Serif",                                                        th: "เซอริฟ" },
  "pt.reader.font.thai":     { en: "Thai",                                                         th: "ไทย" },
  "pt.reader.minLeft":       { en: "{n} min left",                                                 th: "อีก {n} นาที" },
  "pt.reader.finished":      { en: "Chapter Complete",                                             th: "จบบท" },
  "pt.reader.notfound":      { en: "Chapter not found",                                            th: "ไม่พบบท" },
  "pt.reader.notfound.desc": { en: "This chapter may not exist or the link is incorrect.",         th: "บทนี้อาจไม่มีอยู่หรือลิงก์ไม่ถูกต้อง" },
  "pt.reader.settingsLabel": { en: "Settings",                                                     th: "ตั้งค่า" },
  "pt.reader.collapse":      { en: "Collapse",                                                     th: "ย่อ" },
  "pt.reader.showAll":       { en: "Show all chapters",                                            th: "แสดงทุกบท" },
  "pt.reader.reset":         { en: "Reset to default",                                             th: "รีเซ็ตเป็นค่าเริ่มต้น" },
};

/** Translate a key for a given locale */
export function translate(key: string, lang: Locale): string {
  return translations[key]?.[lang] ?? key;
}
