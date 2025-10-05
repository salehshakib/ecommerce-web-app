"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Stepper } from "@/components/ui/stepper";
import { useCreateProductMutation } from "@/hooks/mutations/use-product-mutations";
import type { CreateProductData } from "@/types/product";

export default function AddProductPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const createProductMutation = useCreateProductMutation();

  const steps = [
    {
      title: "Product Details",
      description: "Basic information",
    },
    {
      title: "Product Images",
      description: "Upload images",
    },
  ];

  const handleAddProduct = async (productData: CreateProductData) => {
    return new Promise<any>((resolve, reject) => {
      createProductMutation.mutate(productData, {
        onSuccess: (response) => {
          console.log("Product added successfully:", response);
          // Don't redirect immediately - let the form handle step transition
          resolve(response);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  const handleCancel = () => {
    // If we're on step 1 (image step) or step 0, go back to products list
    if (currentStep === 1) {
      router.push("/admin/products");
    } else {
      router.back();
    }
  };

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
            <BreadcrumbPage>Add Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add New Product
          </h1>
          <p className="text-muted-foreground">
            Create a new product in your inventory
          </p>
        </div>
      </div>

      {/* Stepper outside the card */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <Card className="border shadow-lg  bg-white">
        <CardContent className="px-4 sm:px-6">
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={handleCancel}
            isSubmitting={createProductMutation.isPending}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </CardContent>
      </Card>
    </div>
  );
}
