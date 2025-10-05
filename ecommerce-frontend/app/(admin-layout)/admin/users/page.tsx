"use client";

import { useState } from "react";
import { useUsersQuery, type User } from "@/hooks/queries/use-users-query";
import { useDeleteUserMutation } from "@/hooks/mutations/use-users-mutations";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Loading } from "@/components/ui/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, User as UserIcon } from "lucide-react";
import { buildCloudinaryUrl } from "@/utils/image-upload";
import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog";
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

export default function UsersPage() {
  const { data: users = [], isLoading: loading, error } = useUsersQuery();
  const deleteUserMutation = useDeleteUserMutation();
  const [deleteUserState, setDeleteUserState] = useState<User | null>(null);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      setDeleteUserState(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Admin
          </Badge>
        );
      case "user":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            User
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => {
        const user = row.original;
        const avatarUrl = user.avatar
          ? buildCloudinaryUrl(user.avatar)
          : undefined;
        const initials =
          user.name
            ?.split(" ")
            .map((n: string) => n.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase() || "U";

        return (
          <Avatar className="h-10 w-10">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={user.name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="space-y-1">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "_id",
      header: "User ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs text-muted-foreground">
          {row.getValue("_id")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => getRoleBadge(row.getValue("role")),
    },
    {
      id: "actions",
      enableHiding: false,

      cell: ({ row }) => {
        const user = row.original;

        // Don't show delete option for current admin user
        if (user.role === "admin") {
          return null;
        }

        return (
          <div className="flex justify-end px-6">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteUserState(user)}
              className="p-0 "
            >
              <span className="sr-only">Delete user</span>
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <Loading message="Loading users..." size="md" fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your users and their accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {users.length} total users
          </span>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        searchPlaceholder="Search users..."
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteUserState}
        onOpenChange={() => setDeleteUserState(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-destructive">
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription className="leading-relaxed">
              This action cannot be undone. This will permanently delete the
              user "{deleteUserState?.name}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteUser(deleteUserState?._id || "")}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
