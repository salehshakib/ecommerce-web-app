"use client";

import { ChevronDown, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const formatTypes = (type?: { _id: string; name: string; __v: number }[]) => {
  if (!type || type.length === 0) return "";
  return type
    .map((t) => t.name)
    .slice(0, 2)
    .join(" | ");
};

interface ProductCardGridProps {
  product: Product;
}

export function ProductCardGrid({ product }: ProductCardGridProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string>(
    product.prices?.[0]?._id || ""
  );
  const { addToCart } = useCart();
  const { token } = useAuth();
  const router = useRouter();

  const isOutOfStock = product.quantity === 0 || false;
  const hasNoPrices = product.prices.length === 0;

  const getSelectedPriceData = () => {
    if (!product.prices || product.prices.length === 0) {
      return { price: "Price Unavailable", volume: "" };
    }

    const selectedPrice =
      product.prices.find((p) => p._id === selectedPriceId) ||
      product.prices[0];
    return selectedPrice;
  };

  const handlePriceChange = (priceId: string) => {
    setSelectedPriceId(priceId);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if product is in stock
    if (!product.inStock || !product.quantity || product.quantity <= 0) {
      return;
    }

    // Check if product has prices
    if (!product.prices || product.prices.length === 0) {
      console.warn("No prices available for this product");
      return;
    }

    // If user is not logged in, redirect to login
    if (!token) {
      try {
        const selectedPrice =
          product.prices.find((p) => p._id === selectedPriceId) ||
          product.prices[0];

        if (!selectedPrice) {
          console.warn("Selected price not found for product");
          return;
        }

        // Add to cart (will be saved to localStorage)
        await addToCart({
          productId: product._id,
          productPriceIds: [selectedPrice._id],
          quantity: 1,
        });

        // Redirect to login page
        router.push("/login");
      } catch (error) {
        console.error("Failed to save product to cart:", error);
        router.push("/login");
      }
      return;
    }

    try {
      // User is logged in - add to server cart
      const selectedPrice =
        product.prices.find((p) => p._id === selectedPriceId) ||
        product.prices[0];

      if (!selectedPrice) {
        console.warn("Selected price not found for product");
        return;
      }

      // Add to cart (will be saved to server)
      await addToCart({
        productId: product._id,
        productPriceIds: [selectedPrice._id],
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const selectedPriceData = getSelectedPriceData();

  return (
    <Card
      className={`group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out py-4 pt-0 h-full flex flex-col ${
        isOutOfStock || hasNoPrices ? "opacity-60" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" flex flex-col flex-1">
        {/* Product Image */}
        <Link
          href={`/products/${product._id}`}
          className="block mb-4 sm:mb-6 relative"
        >
          <div className=" overflow-hidden rounded-t-xl md:rounded-t-2xl bg-muted/30 flex items-center justify-center group-hover:bg-muted/50 transition-colors duration-300 relative">
            <img
              src={
                product.featureImage ||
                "/luxury-perfume-discovery-set-with-golden-accents.jpg"
              }
              alt={product.name}
              className={`w-full h-64 object-cover transition-all duration-700 ${
                isOutOfStock || hasNoPrices
                  ? "grayscale"
                  : "group-hover:scale-105"
              }`}
            />
            {(isOutOfStock || hasNoPrices) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                <div className="text-center">
                  {isOutOfStock && (
                    <Badge
                      variant="destructive"
                      className="text-sm font-semibold px-4 py-2 rounded-full shadow-lg"
                    >
                      Out of Stock
                    </Badge>
                  )}
                  {hasNoPrices && !isOutOfStock && (
                    <Badge
                      variant="secondary"
                      className="text-sm font-semibold px-4 py-2 rounded-full shadow-lg"
                    >
                      Price Unavailable
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Product Name */}
        <Link href={`/products/${product._id}`} className="block  px-4 flex-1">
          <h3 className="font-semibold md:text-lg text-base text-foreground leading-tight hover:text-primary transition-colors duration-200 text-balance">
            {product.name}
          </h3>
        </Link>

        <div className="mb-4 min-h-[3rem] flex flex-col px-4  justify-center">
          {/* Types - First line */}
          <div className="h-5 flex items-center mb-1">
            {product.type && product.type.length > 0 && (
              <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide">
                {formatTypes(product.type)}
              </span>
            )}
          </div>

          {/* Brand - Second line */}
          <div className="h-5 flex items-center">
            {product.brand && (
              <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide uppercase">
                {product.brand}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4 sm:mb-6 px-4">
          {!hasNoPrices && product.prices && product.prices.length > 1 ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              {/* Price Display */}
              <div className="text-xl sm:text-2xl font-bold text-primary flex-shrink-0">
                {selectedPriceData.price}
              </div>

              {/* Volume Selector */}
              <div className="relative flex-1 sm:max-w-[140px]">
                <select
                  value={selectedPriceId || product.prices[0]._id}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium border border-border rounded-lg sm:rounded-xl bg-background appearance-none cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                >
                  {product.prices.map((priceOption) => (
                    <option key={priceOption._id} value={priceOption._id}>
                      {priceOption.volume}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          ) : !hasNoPrices ? (
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {selectedPriceData.price}
            </div>
          ) : (
            <div className="text-xl sm:text-2xl font-bold text-muted-foreground">
              Price Unavailable
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="flex items-center w-full px-4">
          <Button
            variant={isOutOfStock || hasNoPrices ? "secondary" : "default"}
            onClick={handleAddToCart}
            disabled={isOutOfStock || hasNoPrices}
            className={`w-full  md:h-10 h-8 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 mt-auto `}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
            {isOutOfStock
              ? "Out of Stock"
              : hasNoPrices
              ? "Price Unavailable"
              : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
}