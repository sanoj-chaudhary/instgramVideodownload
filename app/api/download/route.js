import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const runtime = "nodejs"; // ✅ REQUIRED
export const dynamic = "force-dynamic"; // disable caching

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const type = searchParams.get("type");

  if (!url) {
    return NextResponse.json(
      { error: "Instagram URL is required" },
      { status: 400 }
    );
  }

  const filename = `${Date.now()}.${type === "audio" ? "mp3" : "mp4"}`;
  const downloadsDir = path.join(process.cwd(), "downloads");

  // Ensure downloads folder exists
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
  }

  const outputPath = path.join(downloadsDir, filename);

  const command =
    type === "audio"
      ? `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`
      : `yt-dlp -f mp4 -o "${outputPath}" "${url}"`;

  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) {
        console.error(error);
        resolve(
          NextResponse.json(
            { error: "Download failed" },
            { status: 500 }
          )
        );
        return;
      }

      const fileBuffer = fs.readFileSync(outputPath);

      // cleanup after response
      setTimeout(() => {
        fs.unlink(outputPath, () => {});
      }, 10000);

      resolve(
        new NextResponse(fileBuffer, {
          headers: {
            "Content-Type":
              type === "audio"
                ? "audio/mpeg"
                : "video/mp4",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Access-Control-Expose-Headers": "Content-Disposition",
          },
        })
      );
    });
  });
}
