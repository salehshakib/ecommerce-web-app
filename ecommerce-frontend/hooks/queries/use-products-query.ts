"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/endpoints/product.api";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";
import type { Product, ProductsResponse } from "@/types/product";

// Query functions
const getAllProducts = async (): Promise<Product[]> => {
  const result: ProductsResponse = await createPublicFetch(
    productsApi.GET_ALL_PRODUCTS
  );
  return result.products;
};

const getProductById = async (productId: string): Promise<Product> => {
  const result = await createPublicFetch(
    `${productsApi.GET_PRODUCTS_BY_ID}/${productId}`
  );
  return result.product;
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useProductQuery = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    // Uses default options: staleTime: 10min, gcTime: 20min, retry: 2
  });
};

// Helper hook for product operations
export const useProductOperations = () => {
  const queryClient = useQueryClient();

  const invalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const invalidateProduct = (productId: string) => {
    queryClient.invalidateQueries({ queryKey: ["product", productId] });
  };

  return {
    invalidateProducts,
    invalidateProduct,
  };
};

// Export functions for backward compatibility
export { getProductById };
