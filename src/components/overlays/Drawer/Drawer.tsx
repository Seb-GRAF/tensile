import { useId } from "react";
import { useControllable } from "../../../controllable";
import { Sheet } from "../../../Sheet";
import { icons } from "../../../icons";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  children: React.ReactNode;
  side?: "right" | "left";
  closeLabel?: string;
  className?: string;
};

export function Drawer({ open: openProp, defaultOpen = false, onOpenChange, title, children, side = "right", closeLabel = "Close", className = "" }: DrawerProps) {
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  const titleId = useId();
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      side={side}
      aria-labelledby={titleId}
      className={className}
      header={
        <div className="tn:flex tn:items-center tn:justify-between tn:gap-3 tn:p-5">
          <h2 id={titleId} className="tn:min-w-0 tn:text-body tn:font-semibold">{title}</h2>
          <IconButton
            label={closeLabel}
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="tn:shrink-0 tn:text-muted"
          >
            <Icon size={16}>{icons.close}</Icon>
          </IconButton>
        </div>
      }
    >
      <div className="tn:px-5 tn:pb-5">{children}</div>
    </Sheet>
  );
}

