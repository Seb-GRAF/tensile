export type EmptyStateProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex w-full flex-col items-center gap-3 p-6 text-center ${className}`}>
      {icon && <div className="text-muted">{icon}</div>}
      <h2 className="text-body font-semibold text-ink">{title}</h2>
      {description && <div className="max-w-sm text-sm text-muted">{description}</div>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
