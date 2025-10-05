"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useCart } from "@/contexts/cart-context";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import Link from "next/link";
import { useAddCartItemMutation } from "@/hooks/mutations/use-cart-mutations";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const SeasonalSelection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [productOffset, setProductOffset] = useState(0);
  const [selectedPrices, setSelectedPrices] = useState<{
    [key: string]: string;
  }>({});
  const { openCart, addToCart } = useCart();
  const addToCartMutation = useAddCartItemMutation();
  const { token } = useAuth();
  const router = useRouter();
  const {
    categories,
    products,
    categoriesLoading,
    productsLoading,
    categoriesError,
    productsError,
    isLoadingAny,
  } = useCombinedDataContext();
  const categoriesRef = useRef<HTMLDivElement>(null);

  const PRODUCTS_PER_CATEGORY = 4;

  // Filter categories that have products, then limit to first 6
  const categoriesWithProducts =
    categories?.filter((category) => {
      const categoryProducts =
        products?.filter((product) => product.category === category.name) || [];
      return categoryProducts.length > 0;
    }) || [];

  const displayCategories = categoriesWithProducts.slice(0, 6); // Show first 6 categories with products

  // Group products by category name
  const getProductsByCategory = (categoryName: string) => {
    return (
      products?.filter((product) => product.category === categoryName) || []
    );
  };

  const getCurrentProducts = () => {
    if (
      !displayCategories.length ||
      activeCategory >= displayCategories.length
    ) {
      return [];
    }

    const selectedCategory = displayCategories[activeCategory];
    const categoryProducts = getProductsByCategory(selectedCategory.name);

    // Always show exactly 4 products with pagination
    return categoryProducts.slice(
      productOffset,
      productOffset + PRODUCTS_PER_CATEGORY
    );
  };

  const getTotalPagesForCategory = () => {
    if (
      !displayCategories.length ||
      activeCategory >= displayCategories.length
    ) {
      return 0;
    }

    const selectedCategory = displayCategories[activeCategory];
    const categoryProducts = getProductsByCategory(selectedCategory.name);
    return Math.ceil(categoryProducts.length / PRODUCTS_PER_CATEGORY);
  };

  const getCurrentPage = () => {
    return Math.floor(productOffset / PRODUCTS_PER_CATEGORY) + 1;
  };

  const canScrollProductsLeft = () => {
    return productOffset > 0;
  };

  const canScrollProductsRight = () => {
    return (
      productOffset + PRODUCTS_PER_CATEGORY <
      getProductsByCategory(displayCategories[activeCategory]?.name || "")
        .length
    );
  };

  const scrollProductsLeft = () => {
    if (canScrollProductsLeft()) {
      setProductOffset(productOffset - PRODUCTS_PER_CATEGORY);
    }
  };

  const scrollProductsRight = () => {
    if (canScrollProductsRight()) {
      setProductOffset(productOffset + PRODUCTS_PER_CATEGORY);
    }
  };

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setProductOffset(0); // Reset product pagination when switching categories

    // Auto-scroll to center the active category on mobile
    if (categoriesRef.current && window.innerWidth < 640) {
      const categoriesContainer = categoriesRef.current;
      const activeCategoryButton = categoriesContainer.querySelector(
        `[data-category="${index}"]`
      ) as HTMLElement;

      if (activeCategoryButton) {
        const containerRect = categoriesContainer.getBoundingClientRect();
        const buttonRect = activeCategoryButton.getBoundingClientRect();
        const scrollLeft = categoriesContainer.scrollLeft;

        // Calculate the position to center the button
        const targetScrollLeft =
          scrollLeft +
          buttonRect.left -
          containerRect.left -
          (containerRect.width - buttonRect.width) / 2;

        categoriesContainer.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        });
      }
    }
  };

  const handleAddToCart = async (product: any, e: React.MouseEvent) => {
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
        // Use the selected price for this product, or the first price as fallback
        const selectedPriceId = selectedPrices[product._id];
        const selectedPrice = selectedPriceId
          ? product.prices.find((p: any) => p._id === selectedPriceId)
          : product.prices[0];

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
        router.push('/login');
      } catch (error) {
        console.error("Failed to save product to cart:", error);
        router.push('/login');
      }
      return;
    }

    try {
      // User is logged in - add to server cart
      const selectedPriceId = selectedPrices[product._id];
      const selectedPrice = selectedPriceId
        ? product.prices.find((p: any) => p._id === selectedPriceId)
        : product.prices[0];

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

  const isOutOfStock = (product: any) => {
    return !product.inStock || !product.quantity || product.quantity <= 0;
  };

  const hasNoPrices = (product: any) => {
    return !product.prices || product.prices.length === 0;
  };

  // Helper function to get selected or first available price
  const getSelectedPriceData = (product: any) => {
    if (!product.prices || product.prices.length === 0) {
      return { price: "N/A", size: "N/A", priceObj: null };
    }

    // Get selected price or fall back to first price
    const selectedPriceId = selectedPrices[product._id];
    const selectedPrice = selectedPriceId
      ? product.prices.find((p: any) => p._id === selectedPriceId)
      : product.prices[0];

    if (!selectedPrice) {
      return { price: "N/A", size: "N/A", priceObj: null };
    }

    const discountedPrice = selectedPrice.discount
      ? selectedPrice.price -
        (selectedPrice.price * selectedPrice.discount) / 100
      : selectedPrice.price;

    return {
      price: `${discountedPrice.toFixed(2)} €`,
      size: selectedPrice.volume,
      priceObj: selectedPrice,
    };
  };

  const handlePriceChange = (productId: string, priceId: string) => {
    setSelectedPrices((prev) => ({
      ...prev,
      [productId]: priceId,
    }));
  };

  // Loading and error states
  if (isLoadingAny) {
    return (
      <section id="seasonal" className="py-16 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-wide text-center sm:text-left">
              SEASONAL SELECTION
            </h2>
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-muted-foreground">
                Loading products...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (categoriesError || productsError) {
    return (
      <section id="seasonal" className="py-16 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-wide text-center sm:text-left">
              SEASONAL SELECTION
            </h2>
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">
                Failed to load products. Please try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!displayCategories.length) {
    return (
      <section id="seasonal" className="py-16 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-wide text-center sm:text-left">
              SEASONAL SELECTION
            </h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available at the moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="seasonal" className="py-16 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-wide text-center sm:text-left">
            SEASONAL SELECTION
          </h2>
          <div
            ref={categoriesRef}
            className="flex gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 overflow-x-auto px-4 sm:px-0"
          >
            {displayCategories.map((category, index) => (
              <button
                key={category._id}
                data-category={index}
                onClick={() => handleCategoryChange(index)}
                className={`text-xs sm:text-sm md:text-sm font-medium tracking-wide pb-1.5 sm:pb-2 border-b-2 transition-colors duration-300 whitespace-nowrap px-2 sm:px-0 ${
                  index === activeCategory
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {getTotalPagesForCategory() > 1 && (
            <>
              <button
                onClick={scrollProductsLeft}
                disabled={!canScrollProductsLeft()}
                className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full p-2 md:p-4 transition-all duration-300 border border-gray-200/50 hidden sm:block disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600 stroke-[1]" />
              </button>

              <button
                onClick={scrollProductsRight}
                disabled={!canScrollProductsRight()}
                className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full p-2 md:p-4 transition-all duration-300 border border-gray-200/50 hidden sm:block disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 stroke-[1]" />
              </button>
            </>
          )}

          <div className="pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-12">
              {getCurrentProducts().map((product, index) => {
                const productImage =
                  product.featureImage ||
                  "/luxury-perfume-discovery-set-with-golden-accents.jpg";
                const { price: productPrice, size: productSize } =
                  getSelectedPriceData(product);

                const outOfStock = isOutOfStock(product);
                const noPrices = hasNoPrices(product);
                const hasMultiplePrices =
                  product.prices && product.prices.length > 1;

                return (
                  <Card
                    key={product._id}
                    className={`group bg-white border-0 shadow-none animate-fade-in-up animate-delay-${
                      index * 200
                    } relative w-full max-w-sm mx-auto ${
                      outOfStock || noPrices ? "opacity-75" : ""
                    }`}
                  >
                    {/* Out of stock badge */}
                    {outOfStock && (
                      <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        OUT OF STOCK
                      </div>
                    )}

                    {/* No prices badge */}
                    {noPrices && !outOfStock && (
                      <div className="absolute top-4 left-4 z-20 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
                        PRICE UNAVAILABLE
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-xs font-medium text-muted-foreground tracking-wider italic">
                        {product.brand}
                      </span>
                    </div>

                    <div className="p-4 md:p-6 min-h-[520px] md:h-[550px] flex flex-col">
                      <Link href={`/products/${product._id}`} className="block">
                        <div className="aspect-[3/4] mb-3 md:mb-6 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0 cursor-pointer">
                          <img
                            src={productImage}
                            alt={product.name}
                            className={`w-full h-full object-contain transition-transform duration-500 ${
                              outOfStock ? "grayscale" : "group-hover:scale-105"
                            }`}
                          />
                        </div>
                      </Link>

                      <div className="text-center space-y-2 md:space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2 md:space-y-4">
                          <Link
                            href={`/products/${product._id}`}
                            className="block"
                          >
                            <div className="min-h-[3rem] md:h-14 flex items-center justify-center">
                              <h3 className="font-medium text-base md:text-lg tracking-wider text-foreground leading-tight cursor-pointer hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </div>
                          </Link>

                          {/* <div className="flex justify-center gap-2 flex-wrap min-h-[1.25rem]">
                              {product.tags?.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs text-muted-foreground tracking-wider"
                                >
                                  {tag}
                                  {tagIndex <
                                    (product.tags?.slice(0, 2).length || 0) -
                                      1 && <span className="ml-2">•</span>}
                                </span>
                              ))}
                            </div> */}

                          {/* Price and Volume Display */}
                          <div className="mb-2 md:mb-4 min-h-[50px] flex items-center justify-center">
                            {hasMultiplePrices ? (
                              <div className="flex items-center gap-12 w-full">
                                {/* Price Display */}
                                <div className="flex-shrink-0">
                                  <span className="font-medium text-base md:text-lg text-primary">
                                    {productPrice}
                                  </span>
                                </div>
                                {/* Volume Dropdown */}
                                <div className="relative flex-1">
                                  <select
                                    value={
                                      selectedPrices[product._id] ||
                                      product.prices[0]._id
                                    }
                                    onChange={(e) =>
                                      handlePriceChange(
                                        product._id,
                                        e.target.value
                                      )
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full px-3 py-2 text-sm font-semibold border border-primary rounded-md bg-white appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  >
                                    {product.prices.map((priceOption: any) => (
                                      <option
                                        key={priceOption._id}
                                        value={priceOption._id}
                                      >
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
                                <span className="font-medium text-base md:text-lg text-primary">
                                  {productPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-auto pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={outOfStock || noPrices}
                            className={`w-full font-medium tracking-wider text-xs md:text-sm py-2 md:py-3 transition-colors duration-300 ${
                              outOfStock || noPrices
                                ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                                : "border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
                            }`}
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            {outOfStock ? "OUT OF STOCK" : noPrices ? "PRICE UNAVAILABLE" : "ADD TO CART"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalSelection;
