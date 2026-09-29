import { Spinner } from "tensile";

export function SpinnerSizesDemo() {
  return (
    <div className="flex items-end gap-6 text-muted">
      {[16, 20, 24, 32].map((size) => (
        <div key={size} className="grid justify-items-center gap-2">
          <Spinner size={size} />
          <span className="text-caption">{size}px</span>
        </div>
      ))}
    </div>
  );
}
