import { motion } from "motion/react";
import { useId, useRef } from "react";
import { shape, swap } from "../springs";

export type AccordionProps = {
  items: { value: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string | null) => void;
};

export function Accordion({ items, value, onValueChange }: AccordionProps) {
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
    <div className="grid w-[360px] gap-2">
      {items.map((item, i) => {
        const open = item.value === value;
        return (
          <motion.div
            key={item.value}
            initial={false}
            animate={{ height: open ? "auto" : 44, borderRadius: open ? 20 : 22 }}
            transition={shape}
            className="overflow-hidden bg-paper shadow-float outline-offset-2 has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-ink"
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
              className="flex h-11 w-full items-center gap-2.5 px-4 text-sm font-medium text-ink outline-none"
            >
              {item.icon && <span className="text-muted">{item.icon}</span>}
              {item.label}
              <motion.svg
                viewBox="0 0 24 24"
                initial={false}
                animate={{ rotate: open ? 180 : 0 }}
                transition={shape}
                className="ml-auto size-4 shrink-0 fill-none stroke-muted"
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>
            <motion.div
              id={`${id}-${i}-panel`}
              role="region"
              aria-labelledby={`${id}-${i}`}
              inert={!open}
              initial={false}
              animate={open ? swap.animate : swap.exit}
              className="origin-top px-4 pb-4 text-[13px] leading-5 text-muted"
            >
              {item.content}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
