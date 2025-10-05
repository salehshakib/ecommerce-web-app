"use client";

import React, { createContext, useContext } from "react";
import { useAppData } from "@/hooks/use-app-data";
import type { Category } from "@/hooks/queries/use-categories-query";
import type { Product } from "@/types/product";
import type { ISetting } from "@/types/settings";
import type { ProductType } from "@/hooks/queries/use-types-query";

interface CombinedDataContextType {
  // Settings
  settings: ISetting | null;
  settingsLoading: boolean;
  settingsError: string | null;

  // Categories
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;

  // Products
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;

  // Types
  types: ProductType[];
  typesLoading: boolean;
  typesError: string | null;

  // Global loading states
  isInitialLoading: boolean;
  isLoadingAny: boolean;
  hasErrors: boolean;

  // Refetch methods
  refetchSettings: () => Promise<any>;
  refetchCategories: () => Promise<any>;
  refetchProducts: () => Promise<any>;
  refetchTypes: () => Promise<any>;
  refetchAll: () => Promise<void>;

  // Derived states
  hasData: boolean;
}

const CombinedDataContext = createContext<CombinedDataContextType | undefined>(undefined);

interface CombinedDataProviderProps {
  children: React.ReactNode;
}

export function CombinedDataProvider({ children }: CombinedDataProviderProps) {
  const appData = useAppData();

  return (
    <CombinedDataContext.Provider value={appData}>
      {children}
    </CombinedDataContext.Provider>
  );
}

export function useCombinedDataContext(): CombinedDataContextType {
  const context = useContext(CombinedDataContext);
  if (context === undefined) {
    throw new Error("useCombinedDataContext must be used within a CombinedDataProvider");
  }
  return context;
}