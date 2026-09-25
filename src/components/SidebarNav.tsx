import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useLiquid } from "../springs";

export type SidebarNavProps = {
  items: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
};

const STEP = 40;
const moves: Record<string, number> = { ArrowUp: -1, ArrowDown: 1 };

export function SidebarNav({ items, value, onValueChange, label = "Main" }: SidebarNavProps) {
  const index = items.findIndex((item) => item.value === value);
  const [top, bottom] = useLiquid(index * STEP, (items.length - 1 - index) * STEP);
  const clip = useMotionTemplate`inset(${top}px 0 ${bottom}px 0 round 16px)`;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    buttons.current[(i + move + items.length) % items.length]!.focus();
  }

  return (
    <nav aria-label={label} className="rounded-3xl bg-paper p-2 shadow-float">
      <ul className="relative grid gap-2">
        {items.map((item, i) => (
          <li key={item.value}>
            <button
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              aria-current={i === index ? "page" : undefined}
              onClick={() => onValueChange(item.value)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className="flex h-8 w-full items-center gap-2.5 rounded-full px-3 text-[13px] font-medium text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
        <motion.li
          aria-hidden
          style={{ top, bottom }}
          className="pointer-events-none absolute inset-x-0 rounded-2xl bg-ink"
        />
        <motion.li
          aria-hidden
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid gap-2 text-[13px] font-medium text-paper"
        >
          {items.map((item) => (
            <span key={item.value} className="flex h-8 items-center gap-2.5 px-3">
              {item.icon}
              {item.label}
            </span>
          ))}
        </motion.li>
      </ul>
    </nav>
  );
}
