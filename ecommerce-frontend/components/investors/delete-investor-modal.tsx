"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteInvestorMutation } from "@/hooks/mutations/use-investors-mutations";
import { Loader2 } from "lucide-react";
import type { InvestorResponse } from "@/types/investor";

interface DeleteInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  investor: InvestorResponse | null;
}

export default function DeleteInvestorModal({
  isOpen,
  onClose,
  investor,
}: DeleteInvestorModalProps) {
  const [error, setError] = useState("");
  const deleteInvestorMutation = useDeleteInvestorMutation();

  const handleInvestorDelete = async () => {
    if (!investor) return;

    try {
      setError("");
      await deleteInvestorMutation.mutateAsync(investor._id);
      onClose();
    } catch (err) {
      console.error("Failed to delete investment inquiry:", err);
      setError(err instanceof Error ? err.message : "Failed to delete investment inquiry");
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!investor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Investment Inquiry</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this investment inquiry? This action cannot be undone.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>
                <span className="font-medium">Investor:</span> {investor.fullName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {investor.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {investor.phoneNumber}
              </div>
              <div>
                <span className="font-medium">Investment Amount:</span> ${investor.investmentAmount.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Investment Type:</span> {investor.investmentType.charAt(0).toUpperCase() + investor.investmentType.slice(1).replace('-', ' ')}
              </div>
              {investor.message && (
                <div>
                  <span className="font-medium">Message:</span> {investor.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={deleteInvestorMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleInvestorDelete}
            disabled={deleteInvestorMutation.isPending}
          >
            {deleteInvestorMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete Inquiry"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}