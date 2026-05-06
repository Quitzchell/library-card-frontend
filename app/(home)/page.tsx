import Hero from "@/app/(home)/_components/Hero";

import React from "react";
import TourSection from "@/app/(home)/_components/TourSection";
import ReleaseContainer from "@/app/(home)/_components/ReleaseContainer";
import VideoContainer from "@/app/(home)/_components/VideoContainer";
import AboutContainer from "@/app/(home)/_components/AboutContainer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section className="mb-8 space-y-8">
        <TourSection />
        <ReleaseContainer />
        <VideoContainer />
        <AboutContainer />
      </section>
    </main>
  );
}
