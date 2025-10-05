"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/hooks/mutations/use-orders-mutations";
import { Loader2 } from "lucide-react";

interface DeleteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  onOrderDeleted: (orderId: string) => void;
}

export default function DeleteOrderModal({
  isOpen,
  onClose,
  orderId,
  onOrderDeleted,
}: DeleteOrderModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOrderDelete = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError("");
      await deleteOrder(orderId);
      onOrderDeleted(orderId);
      onClose();
    } catch (err) {
      console.error("Failed to delete order:", err);
      setError(err instanceof Error ? err.message : "Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <p className="text-gray-600">
            Are you sure you want to delete this order? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleOrderDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete Order"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
