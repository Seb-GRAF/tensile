import { useState } from "react";
import { MorphButton, Button } from "tensile";

export function MorphButtonStatesDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  return (
    <div className="grid justify-items-center gap-4">
      <MorphButton status={status}>Save changes</MorphButton>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Idle
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setStatus("loading")}
        >
          Loading
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setStatus("success")}
        >
          Success
        </Button>
      </div>
    </div>
  );
}
