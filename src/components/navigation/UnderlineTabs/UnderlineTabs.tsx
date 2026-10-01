import { motion, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid } from "../../../springs";

export type UnderlineTabsProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
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
      className="tn:pointer-events-none tn:absolute tn:bottom-1 tn:h-0.5 tn:rounded-full tn:bg-ink"
    />
  );
}

export function UnderlineTabs({
  options,
  value: valueProp,
  defaultValue = options[0].value,
  onValueChange,
  label = "Sections",
  id,
  className = "",
}: UnderlineTabsProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
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
    setValue(options[next].value);
    tabs.current[next]!.focus();
  }

  return (
    <div id={id} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={`tn:inline-block tn:max-w-full tn:rounded-control tn:bg-paper tn:px-3 tn:py-[3px] tn:shadow-control ${className}`}>
      <div className="tn:relative tn:flex">
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
            className={`tn:flex tn:h-8 tn:min-w-0 tn:items-center tn:gap-1.5 tn:rounded-control tn:px-3 tn:text-label tn:font-medium tn:outline-offset-2 tn:transition-colors tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] tn:hover:transition-none tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${i === index ? "tn:text-ink" : "tn:text-muted tn:hover:text-ink"}`}
          >
            {option.icon}
            <span className="tn:truncate">{option.label}</span>
          </button>
        ))}
        {edges && <Underline {...edges} />}
      </div>
    </div>
  );
}
