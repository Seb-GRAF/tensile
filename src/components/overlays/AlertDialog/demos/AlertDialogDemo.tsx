import { useState } from "react";
import { AlertDialog } from "tensile";

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  return (
    <div className="grid justify-items-center gap-4">
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Archive project?"
        description="The project will leave your active list. You can restore it later."
        confirmLabel="Archive"
        trigger="Archive project"
        onConfirm={() => setArchived(true)}
      />
      <output aria-live="polite" className="text-label">
        {archived ? "Project archived" : "Project is active"}
      </output>
    </div>
  );
}
