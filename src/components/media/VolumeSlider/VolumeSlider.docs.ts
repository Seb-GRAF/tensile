import { VolumeSliderDemo } from "./demos/VolumeSliderDemo";
import volumeSliderDemoCode from "./demos/VolumeSliderDemo.tsx?raw";
import { VolumeSliderInkDemo } from "./demos/VolumeSliderInkDemo";
import volumeSliderInkDemoCode from "./demos/VolumeSliderInkDemo.tsx?raw";

export default {
  description: "Adjust a controlled volume level.",
  usage: "Keep a value from zero to one and apply changes to your media element. Choose the tone that matches the surface.",
  anatomy: "One named slider contains the speaker icon and fill.",
  notes: [
    "This component emits volume values; it does not control audio itself."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled volume on paper.", Demo: VolumeSliderDemo, code: volumeSliderDemoCode },
    { id: "ink", title: "Ink", description: "Volume on an ink surface.", Demo: VolumeSliderInkDemo, code: volumeSliderInkDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Increase or decrease volume by five percentage points."
    }
  ],
  related: [
    "VideoControls",
    "Slider"
  ],
  props: {
    "value": "0..1",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "tone": "Paper or ink appearance.",
    "formatValue": "Format a value for display or accessible value text.",
    "className": "Additional classes on the outer element."
  },
};
