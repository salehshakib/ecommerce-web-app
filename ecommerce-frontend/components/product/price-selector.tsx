"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useProductPricesQuery,
  type ProductPrice,
} from "@/hooks/queries/use-product-prices-query";

interface PriceSelectorProps {
  productId: string;
  onPriceSelect: (priceIds: string[], selectedPrice: ProductPrice) => void;
  selectedPriceId?: string;
}

export function PriceSelector({
  productId,
  onPriceSelect,
  selectedPriceId,
}: PriceSelectorProps) {
  const { data: prices, isLoading, error } = useProductPricesQuery(productId);
  const [selectedPrice, setSelectedPrice] = useState<ProductPrice | null>(null);
  const [selectedPriceString, setSelectedPriceString] = useState<string>("");

  // Auto-select first price when prices are loaded
  useEffect(() => {
    if (prices && prices.length > 0 && !selectedPrice) {
      const firstPrice = prices[0];
      setSelectedPrice(firstPrice);
      setSelectedPriceString(firstPrice._id);
      onPriceSelect([firstPrice._id], firstPrice);
    }
  }, [prices, selectedPrice, onPriceSelect]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="animate-pulse bg-gray-200 rounded-md h-10 w-full"></div>
      </div>
    );
  }

  if (error || !prices?.length) {
    return (
      <div className="text-sm text-red-600">Unable to load price options</div>
    );
  }

  const handlePriceSelect = (price: ProductPrice) => {
    setSelectedPrice(price);
    setSelectedPriceString(price._id);
    // Pass the selected price ID as an array (as required by API)
    onPriceSelect([price._id], price);
  };

  const calculateDiscountedPrice = (price: ProductPrice) => {
    if (price.discount && price.discount > 0) {
      return price.price - (price.price * price.discount) / 100;
    }
    return price.price;
  };

  const formatPrice = (amount: number) => {
    return `${amount.toFixed(2)} €`;
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-900 block mb-2">
        Size & Price
      </label>

      {/* Seasonal Card Style Display */}
      <div className="mb-2 md:mb-4 min-h-[50px] flex items-center justify-center">
        {prices && prices.length > 1 ? (
          <div className="flex items-center  gap-12 w-full">
            {/* Price Display */}
            <div className="flex-shrink-0">
              {selectedPrice && (
                <div className="flex items-center gap-2">
                  {selectedPrice.discount && selectedPrice.discount > 0 ? (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(selectedPrice.price)}
                      </span>
                      <span className="font-medium text-base md:text-lg text-primary">
                        {formatPrice(calculateDiscountedPrice(selectedPrice))}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-base md:text-lg text-primary">
                      {formatPrice(selectedPrice.price)}
                    </span>
                  )}
                </div>
              )}
            </div>
            {/* Volume Dropdown */}
            <div className="relative flex-1">
              <select
                value={selectedPriceString}
                onChange={(e) => {
                  const selectedPriceData = prices.find(
                    (p) => p._id === e.target.value
                  );
                  if (selectedPriceData) {
                    handlePriceSelect(selectedPriceData);
                  }
                }}
                className="w-full px-3 py-2 text-sm font-semibold border border-primary rounded-md bg-white appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {prices.map((priceOption) => (
                  <option key={priceOption._id} value={priceOption._id}>
                    {priceOption.volume}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        ) : (
          // Single price display
          <div className="flex justify-center">
            {selectedPrice && (
              <div className="flex items-center gap-2">
                {selectedPrice.discount && selectedPrice.discount > 0 ? (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(selectedPrice.price)}
                    </span>
                    <span className="font-medium text-base md:text-lg text-primary">
                      {formatPrice(calculateDiscountedPrice(selectedPrice))}
                    </span>
                  </>
                ) : (
                  <span className="font-medium text-base md:text-lg text-primary">
                    {formatPrice(selectedPrice.price)}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
