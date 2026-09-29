import { useState } from "react";
import { Tooltip, Toolbar, IconButton, Icon } from "tensile";

export function TooltipGroupDemo() {
  const [zoom, setZoom] = useState(100);

  return (
    <Toolbar label="Zoom">
      <Tooltip label="Zoom out">
        {(trigger) => (
          <IconButton
            {...trigger}
            label="Zoom out"
            variant="ghost"
            onClick={() => setZoom(zoom - 10)}
          >
            <Icon>
              <path d="M5 12h14" />
            </Icon>
          </IconButton>
        )}
      </Tooltip>
      <span className="text-label tabular-nums">{zoom}%</span>
      <Tooltip label="Zoom in">
        {(trigger) => (
          <IconButton
            {...trigger}
            label="Zoom in"
            variant="ghost"
            onClick={() => setZoom(zoom + 10)}
          >
            <Icon>
              <path d="M12 5v14M5 12h14" />
            </Icon>
          </IconButton>
        )}
      </Tooltip>
    </Toolbar>
  );
}
