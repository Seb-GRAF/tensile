import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { useSprings } from "../../../springs";
import { useLinkClick } from "../Link/Link";

type Item = { value: string; label: string; icon?: React.ReactNode; href?: string };

export type SidebarNavProps = {
  /** Destinations, or categories of them under a heading. */
  items: (Item | { label: string; items: Item[] })[];
  value: string;
  onValueChange: (value: string) => void;
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
  value,
  onValueChange,
  label = "Main",
  collapsed = false,
  leading,
  trailing,
  className = "",
}: SidebarNavProps) {
  const { shape, soft, swap } = useSprings();
  const linkClick = useLinkClick();
  const id = useId();
  const flat = items.flatMap((entry) => ("items" in entry ? entry.items : [entry]));
  const index = flat.findIndex((item) => item.value === value);
  const offset = offsetOf(items, value);
  const top = useMotionValue(offset);
  const clip = useMotionTemplate`inset(${top}px 0 calc(100% - ${top}px - 32px) 0 round var(--radius-control))`;
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
      className: `flex h-8 w-full items-center gap-2.5 overflow-hidden rounded-control px-2 text-label font-medium text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${i === index ? "" : "hover:bg-hover"}`,
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
  }

  function copy(item: Item) {
    return (
      <span key={item.value} className="flex h-8 items-center gap-2.5 overflow-hidden px-2">
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <motion.span initial={false} animate={collapsed ? swap.exit : swap.animate} className="truncate">
          {item.label}
        </motion.span>
      </span>
    );
  }

  return (
    <nav aria-label={label} className={`flex flex-col gap-2 ${className}`}>
      {leading}
      <ul role="list" className="relative grid gap-1">
        {items.map((entry, n) =>
          "items" in entry ? (
            <li key={entry.label} className="min-w-0 not-first:mt-5">
              <p id={`${id}-${n}`} className="mb-3 truncate px-2 text-label font-medium">{entry.label}</p>
              <ul role="list" aria-labelledby={`${id}-${n}`} className="grid gap-1">
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
          className="pointer-events-none absolute inset-x-0 h-8 rounded-control bg-ink"
        />
        <motion.li
          aria-hidden
          initial={false}
          animate={{ opacity: index === -1 ? 0 : 1 }}
          transition={soft}
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid gap-1 text-label font-medium text-paper"
        >
          {items.map((entry) =>
            "items" in entry ? (
              <span key={entry.label} className="not-first:mt-5">
                <span className="mb-3 block truncate px-2">{entry.label}</span>
                <span className="grid gap-1">{entry.items.map(copy)}</span>
              </span>
            ) : copy(entry),
          )}
        </motion.li>
      </ul>
      {trailing && <div className="mt-auto flex flex-col gap-2">{trailing}</div>}
    </nav>
  );
}
