import { useState } from "react";
import { Button, Toolbar } from "tensile";

export function ToolbarVerticalDemo() {
  const [tool, setTool] = useState("Select");

  return (
    <Toolbar label="Drawing tools" orientation="vertical">
      {["Select", "Draw", "Erase"].map((label) => (
        <Button
          key={label}
          size="sm"
          variant={tool === label ? "primary" : "ghost"}
          aria-pressed={tool === label}
          onClick={() => setTool(label)}
        >
          {label}
        </Button>
      ))}
    </Toolbar>
  );
}
