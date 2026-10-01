import { useId } from "react";
import { useControllable } from "../../../controllable";
import { Button } from "../../actions/Button/Button";
import { Dialog } from "../Dialog/Dialog";

export type AlertDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  trigger?: React.ReactNode;
  className?: string;
};

export function AlertDialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  trigger = null,
  className = "",
}: AlertDialogProps) {
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  const descriptionId = useId();
  return (
    <Dialog open={open} onOpenChange={setOpen} title={title} trigger={trigger} role="alertdialog" aria-describedby={descriptionId} className={className}>
      <div id={descriptionId} className="tn:mt-2 tn:text-sm tn:text-muted">{description}</div>
      <div className="tn:mt-5 tn:flex tn:flex-wrap tn:justify-end tn:gap-2">
        <Button variant="secondary" data-autofocus onClick={() => setOpen(false)}>{cancelLabel}</Button>
        <Button onClick={() => { onConfirm(); setOpen(false); }}>{confirmLabel}</Button>
      </div>
    </Dialog>
  );
}
