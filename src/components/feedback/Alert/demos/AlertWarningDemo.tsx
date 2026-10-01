import { Alert } from "tensile";

export function AlertWarningDemo() {
  return (
    <Alert
      status="warning"
      title="Storage almost full"
      description="Remove unused files before uploading more."
      className="max-w-sm"
    />
  );
}
