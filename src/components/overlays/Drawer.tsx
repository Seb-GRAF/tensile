import { useId } from "react";
import { Sheet } from "../../Sheet";
import { icons } from "../../icons";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  children: React.ReactNode;
  side?: "right" | "left";
  closeLabel?: string;
  className?: string;
};

export function Drawer({ open, onOpenChange, title, children, side = "right", closeLabel = "Close", className = "" }: DrawerProps) {
  const titleId = useId();
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side={side}
      aria-labelledby={titleId}
      className={className}
      header={
        <div className="flex items-center justify-between gap-3 p-5">
          <h2 id={titleId} className="min-w-0 text-body font-semibold">{title}</h2>
          <IconButton
            label={closeLabel}
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="shrink-0 text-muted"
          >
            <Icon size={16}>{icons.close}</Icon>
          </IconButton>
        </div>
      }
    >
      {children}
    </Sheet>
  );
}

