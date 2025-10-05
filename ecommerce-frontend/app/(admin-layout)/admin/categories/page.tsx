"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";
import { Loading } from "@/components/ui/loading";
import {
  useCategoriesQuery,
  type Category,
} from "@/hooks/queries/use-categories-query";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  type AddCategoryData,
  type UpdateCategoryData,
} from "@/hooks/mutations/use-categories-mutations";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategoriesQuery();
  const addCategoryMutation = useAddCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Form state for add modal
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
  });

  // Form state for update modal
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
  });
  const [updateFormErrors, setUpdateFormErrors] = useState({
    name: "",
  });

  const handleDeleteCategory = (categoryId: string) => {
    // TODO: Implement delete mutation when available
    setDeleteCategory(null);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = { name: "" };
    if (!formData.name.trim()) {
      errors.name = "Category name is required";
    }
    setFormErrors(errors);

    // If there are errors, don't submit
    if (errors.name) return;

    try {
      const categoryData: AddCategoryData = {
        name: formData.name.trim(),
      };

      await addCategoryMutation.mutateAsync(categoryData);
      setIsAddModalOpen(false);
      setFormData({ name: "" });
      setFormErrors({ name: "" });
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const openUpdateModal = (category: Category) => {
    setSelectedCategory(category);
    setUpdateFormData({ name: category.name });
    setUpdateFormErrors({ name: "" });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) return;

    // Validate form
    const errors = { name: "" };
    if (!updateFormData.name.trim()) {
      errors.name = "Category name is required";
    }
    setUpdateFormErrors(errors);

    // If there are errors, don't submit
    if (errors.name) return;

    try {
      const categoryData: UpdateCategoryData = {
        name: updateFormData.name.trim(),
      };

      await updateCategoryMutation.mutateAsync({
        id: selectedCategory._id,
        categoryData,
      });
      setIsUpdateModalOpen(false);
      setSelectedCategory(null);
      setUpdateFormData({ name: "" });
      setUpdateFormErrors({ name: "" });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const category = row.original;

        return (
          <div className="flex items-center justify-end gap-2 ">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openUpdateModal(category)}
              className="p-0 "
            >
              <Edit className="h-4 w-4" /> Edit
              <span className="sr-only">Edit category</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteCategory(category)}
              className="p-0"
            >
              <Trash2 className="h-4 w-4" /> Delete
              <span className="sr-only">Delete category</span>
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading message="Loading categories..." size="md" fullScreen />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage product categories and organization
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        searchKey="name"
        searchPlaceholder="Search categories..."
      />

      {/* Add Category Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add New Category
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-name" className="text-sm font-medium">
                Category Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ name: e.target.value });
                  if (formErrors.name) setFormErrors({ name: "" });
                }}
                placeholder="Enter category name"
                className={`border focus:border-primary shadow-none ${
                  formErrors.name ? "border-red-300" : "border-gray-300"
                }`}
                disabled={addCategoryMutation.isPending}
              />
              {formErrors.name && (
                <p className="text-xs text-red-600">{formErrors.name}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setFormData({ name: "" });
                  setFormErrors({ name: "" });
                }}
                disabled={addCategoryMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={addCategoryMutation.isPending}
              >
                {addCategoryMutation.isPending ? "Adding..." : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Category Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Update Category
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="update-name" className="text-sm font-medium">
                Category Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="update-name"
                value={updateFormData.name}
                onChange={(e) => {
                  setUpdateFormData({ name: e.target.value });
                  if (updateFormErrors.name) setUpdateFormErrors({ name: "" });
                }}
                placeholder="Enter category name"
                className={`border focus:border-primary shadow-none ${
                  updateFormErrors.name ? "border-red-300" : "border-gray-300"
                }`}
                disabled={updateCategoryMutation.isPending}
              />
              {updateFormErrors.name && (
                <p className="text-xs text-red-600">{updateFormErrors.name}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsUpdateModalOpen(false);
                  setSelectedCategory(null);
                  setUpdateFormData({ name: "" });
                  setUpdateFormErrors({ name: "" });
                }}
                disabled={updateCategoryMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={updateCategoryMutation.isPending}
              >
                {updateCategoryMutation.isPending
                  ? "Updating..."
                  : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!deleteCategory}
        onOpenChange={() => setDeleteCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-destructive">
              Delete Category
            </AlertDialogTitle>
            <AlertDialogDescription className="leading-relaxed">
              This action cannot be undone. This will permanently delete the
              category "{deleteCategory?.name}" and may affect associated
              products.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteCategory && handleDeleteCategory(deleteCategory._id)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
