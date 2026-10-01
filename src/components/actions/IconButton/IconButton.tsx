import type { IconName } from "../../../icons";
import { Icon } from "../../data-display/Icon/Icon";
import { useLinkClick } from "../../navigation/Link/Link";
import { base, variants, type ButtonProps } from "../Button/Button";

export type IconButtonProps = {
  label: string;
  /** An icon name, drawn at 20 px (16 px at `size="sm"`), or your own content, such as an animated icon. */
  icon: IconName | React.ReactElement;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  iconSize?: number;
} & ((Omit<React.ComponentProps<"button">, "children"> & { href?: undefined }) | (Omit<React.ComponentProps<"a">, "children"> & { href: string }));

const sizes = {
  md: "tn:size-11",
  sm: "tn:size-8",
};

const iconSizes = {
  md: 20,
  sm: 16,
};

export function IconButton({ label, icon, variant = "primary", size = "md", iconSize = iconSizes[size], className = "", ...props }: IconButtonProps) {
  const linkClick = useLinkClick();
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = typeof icon === "string" ? <Icon name={icon} size={iconSize} /> : icon;

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
        {content}
      </a>
    );
  }

  const { type = "button", ...button } = props;
  return (
    <button {...button} type={type} aria-label={label} className={classes}>
      {content}
    </button>
  );
}
