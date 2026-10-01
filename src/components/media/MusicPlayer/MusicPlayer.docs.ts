import { MusicPlayerDemo } from "./demos/MusicPlayerDemo";
import musicPlayerDemoCode from "./demos/MusicPlayerDemo.tsx?raw";

export default {
  description: "Expand a compact music pill into a playback interface.",
  usage: "Pass the track's title, artist and duration. Control whether it is open with expanded and onExpandedChange, or leave expanded out and start from defaultExpanded.",
  anatomy: "Expand connects the compact pill and player. The player contains play/pause, SeekBar and time readouts.",
  notes: [
    "This component currently uses an internal simulated playback clock. It has no audio source or playback callbacks.",
    "Use VideoControls or your own controlled media composition to connect a real media element."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A compact pill that opens into the player; playback runs on a simulated clock, so use it as a prototype or a pattern to copy, not to play audio.", Demo: MusicPlayerDemo, code: musicPlayerDemoCode },
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
    "title": "Track title, shown in the pill and the player and used in openLabel.",
    "artist": "Artist name shown in the expanded player.",
    "duration": "Track length in seconds.",
    "expanded": "Whether the player is open. Leave it out to let the player track it, starting from defaultExpanded.",
    "defaultExpanded": "Whether the player starts open when it tracks this itself.",
    "onExpandedChange": "Called with true when the pill is pressed, and with false when Minimize or Escape closes the player.",
    "openLabel": "Build the compact player’s accessible name.",
    "minimizeLabel": "Accessible name of the minimize action.",
    "playLabel": "Accessible name of play.",
    "pauseLabel": "Accessible name of pause.",
    "seekLabel": "Accessible name of the seek slider.",
    "formatTime": "Format a time in seconds for display.",
    "className": "Classes on the wrapper around the pill, for placement; the open player grows over the page from there."
  },
};
