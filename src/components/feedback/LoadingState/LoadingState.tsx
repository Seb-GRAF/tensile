import { Spinner } from "../Spinner/Spinner";

export type LoadingStateProps = {
  label?: string;
  description?: React.ReactNode;
  className?: string;
};

export function LoadingState({ label = "Loading", description, className = "" }: LoadingStateProps) {
  return (
    <div role="status" className={`flex w-full flex-col items-center gap-3 p-6 text-center ${className}`}>
      <Spinner size={24} className="text-muted" />
      <p className="text-body font-semibold text-ink">{label}</p>
      {description && <div className="max-w-sm text-sm text-muted">{description}</div>}
    </div>
  );
}
