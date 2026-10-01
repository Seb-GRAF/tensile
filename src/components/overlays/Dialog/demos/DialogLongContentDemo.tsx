import { useState } from "react";
import { Dialog, Button } from "tensile";

export function DialogLongContentDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Project details"
        trigger="Open project"
      >
        <div className="grid gap-4 pt-4">
          {Array.from({ length: 16 }, (_, index) => (
            <p key={index} className="text-body">
              Section {index + 1}: project members can review and comment on the
              shared draft.
            </p>
          ))}
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </Dialog>
    </>
  );
}
