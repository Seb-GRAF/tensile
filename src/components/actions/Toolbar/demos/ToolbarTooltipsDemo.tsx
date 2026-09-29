import { useState } from "react";
import { Icon, IconButton, Toolbar, Tooltip } from "tensile";

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
              size="sm"
              variant={bold ? "primary" : "ghost"}
              aria-pressed={bold}
              onClick={() => setBold(!bold)}
            >
              <Icon>
                <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
              </Icon>
            </IconButton>
          )}
        </Tooltip>
        <Tooltip label="Italic">
          {(trigger) => (
            <IconButton
              {...trigger}
              label="Italic"
              size="sm"
              variant={italic ? "primary" : "ghost"}
              aria-pressed={italic}
              onClick={() => setItalic(!italic)}
            >
              <Icon>
                <path d="M19 4h-9M14 20H5M15 4 9 20" />
              </Icon>
            </IconButton>
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
