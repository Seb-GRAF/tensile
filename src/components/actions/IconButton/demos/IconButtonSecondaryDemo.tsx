import { useState } from "react";
import { Icon, IconButton } from "tensile";

export function IconButtonSecondaryDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <IconButton label="Add item" variant="secondary" onClick={() => setCount(count + 1)}>
        <Icon size={20}>
          <path d="M12 5v14M5 12h14" />
        </Icon>
      </IconButton>
      <output aria-live="polite" className="text-label text-muted">Items added: {count}</output>
    </div>
  );
}
