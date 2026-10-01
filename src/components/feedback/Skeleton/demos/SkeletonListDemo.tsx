import { Card, Skeleton } from "tensile";

export function SkeletonListDemo() {
  return (
    <section
      aria-label="Loading messages"
      aria-busy="true"
      className="w-80 max-w-full"
    >
      <span role="status" className="sr-only">
        Loading messages
      </span>
      <Card className="p-5">
        <div className="grid gap-5">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-3">
              <Skeleton variant="circle" className="w-8" />
              <Skeleton variant="text" lines={2} className="min-w-0 flex-1" />
              <Skeleton className="h-3 w-10 rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
