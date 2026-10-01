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
        <li key={item.id} className="tn:relative tn:flex tn:gap-3 tn:pb-5 tn:last:pb-0">
          {i < items.length - 1 && <div className="tn:absolute tn:top-3 tn:-bottom-3 tn:left-[11px] tn:w-0.5 tn:bg-line" />}
          <div aria-hidden className="tn:relative tn:grid tn:size-6 tn:place-items-center">
            {item.icon ? (
              <div className="tn:grid tn:size-6 tn:place-items-center tn:rounded-full tn:bg-hover tn:text-ink">{item.icon}</div>
            ) : (
              <div className="tn:size-2 tn:rounded-full tn:bg-ink" />
            )}
          </div>
          <div className="tn:flex-1 tn:pt-0.5">
            <div className="tn:flex tn:items-baseline tn:justify-between tn:gap-3">
              <p className="tn:text-sm tn:font-medium tn:text-ink">{item.title}</p>
              {item.time && <p className="tn:shrink-0 tn:text-caption tn:text-muted">{item.time}</p>}
            </div>
            {item.description && <div className="tn:text-label tn:text-muted">{item.description}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
