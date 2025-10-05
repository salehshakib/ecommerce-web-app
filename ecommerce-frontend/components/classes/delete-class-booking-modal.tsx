"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteClassBookingMutation } from "@/hooks/mutations/use-class-mutations";
import { Loader2 } from "lucide-react";
import type { ClassBookingResponse } from "@/types/class";

interface DeleteClassBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ClassBookingResponse | null;
}

export default function DeleteClassBookingModal({
  isOpen,
  onClose,
  booking,
}: DeleteClassBookingModalProps) {
  const [error, setError] = useState("");
  const deleteBookingMutation = useDeleteClassBookingMutation();

  const handleBookingDelete = async () => {
    if (!booking) return;

    try {
      setError("");
      await deleteBookingMutation.mutateAsync(booking._id);
      onClose();
    } catch (err) {
      console.error("Failed to delete class booking:", err);
      setError(err instanceof Error ? err.message : "Failed to delete class booking");
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Class Booking</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this class booking? This action cannot be undone.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>
                <span className="font-medium">Customer:</span> {booking.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {booking.email}
              </div>
              <div>
                <span className="font-medium">Class:</span> {booking.classType}
              </div>
              <div>
                <span className="font-medium">Date & Time:</span> {new Date(booking.preferredDateTime).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Participants:</span> {booking.numberOfParticipants}
              </div>
              {booking.notes && (
                <div>
                  <span className="font-medium">Notes:</span> {booking.notes}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={deleteBookingMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleBookingDelete}
            disabled={deleteBookingMutation.isPending}
          >
            {deleteBookingMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete Booking"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}