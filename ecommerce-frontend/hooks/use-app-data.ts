"use client";

import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { useSettingsQuery } from "@/hooks/queries/use-settings-query";
import { useCategoriesQuery } from "@/hooks/queries/use-categories-query";
import { useTypesQuery } from "@/hooks/queries/use-types-query";

/**
 * Hook that provides global app data using TanStack Query
 * Fetches settings, categories, products, and types for the entire application
 */
export const useAppData = () => {
  // Use TanStack Query hooks for data fetching
  const {
    data: settings,
    isLoading: settingsLoading,
    error: settingsError,
    refetch: refetchSettings,
  } = useSettingsQuery();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategoriesQuery();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProductsQuery();

  const {
    data: types,
    isLoading: typesLoading,
    error: typesError,
    refetch: refetchTypes,
  } = useTypesQuery();

  const refetchAll = async () => {
    await Promise.all([
      refetchSettings(),
      refetchCategories(),
      refetchProducts(),
      refetchTypes(),
    ]);
  };

  return {
    // Settings
    settings: settings || null,
    settingsLoading,
    settingsError: settingsError?.message || null,

    // Categories
    categories: categories || [],
    categoriesLoading,
    categoriesError: categoriesError?.message || null,

    // Products
    products: products || [],
    productsLoading,
    productsError: productsError?.message || null,

    // Types
    types: types || [],
    typesLoading,
    typesError: typesError?.message || null,

    // Global loading states
    isInitialLoading: settingsLoading && categoriesLoading && productsLoading && typesLoading,
    isLoadingAny: settingsLoading || categoriesLoading || productsLoading || typesLoading,
    hasErrors: !!(settingsError || categoriesError || productsError || typesError),

    // Refetch methods
    refetchSettings,
    refetchCategories,
    refetchProducts,
    refetchTypes,
    refetchAll,

    // Derived states
    hasData: !!(settings || (categories && categories.length > 0) || (products && products.length > 0) || (types && types.length > 0)),
  };
};