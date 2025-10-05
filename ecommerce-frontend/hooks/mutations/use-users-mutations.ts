"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/endpoints/user.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// Mutation function
const deleteUser = async (userId: string) => {
  const response = await createAuthorizedFetch(`${userApi.DELETE_USER}/${userId}`, {
    method: "DELETE",
  });
  return response;
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};