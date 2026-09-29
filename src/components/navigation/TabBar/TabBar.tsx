import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useLiquid } from "../../../springs";
import { useLinkClick } from "../Link/Link";

export type TabBarProps = {
  items: { value: string; label: string; icon: React.ReactNode; activeIcon: React.ReactNode; href?: string }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
};

const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function TabBar({ items, value, onValueChange, label = "Sections", className = "" }: TabBarProps) {
  const linkClick = useLinkClick();
  const index = items.findIndex((item) => item.value === value);
  const step = 100 / items.length;
  const [left, right] = useLiquid(index * step, (items.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round var(--radius-control))`;
  const links = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    links.current[(i + move + items.length) % items.length]!.focus();
  }

  return (
    <nav aria-label={label} className={`h-13 rounded-control bg-paper p-1 shadow-float ${className}`}>
      <div className="relative grid auto-cols-fr grid-flow-col">
        {items.map((item, i) => {
          const props = {
            ref: (el: HTMLAnchorElement | HTMLButtonElement | null) => { links.current[i] = el; },
            "aria-current": i === index ? "page" as const : undefined,
            onKeyDown: (event: React.KeyboardEvent) => onKeyDown(event, i),
            className: "flex h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-control px-2 text-caption font-medium text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus",
          };
          const content = (
            <>
              {item.icon}
              <span className="max-w-full truncate">{item.label}</span>
            </>
          );
          return item.href ? (
            <a key={item.value} {...props} href={item.href} onClick={linkClick}>{content}</a>
          ) : (
            <button key={item.value} {...props} type="button" onClick={() => onValueChange(item.value)}>{content}</button>
          );
        })}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="pointer-events-none absolute inset-y-0 rounded-control bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid auto-cols-fr grid-flow-col text-caption font-medium text-paper"
        >
          {items.map((item) => (
            <span key={item.value} className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2">
              {item.activeIcon}
              <span className="max-w-full truncate">{item.label}</span>
            </span>
          ))}
        </motion.span>
      </div>
    </nav>
  );
}
