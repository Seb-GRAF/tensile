import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useTopLayer } from "./overlay";
import { useSprings } from "./springs";

/** `radius` is a CSS length, usually a token: `"var(--tn-radius-control)"`. */
type Size = { width: number; height: number; radius: string };

/** The side a shape grows toward and the edge it keeps aligned: `"bottom-left"` grows down from the closed shape's top edge with left edges aligned, `"top-center"` grows up from its bottom edge, centered. */
export type Placement = `${"top" | "bottom"}-${"left" | "center" | "right"}`;

export type ExpandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closed: Size;
  opened: Size;
  /** Where the shape grows from: the closed shape's center, or a placement whose side and left/right alignment flip when the viewport has more room the other way; the shape also shifts sideways to stay in view. */
  anchor: "center" | Placement;
  /** Accessible name of the closed shape, which is the button that opens it. */
  label?: string;
  id?: string;
  labelledBy?: string;
  describedBy?: string;
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible name of the open shape; when set, the open shape is a dialog. */
  panelLabel?: string;
  /** Content of the closed shape. */
  trigger: React.ReactNode;
  /** Content of the open shape. */
  children: React.ReactNode;
  /** The shape's colors, e.g. "bg-ink text-paper". */
  className: string;
};

const MARGIN = 16;

function flips(preferred: number, other: number, grow: number) {
  return preferred < grow && other > preferred;
}

/** One shape that springs between a closed and an open size and radius. It takes the closed size in the layout and overlays everything around it when open, from the top layer; its content blur-swaps, focus moves in on open and back on close (unless it has moved to something else), and Escape closes it. */
export function Expand({ open, onOpenChange, closed, opened, anchor, label, id, labelledBy, describedBy, invalid, disabled, panelLabel, trigger, children, className }: ExpandProps) {
  const { shape, swap } = useSprings();
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  const { room, settle } = useTopLayer(frame, open);
  const [side, align] = anchor.split("-");
  const growX = opened.width - closed.width;
  const growY = opened.height - closed.height;
  const up = room !== undefined && (side === "top" ? !flips(room.above, room.below, growY) : side === "bottom" && flips(room.below, room.above, growY));
  const centered = align === "center" && (room === undefined || Math.min(room.left, room.right) >= growX / 2 + MARGIN);
  const left = room !== undefined && !centered && (align === "right" ? !flips(room.left, room.right, growX) : align === "left" ? flips(room.right, room.left, growX) : room.left > room.right);
  const place =
    anchor === "center"
      ? "tn:top-1/2 tn:left-1/2 tn:-translate-x-1/2 tn:-translate-y-1/2"
      : `${up ? "tn:bottom-0" : "tn:top-0"} ${centered ? "tn:left-1/2 tn:-translate-x-1/2" : left ? "tn:right-0" : "tn:left-0"}`;
  const size = open ? opened : closed;
  const x = open && anchor !== "center" && !centered && room
    ? left
      ? Math.max(0, growX + MARGIN - room.left)
      : Math.min(0, room.right - growX - MARGIN)
    : 0;

  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    const active = document.activeElement;
    if (open) panel.current!.focus({ preventScroll: true });
    else if (active === document.body || root.current!.contains(active)) button.current!.focus({ preventScroll: true });
  }, [open]);

  return (
    <div ref={root} className="tn:relative tn:shrink-0" style={{ width: closed.width, height: closed.height }}>
      <div ref={frame} className="tn:absolute tn:inset-0">
        <motion.div
          initial={false}
          animate={{ width: size.width, height: size.height, borderRadius: size.radius, x }}
          transition={shape}
          onAnimationComplete={settle}
          onKeyDown={(event) => {
            if (open && event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              onOpenChange(false);
            }
          }}
          className={`tn:absolute tn:overflow-hidden tn:shadow-control tn:transition-shadow tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] ${open ? "tn:[--tn-shadow-control-drop:initial]" : ""} tn:outline-offset-2 tn:has-[>button:disabled]:opacity-40 tn:has-[>button:focus-visible]:outline-2 tn:has-[>button:focus-visible]:outline-focus ${place} ${className}`}
        >
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="open"
                ref={panel}
                role={panelLabel ? "dialog" : undefined}
                aria-label={panelLabel}
                tabIndex={-1}
                {...swap}
                style={{ width: opened.width, height: opened.height }}
                className={`tn:absolute tn:surface tn:outline-none ${place}`}
              >
                {children}
              </motion.div>
            ) : (
              <motion.button
                key="closed"
                ref={button}
                type="button"
                id={id}
                disabled={disabled}
                aria-expanded={false}
                aria-haspopup={panelLabel ? "dialog" : undefined}
                aria-label={label}
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                aria-invalid={invalid}
                onClick={() => onOpenChange(true)}
                {...swap}
                style={{ width: closed.width, height: closed.height }}
                className={`tn:absolute tn:outline-none ${place}`}
              >
                {trigger}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
