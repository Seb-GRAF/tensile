import { Expand } from "../../Expand";
import { icons } from "../../icons";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

export type ExpandableCardProps = {
  title: string;
  subtitle: string;
  /** Picture shown in the card and the detail's header; it fills a square box that the card rounds. */
  visual: React.ReactNode;
  /** Body of the detail view, below its header. */
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openLabel?: (title: string) => string;
  closeLabel?: string;
  className?: string;
};

export function ExpandableCard({
  title,
  subtitle,
  visual,
  children,
  open,
  onOpenChange,
  openLabel = (title: string) => `Open ${title}`,
  closeLabel = "Close",
  className = "",
}: ExpandableCardProps) {
  return (
    <div className={className}>
      <Expand
        open={open}
        onOpenChange={onOpenChange}
        closed={{ width: 280, height: 72, radius: "var(--radius-card)" }}
        opened={{ width: 360, height: 400, radius: "var(--radius-dialog)" }}
        anchor="corner"
        label={openLabel(title)}
        panelLabel={title}
        trigger={
          <span className="flex size-full items-center gap-3 p-3 text-left">
            <span className="size-12 shrink-0 overflow-hidden rounded-[calc(var(--radius-card)/2)]">{visual}</span>
            <span className="min-w-0">
              <span className="block truncate text-body font-semibold">{title}</span>
              <span className="block truncate text-label text-muted">{subtitle}</span>
            </span>
          </span>
        }
        className="bg-paper text-ink"
      >
        <div className="flex items-center gap-3 p-5">
          <div className="size-14 shrink-0 overflow-hidden rounded-[calc(var(--radius-card)/2)]">{visual}</div>
          <div className="min-w-0 grow">
            <p className="truncate text-base font-semibold tracking-[-0.01em]">{title}</p>
            <p className="truncate text-sm text-muted">{subtitle}</p>
          </div>
          <IconButton label={closeLabel} variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="shrink-0 self-start text-muted">
            <Icon size={16}>{icons.close}</Icon>
          </IconButton>
        </div>
        <div className="px-5">{children}</div>
      </Expand>
    </div>
  );
}
