import { icons } from "../../../icons";
import { Icon } from "../Icon/Icon";

export type TagProps = {
  label: string;
  icon?: React.ReactNode;
  /** Shows a remove button beside the label that calls it. */
  onRemove?: () => void;
  removeLabel?: (label: string) => string;
  className?: string;
};

export function Tag({
  label,
  icon,
  onRemove,
  removeLabel = (label: string) => `Remove ${label}`,
  className = "",
}: TagProps) {
  return (
    <span
      className={`tn:inline-flex tn:h-7 tn:items-center tn:gap-1 tn:rounded-control tn:bg-hover tn:whitespace-nowrap tn:text-label tn:font-medium tn:text-ink tn:outline-offset-2 tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus ${icon ? "tn:pl-2" : "tn:pl-3"} ${onRemove ? "tn:pr-1" : "tn:pr-3"} ${className}`}
    >
      {icon}
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel(label)}
          onClick={onRemove}
          className="tn:grid tn:size-5 tn:place-items-center tn:rounded-full tn:text-muted tn:outline-none tn:hover:bg-paper tn:hover:text-ink"
        >
          <Icon size={12}>{icons.close}</Icon>
        </button>
      )}
    </span>
  );
}
