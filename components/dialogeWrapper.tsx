import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

function DialogeWrapper({
  TriggerButton,
  title,
  description,
  children,
  footer,
  width = "525",
}: // setOpen,
// open,
{
  TriggerButton: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width: string;
  // setOpen: (open: boolean) => void;
  // open?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {TriggerButton}
      </DialogTrigger>
      <DialogContent
        style={{
          width: width + "px",
        }}
        className={`max-w-5xl max-h-[80vh] overflow-auto`}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export default DialogeWrapper;
