import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-generator";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SeasonalSelection from "@/components/seasonal-selection";
import LifestyleSections from "@/components/lifestyle-sections";
import DiscoverySetsBanner from "@/components/discovery-sets-banner";
import VisionSection from "@/components/vision-section";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import NewsletterPopup from "@/components/newsletter-popup";
import { HomePageContent } from "@/components/home-page-content";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "Home",
    keywords: ["luxury perfumes", "fragrances", "perfume store", "home"],
  });
}

export default function Home() {
  return (
    <HomePageContent />
  );
}
