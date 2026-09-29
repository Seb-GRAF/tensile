import { useState } from "react";
import { AlertDialog, Button } from "tensile";

export function AlertDialogExternalTriggerDemo() {
  const [open, setOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  return (
    <div className="grid justify-items-center gap-4">
      <Button
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Archive project
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Archive project?"
        description="The project will leave your active list. You can restore it later."
        confirmLabel="Archive"
        onConfirm={() => setArchived(true)}
      />
      <output aria-live="polite" className="text-label">
        {archived ? "Project archived" : "Project is active"}
      </output>
    </div>
  );
}
