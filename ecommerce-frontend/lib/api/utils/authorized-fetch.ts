import { baseUrl } from "@/lib/api/endpoints/base-url";
import { getStoredToken, clearAuthData } from "@/utils/auth/localStorage";

export const createAuthorizedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getStoredToken();

  if (!token) {
    const error = new Error("No authentication token found");
    (error as any).status = 401;
    // Clear any corrupted auth data and redirect
    clearAuthData();
    window.location.href = "/login";
    throw error;
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(`Request failed: ${response.statusText}`);
    (error as any).status = response.status;

    if (response.status === 401) {
      (error as any).isUnauthorized = true;
      // Handle unauthorized response - logout and redirect
      clearAuthData();
      window.location.href = "/login";
    }

    throw error;
  }

  return response.json();
};