import { useState } from "react";
import { Icon, IconButton } from "tensile";

export function IconButtonGhostDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <IconButton
        label="Like article"
        variant="ghost"
        aria-pressed={liked}
        onClick={() => setLiked(!liked)}
      >
        <Icon size={20}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        </Icon>
      </IconButton>
      <output aria-live="polite" className="text-label text-muted">
        {liked ? "You liked this article." : "Like this article."}
      </output>
    </div>
  );
}
