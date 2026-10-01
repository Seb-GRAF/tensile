import { useState } from "react";
import { CommandPalette } from "tensile";

const commands = [
  { label: "Create project" },
  { label: "Open project" },
  { label: "Archive project" },
];

export function CommandPaletteEmptyDemo() {
  const [result, setResult] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-4">
      <CommandPalette
        commands={commands}
        label="Find a project action"
        onSelect={(command) => setResult(command.label)}
        emptyText="No matching project actions"
      />
      <output aria-live="polite" className="text-label">
        {result}
      </output>
    </div>
  );
}
