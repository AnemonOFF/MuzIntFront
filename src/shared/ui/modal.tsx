import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { useMediaQuery } from "../hooks/useMediaQuery";

export interface ModalProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  content,
  footer,
  trigger,
  title,
  description,
  open: openProps,
  onOpenChange: onOpenChangeProps,
}) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog
        open={openProps ?? open}
        onOpenChange={onOpenChangeProps ?? setOpen}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-none w-fit">
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {content}
          {footer && <div className="mt-5">{footer}</div>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={openProps ?? open}
      onOpenChange={onOpenChangeProps ?? setOpen}
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader className="text-left">
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <div className="p-5">{content}</div>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default React.memo(Modal);
