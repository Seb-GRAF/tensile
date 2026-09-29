import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useId, useState } from "react";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { SegmentedTabs } from "../SegmentedTabs/SegmentedTabs";
import { UnderlineTabs } from "../UnderlineTabs/UnderlineTabs";

export type TabsProps = {
  items: { value: string; label: string; icon?: React.ReactNode; content: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  variant?: "underline" | "segmented";
  className?: string;
};

function PanelContent({ direction, measure, children }: { direction: number; measure: React.Ref<HTMLDivElement>; children: React.ReactNode }) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return (
    <div ref={present ? measure : undefined} aria-hidden={!present} inert={!present} className="col-start-1 row-start-1">
      <motion.div
        custom={direction}
        variants={{
          enter: (direction: number) => ({ ...swap.initial, x: direction * 12 }),
          center: { ...swap.animate, x: 0 },
          exit: (direction: number) => ({ ...swap.exit, x: direction * -12 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Tabs({ items, value, onValueChange, label = "Sections", variant = "underline", className = "" }: TabsProps) {
  const { shape } = useSprings();
  const id = useId();
  const [size, measure] = useSize();
  const index = items.findIndex((item) => item.value === value);
  const [previous, setPrevious] = useState(index);
  const [direction, setDirection] = useState(1);
  if (index !== previous) {
    setPrevious(index);
    setDirection(index > previous ? 1 : -1);
  }
  const TabList = variant === "segmented" ? SegmentedTabs : UnderlineTabs;

  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      <TabList id={id} options={items} value={value} onValueChange={onValueChange} label={label} className="justify-self-start" />
      <motion.div
        id={`${id}-${index}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${index}`}
        tabIndex={0}
        initial={false}
        animate={{ height: size?.height }}
        transition={shape}
        className="grid grid-cols-1 items-start rounded-overlay outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
      >
        <AnimatePresence initial={false} custom={direction}>
          <PanelContent key={value} direction={direction} measure={measure}>{items[index].content}</PanelContent>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
