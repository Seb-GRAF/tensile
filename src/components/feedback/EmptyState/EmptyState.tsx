export type EmptyStateProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`tn:flex tn:w-full tn:flex-col tn:items-center tn:gap-3 tn:p-6 tn:text-center ${className}`}>
      {icon && <div className="tn:text-muted">{icon}</div>}
      <h2 className="tn:text-body tn:font-semibold tn:text-ink">{title}</h2>
      {description && <div className="tn:max-w-sm tn:text-sm tn:text-muted">{description}</div>}
      {action && <div className="tn:mt-1">{action}</div>}
    </div>
  );
}
