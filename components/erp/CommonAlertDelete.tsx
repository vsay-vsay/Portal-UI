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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useRequestHook from "@/hooks/requestHook";
import { useEffect } from "react";
import { toast } from "sonner";

type AlertDialogChildProps = {
  endpoint: string;
  title: string;
  children: React.ReactNode;
  onSuccess?: () => void;
};

export function CommonAlertDelet({
  endpoint,
  title,
  children,
  onSuccess,
}: AlertDialogChildProps) {
  const [deleteFun, data, isDeleting, error, reset, statusCode] =
    useRequestHook(
      `${endpoint}`, // endpoint - this will become /api/users/682967507ce2a4c6f8582cc7
      "DELETE", // method
      null // initialData (not needed for DELETE)
    );

  const handleDelete = async () => {
    try {
      // Call the delete function
      await deleteFun();

      if (statusCode === 200 || statusCode === 204) {
        console.log("User deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete user:", error);
      // Handle error
    }
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message || "Deleted successfully", {});
      reset(); // Reset the request state after successful deletion
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback if provided
      }
    }
    if (error) {
      toast.error(error || "Failed to delete");
    }
  }, [data, error]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the <b>{title?.toLocaleUpperCase()}</b> and remove it from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
