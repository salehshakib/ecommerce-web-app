"use client";

import type React from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import QueryProvider from "@/providers/query-provider";
import { CombinedDataProvider } from "@/providers/combined-data-provider";
import { Toaster } from "@/components/ui/toaster";

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <CombinedDataProvider>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </CombinedDataProvider>
    </QueryProvider>
  );
}
