import { icons } from "../../icons";
import { Icon } from "./Icon";

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
      className={`inline-flex h-7 items-center gap-1 rounded-control bg-hover whitespace-nowrap text-label font-medium text-ink outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${icon ? "pl-2" : "pl-3"} ${onRemove ? "pr-1" : "pr-3"} ${className}`}
    >
      {icon}
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel(label)}
          onClick={onRemove}
          className="grid size-5 place-items-center rounded-full text-muted outline-none"
        >
          <Icon size={12}>{icons.close}</Icon>
        </button>
      )}
    </span>
  );
}
