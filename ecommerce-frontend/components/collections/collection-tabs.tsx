"use client";

import { useRef, useEffect } from "react";
import type { ProductType } from "@/hooks/queries/use-types-query";

interface CollectionTabsProps {
  activeTab: string;
  types: ProductType[] | undefined;
  onTabChange: (typeName: string) => void;
}

export function CollectionTabs({
  activeTab,
  types,
  onTabChange,
}: CollectionTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to center the active tab on mobile
    if (tabsRef.current && window.innerWidth < 640) {
      const tabsContainer = tabsRef.current;
      const activeTabButton = tabsContainer.querySelector(
        `[data-tab="${activeTab}"]`
      ) as HTMLElement;

      if (activeTabButton) {
        const containerRect = tabsContainer.getBoundingClientRect();
        const buttonRect = activeTabButton.getBoundingClientRect();
        const scrollLeft = tabsContainer.scrollLeft;

        // Calculate the position to center the button
        const targetScrollLeft =
          scrollLeft +
          buttonRect.left -
          containerRect.left -
          (containerRect.width - buttonRect.width) / 2;

        tabsContainer.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="border-b pt-8">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div
          ref={tabsRef}
          className="flex justify-start sm:justify-center space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide px-6 sm:px-0"
        >
          {/* All Fragrances Tab */}
          <button
            data-tab="all"
            onClick={() => onTabChange("all")}
            className={`text-xs sm:text-sm tracking-wider pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "all"
                ? "border-black text-black font-medium"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            All Fragrances
          </button>

          {/* Dynamic Types from API */}
          {types?.map((type) => (
            <button
              key={type._id}
              data-tab={type.name}
              onClick={() => onTabChange(type.name)}
              className={`text-xs sm:text-sm tracking-wider pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === type.name
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}