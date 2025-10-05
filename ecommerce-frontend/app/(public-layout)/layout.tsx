"use client";

import CartDrawer from "@/components/cart-drawer";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MarqueeDemo } from "@/components/marquee";
import MobileBottomNavbar from "@/components/mobile-bottom-navbar";
import Loading from "@/components/ui/loading";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { usePathname } from "next/navigation";
import type React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isInitialLoading } = useCombinedDataContext();

  if (isInitialLoading) {
    return <Loading message="Loading luxury fragrances..." />;
  }

  // Providers are handled by root layout
  return (
    <div className="min-h-screen flex flex-col">
      <MarqueeDemo />
      <Header />
      <main
        className={`flex-1 pb-0 md:pb-0 ${
          isHomePage ? "pt-[36px] md:pt-[52px]" : "pt-[90px] md:pt-[140px]"
        }`}
      >
        <div className="animate-fade-in">{children}</div>
      </main>
      <Footer />
      <CartDrawer />
      <MobileBottomNavbar />
    </div>
  );
}
