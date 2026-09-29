import { useState } from "react";
import { FileUpload, Button } from "tensile";

export function FileUploadProgressDemo() {
  const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");
  const [progress, setProgress] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <FileUpload
        status={status}
        progress={progress}
        onFiles={() => {
          setStatus("uploading");
          setProgress(0.25);
        }}
      />
      <p className="text-label text-muted">
        Simulated upload. No file leaves your browser.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={status !== "uploading"}
          onClick={() => {
            const next = Math.min(1, progress + 0.25);
            setProgress(next);
            if (next === 1) setStatus("done");
          }}
        >
          Advance progress
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setStatus("idle");
            setProgress(0);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
