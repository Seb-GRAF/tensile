import { Spinner } from "tensile";

export function SpinnerDemo() {
  return (
    <div role="status" className="flex items-center gap-2 text-body">
      <Spinner />
      Loading your files…
    </div>
  );
}
