import { useState } from "react";
import { PageHeader, Breadcrumbs, Button } from "tensile";

export function PageHeaderActionsDemo() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid w-full gap-4">
      <PageHeader
        title="Projects"
        description="Shared work and upcoming reviews."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Workspace" }, { label: "Projects" }]}
            onNavigate={(item) => setMessage(`Opened ${item.label}`)}
          />
        }
        actions={
          <Button onClick={() => setMessage("Untitled project created")}>
            New project
          </Button>
        }
      />
      <output aria-live="polite" className="text-label">
        {message}
      </output>
    </div>
  );
}
