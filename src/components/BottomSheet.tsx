import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { dragHandlers, rubber } from "../drag";
import { shape, snap } from "../springs";

export type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  label?: string;
  handleLabel?: string;
};

const LOOKAHEAD = 0.2;

export function BottomSheet({ open, onOpenChange, children, label = "Sheet", handleLabel = "Close" }: BottomSheetProps) {
  const sheet = useRef<HTMLDivElement>(null);
  const origin = useRef(0);
  const offset = useMotionValue(open ? 0 : 1);
  const y = useTransform(offset, (o) => `${o * 100}%`);
  const opacity = useTransform(offset, [0, 1], [1, 0]);

  useEffect(() => {
    if (!open) {
      animate(offset, 1, snap);
      return;
    }
    const opener = document.activeElement as HTMLElement;
    sheet.current!.focus({ preventScroll: true });
    animate(offset, 0, shape);
    return () => opener.focus();
  }, [open, offset]);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    const height = sheet.current!.offsetHeight;
    if (event.type === "pointerdown") {
      offset.stop();
      origin.current = event.clientY - offset.get() * height;
    }
    const pulled = event.clientY - origin.current;
    offset.set((pulled < 0 ? rubber(pulled) : pulled) / height);
  }

  function release() {
    if (offset.get() + offset.getVelocity() * LOOKAHEAD > 0.5) {
      onOpenChange(false);
      animate(offset, 1, snap);
    } else {
      animate(offset, 0, snap);
    }
  }

  return (
    <div inert={!open} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ opacity }} onClick={() => onOpenChange(false)} className="absolute inset-0 bg-ink/40" />
      <motion.div
        ref={sheet}
        role="dialog"
        aria-modal
        aria-label={label}
        tabIndex={-1}
        style={{ y }}
        onKeyDown={(event) => {
          if (event.key === "Escape") onOpenChange(false);
        }}
        className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-paper shadow-float outline-none"
      >
        <div className="absolute inset-x-0 top-full -mt-px h-full bg-paper" />
        <div {...dragHandlers(drag, release)} className="grid h-11 touch-none place-items-center">
          <button
            type="button"
            aria-label={handleLabel}
            onClick={() => onOpenChange(false)}
            className="grid h-5 w-12 place-items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span className="h-1 w-9 rounded-full bg-muted/40" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
