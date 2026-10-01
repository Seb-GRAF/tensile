import { useState } from "react";
import { ProgressBar, Button } from "tensile";

export function ProgressBarDemo() {
  const [progress, setProgress] = useState(0.25);

  return (
    <div className="grid w-full max-w-xs justify-items-center gap-4">
      <ProgressBar value={progress} label="Export progress" />
      <Button
        variant="secondary"
        onClick={() => setProgress(progress === 1 ? 0 : progress + 0.25)}
      >
        {progress === 1 ? "Reset" : "Advance progress"}
      </Button>
    </div>
  );
}
