"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteEventMutation } from "@/hooks/mutations/use-event-mutations";
import { Loader2 } from "lucide-react";
import type { EventResponse } from "@/types/event";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventResponse | null;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  event,
}: DeleteEventModalProps) {
  const [error, setError] = useState("");
  const deleteEventMutation = useDeleteEventMutation();

  const handleEventDelete = async () => {
    if (!event) return;

    try {
      setError("");
      await deleteEventMutation.mutateAsync(event._id);
      onClose();
    } catch (err) {
      console.error("Failed to delete event:", err);
      setError(err instanceof Error ? err.message : "Failed to delete event");
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Event Request</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this event request? This action cannot be undone.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>
                <span className="font-medium">Customer:</span> {event.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {event.email}
              </div>
              <div>
                <span className="font-medium">Event Type:</span> {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1).replace('-', ' ')}
              </div>
              <div>
                <span className="font-medium">Date:</span> {new Date(event.dateTime).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Guests:</span> {event.numberOfGuests}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={deleteEventMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleEventDelete}
            disabled={deleteEventMutation.isPending}
          >
            {deleteEventMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete Request"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}