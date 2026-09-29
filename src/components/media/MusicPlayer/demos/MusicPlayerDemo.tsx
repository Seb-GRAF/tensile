import { useState } from "react";
import { MusicPlayer } from "tensile";

export function MusicPlayerDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid w-full justify-items-center gap-8">
      <MusicPlayer
        title="Quiet morning"
        artist="Demo track"
        duration={140}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
      <p className="max-w-xs text-center text-label text-muted">
        Visual playback demo. The internal clock advances, but no audio is
        played.
      </p>
    </div>
  );
}
