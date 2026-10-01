export type SkeletonProps = {
  /** `block` takes its size and radius from `className`; `text` draws `lines` bars of text, the last one shorter; `circle` is round (give it a width, e.g. `w-10`); `media` has the card radius (give it a size, e.g. `aspect-video w-full`). */
  variant?: "block" | "text" | "circle" | "media";
  /** Number of lines for the `text` variant. */
  lines?: number;
  /** Size, and the radius of a `block`, e.g. `h-4 w-48 rounded-full`. */
  className?: string;
};

const variants = {
  block: "",
  circle: "tn:aspect-square tn:shrink-0 tn:rounded-full",
  media: "tn:rounded-card",
};

export function Skeleton({ variant = "block", lines = 1, className = "" }: SkeletonProps) {
  if (variant === "text") {
    return (
      <div aria-hidden className={`tn:grid tn:animate-shimmer tn:gap-2 ${className}`}>
        {Array.from({ length: lines }, (_, line) => (
          <div key={line} className="tn:h-4 tn:rounded-full tn:bg-hover tn:last:not-first:w-2/3" />
        ))}
      </div>
    );
  }
  return <div aria-hidden className={`tn:animate-shimmer tn:bg-hover ${variants[variant]} ${className}`} />;
}
