import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useId } from "react";
import { useSprings } from "../../springs";
import { SegmentedTabs } from "./SegmentedTabs";
import { UnderlineTabs } from "./UnderlineTabs";

export type TabsProps = {
  items: { value: string; label: string; icon?: React.ReactNode; content: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  variant?: "underline" | "segmented";
  className?: string;
};

function PanelContent({ children }: { children: React.ReactNode }) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return <motion.div {...swap} aria-hidden={!present} inert={!present}>{children}</motion.div>;
}

export function Tabs({ items, value, onValueChange, label = "Sections", variant = "underline", className = "" }: TabsProps) {
  const id = useId();
  const index = items.findIndex((item) => item.value === value);
  const TabList = variant === "segmented" ? SegmentedTabs : UnderlineTabs;

  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      <TabList id={id} options={items} value={value} onValueChange={onValueChange} label={label} className="justify-self-start" />
      <div id={`${id}-${index}-panel`} role="tabpanel" aria-labelledby={`${id}-${index}`} tabIndex={0} className="rounded-overlay outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus">
        <AnimatePresence initial={false} mode="wait">
          <PanelContent key={value}>{items[index].content}</PanelContent>
        </AnimatePresence>
      </div>
    </div>
  );
}
