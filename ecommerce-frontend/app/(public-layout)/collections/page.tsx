"use client";

import { useState, useEffect } from "react";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCardGrid } from "@/components/product/product-card-grid";
import { CollectionTabs } from "@/components/collections/collection-tabs";
import { CollectionFilters } from "@/components/collections/collection-filters";

const CollectionsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categories, products, types } = useCombinedDataContext();
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  // Use real product data from the API
  const allProducts = products || [];

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const typeParam = searchParams.get("type");

    if (typeParam) {
      setActiveTab(typeParam);
    } else {
      setActiveTab("all");
    }

    if (categoryParam) {
      setActiveFilter(categoryParam);
    } else {
      setActiveFilter("all");
    }
  }, [searchParams]);

  const getFilteredProducts = () => {
    let filtered = allProducts;

    // Filter by type (from tabs)
    if (activeTab !== "all") {
      filtered = filtered.filter((p) =>
        p.type?.some((t: any) =>
          t.name?.toLowerCase() === activeTab.toLowerCase()
        )
      );
    }

    // Filter by category (from filter chips)
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    return filtered;
  };

  const handleTabChange = (typeName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (typeName === "all") {
      params.delete("type");
    } else {
      params.set("type", typeName);
    }
    const queryString = params.toString();
    router.push(`/collections${queryString ? `?${queryString}` : ""}`);
  };

  const handleFilterChange = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryName === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }
    const queryString = params.toString();
    router.push(`/collections${queryString ? `?${queryString}` : ""}`);
  };

  const handleClearFilters = () => {
    router.push("/collections");
  };

  const filteredProducts = getFilteredProducts();
  const hasActiveFilters = activeTab !== "all" || activeFilter !== "all";

  return (
    <div className="min-h-screen bg-white">
      {/* Tabs */}
      <CollectionTabs
        activeTab={activeTab}
        types={types}
        onTabChange={handleTabChange}
      />

      {/* Filters */}
      <CollectionFilters
        activeFilter={activeFilter}
        categories={categories}
        onFilterChange={handleFilterChange}
        productCount={filteredProducts.length}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCardGrid key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;