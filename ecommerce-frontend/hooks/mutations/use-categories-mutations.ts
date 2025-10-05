"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api/endpoints/category.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// Types
export interface AddCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name: string;
}

export interface CategoryResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Mutation functions
const addCategory = async (categoryData: AddCategoryData): Promise<CategoryResponse> => {
  const response = await createAuthorizedFetch(categoryApi.ADD_CATEGORY, {
    method: "POST",
    body: JSON.stringify(categoryData),
  });
  return response;
};

const updateCategory = async (categoryId: string, categoryData: UpdateCategoryData): Promise<CategoryResponse> => {
  const response = await createAuthorizedFetch(`${categoryApi.UPDATE_CATEGORY}/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify(categoryData),
  });
  return response;
};

export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      // Unauthorized errors are handled by authorized fetch
      console.error("Category operation failed:", error);
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, categoryData }: { id: string; categoryData: UpdateCategoryData }) =>
      updateCategory(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      // Unauthorized errors are handled by authorized fetch
      console.error("Category operation failed:", error);
    },
  });
};