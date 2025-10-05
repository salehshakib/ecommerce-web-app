import { z } from "zod";

// Schema that handles form inputs (strings) and transforms to proper types
export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discount: z.coerce
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .default(0),
  image: z.string().optional().default(""),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  tags: z.array(z.string()).min(1, "Please select at least one tag"),
  sizes: z.array(z.string()).min(1, "Please select at least one size"),
  inStock: z.boolean().default(true),
});

// Admin product form schema (comprehensive)
export const adminProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  slug: z.string().min(1, "Slug is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isActive: z.boolean().default(true),
});

// Product price schema
export const productPriceSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  volume: z.string().min(1, "Volume is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(0, "Discount cannot be negative"),
});

// Tag schema
export const tagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .max(50, "Tag name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Tag name can only contain letters and spaces")
    .transform((val) => val.trim()),
});

// Size schema
export const sizeSchema = z.object({
  name: z
    .string()
    .min(1, "Size is required")
    .max(20, "Size must be less than 20 characters")
    .regex(
      /^\d+\s?(ml|oz|ML|OZ)$/,
      "Size must be in format like '50ml', '50 ml', '2oz', or '2 oz'"
    )
    .transform((val) => val.trim()),
});

// Type exports
export type ProductFormData = z.infer<typeof productFormSchema>;
export type AdminProductFormData = z.infer<typeof adminProductFormSchema>;
export type ProductPriceData = z.infer<typeof productPriceSchema>;
export type TagFormData = z.infer<typeof tagSchema>;
export type SizeFormData = z.infer<typeof sizeSchema>;
