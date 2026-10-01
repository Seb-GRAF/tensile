import { useState } from "react";
import { IconButton, Toolbar, Tooltip } from "tensile";

export function ToolbarTooltipsDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <div className="grid w-full max-w-sm gap-5">
      <Toolbar label="Text formatting">
        <Tooltip label="Bold">
          {(trigger) => (
            <IconButton
              {...trigger}
              label="Bold"
              icon="bold"
              size="sm"
              variant={bold ? "primary" : "ghost"}
              aria-pressed={bold}
              onClick={() => setBold(!bold)}
            />
          )}
        </Tooltip>
        <Tooltip label="Italic">
          {(trigger) => (
            <IconButton
              {...trigger}
              label="Italic"
              icon="italic"
              size="sm"
              variant={italic ? "primary" : "ghost"}
              aria-pressed={italic}
              onClick={() => setItalic(!italic)}
            />
          )}
        </Tooltip>
      </Toolbar>
      <p
        className="text-body"
        style={{ fontWeight: bold ? 700 : 400, fontStyle: italic ? "italic" : "normal" }}
      >
        Format this sentence with the toolbar.
      </p>
    </div>
  );
}
