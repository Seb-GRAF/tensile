import { animate, motion, useMotionValue, usePresence, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { rubber } from "./drag";
import { useSprings } from "./springs";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: "bottom" | "left" | "right";
  header: React.ReactNode;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
};

const panels = {
  bottom: "tn:inset-x-0 tn:bottom-0 tn:max-h-dvh tn:rounded-t-dialog tn:sm:mx-auto tn:sm:max-w-lg",
  left: "tn:inset-y-3 tn:left-3 tn:w-[min(360px,calc(100vw-48px))] tn:overflow-clip tn:rounded-dialog",
  right: "tn:inset-y-3 tn:right-3 tn:w-[min(360px,calc(100vw-48px))] tn:overflow-clip tn:rounded-dialog",
};

const CLOSED_GAP = 40;

export function Sheet({ open, onOpenChange, side, header, children, className = "", ...label }: SheetProps) {
  return (
    <Modal open={open} onClose={() => onOpenChange(false)} {...label}>
      <SheetPanel key="sheet" side={side} header={header} onClose={() => onOpenChange(false)} className={className}>
        {children}
      </SheetPanel>
    </Modal>
  );
}

function SheetPanel({ side, header, children, onClose, className }: Pick<SheetProps, "side" | "header" | "children"> & { onClose: () => void; className: string }) {
  const { shape, snap } = useSprings();
  const [present, safeToRemove] = usePresence();
  const panel = useRef<HTMLDivElement>(null);
  const origin = useRef(0);
  const press = useRef<{ x: number; y: number } | null>(null);
  const offset = useMotionValue(1);
  const vertical = side === "bottom";
  const direction = side === "left" ? -1 : 1;
  const position = useTransform(offset, (value) => `calc(${value * direction} * (100% + ${CLOSED_GAP}px))`);
  const opacity = useTransform(offset, [0, 1], [1, 0]);

  useEffect(() => {
    const animation = animate(offset, present ? 0 : 1, {
      ...(present ? shape : snap),
      onComplete: () => {
        if (!present) safeToRemove!();
      },
    });
    return () => animation.stop();
  }, [present, offset]);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    const header = event.currentTarget;
    const travel = (vertical ? panel.current!.offsetHeight : panel.current!.offsetWidth) + CLOSED_GAP;
    const pointer = (vertical ? event.clientY : event.clientX) * direction;
    if (!header.hasPointerCapture(event.pointerId)) {
      if (!press.current || !event.buttons || Math.hypot(event.clientX - press.current.x, event.clientY - press.current.y) < 4) return;
      header.setPointerCapture(event.pointerId);
      offset.stop();
      origin.current = pointer - offset.get() * travel;
    }
    const pulled = pointer - origin.current;
    offset.set((pulled < 0 ? rubber(pulled) : pulled) / travel);
  }

  function release(event: React.PointerEvent<HTMLDivElement>) {
    press.current = null;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const close = offset.get() + offset.getVelocity() * 0.2 > 0.5;
    animate(offset, close ? 1 : 0, snap);
    if (close) onClose();
  }

  return (
    <div className="tn:absolute tn:inset-0 tn:overflow-clip">
      <motion.div style={{ opacity }} onClick={onClose} className="tn:absolute tn:inset-0 tn:bg-scrim/40" />
      <motion.div
        ref={panel}
        tabIndex={-1}
        data-autofocus
        style={vertical ? { y: position } : { x: position }}
        className={`tn:absolute tn:flex tn:flex-col tn:bg-paper tn:text-ink tn:shadow-float tn:surface tn:outline-none ${panels[side]} ${className}`}
      >
        {vertical && <div className="tn:absolute tn:inset-x-0 tn:top-full tn:-mt-px tn:h-full tn:bg-paper" />}
        <div
          onPointerDown={(event) => { press.current = { x: event.clientX, y: event.clientY }; }}
          onPointerMove={drag}
          onPointerUp={release}
          onPointerCancel={release}
          className="tn:shrink-0 tn:touch-none tn:select-none"
        >
          {header}
        </div>
        <div className="tn:min-h-0 tn:overflow-y-auto tn:overscroll-contain">{children}</div>
      </motion.div>
    </div>
  );
}
