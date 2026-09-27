import { useEffect, useRef } from "react";
import { Expand } from "../../Expand";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  label?: string;
  panelLabel?: string;
  triggerWidth?: number;
  panelWidth?: number;
  panelHeight?: number;
};

export function Popover({
  open,
  onOpenChange,
  children,
  label = "Details",
  panelLabel = "Details",
  triggerWidth = 80,
  panelWidth = 288,
  panelHeight = 212,
}: PopoverProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!root.current!.contains(event.target as Node)) onOpenChange(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open, onOpenChange]);

  return (
    <div ref={root} className="contents">
      <Expand
        open={open}
        onOpenChange={onOpenChange}
        closed={{ width: triggerWidth, height: 44, radius: "var(--radius-control)" }}
        opened={{ width: panelWidth, height: panelHeight, radius: "var(--radius-overlay)" }}
        anchor="corner"
        label={label}
        panelLabel={panelLabel}
        trigger={<span className="block truncate px-4 text-sm font-medium">{label}</span>}
        className="bg-paper text-ink"
      >
        {children}
      </Expand>
    </div>
  );
}
