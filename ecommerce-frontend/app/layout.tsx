import Loading from "@/components/ui/loading";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import AppProviders from "@/providers/app-providers";
import { generatePageMetadata } from "@/lib/metadata-generator";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${dmSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <Suspense fallback={<Loading size="md" />}>{children}</Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
