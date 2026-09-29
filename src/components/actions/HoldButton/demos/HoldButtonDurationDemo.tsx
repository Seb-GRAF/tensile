import { useState } from "react";
import { HoldButton, Button } from "tensile";

export function HoldButtonDurationDemo() {
  const [done, setDone] = useState(false);

  return (
    <div className="grid justify-items-center gap-4">
      <HoldButton
        done={done}
        onDone={() => setDone(true)}
        doneLabel="Archived"
        duration={2500}
      >
        Hold to archive
      </HoldButton>
      <Button variant="secondary" size="sm" onClick={() => setDone(false)}>
        Reset
      </Button>
    </div>
  );
}
