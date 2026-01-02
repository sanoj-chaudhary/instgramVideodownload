// NO "use client" here
import Steps from "./components/Steps";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import HeroDownloader from "./components/HeroDownloader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Reels Downloader – MP4 & MP3 Free",
  description:
    "Free Instagram Reels downloader. Download videos and audio in MP4 or MP3 format instantly.",
};

export default function InstagramDownloader() {
  return (
    <>
      <StructuredData />
      <HeroDownloader /> {/* this is a client component, it's fine */}
      <Steps />
      <FAQ />
      <Footer />
    </>
  );
}
