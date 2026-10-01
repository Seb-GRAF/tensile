import { Separator } from "tensile";

export function SeparatorVerticalDemo() {
  return (
    <div className="flex items-center gap-3 text-label text-muted">
      <span>PDF</span>
      <Separator orientation="vertical" aria-hidden />
      <span>2.4 MB</span>
      <Separator orientation="vertical" aria-hidden />
      <span>12 pages</span>
    </div>
  );
}
