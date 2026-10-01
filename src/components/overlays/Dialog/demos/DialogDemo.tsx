import { useState } from "react";
import { Dialog, Button } from "tensile";

export function DialogDemo() {
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
          <p className="text-body">
            Review the project details before continuing.
          </p>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </Dialog>
    </>
  );
}
