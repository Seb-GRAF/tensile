import { motion } from "motion/react";
import { useId, useRef } from "react";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";

export type AccordionProps = {
  items: { value: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[];
  className?: string;
} & (
  | {
      /** "single" opens one item at a time; "multiple" lets several stay open. */
      type?: "single";
      value?: string | null;
      defaultValue?: string | null;
      onValueChange?: (value: string | null) => void;
    }
  | {
      type: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    }
);

export function Accordion({ items, type = "single", value, defaultValue = type === "multiple" ? [] : null, onValueChange, className = "" }: AccordionProps) {
  const { shape, swap } = useSprings();
  const [current, setCurrent] = useControllable<string | null | string[]>(value, defaultValue, onValueChange as (value: string | null | string[]) => void);
  const id = useId();
  const headers = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const targets: Record<string, number> = { ArrowUp: i - 1, ArrowDown: i + 1, Home: 0, End: items.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    headers.current[(target + items.length) % items.length]!.focus();
  }

  return (
    <div className={`tn:grid tn:w-full tn:gap-2 ${className}`}>
      {items.map((item, i) => {
        const open = Array.isArray(current) ? current.includes(item.value) : item.value === current;
        return (
          <motion.div
            key={item.value}
            initial={false}
            animate={{ height: open ? "auto" : 44, borderRadius: open ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)" }}
            transition={shape}
            className="tn:overflow-hidden tn:bg-paper tn:shadow-float tn:surface tn:outline-offset-2 tn:has-[>button:focus-visible]:outline-2 tn:has-[>button:focus-visible]:outline-focus"
          >
            <button
              ref={(el) => {
                headers.current[i] = el;
              }}
              id={`${id}-${i}`}
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-${i}-panel`}
              onClick={() => {
                if (Array.isArray(current)) setCurrent(open ? current.filter((v) => v !== item.value) : [...current, item.value]);
                else setCurrent(open ? null : item.value);
              }}
              onKeyDown={(event) => onKeyDown(event, i)}
              className="tn:flex tn:h-11 tn:w-full tn:items-center tn:gap-2.5 tn:px-4 tn:text-sm tn:font-medium tn:text-ink tn:outline-none tn:hover:bg-hover"
            >
              {item.icon && <span className="tn:text-muted">{item.icon}</span>}
              <span className="tn:truncate">{item.label}</span>
              <motion.span initial={false} animate={{ rotate: open ? 180 : 0 }} transition={shape} className="tn:ml-auto tn:shrink-0 tn:text-muted">
                <Icon name="chevronDown" size={16} />
              </motion.span>
            </button>
            <motion.div
              id={`${id}-${i}-panel`}
              role="region"
              aria-labelledby={`${id}-${i}`}
              inert={!open}
              initial={false}
              animate={open ? swap.animate : swap.exit}
              className="tn:origin-top tn:px-4 tn:pb-4 tn:text-label tn:text-muted"
            >
              {item.content}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
