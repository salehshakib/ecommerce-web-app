"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { investorsApi } from "@/lib/api/endpoints/investor.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { toast } from "sonner";
import type {
  CreateInvestorRequest,
  InvestorResponse,
  UpdateInvestorRequest,
  DeleteInvestorResponse,
  InvestorByIdResponse
} from "@/types/investor";

// Create investor
const createInvestor = async (data: CreateInvestorRequest): Promise<InvestorByIdResponse> => {
  const response = await createAuthorizedFetch(investorsApi.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const useCreateInvestorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvestor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investors"] });
      toast.success("Investment inquiry submitted successfully!", {
        description: "We'll contact you soon to discuss your investment opportunity.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to submit investment inquiry", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Update investor
const updateInvestor = async (data: UpdateInvestorRequest): Promise<InvestorByIdResponse> => {
  const { _id, ...updateData } = data;
  const response = await createAuthorizedFetch(`${investorsApi.UPDATE}/${_id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
  return response;
};

export const useUpdateInvestorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvestor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["investors"] });
      queryClient.invalidateQueries({ queryKey: ["investor", data.investor._id] });
      toast.success("Investment inquiry updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to update investment inquiry", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Delete investor
const deleteInvestor = async (id: string): Promise<DeleteInvestorResponse> => {
  const response = await createAuthorizedFetch(`${investorsApi.DELETE}/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const useDeleteInvestorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvestor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investors"] });
      toast.success("Investment inquiry deleted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to delete investment inquiry", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};
