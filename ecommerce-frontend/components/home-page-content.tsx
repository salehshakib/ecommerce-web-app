"use client";

import DiscoverySetsBanner from "@/components/discovery-sets-banner";
import HeroSection from "@/components/hero-section";
import LifestyleSections from "@/components/lifestyle-sections";
import SeasonalSelection from "@/components/seasonal-selection";
import VisionSection from "@/components/vision-section";

export function HomePageContent() {
  return (
    <main className="min-h-screen relative">
      <div className="">
        <HeroSection />
        <SeasonalSelection />
        <LifestyleSections />
        <DiscoverySetsBanner />
        <VisionSection />
        {/* <NewsletterSection /> */}
      </div>
      {/* <NewsletterPopup /> */}
    </main>
  );
}
