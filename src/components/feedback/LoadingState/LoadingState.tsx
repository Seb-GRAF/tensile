import { Spinner } from "../Spinner/Spinner";

export type LoadingStateProps = {
  label?: string;
  description?: React.ReactNode;
  className?: string;
};

export function LoadingState({ label = "Loading", description, className = "" }: LoadingStateProps) {
  return (
    <div role="status" className={`tn:flex tn:w-full tn:flex-col tn:items-center tn:gap-3 tn:p-6 tn:text-center ${className}`}>
      <Spinner size={24} className="tn:text-muted" />
      <p className="tn:text-body tn:font-semibold tn:text-ink">{label}</p>
      {description && <div className="tn:max-w-sm tn:text-sm tn:text-muted">{description}</div>}
    </div>
  );
}
