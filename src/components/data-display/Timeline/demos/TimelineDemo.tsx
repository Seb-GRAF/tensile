import { Timeline } from "tensile";

export function TimelineDemo() {
  return (
    <Timeline
      label="Project activity"
      className="w-full max-w-md"
      items={[
        {
          id: "review",
          title: "Draft approved",
          description: "The team signed off on the final version.",
          time: "Today",
        },
        {
          id: "created",
          title: "Project created",
          description: "Maya opened the workspace.",
          time: "Sep 24",
        },
      ]}
    />
  );
}
