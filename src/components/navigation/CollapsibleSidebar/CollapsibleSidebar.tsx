import { motion } from "motion/react";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";
import { SidebarNav } from "../SidebarNav/SidebarNav";

export type CollapsibleSidebarProps = {
  items: { value: string; label: string; icon: React.ReactNode; href?: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** At the top, e.g. the brand; laid out at the expanded width, so the rail clips it to its first 32 px. */
  leading?: React.ReactNode;
  /** At the bottom, above the collapse button, e.g. the account; laid out at the expanded width, so the rail clips it to its first 32 px. */
  trailing?: React.ReactNode;
  label?: string;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
};

export function CollapsibleSidebar({
  items,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
  leading,
  trailing,
  label = "Main",
  expandLabel = "Expand sidebar",
  collapseLabel = "Collapse sidebar",
  className = "",
}: CollapsibleSidebarProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const [expanded, setExpanded] = useControllable(expandedProp, defaultExpanded, onExpandedChange);
  const { shape, scale } = useSprings();
  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? 208 : 48 }}
      transition={expanded ? shape : { ...shape, delay: 0.1 * scale }}
      className={`tn:shrink-0 tn:overflow-hidden tn:rounded-card tn:bg-paper tn:p-2 tn:shadow-float tn:surface ${className}`}
    >
      <SidebarNav
        items={items}
        value={value}
        onValueChange={setValue}
        label={label}
        collapsed={!expanded}
        className="tn:h-full"
        leading={leading && <div className="tn:w-48">{leading}</div>}
        trailing={
          <>
            {trailing && <div className="tn:w-48">{trailing}</div>}
            <IconButton
              size="sm"
              variant="ghost"
              className="tn:text-muted"
              label={expanded ? collapseLabel : expandLabel}
              icon="sidebar"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </>
        }
      />
    </motion.div>
  );
}
