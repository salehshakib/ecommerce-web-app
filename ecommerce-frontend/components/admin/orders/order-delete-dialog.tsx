"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Order } from "@/hooks/queries/use-orders-query";

interface OrderDeleteDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (orderId: string) => Promise<void>;
  isDeleting: boolean;
}

export function OrderDeleteDialog({
  order,
  isOpen,
  onClose,
  onDelete,
  isDeleting
}: OrderDeleteDialogProps) {
  if (!order) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-destructive">
            Delete Order
          </AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed">
            This action cannot be undone. This will permanently delete the
            order "{order._id}" for user "{order.userId}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(order._id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Order"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}