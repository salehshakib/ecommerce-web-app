"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { Loading } from "@/components/ui/loading";
import {
  useProductPricesQuery,
  type ProductPrice,
} from "@/hooks/queries/use-product-prices-query";
import { useDeleteProductPriceMutation } from "@/hooks/mutations/use-product-mutations";
import { ProductPriceModal } from "@/components/admin/product-price-modal";
import { useProductQuery } from "@/hooks/queries/use-products-query";

export default function ProductPricesPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading: productLoading } = useProductQuery(productId);
  const { data: productPrices = [], isLoading: pricesLoading } = useProductPricesQuery(productId);
  const deleteProductPriceMutation = useDeleteProductPriceMutation();

  const [priceToDelete, setPriceToDelete] = useState<ProductPrice | null>(null);
  const [priceToEdit, setPriceToEdit] = useState<ProductPrice | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isLoading = productLoading || pricesLoading;

  const handleDeletePrice = async (priceId: string) => {
    try {
      await deleteProductPriceMutation.mutateAsync(priceId);
      setPriceToDelete(null);
    } catch (error) {
      console.error("Failed to delete price:", error);
    }
  };

  const handleAddPrice = () => {
    setIsAddModalOpen(true);
  };

  const handleEditPrice = (price: ProductPrice) => {
    setPriceToEdit(price);
    setIsEditModalOpen(true);
  };

  const handlePriceSuccess = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setPriceToEdit(null);
  };

  const columns: ColumnDef<ProductPrice>[] = [
    {
      accessorKey: "volume",
      header: "Volume",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue("volume")}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-medium">${row.getValue("price")}</span>
      ),
    },
    {
      accessorKey: "discount",
      header: "Discount",
      cell: ({ row }) => {
        const discount = row.getValue("discount") as number;
        return (
          <span className="font-medium">
            {discount ? `${discount}%` : "No discount"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const price = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditPrice(price)}
              className="p-0"
            >
              <Edit className="h-4 w-4" /> Edit
              <span className="sr-only">Edit price</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setPriceToDelete(price)}
              className="p-0"
            >
              <Trash2 className="h-4 w-4" /> Delete
              <span className="sr-only">Delete price</span>
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <Loading
        message="Loading product prices..."
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
            <BreadcrumbPage>
              {product.name} - Prices
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Product Prices
          </h1>
          <p className="text-muted-foreground">
            Manage pricing for "{product.name}" by {product.brand}
          </p>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                Price Management
              </CardTitle>
              <CardDescription>
                Add, edit, or remove pricing options for this product
              </CardDescription>
            </div>
            <Button
              onClick={handleAddPrice}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Price
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {/* Data Table */}
          <DataTable
            columns={columns}
            data={productPrices}
            searchKey="volume"
            searchPlaceholder="Search by volume..."
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!priceToDelete}
        onOpenChange={() => setPriceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-destructive">
              Delete Product Price
            </AlertDialogTitle>
            <AlertDialogDescription className="leading-relaxed">
              This action cannot be undone. This will permanently delete the
              price for "{priceToDelete?.volume}" volume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                priceToDelete && handleDeletePrice(priceToDelete._id)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Price
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Price Modal */}
      <ProductPriceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        products={product ? [product] : []}
        onSuccess={handlePriceSuccess}
        selectedProduct={product}
      />

      {/* Edit Price Modal */}
      <ProductPriceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPriceToEdit(null);
        }}
        products={product ? [product] : []}
        onSuccess={handlePriceSuccess}
        selectedProduct={product}
        existingPrice={priceToEdit}
        isEdit={true}
      />
    </div>
  );
}