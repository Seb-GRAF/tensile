import { useState } from "react";
import { VolumeSlider, Card } from "tensile";

export function VolumeSliderInkDemo() {
  const [volume, setVolume] = useState(0.5);

  return (
    <Card tone="ink" className="w-full max-w-xs p-5">
      <VolumeSlider value={volume} onValueChange={setVolume} tone="ink" />
    </Card>
  );
}
