import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useLiquid, useSprings } from "../../springs";
import { useLinkClick } from "./Link";

export type SidebarNavProps = {
  items: { value: string; label: string; icon?: React.ReactNode; href?: string }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  collapsed?: boolean;
  leading?: React.ReactNode;
  className?: string;
};

const STEP = 40;
const moves: Record<string, number> = { ArrowUp: -1, ArrowDown: 1 };

export function SidebarNav({
  items,
  value,
  onValueChange,
  label = "Main",
  collapsed = false,
  leading,
  className = "",
}: SidebarNavProps) {
  const { swap } = useSprings();
  const linkClick = useLinkClick();
  const index = items.findIndex((item) => item.value === value);
  const [top, bottom] = useLiquid(index * STEP, (items.length - 1 - index) * STEP);
  const clip = useMotionTemplate`inset(${top}px 0 ${bottom}px 0 round var(--radius-control))`;
  const buttons = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    buttons.current[(i + move + items.length) % items.length]!.focus();
  }

  return (
    <nav aria-label={label} className={`flex flex-col gap-2 rounded-card bg-paper p-2 shadow-float ${className}`}>
      {leading}
      <ul role="list" className="relative grid gap-2">
        {items.map((item, i) => {
          const props = {
            ref: (element: HTMLButtonElement | HTMLAnchorElement | null) => {
              buttons.current[i] = element;
            },
            "aria-current": i === index ? "page" as const : undefined,
            "aria-label": item.label,
            onKeyDown: (event: React.KeyboardEvent) => onKeyDown(event, i),
            className: "flex h-8 w-full items-center gap-2.5 overflow-hidden rounded-control px-2 text-label font-medium text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus",
          };
          const content = (
            <>
              {item.icon && <span aria-hidden className="shrink-0">{item.icon}</span>}
              <motion.span initial={false} animate={collapsed ? swap.exit : swap.animate} className="truncate">
                {item.label}
              </motion.span>
            </>
          );
          return (
            <li key={item.value} className="min-w-0">
              {item.href ? (
                <a {...props} href={item.href} onClick={(event) => { onValueChange(item.value); linkClick(event); }}>
                  {content}
                </a>
              ) : (
                <button {...props} type="button" onClick={() => onValueChange(item.value)}>
                  {content}
                </button>
              )}
            </li>
          );
        })}
        <motion.li
          aria-hidden
          style={{ top, bottom }}
          className="pointer-events-none absolute inset-x-0 rounded-control bg-ink"
        />
        <motion.li
          aria-hidden
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid gap-2 text-label font-medium text-paper"
        >
          {items.map((item) => (
            <span key={item.value} className="flex h-8 items-center gap-2.5 overflow-hidden px-2">
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <motion.span initial={false} animate={collapsed ? swap.exit : swap.animate} className="truncate">
                {item.label}
              </motion.span>
            </span>
          ))}
        </motion.li>
      </ul>
    </nav>
  );
}
