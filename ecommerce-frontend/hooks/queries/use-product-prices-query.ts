"use client";

import { useQuery } from "@tanstack/react-query";
import { productPricesApi, productsApi } from "@/lib/api/endpoints/product.api";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";

// Types
export interface ProductPrice {
  _id: string;
  productId: string;
  volume: string;
  price: number;
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

// Query function for prices by product
const getProductPricesByProduct = async (
  productId: string | null
): Promise<ProductPrice[]> => {
  const url = `${productPricesApi.GET_PRICE_BY_PRODUCT}/${productId}`;

  const result = await createPublicFetch(url);
  return result.productPrices || [];
};

// Query function for all product prices
const getAllProductPrices = async (): Promise<ProductPrice[]> => {
  const result = await createPublicFetch(
    productPricesApi.CREATE_PRODUCT_PRICE
  );
  return result.productPrices || [];
};

// Hook for getting prices by specific product
export const useProductPricesQuery = (productId: string | null) => {
  return useQuery({
    queryKey: ["product-prices", productId],
    queryFn: () => getProductPricesByProduct(productId),
    enabled: !!productId,
  });
};

// Hook for getting all product prices
export const useAllProductPricesQuery = () => {
  return useQuery({
    queryKey: ["product-prices"],
    queryFn: getAllProductPrices,
  });
};

// Export the functions for backward compatibility
export const getProductPrices = getProductPricesByProduct;
export type ProductPriceData = ProductPrice;
