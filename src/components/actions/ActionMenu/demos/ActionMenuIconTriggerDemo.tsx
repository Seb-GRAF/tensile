import { useState } from "react";
import { ActionMenu, Icon } from "tensile";

const actions = [
  { label: "Rename" },
  { label: "Download", disabled: true },
  { label: "Archive" },
];

export function ActionMenuIconTriggerDemo() {
  const [result, setResult] = useState("");

  return (
    <div className="grid justify-items-start gap-4">
      <div className="flex gap-4">
        <ActionMenu
          label="Project actions"
          trigger={
            <Icon>
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </Icon>
          }
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
