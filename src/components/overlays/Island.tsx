import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { Expand } from "../../Expand";
import { useOutsidePress } from "../../overlay";
import { useSprings } from "../../springs";
import { useWidth } from "../../useWidth";

export type IslandProps = {
  /** Name of the current activity, e.g. "Timer". It names the expanded view; a new one blur-swaps the content and springs the pill to its width. */
  activity: string;
  /** Start of the compact pill. */
  leading: React.ReactNode;
  /** End of the compact pill. */
  trailing: React.ReactNode;
  /** The expanded view, laid out in a panelWidth × panelHeight box. */
  children: React.ReactNode;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  openLabel?: (activity: string) => string;
  panelWidth?: number;
  panelHeight?: number;
  className?: string;
};

export function Island({
  activity,
  leading,
  trailing,
  children,
  expanded,
  onExpandedChange,
  openLabel = (activity: string) => `Expand ${activity}`,
  panelWidth = 340,
  panelHeight = 84,
  className = "",
}: IslandProps) {
  const { swap } = useSprings();
  const [width, measure] = useWidth();
  const root = useRef<HTMLDivElement>(null);

  useOutsidePress(root, expanded, () => onExpandedChange(false));

  const compact = (
    <AnimatePresence initial={false}>
      <motion.span
        key={activity}
        ref={measure}
        {...swap}
        className="col-start-1 row-start-1 inline-flex items-center gap-10 whitespace-nowrap px-2 text-label font-medium"
      >
        {leading}
        {trailing}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <div ref={root} className={`w-fit ${className}`}>
      {width === undefined ? (
        compact
      ) : (
        <Expand
          open={expanded}
          onOpenChange={onExpandedChange}
          closed={{ width, height: 40, radius: "var(--radius-control)" }}
          opened={{ width: panelWidth, height: panelHeight, radius: "var(--radius-dialog)" }}
          anchor="center"
          label={openLabel(activity)}
          panelLabel={activity}
          trigger={<span className="grid size-full place-content-center place-items-center">{compact}</span>}
          className="bg-ink text-paper [--color-focus:var(--color-paper)] [--color-line:var(--color-ink-3)]"
        >
          <AnimatePresence initial={false}>
            <motion.div key={activity} {...swap} className="absolute inset-0">
              {children}
            </motion.div>
          </AnimatePresence>
        </Expand>
      )}
    </div>
  );
}
