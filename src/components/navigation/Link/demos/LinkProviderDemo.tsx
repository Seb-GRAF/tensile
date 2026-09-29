import { useState } from "react";
import { Link, LinkProvider } from "tensile";

export function LinkProviderDemo() {
  const [path, setPath] = useState("/projects");

  return (
    <LinkProvider navigate={setPath}>
      <div className="grid gap-4">
        <div className="flex gap-4">
          <Link href="/projects">Projects</Link>
          <Link href="/settings">Settings</Link>
        </div>
        <output aria-live="polite" className="text-label">
          Local route: {path}
        </output>
      </div>
    </LinkProvider>
  );
}
