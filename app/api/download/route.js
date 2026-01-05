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

  const filename = `download.${type === "audio" ? "mp3" : "mp4"}`;

  // Correct yt-dlp arguments
  const args =
    type === "audio"
      ? [
          "-x",
          "--audio-format",
          "mp3",
          "-o",
          "-",
          url,
        ]
      : [
          "-f",
          "mp4",
          "-o",
          "-",
          url,
        ];

  const ytProcess = spawn("yt-dlp", args, {
    stdio: ["ignore", "pipe", "pipe"],
  });

  ytProcess.stderr.on("data", (data) => {
    console.error("yt-dlp:", data.toString());
  });

  ytProcess.on("error", (err) => {
    console.error("Spawn error:", err);
  });

  return new NextResponse(Readable.toWeb(ytProcess.stdout), {
    headers: {
      "Content-Type":
        type === "audio" ? "audio/mpeg" : "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Access-Control-Expose-Headers": "Content-Disposition",
      "Cache-Control": "no-store",
    },
  });
}
