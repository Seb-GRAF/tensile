export type CardProps = React.ComponentProps<"div"> & {
  /** Ink is a dark surface: the dark tokens apply inside it, in either theme. */
  tone?: "paper" | "ink";
};

const tones = {
  paper: "tn:bg-paper tn:text-ink",
  ink: "dark tn:bg-paper tn:text-ink",
};

export function Card({ tone = "paper", className = "", ...props }: CardProps) {
  return <div {...props} className={`tn:rounded-card tn:shadow-float tn:surface ${tones[tone]} ${className}`} />;
}
