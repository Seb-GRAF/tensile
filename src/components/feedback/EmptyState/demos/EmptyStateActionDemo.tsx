import { useState } from "react";
import { EmptyState, Icon, Button, Card } from "tensile";

export function EmptyStateActionDemo() {
  const [created, setCreated] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      {created ? (
        <p role="status" className="p-6 text-body">
          Untitled project created.
        </p>
      ) : (
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started."
          icon={
            <Icon size={24}>
              <path d="M12 5v14M5 12h14" />
            </Icon>
          }
          action={
            <Button onClick={() => setCreated(true)}>Create project</Button>
          }
        />
      )}
    </Card>
  );
}
