import { useState } from "react";
import { Drawer, Button } from "tensile";

export function DrawerLongContentDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Open drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} title="Project details">
        <div className="grid gap-5">
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index} className="text-body">
              Update {index + 1}: the draft is ready for review.
            </p>
          ))}
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </Drawer>
    </>
  );
}
