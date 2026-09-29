import { useState } from "react";
import { SplitPane } from "tensile";

export function SplitPaneDemo() {
  const [value, setValue] = useState(0.4);

  return (
    <div className="h-64 w-full">
      <SplitPane
        value={value}
        onValueChange={setValue}
        label="Resize project panes"
        left={
          <div className="p-4">
            <h3 className="text-label font-semibold">Projects</h3>
            <p className="mt-3 text-label">Studio</p>
          </div>
        }
        right={
          <div className="p-4">
            <h3 className="text-label font-semibold">Studio</h3>
            <p className="mt-3 text-label text-muted">
              Review the project brief and next steps.
            </p>
          </div>
        }
      />
    </div>
  );
}
