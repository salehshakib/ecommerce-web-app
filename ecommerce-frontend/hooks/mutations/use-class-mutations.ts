"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesApi } from "@/lib/api/endpoints/class.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { toast } from "sonner";
import type {
  CreateClassBookingRequest,
  ClassBookingResponse,
  UpdateClassBookingRequest,
  DeleteClassBookingResponse,
  ClassBookingByIdResponse
} from "@/types/class";

// Create class booking
const createClassBooking = async (data: CreateClassBookingRequest): Promise<ClassBookingByIdResponse> => {
  const response = await createAuthorizedFetch(classesApi.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const useCreateClassBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClassBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-bookings"] });
      toast.success("Class booking submitted successfully!", {
        description: "We'll contact you soon to confirm your class booking.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to submit class booking", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Update class booking
const updateClassBooking = async (data: UpdateClassBookingRequest): Promise<ClassBookingByIdResponse> => {
  const { _id, ...updateData } = data;
  const response = await createAuthorizedFetch(`${classesApi.UPDATE}/${_id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
  return response;
};

export const useUpdateClassBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClassBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["class-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["class-booking", data.booking._id] });
      toast.success("Class booking updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to update class booking", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

// Delete class booking
const deleteClassBooking = async (id: string): Promise<DeleteClassBookingResponse> => {
  const response = await createAuthorizedFetch(`${classesApi.DELETE}/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const useDeleteClassBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClassBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-bookings"] });
      toast.success("Class booking deleted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to delete class booking", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};