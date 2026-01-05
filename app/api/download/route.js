// app/api/download/route.js
import { NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const type = searchParams.get("type"); // audio | video

  if (!url) {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  const isAudio = type === "audio";
  const ext = isAudio ? "mp3" : "mp4";
  const filename = `download.${ext}`;

  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, `${Date.now()}.${ext}`);

  const args = isAudio
    ? ["-x", "--audio-format", "mp3", "--no-playlist", "-o", filePath, url]
    : ["-f", "mp4", "--no-playlist", "-o", filePath, url];

  await new Promise((resolve, reject) => {
    const yt = spawn("yt-dlp", args);

    yt.stderr.on("data", (d) => console.error("yt-dlp:", d.toString()));

    yt.on("close", (code) => {
      if (code !== 0) reject(new Error("yt-dlp failed"));
      else resolve();
    });
  });

  const fileBuffer = fs.readFileSync(filePath);
  fs.unlinkSync(filePath); // cleanup

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": isAudio ? "audio/mpeg" : "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": fileBuffer.length,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
