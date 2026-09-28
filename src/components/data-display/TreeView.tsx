import { AnimatePresence, motion, useIsPresent, useMotionTemplate, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { icons } from "../../icons";
import { useTypeahead } from "../../list";
import { useLiquid, useSprings } from "../../springs";
import { Icon } from "./Icon";

type Item = { value: string; label: string; icon?: React.ReactNode; children?: Item[] };

export type TreeViewProps = {
  items: Item[];
  value: string | null;
  onValueChange: (value: string) => void;
  /** Values of the open parents. */
  expanded: string[];
  onExpandedChange: (expanded: string[]) => void;
  label?: string;
  className?: string;
};

type Row = Item & { level: number; parent?: string; position: number; setSize: number };

const STEP = 36;

function visibleRows(items: Item[], expanded: string[], level = 1, parent?: string): Row[] {
  return items.flatMap((item, i) => [
    { ...item, level, parent, position: i + 1, setSize: items.length },
    ...(item.children && expanded.includes(item.value) ? visibleRows(item.children, expanded, level + 1, item.value) : []),
  ]);
}

function contains(item: Item, value: string | null): boolean {
  return item.value === value || !!item.children?.some((child) => contains(child, value));
}

function TreeRow({ children }: { children: React.ReactNode }) {
  const { shape, swap } = useSprings();
  const present = useIsPresent();
  return (
    <motion.div
      aria-hidden={!present}
      inert={!present}
      initial={{ height: 0 }}
      animate={{ height: STEP }}
      exit={{ height: 0 }}
      transition={shape}
      className="[clip-path:inset(-4px)]"
    >
      <motion.div {...swap} className="py-0.5">
        {children}
      </motion.div>
    </motion.div>
  );
}

function Selection({ index, children }: { index: number; children: React.ReactNode }) {
  const { soft } = useSprings();
  const [top, bottom] = useLiquid(index * STEP + 2, 2 - (index + 1) * STEP);
  const height = useTransform(() => -bottom.get() - top.get());
  const clip = useMotionTemplate`inset(${top}px 0 calc(100% + ${bottom}px) 0 round var(--radius-control))`;
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={soft}
      className="pointer-events-none absolute inset-0"
    >
      <motion.div style={{ top, height }} className="absolute inset-x-0 rounded-control bg-ink" />
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 text-label font-medium text-paper">
        {children}
      </motion.div>
    </motion.div>
  );
}

export function TreeView({ items, value, onValueChange, expanded, onExpandedChange, label = "Tree", className = "" }: TreeViewProps) {
  const { shape } = useSprings();
  const [focused, setFocused] = useState<string>();
  const rowElements = useRef<Record<string, HTMLDivElement | null>>({});
  const rows = visibleRows(items, expanded);
  const selected = rows.findIndex((row) => (expanded.includes(row.value) ? row.value === value : contains(row, value)));
  const focusedIndex = rows.findIndex((row) => row.value === focused);
  const current = focusedIndex === -1 ? Math.max(selected, 0) : focusedIndex;
  const onTypeahead = useTypeahead(rows, current, (i) => focusRow(rows[i].value));

  function focusRow(target: string) {
    rowElements.current[target]!.focus();
  }

  function toggle(target: string) {
    onExpandedChange(expanded.includes(target) ? expanded.filter((other) => other !== target) : [...expanded, target]);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const row = rows[current];
    const open = expanded.includes(row.value);
    const targets: Record<string, number> = { ArrowUp: current - 1, ArrowDown: current + 1, Home: 0, End: rows.length - 1 };
    const target = targets[event.key];
    if (target !== undefined) {
      if (rows[target]) focusRow(rows[target].value);
    } else if (event.key === "ArrowRight") {
      if (open) focusRow(rows[current + 1].value);
      else if (row.children) toggle(row.value);
    } else if (event.key === "ArrowLeft") {
      if (open) toggle(row.value);
      else if (row.parent) focusRow(row.parent);
    } else if (event.key === "Enter" || event.key === " ") {
      onValueChange(row.value);
    } else {
      onTypeahead(event);
      return;
    }
    event.preventDefault();
  }

  function rowContent(row: Row, muted: string) {
    return (
      <span style={{ paddingLeft: 4 + (row.level - 1) * 24 }} className="flex h-8 items-center pr-3">
        {row.children ? (
          <span
            onClick={(event) => {
              event.stopPropagation();
              toggle(row.value);
            }}
            className={`grid h-8 w-6 shrink-0 place-items-center ${muted}`}
          >
            <motion.span initial={false} animate={{ rotate: expanded.includes(row.value) ? 90 : 0 }} transition={shape}>
              <Icon>{icons.chevronRight}</Icon>
            </motion.span>
          </span>
        ) : (
          <span className="w-6 shrink-0" />
        )}
        {row.icon && <span className={`mr-2 shrink-0 ${muted}`}>{row.icon}</span>}
        <span className="truncate">{row.label}</span>
      </span>
    );
  }

  return (
    <div role="tree" aria-label={label} onKeyDown={onKeyDown} className={className}>
      <div className="relative">
        <AnimatePresence initial={false}>
          {rows.map((row, i) => (
            <TreeRow key={row.value}>
              <div
                ref={(element) => {
                  rowElements.current[row.value] = element;
                }}
                role="treeitem"
                aria-level={row.level}
                aria-setsize={row.setSize}
                aria-posinset={row.position}
                aria-expanded={row.children ? expanded.includes(row.value) : undefined}
                aria-selected={row.value === value}
                tabIndex={i === current ? 0 : -1}
                onFocus={() => setFocused(row.value)}
                onClick={() => onValueChange(row.value)}
                className="cursor-pointer rounded-control text-label font-medium text-ink outline-offset-2 hover:bg-hover focus-visible:outline-2 focus-visible:outline-focus"
              >
                {rowContent(row, "text-muted")}
              </div>
            </TreeRow>
          ))}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {selected !== -1 && (
            <Selection key="selection" index={selected}>
              <AnimatePresence initial={false}>
                {rows.map((row) => (
                  <TreeRow key={row.value}>{rowContent(row, "")}</TreeRow>
                ))}
              </AnimatePresence>
            </Selection>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
