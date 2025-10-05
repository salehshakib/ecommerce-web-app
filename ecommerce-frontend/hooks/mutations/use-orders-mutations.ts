"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/endpoints/order.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { toast } from "sonner";

// Mutation functions
const createOrder = async (cartId: string) => {
  const response = await createAuthorizedFetch(orderApi.CREATE_ORDER, {
    method: "POST",
    body: JSON.stringify({ cartId }),
  });
  return response;
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await createAuthorizedFetch(
    orderApi.UPDATE_ORDER_STATUS + `/${orderId}`,
    {
      method: "PUT",
      body: JSON.stringify({ status }),
    }
  );
  return response;
};

const deleteOrder = async (orderId: string) => {
  const response = await createAuthorizedFetch(
    `${orderApi.DELET_ORDER}/${orderId}`,
    {
      method: "DELETE",
    }
  );
  return response;
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create order", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
  });
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
  });
};

// Export mutation functions for direct use
export { createOrder, updateOrderStatus, deleteOrder };
