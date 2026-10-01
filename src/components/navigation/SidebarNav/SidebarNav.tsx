import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import { useLinkClick } from "../Link/Link";

type Item = { value: string; label: string; icon?: React.ReactNode; href?: string };

export type SidebarNavProps = {
  /** Destinations, or categories of them under a heading. */
  items: (Item | { label: string; items: Item[] })[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  collapsed?: boolean;
  leading?: React.ReactNode;
  /** Pinned to the bottom, e.g. the account. */
  trailing?: React.ReactNode;
  className?: string;
};

const STEP = 36;
const HEADING = 32;
const GAP = 20;
const moves: Record<string, number> = { ArrowUp: -1, ArrowDown: 1 };

function offsetOf(items: SidebarNavProps["items"], value: string) {
  let offset = 0;
  for (const [n, entry] of items.entries()) {
    if ("items" in entry) offset += (n > 0 ? GAP : 0) + HEADING;
    for (const item of "items" in entry ? entry.items : [entry]) {
      if (item.value === value) return offset;
      offset += STEP;
    }
  }
  return 0;
}

export function SidebarNav({
  items,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  label = "Main",
  collapsed = false,
  leading,
  trailing,
  className = "",
}: SidebarNavProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const { shape, soft, swap } = useSprings();
  const linkClick = useLinkClick();
  const id = useId();
  const flat = items.flatMap((entry) => ("items" in entry ? entry.items : [entry]));
  const index = flat.findIndex((item) => item.value === value);
  const offset = offsetOf(items, value);
  const top = useMotionValue(offset);
  const clip = useMotionTemplate`inset(${top}px 0 calc(100% - ${top}px - 32px) 0 round var(--tn-radius-control))`;
  const buttons = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const previous = useRef(index);

  useEffect(() => {
    if (previous.current === -1) top.jump(offset);
    else if (index !== -1) animate(top, offset, shape);
    previous.current = index;
  }, [index, offset, top]);

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    buttons.current[(i + move + flat.length) % flat.length]!.focus();
  }

  function row(item: Item) {
    const i = flat.indexOf(item);
    const props = {
      ref: (element: HTMLButtonElement | HTMLAnchorElement | null) => {
        buttons.current[i] = element;
      },
      "aria-current": i === index ? "page" as const : undefined,
      "aria-label": item.label,
      onKeyDown: (event: React.KeyboardEvent) => onKeyDown(event, i),
      className: `tn:flex tn:h-8 tn:w-full tn:items-center tn:gap-2.5 tn:overflow-hidden tn:rounded-control tn:px-2 tn:text-label tn:font-medium tn:text-muted tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${i === index ? "" : "tn:hover:bg-hover"}`,
    };
    const content = (
      <>
        {item.icon && <span aria-hidden className="tn:shrink-0">{item.icon}</span>}
        <motion.span initial={false} animate={collapsed ? swap.exit : swap.animate} className="tn:truncate">
          {item.label}
        </motion.span>
      </>
    );
    return (
      <li key={item.value} className="tn:min-w-0">
        {item.href ? (
          <a {...props} href={item.href} onClick={(event) => { setValue(item.value); linkClick(event); }}>
            {content}
          </a>
        ) : (
          <button {...props} type="button" onClick={() => setValue(item.value)}>
            {content}
          </button>
        )}
      </li>
    );
  }

  function copy(item: Item) {
    return (
      <span key={item.value} className="tn:flex tn:h-8 tn:items-center tn:gap-2.5 tn:overflow-hidden tn:px-2">
        {item.icon && <span className="tn:shrink-0">{item.icon}</span>}
        <motion.span initial={false} animate={collapsed ? swap.exit : swap.animate} className="tn:truncate">
          {item.label}
        </motion.span>
      </span>
    );
  }

  return (
    <nav aria-label={label} className={`tn:flex tn:flex-col tn:gap-2 ${className}`}>
      {leading}
      <ul role="list" className="tn:relative tn:grid tn:gap-1">
        {items.map((entry, n) =>
          "items" in entry ? (
            <li key={entry.label} className="tn:min-w-0 tn:not-first:mt-5">
              <p id={`${id}-${n}`} className="tn:mb-3 tn:truncate tn:px-2 tn:text-label tn:font-medium">{entry.label}</p>
              <ul role="list" aria-labelledby={`${id}-${n}`} className="tn:grid tn:gap-1">
                {entry.items.map(row)}
              </ul>
            </li>
          ) : row(entry),
        )}
        <motion.li
          aria-hidden
          initial={false}
          animate={{ opacity: index === -1 ? 0 : 1 }}
          transition={soft}
          style={{ top }}
          className="tn:pointer-events-none tn:absolute tn:inset-x-0 tn:h-8 tn:rounded-control tn:bg-ink"
        />
        <motion.li
          aria-hidden
          initial={false}
          animate={{ opacity: index === -1 ? 0 : 1 }}
          transition={soft}
          style={{ clipPath: clip }}
          className="tn:pointer-events-none tn:absolute tn:inset-0 tn:grid tn:gap-1 tn:text-label tn:font-medium tn:text-paper"
        >
          {items.map((entry) =>
            "items" in entry ? (
              <span key={entry.label} className="tn:not-first:mt-5">
                <span className="tn:mb-3 tn:block tn:truncate tn:px-2">{entry.label}</span>
                <span className="tn:grid tn:gap-1">{entry.items.map(copy)}</span>
              </span>
            ) : copy(entry),
          )}
        </motion.li>
      </ul>
      {trailing && <div className="tn:mt-auto tn:flex tn:flex-col tn:gap-2">{trailing}</div>}
    </nav>
  );
}
