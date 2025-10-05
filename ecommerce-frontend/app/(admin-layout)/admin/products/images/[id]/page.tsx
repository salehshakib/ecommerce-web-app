"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, X } from "lucide-react";
import type { Product } from "@/types/product";
import { useProductQuery } from "@/hooks/queries/use-products-query";
// TODO: Import or create remove product image mutation
import { baseUrl } from "@/lib/api/endpoints/base-url";
import { productsApi } from "@/lib/api/endpoints/product.api";
import { getStoredToken } from "@/utils/auth/localStorage";

export default function ProductImagesPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading: loading,
    error,
  } = useProductQuery(productId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image state
  const [featuredImage, setFeaturedImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFeaturedImage(product.featureImage || "");
      setAdditionalImages(product.additionalImages || []);
    }
  }, [product]);

  const addAdditionalImage = () => {
    setAdditionalImages([...additionalImages, ""]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const updateAdditionalImage = (index: number, url: string) => {
    const updated = [...additionalImages];
    updated[index] = url;
    setAdditionalImages(updated);
  };

  const handleUpdateImages = async () => {
    if (!productId) return;

    setIsSubmitting(true);

    try {
      // TODO: Implement remove product image API call
      // await removeProductImage(productId);

      // Then, add new images if any
      if (featuredImage || additionalImages.some((img) => img)) {
        const imageData = {
          imageUrl: featuredImage,
          additionalImages: additionalImages.filter((img) => img),
        };

        const token = getStoredToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `${baseUrl}${productsApi.ADD_PRODUCT_IMAGE}/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(imageData),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to update product images: ${response.statusText}`
          );
        }
      }

      // Invalidate queries to refresh product data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });

      // Navigate back to products page
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product images:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <Loading
        message="Loading product details..."
        size="md"
        fullScreen={false}
        className="min-h-[400px]"
      />
    );
  }

  if (!product) {
    return (
      <div className="space-y-6 px-4 sm:px-0">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Product not found</h2>
            <p className="text-muted-foreground mt-2">
              The product with ID "{productId}" could not be found.
            </p>
            <Link
              href="/admin/products"
              className="inline-flex items-center mt-4 text-primary hover:text-primary/80"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Images - {product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Update Product Images
          </h1>
          <p className="text-muted-foreground">
            Update images for "{product.name}"
          </p>
        </div>
      </div>

      <Card className="border shadow-lg bg-white">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">
            Product Images
          </CardTitle>
          <CardDescription>
            Update the featured image and additional images for this product
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-8">
            {/* Featured Image */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                  Featured Image
                </h4>
                <span className="text-sm text-gray-500">Required</span>
              </div>
              <ImageUpload
                value={featuredImage}
                onChange={setFeaturedImage}
                onRemove={() => setFeaturedImage("")}
                label="Upload Featured Image"
                placeholder="Click to upload the main product image"
              />
            </div>

            {/* Additional Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                  Additional Images
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAdditionalImage}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Image
                </Button>
              </div>

              {additionalImages.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">
                    No additional images added yet
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAdditionalImage}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Additional Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-medium text-gray-900">
                          Additional Image {index + 1}
                        </h5>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <ImageUpload
                        value={image}
                        onChange={(url) => updateAdditionalImage(index, url)}
                        onRemove={() => updateAdditionalImage(index, "")}
                        label={`Upload Image ${index + 1}`}
                        placeholder="Click to upload additional product image"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center pt-6 border-t">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="px-8"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUpdateImages}
                  className="px-8 bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Images"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
