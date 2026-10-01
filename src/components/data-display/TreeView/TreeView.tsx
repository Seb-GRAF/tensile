import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { useTypeahead } from "../../../list";
import { useSprings } from "../../../springs";
import { Icon } from "../Icon/Icon";

type Item = { value: string; label: string; icon?: React.ReactNode; children?: Item[] };

export type TreeViewProps = {
  items: Item[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  /** Values of the open parents. */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (expanded: string[]) => void;
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
  const { shape, soft, swap } = useSprings();
  const present = useIsPresent();
  return (
    <motion.div
      aria-hidden={present ? undefined : true}
      inert={!present}
      initial={{ height: 0 }}
      animate={{ height: STEP }}
      exit={{ height: 0 }}
      transition={shape}
      className="tn:[clip-path:inset(-4px)]"
    >
      <motion.div {...swap} animate={{ ...swap.animate, transition: soft }} className="tn:py-0.5">
        {children}
      </motion.div>
    </motion.div>
  );
}

function Selection({ index }: { index: number }) {
  const { shape, soft } = useSprings();
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, top: index * STEP + 2 }}
      animate={{ opacity: 1, top: index * STEP + 2 }}
      exit={{ opacity: 0 }}
      transition={{ ...soft, top: shape }}
      className="tn:pointer-events-none tn:absolute tn:inset-x-0 tn:h-8 tn:rounded-control tn:bg-hover"
    >
      <span className="tn:absolute tn:top-2 tn:left-1 tn:h-4 tn:w-1 tn:rounded-full tn:bg-ink" />
    </motion.div>
  );
}

export function TreeView({
  items,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  label = "Tree",
  className = "",
}: TreeViewProps) {
  const { shape } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const [expanded, setExpanded] = useControllable(expandedProp, defaultExpanded, onExpandedChange);
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
    setExpanded(expanded.includes(target) ? expanded.filter((other) => other !== target) : [...expanded, target]);
  }

  function activate(row: Row) {
    setValue(row.value);
    if (row.children) toggle(row.value);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const row = rows[current];
    const open = expanded.includes(row.value);
    const targets: Record<string, number> = { ArrowUp: current - 1, ArrowDown: current + 1, Home: 0, End: rows.length - 1 };
    const target = targets[event.key];
    if (target !== undefined) {
      if (rows[target]) focusRow(rows[target].value);
    } else if (event.key === "ArrowRight") {
      if (!open && row.children) toggle(row.value);
      else if (open && row.children?.[0]) focusRow(row.children[0].value);
    } else if (event.key === "ArrowLeft") {
      if (open) toggle(row.value);
      else if (row.parent) focusRow(row.parent);
    } else if (event.key === "Enter") {
      activate(row);
    } else if (event.key === " ") {
      setValue(row.value);
    } else {
      onTypeahead(event);
      return;
    }
    event.preventDefault();
  }

  function rowContent(row: Row) {
    return (
      <span style={{ paddingLeft: 12 + (row.level - 1) * 24 }} className="tn:flex tn:h-8 tn:items-center tn:pr-3">
        {row.children ? (
          <span
            onClick={(event) => {
              event.stopPropagation();
              toggle(row.value);
            }}
            className="tn:group tn:grid tn:h-8 tn:w-6 tn:shrink-0 tn:place-items-center tn:text-muted tn:hover:text-ink"
          >
            <span className="tn:grid tn:size-6 tn:place-items-center tn:rounded-full tn:group-hover:bg-paper">
              <motion.span initial={false} animate={{ rotate: expanded.includes(row.value) ? 90 : 0 }} transition={shape}>
                <Icon name="chevronRight" />
              </motion.span>
            </span>
          </span>
        ) : (
          <span className="tn:w-6 tn:shrink-0" />
        )}
        {row.icon && <span className="tn:mr-2 tn:shrink-0 tn:text-muted">{row.icon}</span>}
        <span className="tn:truncate">{row.label}</span>
      </span>
    );
  }

  return (
    <div role="tree" aria-label={label} onKeyDown={onKeyDown} className={className}>
      <div className="tn:relative">
        <AnimatePresence initial={false}>{selected !== -1 && <Selection key="selection" index={selected} />}</AnimatePresence>
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
                onClick={() => activate(row)}
                className={`tn:cursor-pointer tn:rounded-control tn:text-label tn:font-medium tn:text-ink tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${i === selected ? "" : "tn:hover:bg-hover"}`}
              >
                {rowContent(row)}
              </div>
            </TreeRow>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
