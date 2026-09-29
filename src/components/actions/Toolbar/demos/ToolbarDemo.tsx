import { useState } from "react";
import { Button, Toolbar } from "tensile";

export function ToolbarDemo() {
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");

  return (
    <div className="grid w-full max-w-sm gap-5">
      <Toolbar label="Text alignment">
        <Button
          size="sm"
          variant={alignment === "left" ? "primary" : "ghost"}
          aria-pressed={alignment === "left"}
          onClick={() => setAlignment("left")}
        >
          Left
        </Button>
        <Button
          size="sm"
          variant={alignment === "center" ? "primary" : "ghost"}
          aria-pressed={alignment === "center"}
          onClick={() => setAlignment("center")}
        >
          Center
        </Button>
        <Button
          size="sm"
          variant={alignment === "right" ? "primary" : "ghost"}
          aria-pressed={alignment === "right"}
          onClick={() => setAlignment("right")}
        >
          Right
        </Button>
      </Toolbar>
      <p className="text-body" style={{ textAlign: alignment }}>
        A paragraph to preview the alignment.
      </p>
    </div>
  );
}
