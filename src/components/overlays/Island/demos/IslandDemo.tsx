import { useState } from "react";
import { Island, Button } from "tensile";

export function IslandDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid justify-items-center gap-8">
      <Island
        activity="Review"
        leading="Review"
        trailing="Ready"
        expanded={expanded}
        onExpandedChange={setExpanded}
        panelWidth={280}
        panelHeight={120}
      >
        <div className="flex h-full items-center justify-between gap-4 p-5">
          <p className="text-label">Your draft is ready.</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpanded(false)}
          >
            Close
          </Button>
        </div>
      </Island>
    </div>
  );
}
