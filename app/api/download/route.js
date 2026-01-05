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
  const type = searchParams.get("type");

  if (!url) {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  const isAudio = type === "audio";
  const ext = isAudio ? "mp3" : "mp4";

  const tempFile = path.join(os.tmpdir(), `${Date.now()}.${ext}`);

  const args = isAudio
    ? ["-x", "--audio-format", "mp3", "-o", tempFile, url]
    : ["-f", "mp4", "-o", tempFile, url];

  await new Promise((resolve, reject) => {
    const yt = spawn("yt-dlp", args);

    yt.stderr.on("data", (d) =>
      console.error("yt-dlp:", d.toString())
    );

    yt.on("close", (code) => {
      if (code !== 0) reject(new Error("yt-dlp failed"));
      resolve();
    });
  });

  // ❌ file missing or empty → return error
  if (!fs.existsSync(tempFile)) {
    return NextResponse.json({ error: "Download failed (file not created)" }, { status: 500 });
  }

  const stat = fs.statSync(tempFile);
  if (stat.size < 1024) {
    const errorText = fs.readFileSync(tempFile, "utf8");
    fs.unlinkSync(tempFile);
    return NextResponse.json(
      { error: "Instagram blocked download", details: errorText },
      { status: 403 }
    );
  }

  const buffer = fs.readFileSync(tempFile);
  fs.unlinkSync(tempFile);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": isAudio ? "audio/mpeg" : "video/mp4",
      "Content-Disposition": `attachment; filename="download.${ext}"`,
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
