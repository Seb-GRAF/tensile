import { useState } from "react";
import { Icon, IconButton } from "tensile";

export function IconButtonDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid justify-items-center gap-3">
      <IconButton label="Save article" aria-pressed={saved} onClick={() => setSaved(!saved)}>
        <Icon size={20}>
          <path d="M6 3h12v18l-6-4-6 4Z" />
        </Icon>
      </IconButton>
      <output aria-live="polite" className="text-label text-muted">
        {saved ? "Article saved." : "Save this article for later."}
      </output>
    </div>
  );
}
