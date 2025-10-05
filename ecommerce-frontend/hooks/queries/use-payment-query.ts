"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "@/lib/api/endpoints/payment.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";

// Types based on actual API response
export interface PaymentIntent {
  id: string;
  amount: number;
  amount_received: number;
  currency: string;
  status: string;
  payment_method?: string;
  created: number;
}

export interface PaymentInfo {
  orderId: string;
  paymentIntent: PaymentIntent;
}

export interface PaymentDetailsResponse {
  message: string;
  paymentInfo: PaymentInfo;
}

// Query function
const getPaymentDetails = async (
  sessionId: string
): Promise<PaymentDetailsResponse> => {
  const result = await createAuthorizedFetch(
    `${paymentApi.GET_PAYMENT_DETAILS}?session_id=${sessionId}`
  );
  return result;
};

export const usePaymentQuery = (sessionId: string | null) => {
  return useQuery({
    queryKey: ["payment-details", sessionId],
    queryFn: () => getPaymentDetails(sessionId!),
    enabled: !!sessionId,
    retry: 1,
    // Uses default options: staleTime: 5min
    // Unauthorized errors are handled by authorized fetch
  });
};
