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
      <motion.span initial={false} animate={{ width }} transition={shape} className="tn:grid tn:justify-items-start tn:overflow-x-clip">
        <AnimatePresence initial={false}>
          <motion.span key={text} ref={measure} {...swap} className="tn:col-start-1 tn:row-start-1 tn:whitespace-nowrap">
            {text}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );

  return (
    <Card tone="ink" className={`tn:@container tn:p-5 ${className}`}>
      <div className="tn:flex tn:items-center tn:justify-between tn:gap-3">
        <span className="tn:min-w-0 tn:truncate tn:text-label tn:font-medium tn:text-muted">{label}</span>
        <span className="tn:relative tn:rounded-control tn:bg-ink tn:text-label tn:font-medium tn:tabular-nums tn:text-paper">
          <span className="tn:sr-only">{up ? upLabel(text) : downLabel(text)}</span>
          <span aria-hidden className="tn:flex tn:h-6 tn:items-center tn:gap-1 tn:pr-2.5 tn:pl-1.5">
            {content}
          </span>
          <motion.span
            aria-hidden
            initial={false}
            animate={{ opacity: up ? 1 : 0 }}
            transition={soft}
            className="tn:absolute tn:inset-0 tn:flex tn:items-center tn:gap-1 tn:rounded-control tn:bg-accent tn:pr-2.5 tn:pl-1.5 tn:text-on-accent"
          >
            {content}
          </motion.span>
        </span>
      </div>
      <div className="tn:mt-3 tn:text-2xl tn:leading-none tn:font-semibold tn:text-ink tn:@min-[11rem]:text-3xl tn:@3xs:text-4xl tn:@xs:text-5xl">
        <NumberTicker value={value} format={formatValue} />
      </div>
    </Card>
  );
}
