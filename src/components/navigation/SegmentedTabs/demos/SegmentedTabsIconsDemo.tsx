import { useState, useId } from "react";
import { SegmentedTabs, Card, Icon } from "tensile";

const options = [
  {
    value: "overview",
    label: "Overview",
    icon: (
      <Icon size={16}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </Icon>
    ),
  },
  {
    value: "notes",
    label: "Notes",
    icon: (
      <Icon size={16}>
        <path d="M5 5h14M5 12h14M5 19h8" />
      </Icon>
    ),
  },
];

export function SegmentedTabsIconsDemo() {
  const [value, setValue] = useState("overview");
  const id = useId();
  const index = options.findIndex((option) => option.value === value);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <SegmentedTabs
        id={id}
        label="Project sections"
        options={options}
        value={value}
        onValueChange={setValue}
        className="justify-self-start"
      />
      <Card className="p-5">
        <div
          id={`${id}-${index}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-${index}`}
          tabIndex={0}
        >
          {value === "overview"
            ? "A shared workspace for the new collection."
            : "Review the draft with the team on Friday."}
        </div>
      </Card>
    </div>
  );
}
