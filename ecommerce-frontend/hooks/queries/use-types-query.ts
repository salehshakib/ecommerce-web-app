"use client";

import { useQuery } from "@tanstack/react-query";
import { typeApi } from "@/lib/api/endpoints/type.api";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";

// Types
export interface ProductType {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Query function
const getAllTypes = async (): Promise<ProductType[]> => {
  const result = await createPublicFetch(typeApi.GET_ALL_TYPES);
  return result.productTypes || [];
};

export const useTypesQuery = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getAllTypes,
  });
};
