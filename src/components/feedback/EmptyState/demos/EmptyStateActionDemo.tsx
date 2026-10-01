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
            <Icon name="plus" size={24} />
          }
          action={
            <Button onClick={() => setCreated(true)}>Create project</Button>
          }
        />
      )}
    </Card>
  );
}
