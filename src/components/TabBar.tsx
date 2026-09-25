import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { soft, swap, useLiquid } from "../springs";

export type TabBarProps = {
  items: { value: string; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
};

const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function TabBar({ items, value, onValueChange, label = "Sections" }: TabBarProps) {
  const index = items.findIndex((item) => item.value === value);
  const step = 100 / items.length;
  const [left, right] = useLiquid((index + 0.5) * step, (items.length - index - 0.5) * step);
  const indicatorLeft = useMotionTemplate`calc(${left}% - 28px)`;
  const indicatorRight = useMotionTemplate`calc(${right}% - 28px)`;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move) return;
    const next = (index + move + items.length) % items.length;
    onValueChange(items[next].value);
    tabs.current[next]!.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="relative grid auto-cols-fr grid-flow-col rounded-full bg-paper shadow-float"
    >
      <motion.span
        aria-hidden
        style={{ left: indicatorLeft, right: indicatorRight }}
        className="pointer-events-none absolute top-2 h-8 rounded-full bg-ink"
      />
      {items.map((item, i) => (
        <motion.button
          key={item.value}
          ref={(el) => {
            tabs.current[i] = el;
          }}
          type="button"
          role="tab"
          aria-selected={i === index}
          tabIndex={i === index ? 0 : -1}
          onClick={() => onValueChange(item.value)}
          initial={false}
          animate={{ color: i === index ? "var(--color-ink)" : "var(--color-muted)" }}
          transition={soft}
          className="group relative flex h-16 flex-col items-center gap-1 pt-2 text-[11px] leading-3.5 font-medium outline-none"
        >
          <span className="grid h-8 w-14 place-content-center place-items-center rounded-full outline-offset-2 group-focus-visible:outline-2 group-focus-visible:outline-ink">
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
          {item.label}
        </motion.button>
      ))}
    </div>
  );
}
