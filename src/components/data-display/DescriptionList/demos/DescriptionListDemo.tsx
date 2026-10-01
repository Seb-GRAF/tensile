import { DescriptionList } from "tensile";

export function DescriptionListDemo() {
  return (
    <DescriptionList
      className="w-full max-w-lg"
      items={[
        { label: "Project", value: "Studio" },
        { label: "Owner", value: "Maya Chen" },
        { label: "Review date", value: "October 2, 2026" },
      ]}
    />
  );
}
