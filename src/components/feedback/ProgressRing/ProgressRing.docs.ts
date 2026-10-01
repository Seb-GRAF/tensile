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
    { id: "usage", title: "Basic usage", description: "A ring that fills as an export advances and turns into a check at 1; use it where a full-width bar doesn't fit, as in a toolbar or a row.", Demo: ProgressRingDemo, code: progressRingDemoCode },
  ],
  keyboard: [],
  related: [
    "ProgressBar",
    "LoadingState"
  ],
  props: {
    "value": "0..1",
    "label": "Name of the progress ring, e.g. \"Export progress\".",
    "formatValue": "Turns the value into the text read out for it, \"45%\" by default.",
    "doneLabel": "Read out instead of the value once it reaches 1.",
    "className": "Classes on the 44 px ring, for placement."
  },
};
