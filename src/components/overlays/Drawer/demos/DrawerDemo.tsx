import { useState } from "react";
import { Drawer, Button } from "tensile";

export function DrawerDemo() {
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
          <p className="text-body">
            Keep the project notes and review actions together.
          </p>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </Drawer>
    </>
  );
}
