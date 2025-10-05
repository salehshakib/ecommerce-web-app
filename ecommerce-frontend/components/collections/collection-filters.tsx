"use client";

import type { Category } from "@/hooks/queries/use-categories-query";

interface CollectionFiltersProps {
  activeFilter: string;
  categories: Category[] | undefined;
  onFilterChange: (categoryName: string) => void;
  productCount: number;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

export function CollectionFilters({
  activeFilter,
  categories,
  onFilterChange,
  productCount,
  onClearFilters,
  hasActiveFilters = false,
}: CollectionFiltersProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 mb-3 sm:mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1 text-xs tracking-wider rounded-full transition-colors ${
              activeFilter === "all"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories
          </button>
          {categories?.map((category) => (
            <button
              key={category._id}
              onClick={() => onFilterChange(category.name)}
              className={`px-3 py-1 text-xs tracking-wider rounded-full transition-colors ${
                activeFilter === category.name
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between sm:justify-end sm:space-x-4 gap-4">
          <span className="text-sm text-gray-600">
            {productCount} products
          </span>

          {hasActiveFilters && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-black underline hover:text-primary transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}