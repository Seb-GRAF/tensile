import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { shape, soft, swap } from "../springs";
import { useWidth } from "../useWidth";

type Crumb = { label: string; icon?: React.ReactNode };

export type BreadcrumbsProps = {
  /** The trail from the root; the last item is the current page. */
  items: Crumb[];
  onNavigate: (item: Crumb) => void;
  label?: string;
  expandLabel?: string;
  /** Items shown before the "…" pill. */
  itemsBeforeCollapse?: number;
  /** Items shown after the "…" pill, the current page included. */
  itemsAfterCollapse?: number;
};

const separator = (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="mx-0.5 size-3.5 fill-none stroke-current text-muted/50"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function Breadcrumbs({
  items,
  onNavigate,
  label = "Breadcrumb",
  expandLabel = "Show full path",
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
}: BreadcrumbsProps) {
  const end = items.length - itemsAfterCollapse;
  const hidden = items.slice(itemsBeforeCollapse, end);
  const hiddenPath = hidden.map((item) => item.label).join("/");
  const [expandedPath, setExpandedPath] = useState<string>();
  const expanded = expandedPath === hiddenPath;
  const [width, measure] = useWidth();
  const firstHidden = useRef<HTMLButtonElement>(null);

  function expand() {
    flushSync(() => setExpandedPath(hiddenPath));
    firstHidden.current!.focus();
  }

  function crumb(item: Crumb, i: number) {
    if (i === items.length - 1) {
      return (
        <span aria-current="page" className="flex h-8 items-center gap-1.5 px-1.5 text-ink">
          {item.icon}
          {item.label}
        </span>
      );
    }
    return (
      <button
        ref={i === itemsBeforeCollapse ? firstHidden : undefined}
        type="button"
        onClick={() => onNavigate(item)}
        className="flex h-8 items-center gap-1.5 rounded-full px-1.5 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        {item.icon}
        {item.label}
      </button>
    );
  }

  const pill = (
    <motion.div
      initial={false}
      animate={{ width, backgroundColor: expanded ? "var(--color-paper)" : "var(--color-hover)" }}
      transition={{ width: shape, backgroundColor: soft }}
      className="grid h-8 items-center justify-items-start rounded-full [clip-path:inset(-4px)]"
    >
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.ol key="expanded" ref={measure} {...swap} className="col-start-1 row-start-1 flex">
            {hidden.map((item, j) => (
              <li key={j} className="flex items-center">
                {j > 0 && separator}
                {crumb(item, itemsBeforeCollapse + j)}
              </li>
            ))}
          </motion.ol>
        ) : (
          <motion.button
            key="collapsed"
            ref={measure}
            {...swap}
            type="button"
            aria-label={expandLabel}
            aria-expanded={false}
            onClick={expand}
            className="col-start-1 row-start-1 grid h-8 place-items-center rounded-full px-3 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round">
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <nav aria-label={label}>
      <ol className="flex w-fit items-center rounded-full bg-paper px-1.5 py-1 text-[13px] font-medium whitespace-nowrap text-muted shadow-float">
        {items.map((item, i) =>
          i > itemsBeforeCollapse && i < end ? null : (
            <li key={i} className="flex items-center">
              {i > 0 && separator}
              {i === itemsBeforeCollapse && hidden.length > 0 ? pill : crumb(item, i)}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
