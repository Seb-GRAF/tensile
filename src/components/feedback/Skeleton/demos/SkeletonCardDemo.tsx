import { Skeleton, Card } from "tensile";

export function SkeletonCardDemo() {
  return (
    <section
      aria-label="Loading profile"
      aria-busy="true"
      className="w-80 max-w-full"
    >
      <span role="status" className="sr-only">
        Loading profile
      </span>
      <Card className="flex items-center gap-4 p-5">
        <Skeleton variant="circle" className="w-11" />
        <Skeleton variant="text" lines={2} className="min-w-0 flex-1" />
      </Card>
    </section>
  );
}
