import { useState } from "react";
import { IconButton } from "tensile";

export function IconButtonDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid justify-items-center gap-3">
      <IconButton label="Save article" aria-pressed={saved} onClick={() => setSaved(!saved)} icon="bookmark" />
      <output aria-live="polite" className="text-label text-muted">
        {saved ? "Article saved." : "Save this article for later."}
      </output>
    </div>
  );
}
