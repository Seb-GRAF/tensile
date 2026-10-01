import { Card, Skeleton } from "tensile";

export function SkeletonMediaDemo() {
  return (
    <section
      aria-label="Loading article"
      aria-busy="true"
      className="w-80 max-w-full"
    >
      <span role="status" className="sr-only">
        Loading article
      </span>
      <Card className="grid gap-4 p-5">
        <Skeleton variant="media" className="aspect-video w-full" />
        <Skeleton variant="text" lines={2} />
      </Card>
    </section>
  );
}
