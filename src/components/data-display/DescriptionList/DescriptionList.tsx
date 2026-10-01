export type DescriptionListProps = {
  items: { label: string; value: React.ReactNode }[];
  className?: string;
};

export function DescriptionList({ items, className = "" }: DescriptionListProps) {
  return (
    <dl className={`tn:@container tn:divide-y tn:divide-line ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="tn:grid tn:gap-x-4 tn:gap-y-0.5 tn:py-3 tn:first:pt-0 tn:last:pb-0 tn:@sm:grid-cols-[1fr_2fr]">
          <dt className="tn:text-label tn:text-muted">{item.label}</dt>
          <dd className="tn:text-sm tn:text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
