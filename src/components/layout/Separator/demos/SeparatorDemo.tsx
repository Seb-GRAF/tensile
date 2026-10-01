import { Separator } from "tensile";

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <p className="text-body font-medium">Quarterly report</p>
      <p className="mt-1 text-label text-muted">January – March 2026</p>
      <Separator className="my-4" />
      <p className="text-label">Revenue grew 12% compared with the previous quarter.</p>
    </div>
  );
}
