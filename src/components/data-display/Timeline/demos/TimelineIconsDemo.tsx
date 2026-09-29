import { Timeline, Icon } from "tensile";

export function TimelineIconsDemo() {
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
          icon: (
            <Icon size={14}>
              <path d="m5 12 4 4L19 6" />
            </Icon>
          ),
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
