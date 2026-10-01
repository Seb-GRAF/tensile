import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useId, useState } from "react";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { SegmentedTabList } from "./SegmentedTabList";
import { UnderlineTabList } from "./UnderlineTabList";

export type TabsProps = {
  items: { value: string; label: string; icon?: React.ReactNode; content: React.ReactNode }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  variant?: "underline" | "segmented";
  className?: string;
};

function PanelContent({ direction, measure, children }: { direction: number; measure: React.Ref<HTMLDivElement>; children: React.ReactNode }) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return (
    <div ref={present ? measure : undefined} aria-hidden={!present} inert={!present} className="tn:col-start-1 tn:row-start-1">
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

export function Tabs({
  items,
  value: valueProp,
  defaultValue = items[0].value,
  onValueChange,
  label = "Sections",
  variant = "underline",
  className = "",
}: TabsProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
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
  const TabList = variant === "segmented" ? SegmentedTabList : UnderlineTabList;

  return (
    <div className={`tn:grid tn:grid-cols-1 tn:gap-4 ${className}`}>
      <TabList id={id} options={items} value={value} onValueChange={setValue} label={label} className="tn:justify-self-start" />
      <motion.div
        id={`${id}-${index}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${index}`}
        tabIndex={0}
        initial={false}
        animate={{ height: size?.height }}
        transition={shape}
        className="tn:grid tn:grid-cols-1 tn:items-start tn:rounded-overlay tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
      >
        <AnimatePresence initial={false} custom={direction}>
          <PanelContent key={value} direction={direction} measure={measure}>{items[index].content}</PanelContent>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
