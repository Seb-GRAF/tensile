import { Card } from "tensile";

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm p-5">
      <h3 className="text-body font-semibold">Storage</h3>
      <p className="mt-2 text-label text-muted">
        You have used 18.4 GB of your 25 GB allowance.
      </p>
      <p className="mt-4 text-label">6.6 GB available</p>
    </Card>
  );
}
