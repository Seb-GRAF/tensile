import { Icon, IconButton } from "tensile";

export function IconButtonSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <IconButton label="Add item" size="md">
        <Icon size={20}>
          <path d="M12 5v14M5 12h14" />
        </Icon>
      </IconButton>
      <IconButton label="Add item" size="sm">
        <Icon size={16}>
          <path d="M12 5v14M5 12h14" />
        </Icon>
      </IconButton>
    </div>
  );
}
