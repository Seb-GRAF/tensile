import { useState } from "react";
import { Button } from "tensile";

export function ButtonDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid justify-items-center gap-3">
      <Button onClick={() => setSaved(true)}>Save changes</Button>
      <output aria-live="polite" className="text-label text-muted">
        {saved ? "Changes saved." : "You have unsaved changes."}
      </output>
    </div>
  );
}
