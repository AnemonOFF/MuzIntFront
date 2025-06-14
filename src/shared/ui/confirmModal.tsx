import React, { useState } from "react";
import Modal from "./modal";
import { Button } from "./button";

export interface ConfirmModalProps {
  text: string;
  onConfirm: () => void;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onConfirm,
  trigger,
  text,
  isOpen,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(false);

  const confirm = () => {
    setOpen(false);
    onConfirm();
  };

  const changeOpen = onOpenChange ?? setOpen;

  return (
    <Modal
      open={isOpen ?? open}
      onOpenChange={changeOpen}
      trigger={trigger}
      title="Подтвердите действие"
      content={<p>{text}</p>}
      footer={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={confirm}>
            Подтвердить
          </Button>
          <Button onClick={() => changeOpen(false)}>Отмена</Button>
        </div>
      }
    />
  );
};

export default React.memo(ConfirmModal);
