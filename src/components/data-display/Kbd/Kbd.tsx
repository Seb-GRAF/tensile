export type KbdProps = React.ComponentProps<"kbd">;

export function Kbd({ className = "", ...props }: KbdProps) {
  return (
    <kbd
      {...props}
      className={`tn:inline-flex tn:h-5.5 tn:items-center tn:gap-px tn:rounded-[calc(var(--tn-radius-control)/4)] tn:border tn:border-line tn:px-1.5 tn:font-sans tn:text-caption tn:text-muted ${className}`}
    />
  );
}
