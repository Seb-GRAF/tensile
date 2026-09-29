import { base, variants, type ButtonProps } from "../Button/Button";

export type IconButtonProps = ButtonProps & {
  label: string;
};

const sizes = {
  md: "size-11",
  sm: "size-8",
};

export function IconButton({
  label,
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
