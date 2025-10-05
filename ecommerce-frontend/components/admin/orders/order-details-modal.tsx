"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Order } from "@/hooks/queries/use-orders-query";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-semibold">
            Order Details
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-mono">
            {order._id}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          {order.user && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <Label className="font-medium text-sm block mb-3">
                Customer Information
              </Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={order.user.avatar ? buildCloudinaryUrl(order.user.avatar) || undefined : undefined}
                    alt={order.user.userName}
                  />
                  <AvatarFallback>
                    {order.user.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{order.user.userName}</div>
                  <div className="text-sm text-muted-foreground">{order.user.email}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {order.user.role}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <Label className="font-medium text-sm block mb-3">
                  Order Information
                </Label>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Order ID:</span>
                    <span className="text-sm font-mono">{order._id.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Date:</span>
                    <span className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Items:</span>
                    <span className="text-sm">
                      {order.items?.length || 0} items
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <Label className="font-medium text-sm block mb-3">
                  Order Total
                </Label>
                <div className="text-2xl font-bold text-green-600">
                  ${order.totalAmount?.toFixed(2) || "0.00"}
                </div>
                {order.payment && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div>Payment: {order.payment.provider}</div>
                    <div>Status: {order.payment.status}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <Label className="font-medium text-sm block mb-4">
              Order Items
            </Label>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center gap-4 p-3 bg-background rounded border"
                >
                  {/* Product Image */}
                  {item.product?.featureImage && (
                    <Image
                      src={buildCloudinaryUrl(item.product.featureImage) || item.product.featureImage}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded object-cover aspect-square"
                    />
                  )}

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="font-medium">
                      {item.product?.name || `Item #${index + 1}`}
                    </div>
                    {item.product && (
                      <div className="text-sm text-muted-foreground">
                        {item.product.brand} • {item.product.category}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      Volume: {item.volume} • Quantity: {item.quantity}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    <div className="font-medium">
                      ${item.price?.toFixed(2)} each
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${(item.subTotal || item.subtotal || 0)?.toFixed(2)} total
                    </div>
                  </div>
                </div>
              )) || []}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}