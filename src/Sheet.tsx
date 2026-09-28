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
  bottom: "inset-x-0 bottom-0 max-h-dvh rounded-t-dialog",
  left: "inset-y-0 left-0 w-[min(360px,calc(100vw-48px))] rounded-r-dialog",
  right: "inset-y-0 right-0 w-[min(360px,calc(100vw-48px))] rounded-l-dialog",
};

const extensions = {
  bottom: "inset-x-0 top-full -mt-px h-full",
  left: "inset-y-0 right-full -mr-px w-full",
  right: "inset-y-0 left-full -ml-px w-full",
};

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
  const position = useTransform(offset, (value) => `${value * direction * 100}%`);
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
    const size = vertical ? panel.current!.offsetHeight : panel.current!.offsetWidth;
    const pointer = (vertical ? event.clientY : event.clientX) * direction;
    if (!header.hasPointerCapture(event.pointerId)) {
      if (!press.current || !event.buttons || Math.hypot(event.clientX - press.current.x, event.clientY - press.current.y) < 4) return;
      header.setPointerCapture(event.pointerId);
      offset.stop();
      origin.current = pointer - offset.get() * size;
    }
    const pulled = pointer - origin.current;
    offset.set((pulled < 0 ? rubber(pulled) : pulled) / size);
  }

  function release(event: React.PointerEvent<HTMLDivElement>) {
    press.current = null;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const close = offset.get() + offset.getVelocity() * 0.2 > 0.5;
    animate(offset, close ? 1 : 0, snap);
    if (close) onClose();
  }

  return (
    <div className="absolute inset-0 overflow-clip">
      <motion.div style={{ opacity }} onClick={onClose} className="absolute inset-0 bg-ink/40" />
      <motion.div
        ref={panel}
        tabIndex={-1}
        data-autofocus
        style={vertical ? { y: position } : { x: position }}
        className={`absolute flex flex-col bg-paper text-ink shadow-float surface outline-none ${panels[side]} ${className}`}
      >
        <div className={`absolute bg-paper ${extensions[side]}`} />
        <div
          onPointerDown={(event) => { press.current = { x: event.clientX, y: event.clientY }; }}
          onPointerMove={drag}
          onPointerUp={release}
          onPointerCancel={release}
          className="shrink-0 touch-none select-none"
        >
          {header}
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain">{children}</div>
      </motion.div>
    </div>
  );
}
