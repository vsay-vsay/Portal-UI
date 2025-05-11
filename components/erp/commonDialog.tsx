"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useRequestHook from "@/hooks/requestHook";
import { useToast } from "@/hooks/use-toast";

interface CommonFormDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  endpoint: string;
  method: "POST" | "PUT" | "PATCH";
  formComponent: React.ReactElement;
  successMessage?: string;
  defaultValues?: any;
  onSuccess?: () => void;
}

export function CommonFormDialog({
  children,
  title,
  description,
  endpoint,
  method = "POST",
  formComponent,
  successMessage = "Operation successful",
  defaultValues = null,
  onSuccess,
}: CommonFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [handleRequest, response, isLoading, error] = useRequestHook(
    endpoint,
    method,
    null
  );

  const handleSubmit = (data: any) => {
    handleRequest(data);
  };

  useEffect(() => {
    if (response) {
      toast({
        variant: "default",
        title: successMessage,
        description: response?.message,
      });
      setOpen(false);
      if (onSuccess) onSuccess();
    }
  }, [response]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {React.cloneElement(formComponent, {
          onSubmit: handleSubmit,
          isSubmitting: isLoading,
          defaultValues,
        })}
      </DialogContent>
    </Dialog>
  );
}
