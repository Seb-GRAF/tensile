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
        <Skeleton className="size-11 shrink-0 rounded-full" />
        <div className="grid min-w-0 flex-1 gap-3">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-3 w-2/3 rounded-full" />
        </div>
      </Card>
    </section>
  );
}
