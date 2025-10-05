"use client";

import { useQuery } from "@tanstack/react-query";
import { cartApi } from "@/lib/api/endpoints/cart.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// API Response Types
export interface ProductPrice {
  _id: string;
  productId: string;
  volume: string;
  price: number;
  discount: number;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  featureImage: string;
  additionalImages: string[];
  category: string;
  description: string;
  inStock: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartProduct {
  product: Product;
  productPrices: ProductPrice[];
  quantity: number;
  _id: string;
}

export interface Cart {
  _id: string;
  userId: string;
  products: CartProduct[];
  __v: number;
}

export interface CartApiResponse {
  message: string;
  cart: Cart;
}

const fetchCart = async (): Promise<CartApiResponse> => {
  const response = await createAuthorizedFetch(cartApi.GET_CART, {
    method: "GET",
  });
  return response;
};

export const useCartQuery = (token: string | null) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!token,
    // Unauthorized errors are handled by authorized fetch
  });
};
