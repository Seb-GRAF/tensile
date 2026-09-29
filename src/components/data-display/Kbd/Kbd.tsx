export type KbdProps = React.ComponentProps<"kbd">;

export function Kbd({ className = "", ...props }: KbdProps) {
  return (
    <kbd
      {...props}
      className={`inline-flex h-5.5 items-center gap-px rounded-[calc(var(--radius-control)/4)] border border-line px-1.5 font-sans text-caption text-muted ${className}`}
    />
  );
}
