import { AnimatePresence, motion } from "motion/react";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../Icon/Icon";
import { NumberTicker } from "../NumberTicker/NumberTicker";

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

  const content = (
    <>
      <motion.span initial={false} animate={{ rotate: up ? 0 : 90 }} transition={shape}>
        <Icon size={14}><path d="M7 17 17 7M7 7h10v10" /></Icon>
      </motion.span>
      <motion.span initial={false} animate={{ width }} transition={shape} className="grid justify-items-start overflow-x-clip">
        <AnimatePresence initial={false}>
          <motion.span key={text} ref={measure} {...swap} className="col-start-1 row-start-1 whitespace-nowrap">
            {text}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );

  return (
    <Card tone="ink" className={`@container p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-label font-medium text-paper/55">{label}</span>
        <span className="relative rounded-control bg-paper text-label font-medium tabular-nums text-ink">
          <span className="sr-only">{up ? upLabel(text) : downLabel(text)}</span>
          <span aria-hidden className="flex h-6 items-center gap-1 pr-2.5 pl-1.5">
            {content}
          </span>
          <motion.span
            aria-hidden
            initial={false}
            animate={{ opacity: up ? 1 : 0 }}
            transition={soft}
            className="absolute inset-0 flex items-center gap-1 rounded-control bg-accent pr-2.5 pl-1.5 text-on-accent"
          >
            {content}
          </motion.span>
        </span>
      </div>
      <div className="mt-3 text-2xl leading-none font-semibold text-paper @min-[11rem]:text-3xl @3xs:text-4xl @xs:text-5xl">
        <NumberTicker value={value} format={formatValue} />
      </div>
    </Card>
  );
}
