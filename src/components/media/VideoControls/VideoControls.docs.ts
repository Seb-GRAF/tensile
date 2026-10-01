import { VideoControlsDemo } from "./demos/VideoControlsDemo";
import videoControlsDemoCode from "./demos/VideoControlsDemo.tsx?raw";

export default {
  description: "Control playback, seeking and volume for a media element.",
  usage: "Connect callbacks to a native video or audio element. Update playing, currentTime and volume from its events.",
  anatomy: "IconButton toggles playback. SeekBar controls position in seconds. VolumeSlider controls a fraction from zero to one.",
  notes: [
    "Wait for metadata and a positive duration before rendering the seek controls.",
    "The example loads an external sample video and reports load or playback errors.",
    "onScrubChange is optional when you want to pause playback during a drag."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "The bar wired to a native video element and its events; use it in place of the browser's own controls.", Demo: VideoControlsDemo, code: videoControlsDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Toggle the play button."
    },
    {
      "key": "Arrow keys",
      "description": "Adjust the focused seek or volume slider."
    }
  ],
  related: [
    "VolumeSlider",
    "WaveformScrubber"
  ],
  props: {
    "duration": "Video length in seconds.",
    "playing": "Whether the media element is playing.",
    "onPlayingChange": "Request playback or pause on the media element.",
    "currentTime": "Position in seconds.",
    "onCurrentTimeChange": "Seek the media element to this position in seconds.",
    "volume": "0..1",
    "onVolumeChange": "Set media volume from zero to one.",
    "onScrubChange": "Called with true when a seek drag starts and false when it ends, so playback can wait while scrubbing.",
    "playLabel": "Accessible name of play.",
    "pauseLabel": "Accessible name of pause.",
    "seekLabel": "Accessible name of the seek slider.",
    "volumeLabel": "Accessible name of the volume slider.",
    "formatTime": "Format a time in seconds for display.",
    "className": "Classes on the 52 px ink bar, for placement; it fills its container's width."
  },
};
