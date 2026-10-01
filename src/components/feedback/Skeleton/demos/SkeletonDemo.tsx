import { Card, Skeleton } from "tensile";

export function SkeletonDemo() {
  return (
    <Card className="w-80 max-w-full p-5">
      <Skeleton variant="text" lines={3} />
    </Card>
  );
}
