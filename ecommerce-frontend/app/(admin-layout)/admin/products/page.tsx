"use client";

import { AddPriceButton } from "@/components/admin/add-price-button";
import { ProductPriceModal } from "@/components/admin/product-price-modal";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import { useDeleteProductMutation } from "@/hooks/mutations/use-product-mutations";
import { useProductPricesQuery } from "@/hooks/queries/use-product-prices-query";
import {
  useProductOperations,
  useProductsQuery,
} from "@/hooks/queries/use-products-query";
import type { Product } from "@/types/product";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DollarSign,
  Edit,
  Eye,
  ImageIcon,
  MoreHorizontal,
  Package,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductsPage() {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useProductsQuery();
  const { invalidateProducts } = useProductOperations();
  const deleteProductMutation = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const { data: productPrices = [], isLoading: loadingPrices } =
    useProductPricesQuery(selectedProductId);

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProductForPrice, setSelectedProductForPrice] =
    useState<Product | null>(null);

  const handleDeleteProduct = async (productId: string | undefined) => {
    if (!productId) return;

    try {
      await deleteProductMutation.mutateAsync(productId);
      setDeleteProduct(null);
    } catch (error) {
      // Error is already handled by the mutation's onError callback
      console.error("Failed to delete product:", error);
    }
  };

  const handleAddProduct = () => {
    router.push("/admin/products/add");
  };

  const handlePriceSuccess = () => {
    // Invalidate products query to get updated pricing data
    invalidateProducts();
  };

  const handleAddPriceFromDropdown = (product: Product) => {
    setSelectedProductForPrice(product);
    setShowPriceModal(true);
  };

  const handleClosePriceModal = () => {
    setShowPriceModal(false);
    setSelectedProductForPrice(null);
  };

  const handlePriceModalSuccess = () => {
    invalidateProducts();
    handleClosePriceModal();
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);

    // Set product ID to trigger price query
    const productId = product.id || product._id;
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div className="font-medium">{product.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => {
        const brand = row.getValue("brand") as string;
        return <div className="font-medium text-gray-700">{brand}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const types = row.getValue("type") as Array<{
          _id: string;
          name: string;
          __v: number;
        }>;
        return (
          <div className="flex flex-wrap gap-1">
            {types?.slice(0, 2).map((type) => (
              <Badge key={type?._id} variant="outline" className="text-xs">
                {type?.name}
              </Badge>
            ))}
            {(types?.length || 0) > 2 && (
              <Badge variant="outline" className="text-xs">
                +{(types?.length || 0) - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number;
        return (
          <div className="text-center">
            <span
              className={`font-medium ${
                quantity === 0
                  ? "text-destructive"
                  : quantity < 10
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {quantity ?? 0}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "inStock",
      header: "Status",
      cell: ({ row }) => {
        const inStock = row.getValue("inStock") as boolean;
        return (
          <Badge
            className={
              inStock
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            }
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/products/update/${product.id || product._id}`
                  )
                }
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddPriceFromDropdown(product)}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Add Product Price
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/products/product-prices/${
                      product.id || product._id
                    }`
                  )
                }
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Product Prices
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/products/images/${product.id || product._id}`
                  )
                }
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Add/Update Images
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteProduct(product)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading message="Loading products..." size="md" fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Products
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your product inventory and pricing
          </p>
        </div>
        <div className="flex gap-2">
          <AddPriceButton products={products} onSuccess={handlePriceSuccess} />
          <Button
            onClick={handleAddProduct}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        searchPlaceholder="Search products..."
      />

      {/* View Product Dialog */}
      <Dialog
        open={isViewModalOpen}
        onOpenChange={(open) => {
          setIsViewModalOpen(open);
          if (!open) {
            setSelectedProductId(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader className="pb-6">
                <DialogTitle className="text-2xl font-semibold">
                  {selectedProduct.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  by {selectedProduct.brand}
                </p>
              </DialogHeader>

              <div className="space-y-6">
                {/* Product Images */}
                {(selectedProduct.featureImage ||
                  selectedProduct.additionalImages?.length > 0) && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Label className="font-medium text-sm block mb-3">
                        Product Images
                      </Label>

                      {/* Featured Image - Single Line */}
                      {selectedProduct.featureImage && (
                        <div className="mb-4">
                          <div className="text-xs text-gray-500 mb-2">
                            Featured Image
                          </div>
                          <div className="flex">
                            <Image
                              src={
                                buildCloudinaryUrl(
                                  selectedProduct?.featureImage
                                ) || selectedProduct?.featureImage
                              }
                              alt={`${selectedProduct.name} - Featured`}
                              width={120}
                              height={120}
                              className="rounded-lg object-cover aspect-square border"
                            />
                          </div>
                        </div>
                      )}

                      {/* Additional Images - Next Line */}
                      {selectedProduct.additionalImages?.length > 0 && (
                        <div>
                          <div className="text-xs text-gray-500 mb-2">
                            Additional Images
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {selectedProduct.additionalImages.map(
                              (image, index) => (
                                <Image
                                  key={index}
                                  src={buildCloudinaryUrl(image) || image}
                                  alt={`${selectedProduct.name} - Image ${
                                    index + 1
                                  }`}
                                  width={120}
                                  height={120}
                                  className="rounded-lg object-cover aspect-square border"
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Label className="font-medium text-sm block mb-3">
                        Product Details
                      </Label>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Slug:</span>
                          <span className="text-sm text-muted-foreground">
                            {selectedProduct.slug}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Category:</span>
                          <Badge variant="secondary" className="text-xs">
                            {selectedProduct.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Label className="font-medium text-sm block mb-3">
                        Quantity & Stock
                      </Label>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Quantity:</span>
                          <span
                            className={`text-sm font-medium ${
                              selectedProduct.quantity === 0
                                ? "text-destructive"
                                : selectedProduct.quantity < 10
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          >
                            {selectedProduct.quantity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Status:</span>
                          <Badge
                            className={
                              selectedProduct.inStock
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {selectedProduct.inStock
                              ? "In Stock"
                              : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Types */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="font-medium text-sm block mb-3">
                      Product Types
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct?.type?.map((type) => (
                        <Badge key={type?._id} variant="outline">
                          {type?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Prices */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="font-medium text-sm">
                        Product Prices
                      </Label>
                      {loadingPrices && (
                        <div className="text-xs text-muted-foreground">
                          Loading...
                        </div>
                      )}
                    </div>
                    {loadingPrices ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    ) : productPrices.length > 0 ? (
                      <div className="space-y-3">
                        {productPrices.map((price) => (
                          <div
                            key={price._id}
                            className="flex items-center justify-between p-3 bg-white rounded border"
                          >
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">{price.volume}</Badge>
                              <div className="text-sm">
                                <div className="font-medium">
                                  ${price.price}
                                </div>
                                {price.discount && price.discount > 0 && (
                                  <div className="text-xs text-green-600">
                                    {price.discount}% discount
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          No pricing information available
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description - At the end */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="font-medium text-sm block mb-3">
                      Description
                    </Label>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteProduct}
        onOpenChange={() => setDeleteProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-destructive">
              Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription className="leading-relaxed">
              This action cannot be undone. This will permanently delete the
              product "{deleteProduct?.name}" from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                handleDeleteProduct(deleteProduct?.id || deleteProduct?._id)
              }
              disabled={deleteProductMutation.isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteProductMutation.isPending
                ? "Deleting..."
                : "Delete Product"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Product Price Modal */}
      <ProductPriceModal
        isOpen={showPriceModal}
        onClose={handleClosePriceModal}
        products={selectedProductForPrice ? [selectedProductForPrice] : []}
        onSuccess={handlePriceModalSuccess}
        selectedProduct={selectedProductForPrice}
      />
    </div>
  );
}
