// NO "use client" here
import Steps from "./components/Steps";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import HeroDownloader from "./components/HeroDownloader";
import type { Metadata } from "next";



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
