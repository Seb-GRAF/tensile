import { motion } from "motion/react";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { SidebarNav } from "./SidebarNav";

export type CollapsibleSidebarProps = {
  items: { value: string; label: string; icon: React.ReactNode; href?: string }[];
  value: string;
  onValueChange: (value: string) => void;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  /** At the top, e.g. the brand; clipped to the rail while collapsed. */
  leading?: React.ReactNode;
  /** At the bottom, above the collapse button, e.g. the account; clipped to the rail while collapsed. */
  trailing?: React.ReactNode;
  label?: string;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
};

export function CollapsibleSidebar({
  items,
  value,
  onValueChange,
  expanded,
  onExpandedChange,
  leading,
  trailing,
  label = "Main",
  expandLabel = "Expand sidebar",
  collapseLabel = "Collapse sidebar",
  className = "",
}: CollapsibleSidebarProps) {
  const { shape, scale } = useSprings();
  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? 208 : 48 }}
      transition={expanded ? shape : { ...shape, delay: 0.1 * scale }}
      className={`shrink-0 ${className}`}
    >
      <SidebarNav
        items={items}
        value={value}
        onValueChange={onValueChange}
        label={label}
        collapsed={!expanded}
        className="h-full overflow-hidden"
        leading={leading}
        trailing={
          <>
            {trailing}
            <IconButton
              size="sm"
              variant="ghost"
              className="text-muted"
              label={expanded ? collapseLabel : expandLabel}
              aria-expanded={expanded}
              onClick={() => onExpandedChange(!expanded)}
            >
              <Icon size={16}>
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </Icon>
            </IconButton>
          </>
        }
      />
    </motion.div>
  );
}
