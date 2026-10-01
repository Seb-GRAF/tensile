export type PageHeaderProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, breadcrumbs, actions, className = "" }: PageHeaderProps) {
  return (
    <header className={`tn:w-full ${className}`}>
      {breadcrumbs && <div className="tn:mb-4">{breadcrumbs}</div>}
      <div className="tn:flex tn:flex-wrap tn:items-end tn:gap-4">
        <div className="tn:min-w-0 tn:flex-1 tn:basis-64">
          <h1 className="tn:text-2xl tn:font-semibold tn:tracking-tight tn:text-ink">{title}</h1>
          {description && <div className="tn:mt-2 tn:text-body tn:text-muted">{description}</div>}
        </div>
        {actions && <div className="tn:flex tn:flex-wrap tn:items-center tn:gap-2">{actions}</div>}
      </div>
    </header>
  );
}
