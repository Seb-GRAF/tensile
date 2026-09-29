import { ProgressBarDemo } from "./demos/ProgressBarDemo";
import progressBarDemoCode from "./demos/ProgressBarDemo.tsx?raw";
import { ProgressBarIndeterminateDemo } from "./demos/ProgressBarIndeterminateDemo";
import progressBarIndeterminateDemoCode from "./demos/ProgressBarIndeterminateDemo.tsx?raw";

export default {
  description: "Display linear task progress.",
  usage: "Pass a fraction from zero to one and a label naming the task.",
  anatomy: "A progressbar exposes the percentage to assistive technology.",
  notes: [
    "The caller owns progress. The example advances it manually.",
    "The fill covers exactly the value's share of the track: a small value shows as a sliver in the track's rounded end, and 0 shows no fill.",
    "Use null when the total is unknown. Reduced motion keeps the indeterminate segment still."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled determinate progress.", Demo: ProgressBarDemo, code: progressBarDemoCode },
    { id: "indeterminate", title: "Indeterminate", description: "Unknown progress.", Demo: ProgressBarIndeterminateDemo, code: progressBarIndeterminateDemoCode },
  ],
  keyboard: [],
  related: [
    "ProgressRing",
    "LoadingState"
  ],
  props: {
    "value": "0..1, or null while the length is unknown.",
    "label": "Accessible name of the control or region.",
    "formatValue": "Format a value for display or accessible value text.",
    "className": "Additional classes on the outer element."
  },
};
