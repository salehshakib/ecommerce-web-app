import { baseUrl } from "@/lib/api/endpoints/base-url";
import { typeApi } from "@/lib/api/endpoints/type.api";
import { getStoredToken } from "@/utils/auth/localStorage";

export interface ProductType {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllTypes = async (): Promise<ProductType[]> => {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${baseUrl}${typeApi.GET_ALL_TYPES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch types");
  }

  const result = await response.json();
  return result.productTypes || result;
};

export const getTypeById = async (typeId: string): Promise<ProductType> => {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(
    `${baseUrl}${typeApi.GET_TYPES_BY_ID}/${typeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch type");
  }

  const result = await response.json();
  return result.productTypes || result;
};
