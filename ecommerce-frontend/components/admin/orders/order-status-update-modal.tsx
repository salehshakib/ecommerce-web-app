"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Order } from "@/hooks/queries/use-orders-query";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderStatusUpdateModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
  isUpdating: boolean;
}

export function OrderStatusUpdateModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
  isUpdating
}: OrderStatusUpdateModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-xl font-semibold">
            Update Order Status
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-mono">
            {order._id}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Current Status</Label>
            <div><OrderStatusBadge status={order.status} /></div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="status-select"
              className="text-sm font-medium"
            >
              New Status*
            </Label>
            <Select
              onValueChange={(value) =>
                onStatusChange(order._id, value)
              }
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}