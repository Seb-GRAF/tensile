import { useState } from "react";
import { Tooltip, Toolbar, IconButton } from "tensile";

export function TooltipGroupDemo() {
  const [zoom, setZoom] = useState(100);

  return (
    <Toolbar label="Zoom">
      <Tooltip label="Zoom out">
        {(trigger) => (
          <IconButton
            {...trigger}
            label="Zoom out"
            icon="minus"
            variant="ghost"
            onClick={() => setZoom(zoom - 10)}
          />
        )}
      </Tooltip>
      <span className="text-label tabular-nums">{zoom}%</span>
      <Tooltip label="Zoom in">
        {(trigger) => (
          <IconButton
            {...trigger}
            label="Zoom in"
            icon="plus"
            variant="ghost"
            onClick={() => setZoom(zoom + 10)}
          />
        )}
      </Tooltip>
    </Toolbar>
  );
}
