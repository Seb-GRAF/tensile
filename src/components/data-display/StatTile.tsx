import { AnimatePresence, motion } from "motion/react";
import { shape, soft, swap } from "../../springs";
import { useWidth } from "../../useWidth";
import { NumberTicker } from "./NumberTicker";

export type StatTileProps = {
  value: number;
  /** Change as a fraction: 0.12 is up 12%, -0.04 is down 4%. */
  change: number;
  label?: string;
  formatValue?: (value: number) => string;
  /** Gets the signed change; the default shows only its size. */
  formatChange?: (change: number) => string;
  /** Read out instead of the up arrow, given the formatted change. */
  upLabel?: (change: string) => string;
  /** Read out instead of the down arrow, given the formatted change. */
  downLabel?: (change: string) => string;
};

export function StatTile({
  value,
  change,
  label = "Total",
  formatValue = (value: number) => value.toLocaleString("en-US"),
  formatChange = (change: number) => Math.abs(change).toLocaleString("en-US", { style: "percent" }),
  upLabel = (change: string) => `Up ${change}`,
  downLabel = (change: string) => `Down ${change}`,
}: StatTileProps) {
  const [width, measure] = useWidth();
  const up = change >= 0;
  const text = formatChange(change);

  return (
    <div className="w-64 rounded-3xl bg-ink p-5 shadow-float">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-paper/55">{label}</span>
        <motion.span
          initial={false}
          animate={{ backgroundColor: up ? "var(--color-accent)" : "var(--color-paper)" }}
          transition={soft}
          className="flex h-6 items-center gap-1 rounded-full pr-2.5 pl-1.5 text-[13px] font-medium text-ink tabular-nums"
        >
          <span className="sr-only">{up ? upLabel(text) : downLabel(text)}</span>
          <motion.svg
            aria-hidden
            viewBox="0 0 24 24"
            initial={false}
            animate={{ rotate: up ? 0 : 90 }}
            transition={shape}
            className="size-3.5 fill-none stroke-current"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </motion.svg>
          <motion.span
            aria-hidden
            initial={false}
            animate={{ width }}
            transition={shape}
            className="grid justify-items-start overflow-x-clip"
          >
            <AnimatePresence initial={false}>
              <motion.span key={text} ref={measure} {...swap} className="col-start-1 row-start-1 whitespace-nowrap">
                {text}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </motion.span>
      </div>
      <div className="mt-3 text-5xl font-semibold text-paper">
        <NumberTicker value={value} format={formatValue} />
      </div>
    </div>
  );
}
