"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Home,
  Clock,
} from "lucide-react";
import { usePaymentQuery } from "@/hooks/queries/use-payment-query";
import Loading from "@/components/ui/loading";
import { useCart } from "@/contexts/cart-context";
import { useEffect } from "react";

type PaymentStatus = "success" | "failed" | "cancelled";

// Helper function to format amount (convert cents to dollars)
const formatAmount = (cents: number, currency: string = "usd"): string => {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};

// Helper function to format date
const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PaymentSummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const status = searchParams.get("status") as PaymentStatus;
  const { clearCart } = useCart();

  // Fetch payment details using the query hook
  const { data: paymentData, isLoading, isError } = usePaymentQuery(sessionId);

  // Clear cart on successful payment
  useEffect(() => {
    if (status === "success" && paymentData) {
      clearCart();
    }
  }, [status, paymentData]);

  if (isLoading) {
    return <Loading message="Loading payment details..." />;
  }

  if (isError || !paymentData || !status) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Unable to Load Payment Details
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't retrieve your payment information. Please try again or
              contact support.
            </p>
            <Button onClick={() => router.push("/")}>
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />;
      case "cancelled":
        return <AlertTriangle className="h-16 w-16 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case "success":
        return "Payment Successful!";
      case "failed":
        return "Payment Failed";
      case "cancelled":
        return "Payment Cancelled";
      default:
        return "Payment Summary";
    }
  };

  const getStatusMessage = () => {
    // Use API message if available
    if (paymentData?.message) {
      return paymentData.message;
    }

    switch (status) {
      case "success":
        return "Your payment has been processed successfully. You will receive a confirmation email shortly.";
      case "failed":
        return "We were unable to process your payment. Please try again or use a different payment method.";
      case "cancelled":
        return "You cancelled the payment process. Your order has not been placed.";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "cancelled":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">{getStatusIcon()}</div>
            <CardTitle className={`text-3xl font-bold ${getStatusColor()}`}>
              {getStatusTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 text-lg">{getStatusMessage()}</p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Order Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">
                    {paymentData?.paymentInfo?.orderId}
                  </span>
                </div>
                {paymentData?.paymentInfo?.paymentIntent?.amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      {formatAmount(
                        paymentData.paymentInfo.paymentIntent.amount,
                        paymentData.paymentInfo.paymentIntent.currency
                      )}
                    </span>
                  </div>
                )}
                {paymentData?.paymentInfo?.paymentIntent?.id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium text-sm">
                      {paymentData.paymentInfo.paymentIntent.id}
                    </span>
                  </div>
                )}
                {paymentData?.paymentInfo?.paymentIntent?.status && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-medium capitalize">
                      {paymentData.paymentInfo.paymentIntent.status}
                    </span>
                  </div>
                )}
                {paymentData?.paymentInfo?.paymentIntent?.created && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Date:
                    </span>
                    <span className="font-medium text-sm text-right">
                      {formatDate(
                        paymentData.paymentInfo.paymentIntent.created
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {status === "success" ? (
                <>
                  <Button
                    onClick={() => router.push("/user/orders")}
                    className="flex-1"
                  >
                    View Orders
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="flex-1"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => router.push("/checkout")}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="flex-1"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </>
              )}
            </div>

            {/* Help Section */}
            <div className="border-t pt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Need help with your order?
              </p>
              <Button
                variant="link"
                onClick={() => router.push("/contact")}
                className="text-sm"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
