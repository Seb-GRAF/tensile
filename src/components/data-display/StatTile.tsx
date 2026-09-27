import { AnimatePresence, motion } from "motion/react";
import { useSprings } from "../../springs";
import { useWidth } from "../../useWidth";
import { Card } from "../layout/Card";
import { Icon } from "./Icon";
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
  className?: string;
};

export function StatTile({
  value,
  change,
  label = "Total",
  formatValue = (value: number) => value.toLocaleString("en-US"),
  formatChange = (change: number) => Math.abs(change).toLocaleString("en-US", { style: "percent" }),
  upLabel = (change: string) => `Up ${change}`,
  downLabel = (change: string) => `Down ${change}`,
  className = "",
}: StatTileProps) {
  const { shape, soft, swap } = useSprings();
  const [width, measure] = useWidth();
  const up = change >= 0;
  const text = formatChange(change);

  return (
    <Card tone="ink" className={`p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-label font-medium text-paper/55">{label}</span>
        <motion.span
          initial={false}
          animate={{ backgroundColor: up ? "var(--color-accent)" : "var(--color-paper)" }}
          transition={soft}
          className={`flex h-6 items-center gap-1 rounded-control pr-2.5 pl-1.5 text-label font-medium tabular-nums ${up ? "text-on-accent" : "text-ink"}`}
        >
          <span className="sr-only">{up ? upLabel(text) : downLabel(text)}</span>
          <motion.span
            aria-hidden
            initial={false}
            animate={{ rotate: up ? 0 : 90 }}
            transition={shape}
          >
            <Icon size={14}><path d="M7 17 17 7M7 7h10v10" /></Icon>
          </motion.span>
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
    </Card>
  );
}
