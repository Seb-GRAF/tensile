import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useLiquid, useSprings } from "../../springs";
import { useLinkClick } from "./Link";

export type TabBarProps = {
  items: { value: string; label: string; icon: React.ReactNode; activeIcon: React.ReactNode; href?: string }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
};

const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function TabBar({ items, value, onValueChange, label = "Sections", className = "" }: TabBarProps) {
  const { soft, swap } = useSprings();
  const linkClick = useLinkClick();
  const index = items.findIndex((item) => item.value === value);
  const step = 100 / items.length;
  const [left, right] = useLiquid((index + 0.5) * step, (items.length - index - 0.5) * step);
  const indicatorLeft = useMotionTemplate`calc(${left}% - 28px)`;
  const indicatorRight = useMotionTemplate`calc(${right}% - 28px)`;
  const links = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    links.current[(i + move + items.length) % items.length]!.focus();
  }

  return (
    <nav
      aria-label={label}
      className={`relative grid auto-cols-fr grid-flow-col rounded-control bg-paper shadow-float ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ left: indicatorLeft, right: indicatorRight }}
        className="pointer-events-none absolute top-2 h-8 rounded-control bg-ink"
      />
      {items.map((item, i) => {
        const props = {
          ref: (el: HTMLAnchorElement | HTMLButtonElement | null) => { links.current[i] = el; },
          "aria-current": i === index ? "page" as const : undefined,
          onKeyDown: (event: React.KeyboardEvent) => onKeyDown(event, i),
          initial: false as const,
          animate: { color: i === index ? "var(--color-ink)" : "var(--color-muted)" },
          transition: soft,
          className: "group relative flex h-16 min-w-0 flex-col items-center gap-1 pt-2 text-caption font-medium outline-none",
        };
        const content = (
          <>
            <span aria-hidden className="grid h-8 w-14 place-content-center place-items-center rounded-control outline-offset-2 group-focus-visible:outline-2 group-focus-visible:outline-focus">
              <AnimatePresence initial={false}>
                {i === index ? (
                  <motion.span key="active" {...swap} className="col-start-1 row-start-1 text-paper">
                    {item.activeIcon}
                  </motion.span>
                ) : (
                  <motion.span key="idle" {...swap} className="col-start-1 row-start-1">
                    {item.icon}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="max-w-full truncate">{item.label}</span>
          </>
        );
        return item.href ? (
          <motion.a key={item.value} {...props} href={item.href} onClick={linkClick}>{content}</motion.a>
        ) : (
          <motion.button key={item.value} {...props} type="button" onClick={() => onValueChange(item.value)}>{content}</motion.button>
        );
      })}
    </nav>
  );
}
