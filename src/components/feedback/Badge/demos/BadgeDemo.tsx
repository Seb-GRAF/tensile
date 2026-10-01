import { useState } from "react";
import { Badge, Button } from "tensile";

export function BadgeDemo() {
  const [count, setCount] = useState(12);

  return (
    <div className="flex items-center gap-4">
      <Badge count={count} />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setCount(count === 0 ? 12 : 0)}
      >
        {count === 0 ? "Add notifications" : "Clear notifications"}
      </Button>
    </div>
  );
}
