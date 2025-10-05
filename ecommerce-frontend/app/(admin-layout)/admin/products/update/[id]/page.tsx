"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
import ProductForm from "@/components/admin/product-form";
import type { Product, CreateProductData } from "@/types/product";
import { Loading } from "@/components/ui/loading";
import { useProductQuery } from "@/hooks/queries/use-products-query";
import { useUpdateProductMutation } from "@/hooks/mutations/use-product-mutations";

export default function UpdateProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const {
    data: product,
    isLoading: loading,
    error,
  } = useProductQuery(productId);

  const updateProductMutation = useUpdateProductMutation();

  const handleUpdateProduct = async (productData: CreateProductData) => {
    try {
      await updateProductMutation.mutateAsync({
        id: productId,
        productData,
      });

      // Navigate back to products page
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      // Error is handled by the mutation
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

  if (error || (!loading && !product)) {
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
    <div className="space-y-6 px-4 sm:px-0">
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
            <BreadcrumbPage>Update {product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Update Product
          </h1>
          <p className="text-muted-foreground">
            Update "{product?.name}" in your inventory
          </p>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">
            Product Information
          </CardTitle>
          <CardDescription>
            Update the details below to modify this product
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <ProductForm
            product={product}
            onSubmit={handleUpdateProduct}
            onCancel={handleCancel}
            isEdit={true}
            isSubmitting={updateProductMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
