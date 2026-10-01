import { useState } from "react";
import { IconButton } from "tensile";

export function IconButtonGhostDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <IconButton
        label="Like article"
        icon="heart"
        variant="ghost"
        aria-pressed={liked}
        onClick={() => setLiked(!liked)}
      />
      <output aria-live="polite" className="text-label text-muted">
        {liked ? "You liked this article." : "Like this article."}
      </output>
    </div>
  );
}
