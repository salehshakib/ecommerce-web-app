import ProtectedRouteGuard from "@/components/auth/protected-route-guard";
import CartDrawer from "@/components/cart-drawer";
import Header from "@/components/header";
import { MarqueeDemo } from "@/components/marquee";
import type React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Providers are handled by root layout
  return (
    <ProtectedRouteGuard>
      <div className="min-h-screen flex flex-col">
        <MarqueeDemo />
        <Header />
        <main className="flex-1" style={{ paddingTop: "152px" }}>
          {children}
        </main>
        <CartDrawer />
      </div>
    </ProtectedRouteGuard>
  );
}
