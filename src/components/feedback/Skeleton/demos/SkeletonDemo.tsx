import { Card, Skeleton } from "tensile";

export function SkeletonDemo() {
  return (
    <Card className="grid w-80 max-w-full gap-3 p-5">
      <Skeleton className="h-4 w-full rounded-full" />
      <Skeleton className="h-4 w-2/3 rounded-full" />
    </Card>
  );
}
