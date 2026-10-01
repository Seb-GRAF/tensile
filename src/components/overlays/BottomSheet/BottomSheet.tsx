import { useControllable } from "../../../controllable";
import { Sheet } from "../../../Sheet";
import { base } from "../../actions/Button/Button";

export type BottomSheetProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  label?: string;
  handleLabel?: string;
  className?: string;
};

export function BottomSheet({ open: openProp, defaultOpen = false, onOpenChange, children, label = "Sheet", handleLabel = "Close", className = "" }: BottomSheetProps) {
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      aria-label={label}
      className={className}
      header={
        <div className="tn:grid tn:h-11 tn:place-items-center">
          <button type="button" aria-label={handleLabel} onClick={() => setOpen(false)} className={`${base} tn:h-8 tn:px-4`}>
            <span className="tn:h-1 tn:w-9 tn:rounded-full tn:bg-muted/40" />
          </button>
        </div>
      }
    >
      {children}
    </Sheet>
  );
}
