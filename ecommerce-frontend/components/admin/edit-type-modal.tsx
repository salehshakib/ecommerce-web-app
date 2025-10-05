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
import { useUpdateTypeMutation } from "@/hooks/mutations/use-types-mutations";

const typeSchema = z.object({
  name: z.string().min(1, "Type name is required"),
});

type TypeFormData = z.infer<typeof typeSchema>;

interface ProductType {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface EditTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  type: ProductType | null;
}

export const EditTypeModal: React.FC<EditTypeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  type,
}) => {
  const [error, setError] = useState("");
  const updateTypeMutation = useUpdateTypeMutation();

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
    if (isOpen && type) {
      reset({
        name: type.name,
      });
      setError("");
    } else if (!isOpen) {
      reset();
      setError("");
    }
  }, [isOpen, type, reset]);

  const onSubmit = async (data: TypeFormData) => {
    if (!type) return;

    setError("");

    try {
      await updateTypeMutation.mutateAsync({ id: type._id, typeData: data });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update type");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product Type</DialogTitle>
          <DialogDescription>
            Update the product type information.
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
              disabled={updateTypeMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateTypeMutation.isPending}>
              {updateTypeMutation.isPending ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Updating...
                </>
              ) : (
                "Update Type"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
