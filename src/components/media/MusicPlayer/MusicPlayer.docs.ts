import { MusicPlayerDemo } from "./demos/MusicPlayerDemo";
import musicPlayerDemoCode from "./demos/MusicPlayerDemo.tsx?raw";

export default {
  description: "Expand a compact music pill into a playback interface.",
  usage: "Control expanded and supply track metadata and duration.",
  anatomy: "Expand connects the compact pill and player. The player contains play/pause, SeekBar and time readouts.",
  notes: [
    "This component currently uses an internal simulated playback clock. It has no audio source or playback callbacks.",
    "Use VideoControls or your own controlled media composition to connect a real media element."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Expanded and collapsed player; explain its internal simulated playback.", Demo: MusicPlayerDemo, code: musicPlayerDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Open the player or activate its controls."
    },
    {
      "key": "Left / Right on seek",
      "description": "Adjust the playback position."
    },
    {
      "key": "Escape",
      "description": "Minimize the player."
    }
  ],
  related: [
    "VideoControls",
    "WaveformScrubber"
  ],
  props: {
    "title": "Title displayed by the component.",
    "artist": "Artist name shown in the expanded player.",
    "duration": "Track length in seconds.",
    "expanded": "Whether the content is expanded.",
    "onExpandedChange": "Called when the expanded state changes.",
    "openLabel": "Build the compact player’s accessible name.",
    "minimizeLabel": "Accessible name of the minimize action.",
    "playLabel": "Accessible name of play.",
    "pauseLabel": "Accessible name of pause.",
    "seekLabel": "Accessible name of the seek slider.",
    "formatTime": "Format a time in seconds for display.",
    "className": "Additional classes on the outer element."
  },
};
