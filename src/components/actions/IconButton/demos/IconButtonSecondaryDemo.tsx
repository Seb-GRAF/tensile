import { useState } from "react";
import { IconButton } from "tensile";

export function IconButtonSecondaryDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <IconButton label="Add item" variant="secondary" onClick={() => setCount(count + 1)} icon="plus" />
      <output aria-live="polite" className="text-label text-muted">Items added: {count}</output>
    </div>
  );
}
