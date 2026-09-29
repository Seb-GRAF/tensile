import { useState } from "react";
import { Popover, Dialog, Button } from "tensile";

export function PopoverDialogDemo() {
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={dialog}
      onOpenChange={setDialog}
      title="Project"
      trigger="Open project"
    >
      <div className="py-4">
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger="Project details"
          panelLabel="Project details"
        >
          <div className="grid gap-4 p-4">
            <p className="text-body">
              Only invited people can view this project.
            </p>
            <Button onClick={() => setOpen(false)}>Got it</Button>
          </div>
        </Popover>
      </div>
    </Dialog>
  );
}
