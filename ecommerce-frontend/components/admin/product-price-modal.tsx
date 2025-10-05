"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, ProductPrice } from "@/types/product";
import {
  useCreateProductPriceMutation,
  useUpdateProductPriceMutation,
} from "@/hooks/mutations/use-product-mutations";

import {
  productPriceSchema,
  type ProductPriceData,
} from "@/schemas/product.schema";

type ProductPriceFormData = ProductPriceData;

interface ProductPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSuccess: () => void;
  selectedProduct?: Product | null;
  existingPrice?: ProductPrice | null; // For editing existing prices
  isEdit?: boolean; // Whether this is an edit or create operation
}

export const ProductPriceModal: React.FC<ProductPriceModalProps> = ({
  isOpen,
  onClose,
  products,
  onSuccess,
  selectedProduct,
  existingPrice = null,
  isEdit = false,
}) => {
  const [error, setError] = useState("");
  const [selectedProductValue, setSelectedProductValue] = useState("");

  const createProductPriceMutation = useCreateProductPriceMutation();
  const updateProductPriceMutation = useUpdateProductPriceMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm<ProductPriceFormData>({
    resolver: zodResolver(productPriceSchema),
    defaultValues: {
      productId: "",
      volume: "",
      price: "",
      discount: "0",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setError("");
      setSelectedProductValue("");
    } else if (isEdit && existingPrice) {
      // Pre-fill form with existing price data for editing
      const productId = existingPrice.productId || "";
      setSelectedProductValue(productId);
      setValue("productId", productId, { shouldValidate: true });
      setValue("volume", existingPrice.volume || "", { shouldValidate: true });
      setValue("price", existingPrice.price?.toString() || "", {
        shouldValidate: true,
      });
      setValue("discount", existingPrice.discount?.toString() || "0", {
        shouldValidate: true,
      });
    } else if (selectedProduct) {
      // Pre-select the product when modal opens with a selected product
      const productId = selectedProduct._id || "";
      setSelectedProductValue(productId);
      setValue("productId", productId, { shouldValidate: true });
    }
  }, [isOpen, reset, selectedProduct, setValue, isEdit, existingPrice]);

  const onSubmit = async (data: ProductPriceFormData) => {
    setError("");

    try {
      if (isEdit && existingPrice) {
        // Update existing price
        await updateProductPriceMutation.mutateAsync({
          id: existingPrice._id,
          priceData: {
            productId: data.productId,
            volume: data.volume,
            price: parseFloat(data.price),
            discount: data.discount ? parseFloat(data.discount) : 0,
          },
        });
      } else {
        // Create new price
        await createProductPriceMutation.mutateAsync(data);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${isEdit ? "update" : "create"} product price`
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Product Price" : "Add Product Price"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update pricing information for this product."
              : "Add pricing information for an existing product."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="productId">
              Product<span className="text-red-500">*</span>
            </Label>
            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!!selectedProduct || isEdit}
                >
                  <SelectTrigger
                    className={`w-full border focus:border-primary shadow-none ${
                      errors.productId ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products
                      ?.filter((product) => product.id || product._id)
                      .map((product) => {
                        const productId = product.id || product._id || "";
                        return (
                          <SelectItem key={productId} value={productId}>
                            {product.name} - {product.brand}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.productId && (
              <p className="text-xs text-red-600">{errors.productId.message}</p>
            )}
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <Label htmlFor="volume">
              Volume<span className="text-red-500">*</span>
            </Label>
            <Input
              id="volume"
              {...register("volume")}
              placeholder="e.g., 50ml, 100ml"
              className={`border focus:border-primary shadow-none ${
                errors.volume ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.volume && (
              <p className="text-xs text-red-600">{errors.volume.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Price<span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              {...register("price")}
              placeholder="Add a price"
              className={`border focus:border-primary shadow-none ${
                errors.price ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-xs text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              {...register("discount")}
              placeholder="Add a discount"
              className={`border focus:border-primary shadow-none ${
                errors.discount ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.discount && (
              <p className="text-xs text-red-600">{errors.discount.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createProductPriceMutation.isPending || updateProductPriceMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createProductPriceMutation.isPending || updateProductPriceMutation.isPending}
            >
              {(createProductPriceMutation.isPending || updateProductPriceMutation.isPending) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update Price"
              ) : (
                "Add Price"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
