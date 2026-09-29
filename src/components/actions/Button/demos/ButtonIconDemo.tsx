import { useState } from "react";
import { Button, Icon } from "tensile";

export function ButtonIconDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="grid justify-items-center gap-3">
      <Button onClick={() => setCount(count + 1)}>
        <Icon size={20}>
          <path d="M12 5v14M5 12h14" />
        </Icon>
        Add item
      </Button>
      <output aria-live="polite" className="text-label text-muted">
        Items added: {count}
      </output>
    </div>
  );
}
