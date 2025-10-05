"use client";

import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "@/lib/api/endpoints/payment.api";
import { createAuthorizedFetch } from "@/lib/api/utils/authorized-fetch";
import { useCart } from "@/contexts/cart-context";

// Types
export interface PaymentIntentRequest {
  orderId: string;
}

export interface PaymentIntentResponse {
  message: string;
  paymentIntent: {
    checkoutUrl: string;
    orderId: string;
  };
}

// Mutation function
const createPaymentIntent = async (
  paymentData: PaymentIntentRequest
): Promise<PaymentIntentResponse> => {
  const response = await createAuthorizedFetch(paymentApi.INIT_PAYMENT, {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
  return response;
};

export const useCreatePaymentIntentMutation = () => {
  return useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      // Redirect to Stripe checkout URL
      // Stripe will handle redirecting back to success/cancel URLs
      window.location.href = data.paymentIntent.checkoutUrl;
    },
    // Unauthorized errors are handled by authorized fetch
  });
};
