import { VolumeSliderDemo } from "./demos/VolumeSliderDemo";
import volumeSliderDemoCode from "./demos/VolumeSliderDemo.tsx?raw";
import { VolumeSliderInkDemo } from "./demos/VolumeSliderInkDemo";
import volumeSliderInkDemoCode from "./demos/VolumeSliderInkDemo.tsx?raw";

export default {
  description: "Set a volume level by dragging or with the arrow keys.",
  usage: "Apply the value from onValueChange, from 0 to 1, to your media element. Control it with value, or leave value out and start from defaultValue. Choose the tone that matches the surface.",
  anatomy: "One named slider contains the speaker icon and fill.",
  notes: [
    "This component emits volume values; it does not control audio itself."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A full-width volume slider on a paper surface, for a player or a settings panel.", Demo: VolumeSliderDemo, code: volumeSliderDemoCode },
    { id: "ink", title: "Ink", description: "The ink tone on a dark surface, as in VideoControls or a dark player bar.", Demo: VolumeSliderInkDemo, code: volumeSliderInkDemoCode },
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
    "value": "Volume, 0..1. Leave it out to let the slider track it, starting from defaultValue.",
    "defaultValue": "The first volume, 0..1, when the slider tracks it itself.",
    "onValueChange": "Called with the volume, 0..1, while the track is dragged or an arrow key moves it.",
    "label": "Name of the slider.",
    "tone": "\"paper\" for light surfaces, \"ink\" for dark ones.",
    "formatValue": "Turns the volume into the slider's value text, e.g. \"45%\".",
    "className": "Classes on the 44 px track, for placement and width; it fills its container by default."
  },
};
