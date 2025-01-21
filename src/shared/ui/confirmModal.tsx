import React, { useState } from "react";
import Modal from "./modal";
import { Button } from "./button";

export interface ConfirmModalProps {
  text: string;
  trigger: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onConfirm,
  trigger,
  text,
}) => {
  const [open, setOpen] = useState(false);

  const confirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Подтвердите действие"
      content={<p>{text}</p>}
      footer={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={confirm}>
            Подтвердить
          </Button>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      }
    />
  );
};

export default React.memo(ConfirmModal);
