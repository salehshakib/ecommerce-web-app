"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useCreatePaymentIntentMutation } from "@/hooks/mutations/use-payment-mutations";
import { useCreateOrderMutation } from "@/hooks/mutations/use-orders-mutations";
import { useProfileQuery } from "@/hooks/queries/use-profile-query";
import { useCartQuery } from "@/hooks/queries/use-cart-query";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { token } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data: cartData } = useCartQuery(token);
  const createOrder = useCreateOrderMutation();
  const createPaymentIntent = useCreatePaymentIntentMutation();

  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  });

  // Update customer info when profile loads
  useEffect(() => {
    if (profile) {
      setCustomerInfo(prev => ({
        ...prev,
        email: profile.email || "",
        name: profile.userName || "",
      }));
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCustomerInfo(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const cartId = cartData?.cart?._id;
    if (!cartId) {
      toast.error("Cart not found. Please try again.");
      return;
    }

    try {
      // Step 1: Create order with cartId
      const orderResponse = await createOrder.mutateAsync(cartId);

      if (!orderResponse?.order?._id) {
        toast.error("Failed to create order");
        return;
      }

      // Step 2: Create payment intent with orderId
      await createPaymentIntent.mutateAsync({
        orderId: orderResponse.order._id,
      });

      // Payment intent will automatically redirect to Stripe checkout on success
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart to checkout</p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={`${item._id}-${item.size}`} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Customer Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={customerInfo.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Shipping Address
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={customerInfo.address.line1}
                          onChange={(e) => handleInputChange("address.line1", e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={customerInfo.address.city}
                            onChange={(e) => handleInputChange("address.city", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={customerInfo.address.state}
                            onChange={(e) => handleInputChange("address.state", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="postal_code">Postal Code</Label>
                          <Input
                            id="postal_code"
                            value={customerInfo.address.postal_code}
                            onChange={(e) => handleInputChange("address.postal_code", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={customerInfo.address.country}
                            onChange={(e) => handleInputChange("address.country", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={createOrder.isPending || createPaymentIntent.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {createOrder.isPending || createPaymentIntent.isPending ? "Processing..." : `Pay $${getTotalPrice().toFixed(2)}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}