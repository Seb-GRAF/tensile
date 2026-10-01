import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid } from "../../../springs";

export type SegmentedTabsProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  id?: string;
  className?: string;
};

export function SegmentedTabs({
  options,
  value: valueProp,
  defaultValue = options[0].value,
  onValueChange,
  label = "Range",
  id,
  className = "",
}: SegmentedTabsProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const index = options.findIndex((option) => option.value === value);
  const step = 100 / options.length;
  const [left, right] = useLiquid(index * step, (options.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round var(--tn-radius-control))`;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: options.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + options.length) % options.length;
    setValue(options[next].value);
    tabs.current[next]!.focus();
  }

  return (
    <div id={id} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={`tn:inline-block tn:max-w-full tn:rounded-control tn:bg-paper tn:p-[3px] tn:shadow-control ${className}`}>
      <div className="tn:relative tn:grid tn:auto-cols-fr tn:grid-flow-col">
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
            onClick={() => setValue(option.value)}
            className="tn:flex tn:h-8 tn:items-center tn:justify-center tn:gap-1.5 tn:rounded-control tn:px-4 tn:text-label tn:font-medium tn:text-muted tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
          >
            {option.icon}
            <span className="tn:truncate">{option.label}</span>
          </button>
        ))}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="tn:pointer-events-none tn:absolute tn:inset-y-0 tn:rounded-control tn:bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="tn:pointer-events-none tn:absolute tn:inset-0 tn:grid tn:auto-cols-fr tn:grid-flow-col tn:text-label tn:font-medium tn:text-paper"
        >
          {options.map((option) => (
            <span key={option.value} className="tn:flex tn:min-w-0 tn:items-center tn:justify-center tn:gap-1.5 tn:px-4">
              {option.icon}
              <span className="tn:truncate">{option.label}</span>
            </span>
          ))}
        </motion.span>
      </div>
    </div>
  );
}
