import { useState } from "react";
import { Popover, Button, Icon } from "tensile";

export function PopoverIconTriggerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6m0-10v1" />
        </Icon>
      }
      label="Project details"
      panelLabel="Project details"
    >
      <div className="grid gap-4 p-4">
        <p className="text-body">Only invited people can view this project.</p>
        <Button onClick={() => setOpen(false)}>Got it</Button>
      </div>
    </Popover>
  );
}
