import { Alert } from "tensile";

export function AlertDemo() {
  return (
    <Alert
      status="info"
      title="Review scheduled"
      description="Your team review is on Friday at 10 AM."
      className="max-w-sm"
    />
  );
}
