"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api/endpoints/category.api";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";

// Types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Query function
const getAllCategories = async (): Promise<Category[]> => {
  const result = await createPublicFetch(categoryApi.GET_ALL_CATEGORIES);
  return result.categories || [];
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export { getAllCategories };
