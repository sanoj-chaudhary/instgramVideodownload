// app/api/download/route.js
import { NextResponse } from "next/server";
import { spawn } from "child_process";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const type = searchParams.get("type"); // "audio" or "video"

  if (!url) {
    return NextResponse.json({ error: "Instagram URL is required" }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    const filename = `${Date.now()}.${type === "audio" ? "mp3" : "mp4"}`;
    
    // Build yt-dlp command
    const args = [url, '--no-check-certificate', '--quiet', '-o', '-'];
    if (type === "audio") {
      args.unshift('-x', '--audio-format', 'mp3');
    } else {
      args.unshift('-f', 'mp4');
    }

    // Spawn yt-dlp process
    const ytProcess = spawn('yt-dlp', args);

    const chunks = [];
    ytProcess.stdout.on('data', (chunk) => chunks.push(chunk));
    ytProcess.stderr.on('data', (chunk) => console.error(chunk.toString()));

    ytProcess.on('close', (code) => {
      if (code !== 0) {
        return resolve(
          NextResponse.json({ error: 'Download failed' }, { status: 500 })
        );
      }

      const fileBuffer = Buffer.concat(chunks);

      resolve(
        new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": type === "audio" ? "audio/mpeg" : "video/mp4",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Access-Control-Expose-Headers": "Content-Disposition",
          },
        })
      );
    });

    ytProcess.on('error', (err) => {
      console.error(err);
      resolve(NextResponse.json({ error: 'Failed to spawn yt-dlp', details: err.message }, { status: 500 }));
    });
  });
}
