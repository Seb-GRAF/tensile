import { useState } from "react";
import { NumberTicker, Button } from "tensile";

export function NumberTickerDemo() {
  const [value, setValue] = useState(99);

  return (
    <div className="grid justify-items-center gap-4">
      <span className="text-3xl font-semibold">
        <NumberTicker value={value} />
      </span>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setValue(value - 1)}
        >
          Decrease
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setValue(value + 1)}
        >
          Increase
        </Button>
      </div>
    </div>
  );
}
