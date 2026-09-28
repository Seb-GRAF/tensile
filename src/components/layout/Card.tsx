export type CardProps = React.ComponentProps<"div"> & {
  /** Ink also turns focus rings paper and separators ink-3 inside it. */
  tone?: "paper" | "ink";
};

const tones = {
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper [--color-focus:var(--color-paper)] [--color-line:var(--color-ink-3)]",
};

export function Card({ tone = "paper", className = "", ...props }: CardProps) {
  return <div {...props} className={`rounded-card shadow-float surface ${tones[tone]} ${className}`} />;
}
