import { useLinkClick } from "../../navigation/Link/Link";
import { base, variants, type ButtonProps } from "../Button/Button";

export type IconButtonProps = ButtonProps & {
  label: string;
};

const sizes = {
  md: "tn:size-11",
  sm: "tn:size-8",
};

export function IconButton({ label, children, variant = "primary", size = "md", className = "", ...props }: IconButtonProps) {
  const linkClick = useLinkClick();
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { onClick, ...link } = props;
    return (
      <a
        {...link}
        aria-label={label}
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
    <button {...button} type={type} aria-label={label} className={classes}>
      {children}
    </button>
  );
}
