import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useSprings } from "./springs";

type Size = { width: number; height: number; radius: number };

export type ExpandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closed: Size;
  opened: Size;
  /** Where the shape grows from: the closed shape's center, or its top-left corner. */
  anchor: "center" | "top-left";
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

/** One shape that springs between a closed and an open size and radius. It takes the closed size in the layout and overlays what's around it when open; its content blur-swaps, focus moves in on open and back on close (unless it has moved to something else), and Escape closes it. */
export function Expand({ open, onOpenChange, closed, opened, anchor, label, panelLabel, trigger, children, className }: ExpandProps) {
  const { shape, swap } = useSprings();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  const place = anchor === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "top-0 left-0";
  const size = open ? opened : closed;

  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    const active = document.activeElement;
    if (open) panel.current!.focus({ preventScroll: true });
    else if (active === document.body || root.current!.contains(active)) button.current!.focus({ preventScroll: true });
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0" style={{ width: closed.width, height: closed.height }}>
      <motion.div
        initial={false}
        animate={{ width: size.width, height: size.height, borderRadius: size.radius }}
        transition={shape}
        onKeyDown={(event) => {
          if (open && event.key === "Escape") onOpenChange(false);
        }}
        className={`absolute z-10 overflow-hidden shadow-float outline-offset-2 has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-ink ${place} ${className}`}
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
  );
}
