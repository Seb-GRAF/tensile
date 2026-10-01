import { useState } from "react";
import { Button, Card, Separator } from "tensile";

export function CardInkDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card tone="ink" className="w-80 max-w-full p-5">
      <h3 className="text-body font-semibold">Pro plan</h3>
      <p className="mt-2 text-label text-muted">Three of five seats in use.</p>
      <Separator className="my-4" />
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide billing details" : "View billing details"}
      </Button>
      {expanded && (
        <p className="mt-3 text-label text-muted">
          Renews on October 12 for $12 per month.
        </p>
      )}
    </Card>
  );
}
