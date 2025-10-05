import { baseUrl } from "@/lib/api/endpoints/base-url";

export const createPublicFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(`Request failed: ${response.statusText}`);
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};