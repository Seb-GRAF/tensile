import { useState } from "react";
import { FileUpload } from "tensile";

export function FileUploadMultipleDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <FileUpload
        status="idle"
        progress={0}
        onFiles={setFiles}
        multiple
        accept=".pdf,.png"
      />
      <output aria-live="polite" className="text-label text-muted">
        {files.map((file) => file.name).join(", ")}
      </output>
    </div>
  );
}
