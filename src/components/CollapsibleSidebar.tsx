import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { shape, swap, useLiquid } from "../springs";

export type CollapsibleSidebarProps = {
  items: { value: string; label: string; icon: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  label?: string;
  expandLabel?: string;
  collapseLabel?: string;
};

const STEP = 40;
const moves: Record<string, number> = { ArrowUp: -1, ArrowDown: 1 };

export function CollapsibleSidebar({
  items,
  value,
  onValueChange,
  expanded,
  onExpandedChange,
  label = "Main",
  expandLabel = "Expand sidebar",
  collapseLabel = "Collapse sidebar",
}: CollapsibleSidebarProps) {
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
    <motion.nav
      aria-label={label}
      initial={false}
      animate={{ width: expanded ? 208 : 48 }}
      transition={expanded ? shape : { ...shape, delay: 0.1 }}
      className="flex flex-col gap-2 overflow-clip rounded-3xl bg-paper p-2 shadow-float"
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-label={expanded ? collapseLabel : expandLabel}
        onClick={() => onExpandedChange(!expanded)}
        className="grid size-8 place-items-center rounded-full text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </button>
      <ul className="relative grid grid-cols-1 gap-2">
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
              className="flex h-8 w-full items-center gap-2.5 rounded-full px-2 text-[13px] font-medium whitespace-nowrap text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
            >
              <span className="shrink-0">{item.icon}</span>
              <motion.span initial={false} animate={expanded ? swap.animate : swap.exit}>
                {item.label}
              </motion.span>
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
          className="pointer-events-none absolute inset-0 grid gap-2 text-[13px] font-medium whitespace-nowrap text-paper"
        >
          {items.map((item) => (
            <span key={item.value} className="flex h-8 items-center gap-2.5 px-2">
              {item.icon}
              <motion.span initial={false} animate={expanded ? swap.animate : swap.exit}>
                {item.label}
              </motion.span>
            </span>
          ))}
        </motion.li>
      </ul>
    </motion.nav>
  );
}
