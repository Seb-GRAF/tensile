import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { dragHandlers, rubber } from "../../../drag";
import { useSprings } from "../../../springs";
import { Card } from "../Card/Card";

export type SplitPaneProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Where the divider sits, as a fraction of the width from the left: 0..1. */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
};

const GAP = 16;

export function SplitPane({ left, right, value: valueProp, defaultValue = 0.5, onValueChange, min = 0.2, max = 0.8, label = "Resize panes", className = "" }: SplitPaneProps) {
  const { shape, snap } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
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
    setValue(Math.min(max, Math.max(min, px / box.width)));
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
    setValue(Math.min(max, Math.max(min, target)));
  }

  return (
    <div ref={root} className={`tn:flex tn:size-full ${className}`}>
      <motion.div style={{ width }} className="tn:grid">
        <Card className="tn:overflow-hidden">{left}</Card>
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
        className="tn:group tn:flex tn:w-4 tn:cursor-col-resize tn:touch-none tn:items-center tn:justify-center tn:outline-none"
      >
        <motion.div
          initial={false}
          animate={held ? { width: 6, height: 64 } : { width: 4, height: 32 }}
          transition={shape}
          className={`tn:rounded-full tn:outline-offset-2 tn:transition-colors tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] tn:group-hover:transition-none tn:group-focus-visible:outline-2 tn:group-focus-visible:outline-focus ${held ? "tn:bg-ink" : "tn:bg-muted tn:group-hover:bg-ink"}`}
        />
      </div>
      <Card className="tn:flex-1 tn:overflow-hidden">{right}</Card>
    </div>
  );
}
