import { DescriptionList, StatusBadge, Link } from "tensile";

export function DescriptionListContentDemo() {
  return (
    <DescriptionList
      className="w-full max-w-lg"
      items={[
        {
          label: "Status",
          value: <StatusBadge status="success" label="Approved" />,
        },
        {
          label: "Guidance",
          value: (
            <Link
              href="https://www.w3.org/WAI/"
              target="_blank"
              rel="noreferrer"
            >
              Accessibility resources
            </Link>
          ),
        },
      ]}
    />
  );
}
