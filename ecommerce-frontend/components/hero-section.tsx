"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCombinedDataContext } from "@/providers/combined-data-provider";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { settings } = useCombinedDataContext();

  const handleExploreCollection = () => {
    router.push("/collections");
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="absolute inset-0">
        <img
          src={
            settings?.bannerConfig?.bannerImage ||
            "/elegant-gentleman-in-green-suit-holding-playing-ca.png"
          }
          alt={
            settings?.bannerConfig?.bannerHeaderText ||
            "Elegant gentleman in luxury setting"
          }
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
          >
            <p className="text-xs sm:text-sm font-medium tracking-widest text-white/80 mb-3 sm:mb-4">
              FOR YOUR SCENTED ESSENTIALS
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {settings?.bannerConfig?.bannerHeaderText?.split(" ")?.join(" ")}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 max-w-md leading-relaxed">
              {settings?.bannerConfig?.bannerSubText ||
                "Discover our exclusive collection of luxury fragrances, crafted for those who appreciate the finest things in life."}
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-wide transition-colors duration-200"
              onClick={handleExploreCollection}
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
