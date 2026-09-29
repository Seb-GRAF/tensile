export type TimelineProps = {
  items: { id: string; title: string; description?: React.ReactNode; time?: string; icon?: React.ReactNode }[];
  /** Names the list when no visible heading does. */
  label?: string;
  className?: string;
};

export function Timeline({ items, label, className = "" }: TimelineProps) {
  return (
    <ol role="list" aria-label={label} className={className}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
          {i < items.length - 1 && <div className="absolute top-3 -bottom-3 left-[11px] w-0.5 bg-line" />}
          <div aria-hidden className="relative grid size-6 place-items-center">
            {item.icon ? (
              <div className="grid size-6 place-items-center rounded-full bg-hover text-ink">{item.icon}</div>
            ) : (
              <div className="size-2 rounded-full bg-ink" />
            )}
          </div>
          <div className="flex-1 pt-0.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-ink">{item.title}</p>
              {item.time && <p className="shrink-0 text-caption text-muted">{item.time}</p>}
            </div>
            {item.description && <div className="text-label text-muted">{item.description}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
