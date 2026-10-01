export type SpinnerProps = {
  /** Rendered size in px. The stroke follows it, so the arc renders at 1.5 px. */
  size?: number;
  className?: string;
};

/** A turning arc in the current text color. It's decorative: give the busy control or region its own name or status text. It stops turning when `--tn-motion-duration-scale` is 0. */
export function Spinner({ size = 16, className = "" }: SpinnerProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeWidth={36 / size}
      strokeLinecap="round"
      className={`tn:block tn:shrink-0 tn:animate-spinner tn:fill-none tn:stroke-current ${className}`}
    >
      <circle cx="12" cy="12" r="9" pathLength={1} strokeDasharray="0.28 1" />
    </svg>
  );
}
