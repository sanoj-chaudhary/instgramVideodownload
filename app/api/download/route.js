// app/api/download/route.js
import { NextResponse } from "next/server";
import { spawn } from "child_process";
import { Readable } from "stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const type = searchParams.get("type"); // audio | video

  if (!url) {
    return NextResponse.json(
      { error: "Instagram URL is required" },
      { status: 400 }
    );
  }

  const isAudio = type === "audio";
  const filename = `download.${isAudio ? "mp3" : "mp4"}`;

  const args = isAudio
    ? ["-x", "--audio-format", "mp3", "-o", "-", url]
    : ["-f", "mp4", "-o", "-", url];

  const yt = spawn("yt-dlp", args, { stdio: ["ignore", "pipe", "pipe"] });

  yt.stderr.on("data", (d) => console.error("yt-dlp:", d.toString()));

  return new NextResponse(Readable.toWeb(yt.stdout), {
    headers: {
      "Content-Type": isAudio ? "audio/mpeg" : "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Transfer-Encoding": "binary",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    },
  });
}
