import { useState } from "react";
import { Button } from "tensile";

export function ButtonSecondaryDemo() {
  const [discarded, setDiscarded] = useState(false);

  return (
    <div className="grid justify-items-center gap-3">
      <Button variant="secondary" onClick={() => setDiscarded(true)}>
        Discard changes
      </Button>
      <output aria-live="polite" className="text-label text-muted">
        {discarded ? "Changes discarded." : "You have unsaved changes."}
      </output>
    </div>
  );
}
