"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading";
import { useAddTypeMutation } from "@/hooks/mutations/use-types-mutations";

const typeSchema = z.object({
  name: z.string().min(1, "Type name is required"),
});

type TypeFormData = z.infer<typeof typeSchema>;

interface AddTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddTypeModal: React.FC<AddTypeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [error, setError] = useState("");
  const addTypeMutation = useAddTypeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeFormData>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setError("");
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: TypeFormData) => {
    setError("");

    try {
      await addTypeMutation.mutateAsync(data);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create type");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product Type</DialogTitle>
          <DialogDescription>
            Create a new product type to categorize your products.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {/* Type Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Type Name*</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Eau de Parfum"
              className={errors.name ? "border-red-300" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={addTypeMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={addTypeMutation.isPending}>
              {addTypeMutation.isPending ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                "Add Type"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
