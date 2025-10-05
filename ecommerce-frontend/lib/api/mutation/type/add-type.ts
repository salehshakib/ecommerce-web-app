import { baseUrl } from "@/lib/api/endpoints/base-url";
import { typeApi } from "@/lib/api/endpoints/type.api";
import { getStoredToken } from "@/utils/auth/localStorage";

export interface AddTypeData {
  name: string;
}

export interface TypeResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const addType = async (
  typeData: AddTypeData
): Promise<TypeResponse> => {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${baseUrl}${typeApi.ADD_TYPE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(typeData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add type");
  }

  const result = await response.json();
  return result;
};