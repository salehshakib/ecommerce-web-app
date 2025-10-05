import Header from "@/components/header";
import { MarqueeDemo } from "@/components/marquee";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No authentication required for auth pages (login, register)
  // Providers are handled by root layout
  return (
    <div className="min-h-screen bg-gray-50">
      <MarqueeDemo />
      <Header />
      <div
        className="flex items-center justify-center px-4"
        style={{ paddingTop: "90px", minHeight: "calc(100vh - 90px)" }}
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
