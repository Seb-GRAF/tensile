import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useControllable } from "../../../controllable";
import { useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";

type Trigger = {
  ref: React.RefCallback<HTMLElement>;
  onPointerEnter: React.PointerEventHandler<HTMLElement>;
  onPointerLeave: React.PointerEventHandler<HTMLElement>;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
};

export type HoverCardProps = {
  content: React.ReactNode;
  children: (trigger: Trigger) => React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Milliseconds the pointer rests on the trigger before the card opens. */
  openDelay?: number;
  /** Milliseconds after the pointer leaves the trigger or the card before the card closes. */
  closeDelay?: number;
  className?: string;
};

function Panel({ root, children }: { root: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }) {
  const { soft, spring } = useSprings();
  const [size, measure] = useSize();
  if (!size) return <div ref={measure} className="tn:invisible tn:absolute tn:w-max">{children}</div>;
  const box = root.current!.getBoundingClientRect();
  const up = innerHeight - box.bottom < size.height + 16 && box.top > innerHeight - box.bottom;
  const left = Math.min(innerWidth - size.width - 8, Math.max(8, box.left + (box.width - size.width) / 2)) - box.left;

  return (
    <motion.div
      ref={measure}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: spring(0.12) }}
      transition={soft}
      style={{ left, top: up ? -size.height - 8 : box.height + 8 }}
      className={`tn:pointer-events-auto tn:absolute tn:w-max tn:rounded-overlay tn:bg-paper tn:text-ink tn:shadow-float tn:surface ${up ? "tn:origin-bottom" : "tn:origin-top"}`}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({
  content,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  openDelay = 700,
  closeDelay = 300,
  className = "",
}: HoverCardProps) {
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const timer = useRef(0);
  const { settle } = useTopLayer(frame, open);

  function schedule(next: boolean, delay: number) {
    clearTimeout(timer.current);
    if (next !== open) timer.current = window.setTimeout(() => setOpen(next), delay);
  }

  function enter(event: React.PointerEvent) {
    if (event.pointerType !== "touch") schedule(true, openDelay);
  }

  function leave(event: React.PointerEvent) {
    if (event.pointerType !== "touch") schedule(false, closeDelay);
  }

  function blur(event: React.FocusEvent) {
    if (!root.current!.contains(event.relatedTarget)) schedule(false, 0);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (frame.current!.contains(document.activeElement)) trigger.current!.focus();
      schedule(false, 0);
    }
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={root} className={`tn:relative tn:inline-block ${className}`}>
      {children({
        ref: (node) => { trigger.current = node; },
        onPointerEnter: enter,
        onPointerLeave: leave,
        onFocus: (event) => {
          if (event.currentTarget.matches(":focus-visible")) schedule(true, 0);
        },
        onBlur: blur,
      })}
      <div ref={frame} onPointerEnter={enter} onPointerLeave={leave} onBlur={blur} className="tn:pointer-events-none tn:absolute tn:inset-0">
        <AnimatePresence onExitComplete={settle}>
          {open && <Panel key="card" root={root}>{content}</Panel>}
        </AnimatePresence>
      </div>
    </div>
  );
}
