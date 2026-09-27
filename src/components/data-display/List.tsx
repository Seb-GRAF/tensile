export type ListProps = {
  items: { id: string; title: string; description?: React.ReactNode; leading?: React.ReactNode; trailing?: React.ReactNode }[];
  /** Names the list when no visible heading does. */
  label?: string;
  className?: string;
};

export function List({ items, label, className = "" }: ListProps) {
  return (
    <ul role="list" aria-label={label} className={`divide-y divide-line ${className}`}>
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
          {item.leading && <div className="text-muted">{item.leading}</div>}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{item.title}</p>
            {item.description && <div className="text-label text-muted">{item.description}</div>}
          </div>
          {item.trailing && <div className="text-label text-muted">{item.trailing}</div>}
        </li>
      ))}
    </ul>
  );
}
