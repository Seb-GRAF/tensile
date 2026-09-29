import { useState } from "react";
import { PageDots, Card } from "tensile";

const pages = [
  "Create a workspace.",
  "Invite your team.",
  "Share your first project.",
];

export function PageDotsDemo() {
  const [page, setPage] = useState(0);

  return (
    <Card className="grid w-full max-w-sm gap-4 p-6">
      <p aria-live="polite" className="text-body">
        {pages[page]}
      </p>
      <PageDots
        label="Introduction pages"
        count={pages.length}
        value={page}
        onValueChange={setPage}
        className="justify-self-center"
      />
    </Card>
  );
}
