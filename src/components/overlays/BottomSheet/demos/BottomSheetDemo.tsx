import { useState } from "react";
import { BottomSheet, Button } from "tensile";

export function BottomSheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Open sheet
      </Button>
      <BottomSheet open={open} onOpenChange={setOpen} label="Project details">
        <div className="grid gap-5 px-5 pb-5">
          <p className="text-body">
            Keep the project notes and review actions together.
          </p>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </BottomSheet>
    </>
  );
}
