"use client";

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
import { useUserOperations, type User } from "@/hooks/queries/use-users-query";

interface DeleteUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isDeleting?: boolean;
}

export function DeleteUserDialog({
  user,
  isOpen,
  onClose,
  isDeleting = false
}: DeleteUserDialogProps) {
  const { invalidateUsers } = useUserOperations();

  const handleDeleteUser = async () => {
    if (!user) return;

    try {
      // TODO: Implement delete user mutation here
      console.log("Delete user:", user._id);

      // Invalidate users query to refresh the list
      invalidateUsers();

      onClose();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-destructive">
            Delete User
          </AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed">
            This action cannot be undone. This will permanently delete the
            user "{user?.name}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteUser}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}