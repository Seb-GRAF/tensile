export type ButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
};

export const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-control font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus enabled:press disabled:opacity-40";

export const variants = {
  primary: "bg-ink text-paper shadow-control enabled:hover:bg-ink-3",
  secondary: "bg-paper text-ink shadow-control enabled:hover:bg-hover",
  ghost: "enabled:hover:bg-[var(--ghost-hover,var(--color-hover))]",
};

const sizes = {
  md: "h-11 gap-2 px-5 text-body",
  sm: "h-8 gap-1.5 px-4 text-label",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button {...props} type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}
