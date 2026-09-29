import { CopyButton } from "tensile";

export function CopyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <code className="text-label">npm install tensile</code>
      <CopyButton value="npm install tensile" />
    </div>
  );
}
