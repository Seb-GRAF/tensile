import { useState } from "react";
import { Dialog, Button } from "tensile";

export function DialogWithoutTriggerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Open project
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Project details"
        trigger={null}
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
