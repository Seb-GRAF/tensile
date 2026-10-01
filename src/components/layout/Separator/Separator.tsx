export type SeparatorProps = React.ComponentProps<"hr"> & {
  /** Vertical stretches to the height of its flex or grid row. */
  orientation?: "horizontal" | "vertical";
};

export function Separator({ orientation = "horizontal", className = "", ...props }: SeparatorProps) {
  return (
    <hr
      {...props}
      aria-orientation={orientation === "vertical" ? orientation : undefined}
      className={`${orientation === "vertical" ? "tn:h-auto tn:w-px tn:self-stretch" : "tn:h-px"} tn:border-0 tn:bg-line ${className}`}
    />
  );
}
