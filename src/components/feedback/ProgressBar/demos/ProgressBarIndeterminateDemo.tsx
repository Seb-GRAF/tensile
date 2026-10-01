import { ProgressBar } from "tensile";

export function ProgressBarIndeterminateDemo() {
  return (
    <ProgressBar value={null} label="Loading projects" className="max-w-xs" />
  );
}
