import { Sheet } from "../../Sheet";
import { Button } from "../actions/Button";

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
          <Button
            variant="ghost"
            size="sm"
            aria-label={handleLabel}
            onClick={() => onOpenChange(false)}
          >
            <span className="h-1 w-9 rounded-full bg-muted/40" />
          </Button>
        </div>
      }
    >
      {children}
    </Sheet>
  );
}
