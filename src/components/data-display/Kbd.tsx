export type KbdProps = React.ComponentProps<"kbd">;

export function Kbd({ className = "", ...props }: KbdProps) {
  return (
    <kbd
      {...props}
      className={`inline-flex h-5.5 items-center gap-px rounded-md border border-line px-1.5 font-sans text-caption text-muted ${className}`}
    />
  );
}
