import { useLinkClick } from "../../navigation/Link/Link";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
} & ((React.ComponentProps<"button"> & { href?: undefined }) | (React.ComponentProps<"a"> & { href: string }));

export const base =
  "tn:inline-flex tn:items-center tn:justify-center tn:whitespace-nowrap tn:rounded-control tn:font-medium tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus tn:not-disabled:press tn:disabled:opacity-40";

export const variants = {
  primary: "tn:bg-ink tn:text-paper tn:shadow-control tn:not-disabled:hover:bg-ink-3",
  secondary: "tn:bg-paper tn:text-ink tn:shadow-control tn:not-disabled:hover:bg-hover",
  ghost: "tn:not-disabled:hover:bg-[var(--tn-ghost-hover,var(--tn-color-hover))]",
};

const sizes = {
  md: "tn:h-11 tn:gap-2 tn:px-5 tn:text-body",
  sm: "tn:h-8 tn:gap-1.5 tn:px-4 tn:text-label",
};

export function Button({ children, variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const linkClick = useLinkClick();
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { onClick, ...link } = props;
    return (
      <a
        {...link}
        onClick={(event) => {
          onClick?.(event);
          linkClick(event);
        }}
        className={classes}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...button } = props;
  return (
    <button {...button} type={type} className={classes}>
      {children}
    </button>
  );
}
