import { Tooltip, IconButton, Icon } from "tensile";

export function TooltipDemo() {
  return (
    <Tooltip label="Add item">
      {(trigger) => (
        <IconButton {...trigger} label="Add item">
          <Icon>
            <path d="M12 5v14M5 12h14" />
          </Icon>
        </IconButton>
      )}
    </Tooltip>
  );
}
