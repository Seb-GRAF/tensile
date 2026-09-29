import { ProgressRingDemo } from "./demos/ProgressRingDemo";
import progressRingDemoCode from "./demos/ProgressRingDemo.tsx?raw";

export default {
  description: "Display circular task progress.",
  usage: "Pass a fraction from zero to one and a label naming the task.",
  anatomy: "A progressbar exposes the percentage to assistive technology.",
  notes: [
    "The caller owns progress. The example advances it manually.",
    "At exactly one, the ring becomes a check and exposes doneLabel."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Progress and completion state.", Demo: ProgressRingDemo, code: progressRingDemoCode },
  ],
  keyboard: [],
  related: [
    "ProgressBar",
    "LoadingState"
  ],
  props: {
    "value": "0..1",
    "label": "Accessible name of the control or region.",
    "formatValue": "Format a value for display or accessible value text.",
    "doneLabel": "Read out instead of the value once it reaches 1.",
    "className": "Additional classes on the outer element."
  },
};
