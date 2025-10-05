"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productPricesApi, productsApi } from "@/lib/api/endpoints/product.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { ProductPrice } from "@/types/product";
import type { CreateProductData } from "@/types/product";
import { ProductPriceData } from "@/schemas/product.schema";
import { toast } from "sonner";

// Product creation mutation function
const createProduct = async (productData: CreateProductData): Promise<any> => {
  const response = await createAuthorizedFetch(productsApi.CREATE_PRODUCT, {
    method: "POST",
    body: JSON.stringify(productData),
  });
  return response;
};

// Product update mutation function
const updateProduct = async ({
  id,
  productData,
}: {
  id: string;
  productData: CreateProductData;
}): Promise<any> => {
  const response = await createAuthorizedFetch(
    `${productsApi.UPDATE_PRODUCT}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(productData),
    }
  );
  return response;
};

// Product price mutation function
const createProductPrice = async (
  priceData: ProductPriceData
): Promise<ProductPrice> => {
  const response = await createAuthorizedFetch(
    productPricesApi.CREATE_PRODUCT_PRICE,
    {
      method: "POST",
      body: JSON.stringify(priceData),
    }
  );
  return response;
};

// Product price update mutation function
const updateProductPrice = async ({
  id,
  priceData,
}: {
  id: string;
  priceData: Partial<ProductPrice>;
}): Promise<ProductPrice> => {
  const response = await createAuthorizedFetch(
    `${productPricesApi.UPDATE_PRODUCT_PRICE}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(priceData),
    }
  );
  return response;
};

// Product delete mutation function
const deleteProduct = async (id: string): Promise<void> => {
  await createAuthorizedFetch(`${productsApi.DELETE_PRODUCT}/${id}`, {
    method: "DELETE",
  });
};

// Product price delete mutation function
const deleteProductPrice = async (id: string): Promise<void> => {
  await createAuthorizedFetch(
    `${productPricesApi.DELETE_PRODUCT_PRICE}/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      // Invalidate products list to refresh data
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Show success toast
      toast.success("Product created successfully!", {
        description: `${
          data.product?.name || "Product"
        } has been added to your inventory.`,
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to create product", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      // Invalidate products list to refresh data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Invalidate specific product query if it exists
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });

      // Show success toast
      toast.success("Product updated successfully!", {
        description: `${data.product?.name || "Product"} has been updated.`,
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to update product", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidate products list to refresh data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Also invalidate product prices
      queryClient.invalidateQueries({ queryKey: ["product-prices"] });

      // Show success toast
      toast.success("Product deleted successfully!", {
        description: "The product has been removed from your inventory.",
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to delete product", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

export const useCreateProductPriceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductPrice,
    onSuccess: (data, variables) => {
      // Invalidate product prices for the specific product
      queryClient.invalidateQueries({
        queryKey: ["product-prices", variables.productId],
      });
      // Invalidate all product prices
      queryClient.invalidateQueries({ queryKey: ["product-prices"] });
      // Also invalidate products list
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Show success toast
      toast.success("Product price created successfully!", {
        description: `Price for ${data.volume || "product"} has been added.`,
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to create product price", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

export const useUpdateProductPriceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductPrice,
    onSuccess: (data, variables) => {
      // Invalidate product prices for the specific product
      queryClient.invalidateQueries({
        queryKey: ["product-prices", variables.priceData.productId],
      });
      // Also invalidate products list and all product prices
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-prices"] });

      // Show success toast
      toast.success("Product price updated successfully!", {
        description: `Price for ${data.volume || "product"} has been updated.`,
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to update product price", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

export const useDeleteProductPriceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductPrice,
    onSuccess: () => {
      // Invalidate all product prices and products list
      queryClient.invalidateQueries({ queryKey: ["product-prices"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Show success toast
      toast.success("Product price deleted successfully!", {
        description: "The price has been removed from the product.",
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast.error("Failed to delete product price", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Export mutation functions for direct use
export {
  createProduct,
  updateProduct,
  deleteProduct,
  createProductPrice,
  updateProductPrice,
  deleteProductPrice,
};
