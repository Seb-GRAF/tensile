import { useControllable } from "../../../controllable";
import { Expand } from "../../../Expand";
import { IconButton } from "../../actions/IconButton/IconButton";

export type ExpandableCardProps = {
  title: string;
  subtitle: string;
  /** Picture shown in the card and the detail's header; it fills a square box that the card rounds. */
  visual: React.ReactNode;
  /** Body of the detail view, below its header. */
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openLabel?: (title: string) => string;
  closeLabel?: string;
  className?: string;
};

export function ExpandableCard({
  title,
  subtitle,
  visual,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  openLabel = (title: string) => `Open ${title}`,
  closeLabel = "Close",
  className = "",
}: ExpandableCardProps) {
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  return (
    <div className={className}>
      <Expand
        open={open}
        onOpenChange={setOpen}
        closed={{ width: 280, height: 72, radius: "var(--tn-radius-card)" }}
        opened={{ width: 360, height: 400, radius: "var(--tn-radius-dialog)" }}
        anchor="bottom-left"
        label={openLabel(title)}
        panelLabel={title}
        trigger={
          <span className="tn:flex tn:size-full tn:items-center tn:gap-3 tn:p-3 tn:text-left">
            <span className="tn:size-12 tn:shrink-0 tn:overflow-hidden tn:rounded-[calc(var(--tn-radius-card)/2)]">{visual}</span>
            <span className="tn:min-w-0">
              <span className="tn:block tn:truncate tn:text-body tn:font-semibold">{title}</span>
              <span className="tn:block tn:truncate tn:text-label tn:text-muted">{subtitle}</span>
            </span>
          </span>
        }
        className="tn:bg-paper tn:text-ink"
      >
        <div className="tn:flex tn:items-center tn:gap-3 tn:p-5">
          <div className="tn:size-14 tn:shrink-0 tn:overflow-hidden tn:rounded-[calc(var(--tn-radius-card)/2)]">{visual}</div>
          <div className="tn:min-w-0 tn:grow">
            <p className="tn:truncate tn:text-base tn:font-semibold tn:tracking-[-0.01em]">{title}</p>
            <p className="tn:truncate tn:text-sm tn:text-muted">{subtitle}</p>
          </div>
          <IconButton label={closeLabel} variant="ghost" size="sm" onClick={() => setOpen(false)} className="tn:shrink-0 tn:self-start tn:text-muted" icon="close" />
        </div>
        <div className="tn:px-5">{children}</div>
      </Expand>
    </div>
  );
}
