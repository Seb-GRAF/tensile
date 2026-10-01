export type SkeletonProps = {
  /** Size and radius, e.g. `h-4 w-48 rounded-full`. */
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div aria-hidden className={`tn:animate-shimmer tn:bg-hover ${className}`} />;
}
