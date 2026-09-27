import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Expand } from "../Expand";
import { swap } from "../springs";
import { useWidth } from "../useWidth";

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
}: IslandProps) {
  const [width, measure] = useWidth();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    function onPointerDown(event: PointerEvent) {
      if (!root.current!.contains(event.target as Node)) onExpandedChange(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [expanded, onExpandedChange]);

  const compact = (
    <AnimatePresence initial={false}>
      <motion.span
        key={activity}
        ref={measure}
        {...swap}
        className="col-start-1 row-start-1 inline-flex items-center gap-10 whitespace-nowrap px-2 text-[13px] font-medium"
      >
        {leading}
        {trailing}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <div ref={root} className="w-fit">
      {width === undefined ? (
        compact
      ) : (
        <Expand
          open={expanded}
          onOpenChange={onExpandedChange}
          closed={{ width, height: 40, radius: 20 }}
          opened={{ width: panelWidth, height: panelHeight, radius: 42 }}
          anchor="center"
          label={openLabel(activity)}
          panelLabel={activity}
          trigger={<span className="grid size-full place-content-center place-items-center">{compact}</span>}
          className="bg-ink text-paper"
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
