import { useState } from "react";
import { SwipeButton, Button } from "tensile";

export function SwipeButtonDemo() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="grid w-full max-w-xs justify-items-center gap-4">
      <SwipeButton
        confirmed={confirmed}
        onConfirm={() => setConfirmed(true)}
        label="Slide to archive"
        confirmedLabel="Archived"
      />
      <Button variant="secondary" size="sm" onClick={() => setConfirmed(false)}>
        Reset
      </Button>
    </div>
  );
}
