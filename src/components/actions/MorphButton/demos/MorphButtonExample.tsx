import { useEffect, useState } from "react";
import { MorphButton } from "tensile";

export function MorphButtonExample() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus(status === "loading" ? "success" : "idle"), 1400);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div style={{ display: "grid", justifyItems: "start", gap: 16 }}>
      <MorphButton
        status={status}
        loadingLabel="Saving demo"
        successLabel="Demo saved"
        onClick={() => setStatus("loading")}
      >
        Save changes
      </MorphButton>
      <p role="status" style={{ color: "var(--tn-color-muted)", fontSize: 13 }}>
        {status === "idle" ? "Try it. This saves no data." : status === "loading" ? "Simulating a request…" : "Saved. Ready to try again shortly."}
      </p>
    </div>
  );
}
