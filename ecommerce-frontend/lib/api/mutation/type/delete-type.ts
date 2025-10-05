import { baseUrl } from "@/lib/api/endpoints/base-url";
import { typeApi } from "@/lib/api/endpoints/type.api";
import { getStoredToken } from "@/utils/auth/localStorage";

export const deleteType = async (typeId: string): Promise<void> => {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${baseUrl}${typeApi.DELETE_TYPE}/${typeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete type");
  }
};