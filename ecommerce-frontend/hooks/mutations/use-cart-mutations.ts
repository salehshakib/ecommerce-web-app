"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/api/endpoints/cart.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { toast } from "sonner";

// Remove item from cart
interface RemoveCartItemRequest {
  productId: string;
}

interface RemoveCartItemResponse {
  message: string;
  success: boolean;
}

const removeCartItem = async (
  data: RemoveCartItemRequest
): Promise<RemoveCartItemResponse> => {
  const response = await createAuthorizedFetch(cartApi.REMOVE_CART, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      // Invalidate cart query to refetch updated cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Add item to cart
interface AddCartItemRequest {
  product: string;
  productPrices: string[];
  quantity: number;
}

interface AddCartItemResponse {
  message: string;
  success: boolean;
}

const addCartItem = async (
  data: AddCartItemRequest
): Promise<AddCartItemResponse> => {
  const response = await createAuthorizedFetch(cartApi.ADD_CART, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const useAddCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      // Invalidate cart query to refetch updated cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Show success toast
      toast.success("Added to cart!", {
        description: "Item has been added to your cart successfully.",
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to add to cart", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Clear entire cart
interface ClearCartResponse {
  message: string;
  success: boolean;
}

const clearCart = async (): Promise<ClearCartResponse> => {
  const response = await createAuthorizedFetch(cartApi.CLEAR_CART, {
    method: "POST",
  });
  return response;
};

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      // Invalidate cart query to refetch updated cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
