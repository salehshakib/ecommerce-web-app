"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
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
import { Loading } from "@/components/ui/loading";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { AddTypeModal } from "@/components/admin/add-type-modal";
import { EditTypeModal } from "@/components/admin/edit-type-modal";
import {
  useTypesQuery,
  type ProductType,
} from "@/hooks/queries/use-types-query";
import { useDeleteTypeMutation } from "@/hooks/mutations/use-types-mutations";

export default function TypesPage() {
  const [typeToDelete, setTypeToDelete] = useState<ProductType | null>(null);
  const [typeToEdit, setTypeToEdit] = useState<ProductType | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: types = [], isLoading, error } = useTypesQuery();
  const deleteTypeMutation = useDeleteTypeMutation();

  const handleDeleteType = async (typeId: string) => {
    try {
      await deleteTypeMutation.mutateAsync(typeId);
      setTypeToDelete(null);
    } catch (error) {
      console.error("Failed to delete type:", error);
    }
  };

  const handleAddType = () => {
    setIsAddModalOpen(true);
  };

  const handleEditType = (type: ProductType) => {
    setTypeToEdit(type);
    setIsEditModalOpen(true);
  };

  const handleTypeSuccess = () => {
    setIsAddModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setTypeToEdit(null);
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "name",
      header: "Type Name",
      cell: ({ row }) => {
        const type = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="font-medium">{type.name}</div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const type = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditType(type)}
              className="p-0"
            >
              <Edit className="h-4 w-4" /> Edit
              <span className="sr-only">Edit type</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setTypeToDelete(type)}
              className="p-0"
            >
              <Trash2 className="h-4 w-4" /> Delete
              <span className="sr-only">Delete type</span>
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading message="Loading types..." size="md" fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Product Types
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage product types and categories
          </p>
        </div>
        <Button
          onClick={handleAddType}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Type
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={types}
        searchKey="name"
        searchPlaceholder="Search types..."
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!typeToDelete}
        onOpenChange={() => setTypeToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-destructive">
              Delete Type
            </AlertDialogTitle>
            <AlertDialogDescription className="leading-relaxed">
              This action cannot be undone. This will permanently delete the
              type "{typeToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteType(typeToDelete?._id!)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Type
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Type Modal */}
      <AddTypeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleTypeSuccess}
      />

      {/* Edit Type Modal */}
      <EditTypeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTypeToEdit(null);
        }}
        onSuccess={handleEditSuccess}
        type={typeToEdit}
      />
    </div>
  );
}
