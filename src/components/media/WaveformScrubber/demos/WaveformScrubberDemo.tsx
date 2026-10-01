import { useState } from "react";
import { WaveformScrubber } from "tensile";

const peaks = [
  0.2, 0.4, 0.3, 0.7, 0.9, 0.5, 0.4, 0.8, 1, 0.6, 0.3, 0.5, 0.7, 0.4, 0.2, 0.3,
  0.6, 0.9, 0.5, 0.2,
];

export function WaveformScrubberDemo() {
  const [position, setPosition] = useState(24);

  return (
    <WaveformScrubber
      peaks={peaks}
      value={position}
      onValueChange={setPosition}
      duration={90}
      label="Audio position"
      className="w-full max-w-sm"
    />
  );
}
