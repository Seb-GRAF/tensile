import { Tooltip, IconButton } from "tensile";

export function TooltipDemo() {
  return (
    <Tooltip label="Add item">
      {(trigger) => (
        <IconButton {...trigger} label="Add item" icon="plus" />
      )}
    </Tooltip>
  );
}
