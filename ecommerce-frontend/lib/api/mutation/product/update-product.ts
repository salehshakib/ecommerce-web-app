import { baseUrl } from "@/lib/api/endpoints/base-url";
import { productsApi } from "@/lib/api/endpoints/product.api";
import { getStoredToken } from "@/utils/auth/localStorage";
import { CreateProductData } from "@/types/product";

// Interface for the API response after updating product
export interface IUpdateProductResponse {
  message: string;
  product: IUpdatedProduct;
}

export interface IUpdatedProduct {
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  featureImage: string;
  additionalImages: any[];
  category: string;
  description: string;
  inStock: boolean;
  type: string[];
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const updateProduct = async (
  productId: string,
  productData: CreateProductData
): Promise<IUpdateProductResponse> => {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${baseUrl}${productsApi.UPDATE_PRODUCT}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update product");
  }

  const result = await response.json();
  return result;
};