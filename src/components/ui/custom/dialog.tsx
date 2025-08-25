"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/libs/utils/utils-shadcn";
import { DialogPortal } from "../shadcn/dialog";

function DialogContentUserAuth({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlayAuth />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "fixed top-[25%] left-[50%] z-50",
          " grid w-full",
          "max-w-[calc(100%-2rem)] ",
          "translate-x-[-50%] ",
          "translate-y-[-12.5%] ",
          " rounded-lg duration-200 sm:max-w-lg",
          "scale-90",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
      <DialogPrimitive.DialogDescription></DialogPrimitive.DialogDescription>
    </DialogPortal>
  );
}

function DialogOverlayAuth({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

export { DialogContentUserAuth, DialogOverlayAuth };
