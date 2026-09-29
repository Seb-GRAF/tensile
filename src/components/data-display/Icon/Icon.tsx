export type IconProps = {
  /** Shapes on a 24 × 24 grid, e.g. `<path d="…" />`. */
  children: React.ReactNode;
  /** Rendered size in px. The stroke follows it, so every line renders at 1.5 px. */
  size?: number;
  className?: string;
};

/** A line icon in the current text color, hidden from screen readers: the control around it carries the name. */
export function Icon({ children, size = 16, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeWidth={36 / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`block shrink-0 fill-none stroke-current ${className}`}
    >
      {children}
    </svg>
  );
}
