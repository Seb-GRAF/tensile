import { motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid } from "../../../springs";
import { useLinkClick } from "../Link/Link";

export type TabBarProps = {
  items: { value: string; label: string; icon: React.ReactNode; activeIcon: React.ReactNode; href?: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
};

const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function TabBar({
  items,
  value: valueProp,
  defaultValue = items[0].value,
  onValueChange,
  label = "Sections",
  className = "",
}: TabBarProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const linkClick = useLinkClick();
  const index = items.findIndex((item) => item.value === value);
  const step = 100 / items.length;
  const [left, right] = useLiquid(index * step, (items.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round var(--tn-radius-control))`;
  const links = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    links.current[(i + move + items.length) % items.length]!.focus();
  }

  return (
    <nav aria-label={label} className={`tn:h-13 tn:rounded-control tn:bg-paper tn:p-1 tn:shadow-float ${className}`}>
      <div className="tn:relative tn:grid tn:auto-cols-fr tn:grid-flow-col">
        {items.map((item, i) => {
          const props = {
            ref: (el: HTMLAnchorElement | HTMLButtonElement | null) => { links.current[i] = el; },
            "aria-current": i === index ? "page" as const : undefined,
            onKeyDown: (event: React.KeyboardEvent) => onKeyDown(event, i),
            className: "tn:flex tn:h-11 tn:min-w-0 tn:flex-col tn:items-center tn:justify-center tn:gap-0.5 tn:rounded-control tn:px-2 tn:text-caption tn:font-medium tn:text-muted tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus",
          };
          const content = (
            <>
              {item.icon}
              <span className="tn:max-w-full tn:truncate">{item.label}</span>
            </>
          );
          return item.href ? (
            <a key={item.value} {...props} href={item.href} onClick={linkClick}>{content}</a>
          ) : (
            <button key={item.value} {...props} type="button" onClick={() => setValue(item.value)}>{content}</button>
          );
        })}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="tn:pointer-events-none tn:absolute tn:inset-y-0 tn:rounded-control tn:bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="tn:pointer-events-none tn:absolute tn:inset-0 tn:grid tn:auto-cols-fr tn:grid-flow-col tn:text-caption tn:font-medium tn:text-paper"
        >
          {items.map((item) => (
            <span key={item.value} className="tn:flex tn:min-w-0 tn:flex-col tn:items-center tn:justify-center tn:gap-0.5 tn:px-2">
              {item.activeIcon}
              <span className="tn:max-w-full tn:truncate">{item.label}</span>
            </span>
          ))}
        </motion.span>
      </div>
    </nav>
  );
}
