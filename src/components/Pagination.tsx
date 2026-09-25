import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { soft, swap, useLiquid } from "../springs";

export type PaginationProps = {
  /** Number of pages. */
  count: number;
  /** Current page, from 1 to `count`. */
  value: number;
  onValueChange: (value: number) => void;
  /** Slots for pages and ellipses, at least 5. */
  slots?: number;
  formatPage?: (page: number) => string;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: (page: number) => string;
};

function slotItems(count: number, page: number, slots: number): (number | "gap")[] {
  if (count <= slots) return Array.from({ length: count }, (_, i) => i + 1);
  const middle = slots - 2;
  const start = Math.min(Math.max(page - Math.floor((middle - 1) / 2), 2), count - middle);
  const items: (number | "gap")[] = [1];
  for (let p = start; p < start + middle; p++) items.push(p);
  items.push(count);
  if (start > 2) items[1] = "gap";
  if (start + middle < count) items[slots - 2] = "gap";
  return items;
}

function Ellipsis() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round">
      <path d="M5 12h.01M12 12h.01M19 12h.01" />
    </svg>
  );
}

export function Pagination({
  count,
  value,
  onValueChange,
  slots = 7,
  formatPage = (page: number) => page.toLocaleString("en-US"),
  label = "Pagination",
  previousLabel = "Previous page",
  nextLabel = "Next page",
  pageLabel = (page: number) => `Page ${page}`,
}: PaginationProps) {
  const items = slotItems(count, value, slots);
  const index = items.indexOf(value);
  const step = 100 / items.length;
  const [left, right] = useLiquid(index * step, (items.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round 999px)`;

  return (
    <nav aria-label={label} className="flex rounded-full bg-paper p-[3px] shadow-float">
      <motion.button
        type="button"
        aria-label={previousLabel}
        disabled={value === 1}
        onClick={() => onValueChange(value - 1)}
        initial={false}
        animate={{ opacity: value === 1 ? 0.3 : 1 }}
        transition={soft}
        className="grid size-8 place-items-center rounded-full text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m14.5 7-5 5 5 5" />
        </svg>
      </motion.button>
      <div className="relative grid auto-cols-[32px] grid-flow-col text-[13px] font-medium">
        {items.map((item, i) => (
          <span key={i} className="grid place-content-center place-items-center text-muted">
            <AnimatePresence initial={false}>
              {item === "gap" ? (
                <motion.span key="gap" aria-hidden {...swap} className="col-start-1 row-start-1">
                  <Ellipsis />
                </motion.span>
              ) : (
                <motion.button
                  key="page"
                  {...swap}
                  type="button"
                  aria-label={pageLabel(item)}
                  aria-current={item === value ? "page" : undefined}
                  onClick={() => onValueChange(item)}
                  className="col-start-1 row-start-1 grid size-8 place-content-center place-items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
                >
                  <AnimatePresence initial={false}>
                    <motion.span key={item} {...swap} className="col-start-1 row-start-1">
                      {formatPage(item)}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>
          </span>
        ))}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="pointer-events-none absolute inset-y-0 rounded-full bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="pointer-events-none absolute inset-0 grid auto-cols-[32px] grid-flow-col text-paper"
        >
          {items.map((item, i) => (
            <span key={i} className="grid place-content-center place-items-center">
              <AnimatePresence initial={false}>
                <motion.span key={item} {...swap} className="col-start-1 row-start-1">
                  {item === "gap" ? <Ellipsis /> : formatPage(item)}
                </motion.span>
              </AnimatePresence>
            </span>
          ))}
        </motion.span>
      </div>
      <motion.button
        type="button"
        aria-label={nextLabel}
        disabled={value === count}
        onClick={() => onValueChange(value + 1)}
        initial={false}
        animate={{ opacity: value === count ? 0.3 : 1 }}
        transition={soft}
        className="grid size-8 place-items-center rounded-full text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9.5 7 5 5-5 5" />
        </svg>
      </motion.button>
    </nav>
  );
}
