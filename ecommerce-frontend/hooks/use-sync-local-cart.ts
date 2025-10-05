"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useAddCartItemMutation } from "@/hooks/mutations/use-cart-mutations";
import { getLocalCartItems, clearLocalCart } from "@/utils/local-cart";
import { toast } from "sonner";

export const useSyncLocalCart = () => {
  const { token } = useAuth();
  const addCartItemMutation = useAddCartItemMutation();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only sync when user logs in and we haven't synced yet
    if (token && !hasSynced.current) {
      const syncLocalCartToServer = async () => {
        try {
          const localItems = getLocalCartItems();

          if (localItems.length === 0) {
            hasSynced.current = true;
            return;
          }

          let successCount = 0;
          let failedCount = 0;

          // Add each local cart item to server cart
          for (const item of localItems) {
            try {
              await addCartItemMutation.mutateAsync({
                product: item.productId,
                productPrices: item.productPriceIds,
                quantity: item.quantity,
              });
              successCount++;
            } catch (error) {
              console.error("Failed to sync cart item:", error);
              failedCount++;
            }
          }

          // Clear local cart after successful sync
          if (successCount > 0) {
            clearLocalCart();

            if (failedCount === 0) {
              toast.success("Cart items restored!", {
                description: `${successCount} item${successCount > 1 ? "s" : ""} added to your cart.`,
              });
            } else {
              toast.success("Cart partially restored", {
                description: `${successCount} of ${localItems.length} items added to your cart.`,
              });
            }
          } else if (failedCount > 0) {
            toast.error("Failed to restore cart items", {
              description: "Please try adding items to your cart again.",
            });
          }

          hasSynced.current = true;
        } catch (error) {
          console.error("Failed to sync local cart:", error);
          toast.error("Failed to restore cart items", {
            description: "Please try adding items to your cart again.",
          });
        }
      };

      // Add a small delay to ensure the cart context is ready
      const timeoutId = setTimeout(syncLocalCartToServer, 500);

      return () => clearTimeout(timeoutId);
    }

    // Reset sync status when user logs out
    if (!token) {
      hasSynced.current = false;
    }
  }, [token, addCartItemMutation]);

  return { hasSynced: hasSynced.current };
};