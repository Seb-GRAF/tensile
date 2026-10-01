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
    { id: "usage", title: "Basic usage", description: "A clip's waveform that you scrub by dragging or with the arrow keys; use it for voice messages or audio clips, where the shape of the sound helps find a spot.", Demo: WaveformScrubberDemo, code: waveformScrubberDemoCode },
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
    "value": "Position in seconds, kept by the parent so it can follow playback.",
    "onValueChange": "Called with the position in seconds while the waveform is dragged or an arrow, Home or End key moves it; seek the media element to it.",
    "duration": "Length in seconds.",
    "label": "Name of the position slider.",
    "formatTime": "Format a time in seconds for display.",
    "className": "Classes on the ink card, for placement and width; it fills its container by default."
  },
};
