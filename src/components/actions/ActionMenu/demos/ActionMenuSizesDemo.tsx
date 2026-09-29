import { useState } from "react";
import { ActionMenu } from "tensile";

const actions = [
  { label: "Rename" },
  { label: "Download", disabled: true },
  { label: "Archive" },
];

export function ActionMenuSizesDemo() {
  const [result, setResult] = useState("");

  return (
    <div className="grid justify-items-start gap-4">
      <div className="flex gap-4">
        <ActionMenu
          label="Project actions"
          actions={actions}
          onAction={(action) => setResult(action.label)}
        />
        <ActionMenu
          size="sm"
          label="Small menu"
          actions={actions}
          onAction={(action) => setResult(action.label)}
        />
      </div>
      <output aria-live="polite" className="text-label">
        {result}
      </output>
    </div>
  );
}
