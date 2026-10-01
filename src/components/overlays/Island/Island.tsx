import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { useControllable } from "../../../controllable";
import { Expand } from "../../../Expand";
import { useOutsidePress } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";

export type IslandProps = {
  /** Name of the current activity, e.g. "Timer". It names the expanded view; a new one blur-swaps the content and springs the pill to its width. */
  activity: string;
  /** Start of the compact pill. */
  leading: React.ReactNode;
  /** End of the compact pill. */
  trailing: React.ReactNode;
  /** The expanded view, laid out in a panelWidth × panelHeight box. */
  children: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
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
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  openLabel = (activity: string) => `Expand ${activity}`,
  panelWidth = 340,
  panelHeight = 84,
  className = "",
}: IslandProps) {
  const { swap } = useSprings();
  const [expanded, setExpanded] = useControllable(expandedProp, defaultExpanded, onExpandedChange);
  const [width, measure] = useWidth();
  const root = useRef<HTMLDivElement>(null);

  useOutsidePress(root, expanded, () => setExpanded(false));

  const compact = (
    <AnimatePresence initial={false}>
      <motion.span
        key={activity}
        ref={measure}
        {...swap}
        className="tn:col-start-1 tn:row-start-1 tn:inline-flex tn:items-center tn:gap-10 tn:whitespace-nowrap tn:px-2 tn:text-label tn:font-medium"
      >
        {leading}
        {trailing}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <div ref={root} className={`tn:w-fit ${className}`}>
      {width === undefined ? (
        compact
      ) : (
        <Expand
          open={expanded}
          onOpenChange={setExpanded}
          closed={{ width, height: 40, radius: "var(--tn-radius-control)" }}
          opened={{ width: panelWidth, height: panelHeight, radius: "var(--tn-radius-dialog)" }}
          anchor="center"
          label={openLabel(activity)}
          panelLabel={activity}
          trigger={<span className="tn:grid tn:size-full tn:place-content-center tn:place-items-center">{compact}</span>}
          className="dark tn:bg-paper tn:text-ink"
        >
          <AnimatePresence initial={false}>
            <motion.div key={activity} {...swap} className="tn:absolute tn:inset-0">
              {children}
            </motion.div>
          </AnimatePresence>
        </Expand>
      )}
    </div>
  );
}
