"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/hooks/mutations/use-orders-mutations";
import { Loader2 } from "lucide-react";

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  currentStatus: string;
  onStatusUpdated: (orderId: string, newStatus: string) => void;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function StatusChangeModal({
  isOpen,
  onClose,
  orderId,
  currentStatus,
  onStatusUpdated,
}: StatusChangeModalProps) {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStatusUpdate = async () => {
    if (!orderId || !newStatus) return;

    try {
      setLoading(true);
      setError("");
      await updateOrderStatus(orderId, newStatus);
      onStatusUpdated(orderId, newStatus);
      onClose();
    } catch (err) {
      console.error("Failed to update order status:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update order status"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewStatus(currentStatus);
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Order Status</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="space-y-2">
            <label className="text-sm font-medium">Select New Status</label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            disabled={loading || !newStatus || newStatus === currentStatus}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
