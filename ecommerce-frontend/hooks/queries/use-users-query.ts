"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/endpoints/user.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// Types
export interface User {
  _id: string;
  userName: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Query function
const getAllUsers = async (): Promise<User[]> => {
  const result = await createAuthorizedFetch(userApi.GET_ALL_USER);
  return result || [];
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

// Helper hook for user operations
export const useUserOperations = () => {
  const queryClient = useQueryClient();

  const invalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  return {
    invalidateUsers,
  };
};
