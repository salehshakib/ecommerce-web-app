"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { typeApi } from "@/lib/api/endpoints/type.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// Types
export interface AddTypeData {
  name: string;
}

export interface UpdateTypeData {
  name: string;
}

export interface TypeResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Mutation functions
const addType = async (typeData: AddTypeData): Promise<TypeResponse> => {
  const response = await createAuthorizedFetch(typeApi.ADD_TYPE, {
    method: "POST",
    body: JSON.stringify(typeData),
  });
  return response;
};

const updateType = async (typeId: string, typeData: UpdateTypeData): Promise<TypeResponse> => {
  const response = await createAuthorizedFetch(`${typeApi.UPDATE_TYPE}/${typeId}`, {
    method: "PUT",
    body: JSON.stringify(typeData),
  });
  return response;
};

const deleteType = async (typeId: string): Promise<void> => {
  await createAuthorizedFetch(`${typeApi.DELETE_TYPE}/${typeId}`, {
    method: "DELETE",
  });
};

// Mutation hooks
export const useAddTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};

export const useUpdateTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, typeData }: { id: string; typeData: UpdateTypeData }) =>
      updateType(id, typeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};

export const useDeleteTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};