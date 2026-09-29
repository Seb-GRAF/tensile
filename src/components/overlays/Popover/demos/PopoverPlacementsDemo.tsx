import { useState } from "react";
import { Popover, Button } from "tensile";

const placements = [
  "bottom-left",
  "bottom-center",
  "bottom-right",
  "top-left",
  "top-center",
  "top-right",
] as const;

export function PopoverPlacementsDemo() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {placements.map((placement) => (
        <Popover
          key={placement}
          placement={placement}
          trigger={placement}
          panelLabel="Placement example"
          open={open === placement}
          onOpenChange={(next) => setOpen(next ? placement : null)}
        >
          <div className="grid gap-3 p-4">
            <p className="text-label">Preferred placement: {placement}</p>
            <Button onClick={() => setOpen(null)}>Close</Button>
          </div>
        </Popover>
      ))}
    </div>
  );
}
