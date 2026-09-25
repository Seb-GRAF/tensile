import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { dragHandlers, rubber } from "../drag";
import { shape, snap, soft } from "../springs";

export type SplitPaneProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Where the divider sits, as a fraction of the width from the left: 0..1. */
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

const GAP = 16;

export function SplitPane({ left, right, value, onValueChange, min = 0.2, max = 0.8, label = "Resize panes" }: SplitPaneProps) {
  const root = useRef<HTMLDivElement>(null);
  const grab = useRef(0);
  const [held, setHeld] = useState(false);
  const stretch = useMotionValue(0);
  const width = useTransform(stretch, (s) => `calc(${value * 100}% + ${s - GAP / 2}px)`);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    const box = root.current!.getBoundingClientRect();
    if (event.type === "pointerdown") {
      stretch.stop();
      grab.current = event.clientX - box.left - value * box.width;
      setHeld(true);
    }
    const px = event.clientX - box.left - grab.current;
    onValueChange(Math.min(max, Math.max(min, px / box.width)));
    const over = px > max * box.width ? px - max * box.width : Math.min(0, px - min * box.width);
    stretch.set(rubber(over));
  }

  function release() {
    setHeld(false);
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowLeft: value - 0.05, ArrowRight: value + 0.05, Home: min, End: max };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    onValueChange(Math.min(max, Math.max(min, target)));
  }

  return (
    <div ref={root} className="flex size-full">
      <motion.div style={{ width }} className="overflow-hidden rounded-3xl bg-paper shadow-float">
        {left}
      </motion.div>
      <div
        role="separator"
        tabIndex={0}
        aria-label={label}
        aria-orientation="vertical"
        aria-valuemin={Math.round(min * 100)}
        aria-valuemax={Math.round(max * 100)}
        aria-valuenow={Math.round(value * 100)}
        {...dragHandlers(drag, release)}
        onKeyDown={onKeyDown}
        className="group flex w-4 cursor-col-resize touch-none items-center justify-center outline-none"
      >
        <motion.div
          initial={false}
          animate={
            held
              ? { width: 6, height: 64, backgroundColor: "var(--color-ink)" }
              : { width: 4, height: 32, backgroundColor: "var(--color-muted)" }
          }
          transition={{ width: shape, height: shape, backgroundColor: soft }}
          className="rounded-full outline-offset-2 group-focus-visible:outline-2 group-focus-visible:outline-ink"
        />
      </div>
      <div className="flex-1 overflow-hidden rounded-3xl bg-paper shadow-float">{right}</div>
    </div>
  );
}
