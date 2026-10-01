import { useState } from "react";
import { BottomSheet, Button } from "tensile";

export function BottomSheetLongContentDemo() {
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
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index} className="text-body">
              Update {index + 1}: the draft is ready for review.
            </p>
          ))}
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </BottomSheet>
    </>
  );
}
