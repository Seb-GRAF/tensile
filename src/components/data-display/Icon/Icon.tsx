import { icons, type IconName } from "../../../icons";

export type IconProps = {
  /** Which icon of the set to draw. */
  name: IconName;
  /** Rendered size in px. The stroke follows it, so every line renders at 1.5 px. */
  size?: number;
  className?: string;
};

/** A line icon in the current text color, hidden from screen readers: the control around it carries the name. */
export function Icon({ name, size = 16, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeWidth={36 / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tn:block tn:shrink-0 tn:fill-none tn:stroke-current ${className}`}
    >
      {icons[name]}
    </svg>
  );
}
