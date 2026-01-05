import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Instagram Reels Downloader – Download Video & Audio",
    template: "%s | Instagram Reels Downloader",
  },
  description:
    "Download Instagram Reels videos and audio (MP4 & MP3) instantly. Free, fast, and easy Instagram downloader.",
  keywords: [
    "instagram reels downloader",
    "download instagram video",
    "instagram mp3 downloader",
    "instagram reel download",
    "instagram video saver",
  ],
  authors: [{ name: "sanoj chaudhary" }],
  creator: "sanoj chaudhary",
  metadataBase: new URL("https://instgramvideodownload.onrender.com"),

  openGraph: {
    title: "Instagram Reels Downloader",
    description:
      "Download Instagram Reels videos and audio instantly in MP4 or MP3 format.",
    url: "https://instgramvideodownload.onrender.com",
    siteName: "Instagram Reels Downloader",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Instagram Reels Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Instagram Reels Downloader",
    description:
      "Download Instagram videos & audio fast and free.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
