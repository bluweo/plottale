import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const SUPPORTED_EXTS = new Set([".mp4", ".webm", ".mov"]);

function fileNameToLabel(filename: string): string {
  const name = filename.replace(/\.[^.]+$/, "");
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function GET() {
  const baseDir = path.join(process.cwd(), "public", "video-backgrounds");

  try {
    const videos: { id: string; src: string; label: string; type: "video"; theme: string }[] = [];

    for (const theme of ["light", "dark"] as const) {
      const themeDir = path.join(baseDir, theme);
      try {
        const files = await readdir(themeDir);
        for (const f of files) {
          if (!SUPPORTED_EXTS.has(path.extname(f).toLowerCase())) continue;
          videos.push({
            id: `video:${theme}:${f.replace(/\.[^.]+$/, "")}`,
            src: `/video-backgrounds/${theme}/${f}`,
            label: fileNameToLabel(f),
            type: "video",
            theme,
          });
        }
      } catch {
        /* subfolder doesn't exist — skip */
      }
    }

    videos.sort((a, b) => a.label.localeCompare(b.label));
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
