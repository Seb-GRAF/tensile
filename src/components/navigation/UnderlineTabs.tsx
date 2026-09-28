import { motion, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useLiquid, useSprings } from "../../springs";

export type UnderlineTabsProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  id?: string;
  className?: string;
};

/** The liquid underline under the current item of a row, between the `left` and `right` edges measured from the row. */
export function Underline({ left, right }: { left: number; right: number }) {
  const [l, r] = useLiquid(left, -right);
  const width = useTransform(() => -r.get() - l.get());
  return (
    <motion.span
      aria-hidden
      style={{ left: l, width }}
      className="pointer-events-none absolute bottom-1 h-0.5 rounded-full bg-ink"
    />
  );
}

export function UnderlineTabs({ options, value, onValueChange, label = "Sections", id, className = "" }: UnderlineTabsProps) {
  const { soft } = useSprings();
  const index = options.findIndex((option) => option.value === value);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [edges, setEdges] = useState<{ left: number; right: number }>();

  useLayoutEffect(() => {
    const tab = tabs.current[index]!;
    const measure = () => setEdges({ left: tab.offsetLeft + 12, right: tab.offsetLeft + tab.offsetWidth - 12 });
    measure();
    document.fonts.ready.then(measure);
  }, [index, options]);

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
    <div id={id} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={`inline-block max-w-full rounded-control bg-paper px-3 py-[3px] shadow-control ${className}`}>
      <div className="relative flex">
        {options.map((option, i) => (
          <motion.button
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
            initial={false}
            animate={{ color: i === index ? "var(--color-ink)" : "var(--color-muted)" }}
            transition={soft}
            className="flex h-8 min-w-0 items-center gap-1.5 rounded-control px-3 text-label font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            {option.icon}
            <span className="truncate">{option.label}</span>
          </motion.button>
        ))}
        {edges && <Underline {...edges} />}
      </div>
    </div>
  );
}
