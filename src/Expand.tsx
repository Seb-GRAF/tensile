import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useTopLayer } from "./overlay";
import { useSprings } from "./springs";

/** `radius` is a CSS length, usually a token: `"var(--radius-control)"`. */
type Size = { width: number; height: number; radius: string };

export type ExpandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closed: Size;
  opened: Size;
  /** Where the shape grows from: the closed shape's center, or the corner that leaves it the most room in the viewport. */
  anchor: "center" | "corner";
  /** Accessible name of the closed shape, which is the button that opens it. */
  label: string;
  /** Accessible name of the open shape; when set, the open shape is a dialog. */
  panelLabel?: string;
  /** Content of the closed shape. */
  trigger: React.ReactNode;
  /** Content of the open shape. */
  children: React.ReactNode;
  /** The shape's colors, e.g. "bg-ink text-paper". */
  className: string;
};

/** One shape that springs between a closed and an open size and radius. It takes the closed size in the layout and overlays everything around it when open, from the top layer; its content blur-swaps, focus moves in on open and back on close (unless it has moved to something else), and Escape closes it. */
export function Expand({ open, onOpenChange, closed, opened, anchor, label, panelLabel, trigger, children, className }: ExpandProps) {
  const { shape, swap } = useSprings();
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  const { room, settle } = useTopLayer(frame, open);
  const up = room !== undefined && room.below < opened.height - closed.height && room.above > room.below;
  const left = room !== undefined && room.right < opened.width - closed.width && room.left > room.right;
  const place =
    anchor === "center"
      ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      : `${up ? "bottom-0" : "top-0"} ${left ? "right-0" : "left-0"}`;
  const size = open ? opened : closed;
  const x = open && anchor === "corner" && room
    ? left
      ? Math.max(0, opened.width - closed.width - room.left)
      : Math.min(0, room.right - opened.width + closed.width)
    : 0;

  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    const active = document.activeElement;
    if (open) panel.current!.focus({ preventScroll: true });
    else if (active === document.body || root.current!.contains(active)) button.current!.focus({ preventScroll: true });
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0" style={{ width: closed.width, height: closed.height }}>
      <div ref={frame} className="absolute inset-0">
        <motion.div
          initial={false}
          animate={{ width: size.width, height: size.height, borderRadius: size.radius, x }}
          transition={shape}
          onAnimationComplete={settle}
          onKeyDown={(event) => {
            if (open && event.key === "Escape") onOpenChange(false);
          }}
          className={`absolute overflow-hidden shadow-float outline-offset-2 has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-focus ${place} ${className}`}
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
                className={`absolute outline-none ${place}`}
              >
                {children}
              </motion.div>
            ) : (
              <motion.button
                key="closed"
                ref={button}
                type="button"
                aria-expanded={false}
                aria-haspopup={panelLabel ? "dialog" : undefined}
                aria-label={label}
                onClick={() => onOpenChange(true)}
                {...swap}
                style={{ width: closed.width, height: closed.height }}
                className={`absolute outline-none ${place}`}
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
