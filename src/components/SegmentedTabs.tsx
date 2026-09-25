import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useLiquid } from "../springs";

type Props = {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
};

const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function SegmentedTabs({ options, value, onValueChange, label }: Props) {
  const index = options.indexOf(value);
  const step = 100 / options.length;
  const [left, right] = useLiquid(index * step, (options.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round 999px)`;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move) return;
    const next = (index + move + options.length) % options.length;
    onValueChange(options[next]);
    tabs.current[next]!.focus();
  }

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="rounded-full bg-paper p-[3px] shadow-float">
      <div className="relative grid auto-cols-[80px] grid-flow-col">
        {options.map((option, i) => (
          <button
            key={option}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === index}
            tabIndex={i === index ? 0 : -1}
            onClick={() => onValueChange(option)}
            className="h-8 rounded-full text-[13px] font-medium text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            {option}
          </button>
        ))}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="pointer-events-none absolute inset-y-0 rounded-full bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid auto-cols-[80px] grid-flow-col text-[13px] font-medium text-paper"
        >
          {options.map((option) => (
            <span key={option} className="grid place-items-center">
              {option}
            </span>
          ))}
        </motion.span>
      </div>
    </div>
  );
}
