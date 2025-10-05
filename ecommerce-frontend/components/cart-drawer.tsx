"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddCartItemMutation } from "@/hooks/mutations/use-cart-mutations";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import Image from "next/image";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart } =
    useCart();
  const addToCartMutation = useAddCartItemMutation();
  const { products } = useCombinedDataContext();
  const router = useRouter();
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position in ref to persist across renders
      savedScrollY.current = window.scrollY;

      // Apply the drawer-open class to disable scroll
      document.body.classList.add("drawer-open");
      document.body.style.top = `-${savedScrollY.current}px`;

      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        // Remove styles and restore scroll position
        document.body.classList.remove("drawer-open");
        document.body.style.top = "";

        // Restore scroll position using saved value
        if (savedScrollY.current !== undefined) {
          window.scrollTo(0, savedScrollY.current);
        }

        setShouldRender(false);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      document.body.classList.remove("drawer-open");
      document.body.style.top = "";
    };
  }, []);

  // Generate category-based recommendations from real products
  const getRecommendations = () => {
    if (!products || !items.length) return [];

    // Get unique categories from current cart items
    const cartCategories = [
      ...new Set(
        items.flatMap((item) => item.tags.filter((tag) => tag !== item.tags[0]))
      ),
    ]; // Get category tags (second tag)

    // Find products in the same categories that are not already in cart
    const cartProductIds = items.map((item) => item.productId);
    const recommendations = products
      .filter(
        (product) =>
          // Product not in cart
          !cartProductIds.includes(product._id) &&
          // Product has prices
          product.prices &&
          product.prices.length > 0 &&
          // Product is in stock
          product.inStock &&
          product.quantity > 0 &&
          // Product is in same category as cart items
          cartCategories.includes(product.category)
      )
      .slice(0, 6) // Limit to 6 recommendations
      .map((product) => {
        const firstPrice = product.prices[0];
        const discountedPrice = firstPrice.discount
          ? firstPrice.price - (firstPrice.price * firstPrice.discount) / 100
          : firstPrice.price;

        return {
          _id: product._id, // Fixed: use _id instead of id
          name: product.name,
          price: `${discountedPrice.toFixed(2)} €`,
          size: firstPrice.volume,
          image: product.featureImage || "/placeholder.svg",
          brand: product.brand,
          category: product.category,
          prices: product.prices,
        };
      });

    return recommendations;
  };

  const recommendations = getRecommendations();

  const scrollRecommendations = (direction: "left" | "right") => {
    if (recommendationsRef.current) {
      const scrollAmount = 200;
      recommendationsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = async (item: (typeof recommendations)[0]) => {
    setAddedItemId(item._id); // Fixed: use _id instead of id
    setTimeout(() => setAddedItemId(null), 600);

    // Check if product has prices
    if (!item.prices || item.prices.length === 0) {
      console.warn("No prices available for this product");
      return;
    }

    try {
      // Use the first available price
      const firstPrice = item.prices[0];

      await addToCartMutation.mutateAsync({
        product: item._id, // Fixed: use _id instead of id
        productPrices: [firstPrice._id],
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add recommended product to cart:", error);
    }
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearDialog(false);
  };

  const handleContinueShopping = () => {
    closeCart();
    router.push("/collections");
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 flex flex-col transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-90"
        }`}
        style={{
          transform: isVisible
            ? "translateX(0) translateZ(0)"
            : "translateX(100%) translateZ(0)",
          willChange: "transform, opacity",
        }}
      >
        {items.length > 0 && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-b flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-medium tracking-wider">
              YOUR CART
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Conditional rendering for empty cart state */}
        {items.length === 0 ? (
          // Empty Cart State
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative">
            <button
              onClick={closeCart}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium tracking-wider mb-8">
              Your cart is empty
            </h3>
            <Button
              variant="outline"
              className="border-black hover:bg-black hover:text-white py-3 px-8 bg-transparent tracking-wider text-base font-medium mb-6"
              onClick={handleContinueShopping}
            >
              CONTINUE SHOPPING
            </Button>
            <div className="text-sm text-muted-foreground">
              <span>Have an account? </span>
              <button className="underline hover:text-foreground">
                Log in
              </button>
              <span> to check out faster.</span>
            </div>
          </div>
        ) : (
          // Cart with Items
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col h-full">
                {/* Cart Items */}
                <div className="p-4 sm:p-6 space-y-4 border-b">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain bg-gray-50 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-base tracking-wider">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.size}
                        </p>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-sm text-muted-foreground underline hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item._id,
                              Number.parseInt(e.target.value)
                            )
                          }
                          className="text-sm border rounded px-2 py-1 mb-2"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <p className="text-base font-medium">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* You May Also Like */}
                <div
                  style={{ backgroundColor: "#f8f5f9" }}
                  className="p-4 sm:p-6 flex-1"
                >
                  <h3 className="text-sm sm:text-base font-medium tracking-wider mb-3 sm:mb-4">
                    YOU MAY ALSO LIKE
                  </h3>

                  {recommendations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">
                        No recommendations available at the moment.
                      </p>
                    </div>
                  ) : (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {recommendations.length > 3 && (
                        <>
                          <button
                            onClick={() => scrollRecommendations("left")}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white rounded-full p-3 transition-all duration-300 ${
                              isHovering
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2"
                            }`}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => scrollRecommendations("right")}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white rounded-full p-3 transition-all duration-300 ${
                              isHovering
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-2"
                            }`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      <div
                        ref={recommendationsRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide px-8"
                      >
                        {recommendations.map((item) => (
                          <div
                            key={item._id}
                            className="flex-shrink-0 w-36 sm:w-48 text-center bg-white rounded-lg p-3 sm:p-4 flex flex-col"
                          >
                            <div className="h-24 sm:h-32 bg-white rounded mb-2 sm:mb-3 flex items-center justify-center">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={192}
                                height={128}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-sm sm:text-base font-medium mb-1 sm:mb-2 tracking-wider h-8 sm:h-12 flex items-center justify-center text-center leading-tight">
                              {item.name}
                            </p>
                            <div className="h-16 sm:h-20 flex flex-col justify-center mb-2 sm:mb-4">
                              <p className="text-xs text-muted-foreground mb-1">
                                {item.brand}
                              </p>
                              <p className="text-sm sm:text-base font-medium mb-1">
                                {item.price}
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {item.size}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddToCart(item)}
                              className={`text-xs sm:text-sm px-3 sm:px-6 py-1.5 sm:py-2 border-black hover:bg-black hover:text-white bg-transparent w-full tracking-wider font-medium rounded-none transition-all duration-200 ${
                                addedItemId === item._id
                                  ? "bg-black text-white"
                                  : ""
                              }`}
                            >
                              {addedItemId === item._id
                                ? "ADDED!"
                                : "ADD TO CART"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-4 sm:p-6 border-t flex-shrink-0">
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 py-2 sm:py-3 tracking-wider text-xs sm:text-base font-medium h-9 sm:h-12"
                  onClick={handleCheckout}
                >
                  CHECK OUT
                </Button>
                <div className="flex flex-row gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 border-black hover:bg-black hover:text-white py-2 sm:py-3 bg-transparent tracking-wider text-xs sm:text-base font-medium h-9 sm:h-12 min-w-0"
                    onClick={handleContinueShopping}
                  >
                    CONTINUE SHOPPING
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 py-2 sm:py-3 text-xs sm:text-base font-medium h-9 sm:h-12 px-3 sm:px-4"
                    onClick={() => setShowClearDialog(true)}
                    title="Clear Cart"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Clear Cart Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all items from your cart. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600"
            >
              Clear Cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartDrawer;
