import { Expand } from "../Expand";

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
}: ExpandableCardProps) {
  return (
    <Expand
      open={open}
      onOpenChange={onOpenChange}
      closed={{ width: 280, height: 72, radius: 24 }}
      opened={{ width: 360, height: 400, radius: 32 }}
      anchor="top-left"
      label={openLabel(title)}
      panelLabel={title}
      trigger={
        <span className="flex size-full items-center gap-3 p-3 text-left">
          <span className="size-12 shrink-0 overflow-hidden rounded-xl">{visual}</span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold">{title}</span>
            <span className="block truncate text-[13px] text-muted">{subtitle}</span>
          </span>
        </span>
      }
      className="bg-paper text-ink"
    >
      <div className="flex items-center gap-3 p-5">
        <div className="size-14 shrink-0 overflow-hidden rounded-xl">{visual}</div>
        <div className="min-w-0 grow">
          <p className="truncate text-base font-semibold tracking-[-0.01em]">{title}</p>
          <p className="truncate text-sm text-muted">{subtitle}</p>
        </div>
        <button
          type="button"
          aria-label={closeLabel}
          onClick={() => onOpenChange(false)}
          className="grid size-7 shrink-0 place-items-center self-start rounded-full text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div className="px-5">{children}</div>
    </Expand>
  );
}
