import { Alert } from "tensile";

export function AlertSuccessDemo() {
  return (
    <Alert
      status="success"
      title="Changes saved"
      description="The project details are up to date."
      className="max-w-sm"
    />
  );
}
