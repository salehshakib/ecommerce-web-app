"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  useCartQuery,
  type CartProduct,
  type ProductPrice,
} from "@/hooks/queries/use-cart-query";
import {
  useRemoveCartItemMutation,
  useAddCartItemMutation,
  useClearCartMutation,
} from "@/hooks/mutations/use-cart-mutations";
import { useAuth } from "@/contexts/auth-context";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import {
  saveToLocalCart,
  getLocalCartItems,
  removeFromLocalCart,
  updateLocalCartQuantity,
  clearLocalCart,
  transformLocalCartToCartItems,
  type LocalCartItem,
} from "@/utils/local-cart";
import { useSyncLocalCart } from "@/hooks/use-sync-local-cart";
import { toast } from "sonner";

export interface CartItem {
  _id: string; // Make this always string for consistency
  productId: string; // Add separate productId field
  priceId: string; // Add priceId for differentiation
  name: string;
  price: string;
  size: string;
  image: string;
  quantity: number;
  tags: string[];
}

interface AddToCartData {
  productId: string;
  productPriceIds: string[];
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  cartItems: CartItem[];
  cartId: string | null;
  isOpen: boolean;
  isLoading: boolean;
  error: Error | null;
  addToCart: (data: AddToCartData) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  clearCart: () => void;
  getTotalPrice: () => number;
  refetch: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Helper function to transform API cart data to CartItem format using app data
const transformCartData = (
  cartProducts: CartProduct[],
  appProducts: any[]
): CartItem[] => {
  return cartProducts.map((cartProduct) => {
    // Safety check for null/undefined product
    if (!cartProduct?.product?._id) {
      console.warn("Cart product missing product data:", cartProduct);
      return {
        _id: "invalid-product",
        productId: "invalid",
        priceId: "",
        name: "Invalid Product",
        price: "$0.00",
        size: "N/A",
        image: "/placeholder-image.jpg",
        quantity: cartProduct?.quantity || 0,
        tags: ["Error"],
      };
    }

    // Find the full product data from app context (includes prices array)
    const fullProduct = appProducts?.find(
      (p) => p._id === cartProduct.product._id
    );

    // Get price data - prefer from cart API data, fallback to full product data
    let price, priceData;
    if (cartProduct.productPrices && cartProduct.productPrices.length > 0) {
      // Use the price data from cart API (this matches the user's selected price)
      priceData = cartProduct.productPrices[0];
      price =
        priceData.price - (priceData.price * (priceData.discount || 0)) / 100;
    } else if (fullProduct?.prices && fullProduct.prices.length > 0) {
      // Fallback to first price from the full product data
      priceData = fullProduct.prices[0];
      price =
        priceData.price - (priceData.price * (priceData.discount || 0)) / 100;
    } else {
      price = 0;
    }

    // Create unique ID combining product ID and price ID for differentiation
    const uniqueId = `${cartProduct.product._id}_${
      priceData?._id || "no-price"
    }`;

    // Handle image URL properly - ensure it's a full URL or path
    let imageUrl =
      cartProduct.product.featureImage || fullProduct?.featureImage;
    if (imageUrl) {
      // If it's already a full URL (starts with http), use as is
      if (imageUrl.startsWith("http")) {
        // Keep as is
      } else if (imageUrl.startsWith("/")) {
        // Already absolute path, keep as is
      } else {
        // Relative path, make it absolute
        imageUrl = `/${imageUrl}`;
      }
    }

    return {
      _id: uniqueId,
      productId: cartProduct.product._id,
      priceId: priceData?._id || "",
      name: cartProduct.product.name || fullProduct?.name || "Unknown Product",
      price: `$${price.toFixed(2)}`,
      size: priceData?.volume || "N/A",
      image: imageUrl || "/placeholder-image.jpg",
      quantity: cartProduct.quantity,
      tags: [
        cartProduct.product.brand || fullProduct?.brand || "Unknown Brand",
        cartProduct.product.category ||
          fullProduct?.category ||
          "Unknown Category",
      ],
    };
  });
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const { token } = useAuth();
  const { products } = useCombinedDataContext(); // Get products from app data
  const { hasSynced } = useSyncLocalCart(); // Sync local cart after login

  // Fetch cart data from server
  const {
    data: cartApiResponse,
    isLoading,
    error,
    refetch,
  } = useCartQuery(token);

  // Cart mutations
  const removeCartItemMutation = useRemoveCartItemMutation();
  const addCartItemMutation = useAddCartItemMutation();
  const clearCartMutation = useClearCartMutation();

  // Sync local state with server data or local cart data
  useEffect(() => {
    if (token && cartApiResponse?.cart?.products && products) {
      // User is logged in - use server cart data
      const transformedItems = transformCartData(
        cartApiResponse.cart.products,
        products
      );
      setItems(transformedItems);
      setCartId(cartApiResponse.cart._id);
    } else if (!token && products) {
      // User is not logged in - use local cart data
      const localItems = getLocalCartItems();
      const transformedLocalItems = transformLocalCartToCartItems(
        localItems,
        products
      );
      setItems(transformedLocalItems);
      setCartId(null);
    }
  }, [cartApiResponse, products, token]);

  // Force refetch cart when user logs in
  useEffect(() => {
    if (token && hasSynced) {
      // Refetch cart data after successful sync
      refetch();
    }
  }, [token, hasSynced, refetch]);

  // Update local cart display when localStorage changes (for real-time updates)
  useEffect(() => {
    if (!token && products) {
      const handleStorageChange = () => {
        const localItems = getLocalCartItems();
        const transformedLocalItems = transformLocalCartToCartItems(
          localItems,
          products
        );
        setItems(transformedLocalItems);
      };

      // Listen for storage changes from other tabs
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [token, products]);

  const addToCart = async (data: AddToCartData) => {
    try {
      if (token) {
        // User is logged in - add to server cart
        await addCartItemMutation.mutateAsync({
          product: data.productId,
          productPrices: data.productPriceIds,
          quantity: data.quantity || 1,
        });
      } else {
        // User is not logged in - add to local cart
        const localCartItem: LocalCartItem = {
          productId: data.productId,
          productPriceIds: data.productPriceIds,
          quantity: data.quantity || 1,
          timestamp: Date.now(),
        };

        saveToLocalCart(localCartItem);

        // Update local cart display immediately
        if (products) {
          const localItems = getLocalCartItems();
          const transformedLocalItems = transformLocalCartToCartItems(
            localItems,
            products
          );
          setItems(transformedLocalItems);
        }

        toast.success("Added to cart!", {
          description: "Item saved. Sign in to sync across devices.",
        });
      }
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  };

  const removeItem = async (id: string) => {
    try {
      if (token) {
        // User is logged in - remove from server cart
        // Extract productId from the combined ID
        const currentItem = items.find((item) => item._id === id);
        if (currentItem) {
          await removeCartItemMutation.mutateAsync({
            productId: currentItem.productId,
          });
        }
      } else {
        // User is not logged in - remove from local cart
        const currentItem = items.find((item) => item._id === id);
        if (currentItem && currentItem.priceId) {
          // Remove from local cart using productId and priceIds array
          removeFromLocalCart(
            currentItem.productId,
            [currentItem.priceId] // Pass as array since local cart expects array
          );

          // Update local cart display immediately
          if (products) {
            const updatedLocalItems = getLocalCartItems();
            const transformedLocalItems = transformLocalCartToCartItems(
              updatedLocalItems,
              products
            );
            setItems(transformedLocalItems);
          }
        }
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    if (token) {
      // For server cart, update locally for now (you might need a specific API endpoint)
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity } : item))
      );
    } else {
      // User is not logged in - update local cart
      const currentItem = items.find((item) => item._id === id);
      if (currentItem && currentItem.priceId) {
        // Update local cart using productId and priceIds array
        updateLocalCartQuantity(
          currentItem.productId,
          [currentItem.priceId], // Pass as array since local cart expects array
          quantity
        );

        // Update local cart display immediately
        if (products) {
          const updatedLocalItems = getLocalCartItems();
          const transformedLocalItems = transformLocalCartToCartItems(
            updatedLocalItems,
            products
          );
          setItems(transformedLocalItems);
        }
      }
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getTotalItems = () => {
    // Use transformed server data if available, otherwise fall back to local items
    const cartItems = items;
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    // Use transformed server data if available, otherwise fall back to local items
    const cartItems = items;
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const clearCart = async () => {
    try {
      if (token) {
        // User is logged in - clear server cart
        await clearCartMutation.mutateAsync();
      } else {
        // User is not logged in - clear local cart
        clearLocalCart();
        setItems([]);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      // Fallback to local state clearing
      clearLocalCart();
      setItems([]);
      setIsOpen(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: items,
        cartItems: items,
        cartId,
        isOpen,
        isLoading,
        error,
        addToCart,
        removeItem,
        updateQuantity,
        openCart,
        closeCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
