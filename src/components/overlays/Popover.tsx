import { useRef } from "react";
import { Expand, type Placement } from "../../Expand";
import { useOutsidePress } from "../../overlay";
import { useSize } from "../../useSize";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  label?: string;
  panelLabel?: string;
  panelWidth?: number;
  /** The side the panel opens toward and the trigger edge it stays aligned with; it flips when the other side has more room. */
  placement?: Placement;
  id?: string;
  disabled?: boolean;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  className?: string;
};

export function Popover({
  open,
  onOpenChange,
  children,
  trigger = "Details",
  label,
  panelLabel = "Details",
  panelWidth = 288,
  placement = "bottom-left",
  id,
  disabled = false,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
}: PopoverProps) {
  const root = useRef<HTMLDivElement>(null);
  const [triggerSize, measureTrigger] = useSize();
  const width = triggerSize?.width;
  const [size, measurePanel] = useSize();
  useOutsidePress(root, open, () => onOpenChange(false));
  const content = <span ref={measureTrigger} className="inline-flex items-center whitespace-nowrap px-4 text-sm font-medium">{trigger}</span>;

  return (
    <div ref={root} className={`w-fit ${className}`}>
      {width === undefined ? content : <Expand
        open={open}
        onOpenChange={onOpenChange}
        closed={{ width, height: 44, radius: "var(--radius-control)" }}
        opened={{ width: size?.width ?? panelWidth, height: size?.height ?? 44, radius: "var(--radius-overlay)" }}
        anchor={placement}
        label={label}
        id={id}
        labelledBy={labelledBy}
        describedBy={describedBy}
        invalid={invalid}
        disabled={disabled}
        panelLabel={panelLabel}
        trigger={content}
        className="bg-paper text-ink"
      >
        <div ref={measurePanel} style={{ width: panelWidth }} className="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto">{children}</div>
      </Expand>}
    </div>
  );
}
