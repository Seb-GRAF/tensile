import { WaveformScrubberDemo } from "./demos/WaveformScrubberDemo";
import waveformScrubberDemoCode from "./demos/WaveformScrubberDemo.tsx?raw";

export default {
  description: "Seek through media using a waveform.",
  usage: "Pass precomputed peaks, a positive duration and a controlled position in seconds. Connect onValueChange to your media element to seek.",
  anatomy: "An ink Card holds a named slider that draws the peak bars and played portion. TimeReadout displays the position and duration.",
  notes: [
    "The component does not decode audio or generate peaks.",
    "Keep position between zero and duration and peak heights between zero and one."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled waveform position and duration.", Demo: WaveformScrubberDemo, code: waveformScrubberDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Seek backward or forward by five seconds."
    },
    {
      "key": "Home / End",
      "description": "Seek to the start or end."
    }
  ],
  related: [
    "VideoControls",
    "MusicPlayer"
  ],
  props: {
    "peaks": "Bar heights from 0 to 1, one bar per peak.",
    "value": "Position in seconds.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "duration": "Length in seconds.",
    "label": "Accessible name of the control or region.",
    "formatTime": "Format a time in seconds for display.",
    "className": "Additional classes on the outer element."
  },
};
