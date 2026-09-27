export type SeparatorProps = React.ComponentProps<"hr"> & {
  /** Vertical stretches to the height of its flex or grid row. */
  orientation?: "horizontal" | "vertical";
};

export function Separator({ orientation = "horizontal", className = "", ...props }: SeparatorProps) {
  return (
    <hr
      {...props}
      aria-orientation={orientation === "vertical" ? orientation : undefined}
      className={`${orientation === "vertical" ? "h-auto w-px self-stretch" : "h-px"} border-0 bg-line ${className}`}
    />
  );
}
