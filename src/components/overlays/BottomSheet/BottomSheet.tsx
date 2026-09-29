import { Sheet } from "../../../Sheet";
import { base } from "../../actions/Button/Button";

export type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  label?: string;
  handleLabel?: string;
  className?: string;
};

export function BottomSheet({ open, onOpenChange, children, label = "Sheet", handleLabel = "Close", className = "" }: BottomSheetProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side="bottom"
      aria-label={label}
      className={className}
      header={
        <div className="grid h-11 place-items-center">
          <button type="button" aria-label={handleLabel} onClick={() => onOpenChange(false)} className={`${base} h-8 px-4`}>
            <span className="h-1 w-9 rounded-full bg-muted/40" />
          </button>
        </div>
      }
    >
      {children}
    </Sheet>
  );
}
