import { useId } from "react";
import { Button } from "../../actions/Button/Button";
import { Dialog } from "../Dialog/Dialog";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  trigger?: React.ReactNode;
  className?: string;
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  trigger = null,
  className = "",
}: AlertDialogProps) {
  const descriptionId = useId();
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={title} trigger={trigger} role="alertdialog" aria-describedby={descriptionId} className={className}>
      <div id={descriptionId} className="mt-2 text-sm text-muted">{description}</div>
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <Button variant="secondary" data-autofocus onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
        <Button onClick={() => { onConfirm(); onOpenChange(false); }}>{confirmLabel}</Button>
      </div>
    </Dialog>
  );
}
