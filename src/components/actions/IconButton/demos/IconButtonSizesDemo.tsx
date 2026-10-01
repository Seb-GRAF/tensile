import { IconButton } from "tensile";

export function IconButtonSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <IconButton label="Add item" size="md" icon="plus" />
      <IconButton label="Add item" size="sm" icon="plus" />
      <IconButton label="Add item" icon="plus" iconSize={16} />
    </div>
  );
}
