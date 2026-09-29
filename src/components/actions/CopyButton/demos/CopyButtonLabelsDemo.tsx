import { CopyButton } from "tensile";

export function CopyButtonLabelsDemo() {
  return (
    <div className="grid justify-items-center gap-3">
      <code className="text-label">DESIGN-2026</code>
      <CopyButton
        value="DESIGN-2026"
        label="Copy invite code"
        copiedLabel="Code copied"
      />
    </div>
  );
}
