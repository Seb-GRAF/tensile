import { Badge, Card } from "tensile";

export function BadgeDotDemo() {
  return (
    <Card tone="ink" className="flex items-center gap-3 p-5">
      <span className="text-label">Notifications</span>
      <Badge count={null} />
    </Card>
  );
}
