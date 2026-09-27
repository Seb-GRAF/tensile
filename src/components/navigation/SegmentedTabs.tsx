import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useLiquid } from "../../springs";

export type SegmentedTabsProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  id?: string;
  className?: string;
};

export function SegmentedTabs({ options, value, onValueChange, label = "Range", id, className = "" }: SegmentedTabsProps) {
  const index = options.findIndex((option) => option.value === value);
  const step = 100 / options.length;
  const [left, right] = useLiquid(index * step, (options.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round var(--radius-control))`;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: options.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + options.length) % options.length;
    onValueChange(options[next].value);
    tabs.current[next]!.focus();
  }

  return (
    <div id={id} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={`inline-block max-w-full rounded-control bg-paper p-[3px] shadow-float ${className}`}>
      <div className="relative grid auto-cols-fr grid-flow-col">
        {options.map((option, i) => (
          <button
            key={option.value}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={id ? `${id}-${i}` : undefined}
            aria-controls={id ? `${id}-${i}-panel` : undefined}
            aria-selected={i === index}
            tabIndex={i === index ? 0 : -1}
            onClick={() => onValueChange(option.value)}
            className="flex h-8 items-center justify-center gap-1.5 rounded-control px-4 text-label font-medium text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            {option.icon}
            <span className="truncate">{option.label}</span>
          </button>
        ))}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="pointer-events-none absolute inset-y-0 rounded-control bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid auto-cols-fr grid-flow-col text-label font-medium text-paper"
        >
          {options.map((option) => (
            <span key={option.value} className="flex min-w-0 items-center justify-center gap-1.5 px-4">
              {option.icon}
              <span className="truncate">{option.label}</span>
            </span>
          ))}
        </motion.span>
      </div>
    </div>
  );
}
