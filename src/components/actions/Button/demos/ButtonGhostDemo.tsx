import { useState } from "react";
import { Button } from "tensile";

export function ButtonGhostDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid justify-items-center gap-3">
      <Button
        variant="ghost"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide details" : "Show details"}
      </Button>
      {expanded && <p className="text-label text-muted">Your plan includes five seats.</p>}
    </div>
  );
}
