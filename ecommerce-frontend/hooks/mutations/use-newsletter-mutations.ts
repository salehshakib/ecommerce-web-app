"use client";

import { useMutation } from "@tanstack/react-query";
import { newsletterApi } from "@/lib/api/endpoints/newsletter.api";
import { createPublicFetch } from "@/lib/api/utils/public-fetch";

interface NewsletterSubscription {
  email: string;
  newsletterEmail: string;
}

interface NewsletterResponse {
  message: string;
  success: boolean;
}

const subscribeToNewsletter = async (data: NewsletterSubscription): Promise<NewsletterResponse> => {
  return createPublicFetch(newsletterApi.SUBSCRIBE, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const useNewsletterMutation = () => {
  return useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: (data) => {
      console.log("Newsletter subscription successful:", data);
    },
    onError: (error) => {
      console.error("Newsletter subscription failed:", error);
    },
  });
};