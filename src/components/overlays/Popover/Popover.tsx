import { useRef } from "react";
import { useControllable } from "../../../controllable";
import { Expand, type Placement } from "../../../Expand";
import { useOutsidePress } from "../../../overlay";
import { useSize } from "../../../useSize";

export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  trigger = "Details",
  label,
  panelLabel = "Details",
  panelWidth = 288,
  placement = "top-center",
  id,
  disabled = false,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
}: PopoverProps) {
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  const root = useRef<HTMLDivElement>(null);
  const [triggerSize, measureTrigger] = useSize();
  const width = triggerSize?.width;
  const [size, measurePanel] = useSize();
  useOutsidePress(root, open, () => setOpen(false));
  const content = <span ref={measureTrigger} className={`tn:inline-flex tn:h-11 tn:items-center tn:whitespace-nowrap tn:align-top tn:text-sm tn:font-medium ${label ? "tn:px-3.5" : "tn:px-4"}`}>{trigger}</span>;

  return (
    <div ref={root} className={`tn:w-fit ${className}`}>
      {width === undefined ? content : <Expand
        open={open}
        onOpenChange={setOpen}
        closed={{ width, height: 44, radius: "var(--tn-radius-control)" }}
        opened={{ width: size?.width ?? panelWidth, height: size?.height ?? 44, radius: "var(--tn-radius-overlay)" }}
        anchor={placement}
        label={label}
        id={id}
        labelledBy={labelledBy}
        describedBy={describedBy}
        invalid={invalid}
        disabled={disabled}
        panelLabel={panelLabel}
        trigger={content}
        className="tn:bg-paper tn:text-ink"
      >
        <div ref={measurePanel} style={{ width: panelWidth }} className="tn:max-h-[calc(100dvh-2rem)] tn:max-w-[calc(100vw-2rem)] tn:overflow-y-auto">{children}</div>
      </Expand>}
    </div>
  );
}
