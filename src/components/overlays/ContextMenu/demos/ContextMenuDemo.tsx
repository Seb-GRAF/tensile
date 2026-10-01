import { useState } from "react";
import { ContextMenu, Card } from "tensile";

const actions = [
  { label: "Rename" },
  { label: "Download", disabled: true },
  { label: "Archive" },
];

export function ContextMenuDemo() {
  const [result, setResult] = useState("");

  return (
    <div className="grid gap-4 py-4">
      <ContextMenu
        menuLabel="Project actions"
        actions={actions}
        onAction={(action) => setResult(action.label)}
      >
        <Card className="p-6">
          <p className="text-body font-medium">Project notes</p>
          <p className="mt-2 text-label text-muted">
            Right-click, long-press, or focus and press Shift+F10.
          </p>
        </Card>
      </ContextMenu>
      <output aria-live="polite" className="text-label">
        {result}
      </output>
    </div>
  );
}
