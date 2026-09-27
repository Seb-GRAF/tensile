import { Spinner } from "./Spinner";

export type LoadingStateProps = {
  label?: string;
  description?: React.ReactNode;
  className?: string;
};

export function LoadingState({ label = "Loading", description, className = "" }: LoadingStateProps) {
  return (
    <div role="status" className={`flex w-full items-center justify-center gap-3 p-6 text-ink ${className}`}>
      <Spinner size={20} />
      <div>
        <p className="text-body font-medium">{label}</p>
        {description && <div className="mt-0.5 text-label text-muted">{description}</div>}
      </div>
    </div>
  );
}
