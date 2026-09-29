export type DescriptionListProps = {
  items: { label: string; value: React.ReactNode }[];
  className?: string;
};

export function DescriptionList({ items, className = "" }: DescriptionListProps) {
  return (
    <dl className={`@container divide-y divide-line ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="grid gap-x-4 gap-y-0.5 py-3 first:pt-0 last:pb-0 @sm:grid-cols-[1fr_2fr]">
          <dt className="text-label text-muted">{item.label}</dt>
          <dd className="text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
