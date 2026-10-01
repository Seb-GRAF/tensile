export type ListProps = {
  items: { id: string; title: string; description?: React.ReactNode; leading?: React.ReactNode; trailing?: React.ReactNode }[];
  /** Names the list when no visible heading does. */
  label?: string;
  className?: string;
};

export function ListContent({ item }: { item: ListProps["items"][number] }) {
  return (
    <>
      {item.leading && <div className="tn:text-muted">{item.leading}</div>}
      <div className="tn:min-w-0 tn:flex-1">
        <p className="tn:truncate tn:text-sm tn:font-medium tn:text-ink">{item.title}</p>
        {item.description && <div className="tn:text-label tn:text-muted">{item.description}</div>}
      </div>
      {item.trailing && <div className="tn:text-label tn:text-muted">{item.trailing}</div>}
    </>
  );
}

export function List({ items, label, className = "" }: ListProps) {
  return (
    <ul role="list" aria-label={label} className={`tn:divide-y tn:divide-line ${className}`}>
      {items.map((item) => (
        <li key={item.id} className="tn:flex tn:items-center tn:gap-3 tn:py-2.5 tn:first:pt-0 tn:last:pb-0">
          <ListContent item={item} />
        </li>
      ))}
    </ul>
  );
}
