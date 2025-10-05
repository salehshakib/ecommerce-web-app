"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/endpoints/order.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// Types
export interface OrderUser {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  _id: string;
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  category: string;
  description: string;
  inStock: boolean;
  type: string[];
  featureImage: string;
  additionalImages: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id: string;
  product: OrderProduct | null;
  volume: string;
  price: number;
  quantity: number;
  subTotal: number;
  subtotal?: number; // Some responses have subtotal instead of subTotal
}

export interface PaymentInfo {
  _id: string;
  provider: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

export interface Order {
  _id: string;
  userId?: string;
  user?: OrderUser;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  payment?: PaymentInfo;
  cart?: any;
  __v: number;
}

// Query functions
const getAllOrders = async (): Promise<Order[]> => {
  const result = await createAuthorizedFetch(orderApi.GET_ALL_ORDERS);
  return result.orders || [];
};

const getUserOrders = async (): Promise<Order[]> => {
  const result = await createAuthorizedFetch(orderApi.GET_ORDER_BY_USER);
  return result.orders || [];
};

const getOrderById = async (orderId: string): Promise<Order> => {
  const result = await createAuthorizedFetch(
    `${orderApi.GET_ORDER_BY_ID}/${orderId}`
  );
  return result.order || result;
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Uses default options: staleTime: 5min, retry: 2
    // Unauthorized errors are handled by authorized fetch
  });
};

export const useUserOrdersQuery = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: getUserOrders,
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Uses default options: staleTime: 5min, retry: 2
    // Unauthorized errors are handled by authorized fetch
  });
};

export const useOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Uses default options: staleTime: 5min, retry: 2
    // Unauthorized errors are handled by authorized fetch
  });
};

// Helper hook for order operations
export const useOrderOperations = () => {
  const queryClient = useQueryClient();

  const invalidateOrders = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  const invalidateUserOrders = () => {
    queryClient.invalidateQueries({ queryKey: ["user-orders"] });
  };

  const invalidateAllOrders = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    queryClient.invalidateQueries({ queryKey: ["user-orders"] });
  };

  return {
    invalidateOrders,
    invalidateUserOrders,
    invalidateAllOrders,
  };
};
