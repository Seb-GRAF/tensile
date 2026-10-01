import { useState } from "react";
import { VolumeSlider } from "tensile";

export function VolumeSliderDemo() {
  const [volume, setVolume] = useState(0.5);

  return (
    <div className="w-full max-w-xs">
      <VolumeSlider value={volume} onValueChange={setVolume} />
    </div>
  );
}
