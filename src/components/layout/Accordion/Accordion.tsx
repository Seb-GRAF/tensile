import { motion } from "motion/react";
import { useId, useRef } from "react";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";

export type AccordionProps = {
  items: { value: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  className?: string;
};

export function Accordion({ items, value, onValueChange, className = "" }: AccordionProps) {
  const { shape, swap } = useSprings();
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
    <div className={`grid w-full gap-2 ${className}`}>
      {items.map((item, i) => {
        const open = item.value === value;
        return (
          <motion.div
            key={item.value}
            initial={false}
            animate={{ height: open ? "auto" : 44, borderRadius: open ? "var(--radius-overlay)" : "var(--radius-control)" }}
            transition={shape}
            className="overflow-hidden bg-paper shadow-float surface outline-offset-2 has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-focus"
          >
            <button
              ref={(el) => {
                headers.current[i] = el;
              }}
              id={`${id}-${i}`}
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-${i}-panel`}
              onClick={() => onValueChange(open ? null : item.value)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className="flex h-11 w-full items-center gap-2.5 px-4 text-sm font-medium text-ink outline-none hover:bg-hover"
            >
              {item.icon && <span className="text-muted">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
              <motion.span initial={false} animate={{ rotate: open ? 180 : 0 }} transition={shape} className="ml-auto shrink-0 text-muted">
                <Icon size={16}><path d="m6 9 6 6 6-6" /></Icon>
              </motion.span>
            </button>
            <motion.div
              id={`${id}-${i}-panel`}
              role="region"
              aria-labelledby={`${id}-${i}`}
              inert={!open}
              initial={false}
              animate={open ? swap.animate : swap.exit}
              className="origin-top px-4 pb-4 text-label text-muted"
            >
              {item.content}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
