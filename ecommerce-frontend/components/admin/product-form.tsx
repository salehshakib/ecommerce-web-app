"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategoriesQuery } from "@/hooks/queries/use-categories-query";
import { useTypesQuery } from "@/hooks/queries/use-types-query";
import type { CreateProductData, Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Types will be fetched from API

// Zod schema for validation
const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  slug: z.string().min(1, "Slug is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  inStock: z.boolean(),
  type: z.array(z.string()).min(1, "At least one type is required"),
});

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: CreateProductData) => Promise<Product | void>;
  onCancel: () => void;
  isEdit?: boolean;
  isSubmitting?: boolean;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

// Interface for the product creation body structure
interface IRootObject {
  name: string;
  brand: string;
  slug: string;
  quantity: number;
  category: string;
  description: string;
  inStock: boolean;
  type: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isEdit = false,
  isSubmitting = false,
  currentStep = 0,
  onStepChange,
}) => {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategoriesQuery();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  // Fetch types using TanStack Query
  const { data: types = [], isLoading: isLoadingTypes } = useTypesQuery();

  // Create a mapping for type ID to name for display purposes
  const typeIdToNameMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    types?.forEach((type) => {
      map[type._id] = type.name;
    });
    return map;
  }, [types]);

  const [savedProductData, setSavedProductData] = useState<IRootObject | null>(
    null
  );
  const [createdProductId, setCreatedProductId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      brand: product?.brand || "",
      slug: product?.slug || "",
      quantity: product?.quantity || 0,
      category: product?.category || "",
      description: product?.description || "",
      inStock: product?.inStock ?? true,
      type: product?.type?.map((t) => t._id) || [],
    },
    mode: "onChange",
  });

  // Only watch specific fields that are needed for slug generation and form logic
  const watchedName = watch("name");
  const watchedCategory = watch("category");
  const watchedType = watch("type");
  const watchedInStock = watch("inStock");

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Watch name changes to auto-generate slug
  useEffect(() => {
    if (watchedName && !isEdit) {
      const slug = generateSlug(watchedName);
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [watchedName, setValue, isEdit]);

  const handleFormSubmit = async (data: ProductFormData) => {
    // Clear any previous server errors
    setServerErrors({});

    if (!isEdit && currentStep === 0) {
      // For add mode, first step - create product and move to next step
      const productData: IRootObject = {
        name: data.name,
        brand: data.brand,
        slug: data.slug,
        quantity: data.quantity,
        category: data.category,
        description: data.description,
        inStock: data.inStock,
        type: data.type,
      };

      console.log("Product creation data:", productData);

      try {
        // Create the product first and get the response
        const response = await onSubmit(productData);
        console.log("Product created successfully:", response);

        // Store the created product ID for image upload (only for create mode)
        if (response && typeof response === "object" && "product" in response) {
          setCreatedProductId((response as any).product._id);

          // Save product data for use in step 2
          setSavedProductData(productData);

          // Move to next step (images)
          if (onStepChange) {
            onStepChange(1);
          }
        }
      } catch (error: any) {
        console.error("Failed to create product:", error);

        // Handle validation errors from the server
        if (error?.response?.data?.errors) {
          const errorMap: Record<string, string> = {};
          error.response.data.errors.forEach((err: any) => {
            if (err.field && err.message) {
              errorMap[err.field] = err.message;
            }
          });
          setServerErrors(errorMap);
        } else if (error?.message) {
          // Handle other error formats
          setServerErrors({ general: error.message });
        }
      }
    } else {
      // For edit mode, submit normally
      const productData: CreateProductData = {
        name: data.name,
        brand: data.brand,
        slug: data.slug,
        quantity: data.quantity,
        category: data.category,
        description: data.description,
        inStock: data.inStock,
        type: data.type,
      };

      try {
        await onSubmit(productData);
      } catch (error: any) {
        console.error("Failed to update product:", error);

        // Handle validation errors from the server
        if (error?.response?.data?.errors) {
          const errorMap: Record<string, string> = {};
          error.response.data.errors.forEach((err: any) => {
            if (err.field && err.message) {
              errorMap[err.field] = err.message;
            }
          });
          setServerErrors(errorMap);
        } else if (error?.message) {
          // Handle other error formats
          setServerErrors({ general: error.message });
        }
      }
    }
  };

  return (
    <>
      {/* Step 1: Product Details Form (or all content for edit mode) */}
      {(isEdit || currentStep === 0) && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* General server error message */}
          {serverErrors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{serverErrors.general}</p>
            </div>
          )}

          {/* Row 1: Product Name and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter product name"
                className={`border focus:border-primary shadow-none ${
                  errors.name || serverErrors.name
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name.message}</p>
              )}
              {serverErrors.name && (
                <p className="text-xs text-red-600">{serverErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium">
                Brand<span className="text-red-500">*</span>
              </Label>
              <Input
                id="brand"
                {...register("brand")}
                placeholder="Enter brand name"
                className={`border focus:border-primary shadow-none ${
                  errors.brand || serverErrors.brand
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.brand && (
                <p className="text-xs text-red-600">{errors.brand.message}</p>
              )}
              {serverErrors.brand && (
                <p className="text-xs text-red-600">{serverErrors.brand}</p>
              )}
            </div>
          </div>

          {/* Row 2: Slug and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                Slug<span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="product-slug"
                className={`border focus:border-primary shadow-none ${
                  errors.slug || serverErrors.slug
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.slug && (
                <p className="text-xs text-red-600">{errors.slug.message}</p>
              )}
              {serverErrors.slug && (
                <p className="text-xs text-red-600">{serverErrors.slug}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Auto-generated from product name. Used in URLs.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">
                Quantity<span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                placeholder="100"
                className={`border focus:border-primary shadow-none ${
                  errors.quantity || serverErrors.quantity
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.quantity && (
                <p className="text-xs text-red-600">
                  {errors.quantity.message}
                </p>
              )}
              {serverErrors.quantity && (
                <p className="text-xs text-red-600">{serverErrors.quantity}</p>
              )}
            </div>
          </div>

          {/* Row 3: Category and Product Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Category<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoadingCategories}
                  >
                    <SelectTrigger
                      className={`w-full border focus:border-primary shadow-none ${
                        errors.category || serverErrors.category
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          isLoadingCategories
                            ? "Loading categories..."
                            : "Select a category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
              {serverErrors.category && (
                <p className="text-xs text-red-600">{serverErrors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Product Types<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={types?.map((type) => type.name) || []}
                    selected={
                      types
                        ?.filter((type) => field.value?.includes(type._id))
                        .map((type) => type.name) || []
                    }
                    onChange={(selectedNames) => {
                      const selectedIds =
                        types
                          ?.filter((type) => selectedNames.includes(type.name))
                          .map((type) => type._id) || [];
                      field.onChange(selectedIds);
                    }}
                    placeholder={
                      isLoadingTypes
                        ? "Loading types..."
                        : types?.length === 0
                        ? "No types available"
                        : "Select product types"
                    }
                    disabled={isLoadingTypes || types?.length === 0}
                    className={`${
                      errors.type || serverErrors.type
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.type && (
                <p className="text-xs text-red-600">{errors.type.message}</p>
              )}
              {serverErrors.type && (
                <p className="text-xs text-red-600">{serverErrors.type}</p>
              )}
            </div>
          </div>

          {/* Row 4: In Stock */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={watchedInStock}
              onCheckedChange={(checked) =>
                setValue("inStock", checked as boolean, {
                  shouldValidate: true,
                })
              }
            />
            <Label
              htmlFor="inStock"
              className="text-sm font-medium cursor-pointer"
            >
              In Stock
            </Label>
          </div>

          {/* Row 5: Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter product description"
              className={`min-h-[100px] resize-none border focus:border-primary shadow-none ${
                errors.description || serverErrors.description
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
            {serverErrors.description && (
              <p className="text-xs text-red-600">{serverErrors.description}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center pt-6 border-t">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="px-8"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-8 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEdit ? "Updating..." : "Creating Product..."}
                  </>
                ) : isEdit ? (
                  "Update Product"
                ) : currentStep === 0 ? (
                  "Save Changes"
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: Navigate to Images Page */}
      {!isEdit && currentStep === 1 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Product Created Successfully!
            </h3>
            <p className="text-gray-600">
              Your product has been created. You can now add images or skip to
              view the product.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center pt-6 border-t">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="px-8"
              >
                Skip Images
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (createdProductId) {
                    window.location.href = `/admin/products/images/${createdProductId}`;
                  }
                }}
                className="px-8 bg-primary hover:bg-primary/90"
                disabled={!createdProductId}
              >
                Add Images
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ProductForm.displayName = "ProductForm";

export default ProductForm;
