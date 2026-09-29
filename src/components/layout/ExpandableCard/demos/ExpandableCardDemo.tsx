import { useState } from "react";
import { ExpandableCard, Button } from "tensile";

export function ExpandableCardDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-100 w-full max-w-sm">
      <ExpandableCard
        title="Project brief"
        subtitle="Studio · Draft"
        visual={
          <svg viewBox="0 0 56 56" className="size-full">
            <rect width="56" height="56" className="fill-ink" />
            <circle cx="35" cy="22" r="12" className="fill-accent" />
          </svg>
        }
        open={open}
        onOpenChange={setOpen}
      >
        <p className="text-label text-muted">
          A shared brief for the new collection. Review the goals and timeline
          with your team.
        </p>
        <Button className="mt-5" onClick={() => setOpen(false)}>
          Done
        </Button>
      </ExpandableCard>
    </div>
  );
}
