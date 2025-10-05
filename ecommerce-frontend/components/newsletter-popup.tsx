"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { useNewsletterMutation } from "@/hooks/mutations/use-newsletter-mutations";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { toast } = useToast();
  const { settings } = useCombinedDataContext();
  const newsletterMutation = useNewsletterMutation();

  useEffect(() => {
    // Check if user has opted out permanently
    const dontShow = localStorage.getItem("newsletter-dont-show");
    if (dontShow === "true") {
      return;
    }

    // Check if popup was recently closed
    const lastClosed = localStorage.getItem("newsletter-last-closed");
    if (lastClosed) {
      const timeSinceClose = Date.now() - Number.parseInt(lastClosed);
      const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds

      if (timeSinceClose < twoMinutes) {
        // Show again after remaining time
        const remainingTime = twoMinutes - timeSinceClose;
        setTimeout(() => setIsVisible(true), remainingTime);
        return;
      }
    }

    // Show popup after 3 seconds on first visit or after 2 minutes delay
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    if (dontShowAgain) {
      localStorage.setItem("newsletter-dont-show", "true");
    } else {
      localStorage.setItem("newsletter-last-closed", Date.now().toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newsletterEmail = settings?.newsLetter?.newsLetterEmail || "newsletter@perfumehouse.com";

    newsletterMutation.mutate(
      { email, newsletterEmail },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Thank you for subscribing to our newsletter!",
          });
          setEmail("");
          handleClose();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to subscribe. Please try again.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden relative animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 lg:text-gray-500 lg:hover:text-gray-700 hover:text-black transition-colors text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative">
            <img
              src="/elegant-woman-in-pink-dress-holding-luxury-perfume.jpg"
              alt="Elegant woman with perfume"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* Right side - Content */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {settings?.siteBranding?.siteName?.toUpperCase() || "PERFUME HOUSE"}
              </h2>
              <p className="text-sm text-gray-600">LUXURY FRAGRANCES</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              RECEIVE A SCENTED MINIATURE AS A GIFT*
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 focus:border-primary"
                required
              />

              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 disabled:opacity-70"
              >
                {newsletterMutation.isPending ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </Button>
            </form>

            {/* Don't show again checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="dont-show-again"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="mr-2"
              />
              <label
                htmlFor="dont-show-again"
                className="text-sm text-gray-600"
              >
                Don't show this again
              </label>
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center space-y-1">
              <p>
                By signing up, you agree to receive email communications from
                us.
              </p>
              <p>You can unsubscribe at any time.</p>
              <p className="font-medium">
                *Sent to you with your full size fragrance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
