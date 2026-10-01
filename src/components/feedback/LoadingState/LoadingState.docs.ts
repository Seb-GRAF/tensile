import { LoadingStateDemo } from "./demos/LoadingStateDemo";
import loadingStateDemoCode from "./demos/LoadingStateDemo.tsx?raw";
import { LoadingStateDescriptionDemo } from "./demos/LoadingStateDescriptionDemo";
import loadingStateDescriptionDemoCode from "./demos/LoadingStateDescriptionDemo.tsx?raw";

export default {
  description: "Announce that a region is loading.",
  usage: "Use a label that names the task. Add a short description when the user needs more context.",
  anatomy: "A status region stacks Spinner above the label and description in EmptyState's layout, so loading, empty and loaded content swap in place.",
  notes: [
    "The component has no progress value or automatic completion. Replace it when the data arrives."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A spinner and a label, the plain placeholder while a list or panel loads.", Demo: LoadingStateDemo, code: loadingStateDemoCode },
    { id: "description", title: "Description", description: "Adds a line on what is loading or how long it may take, for waits longer than a moment.", Demo: LoadingStateDescriptionDemo, code: loadingStateDescriptionDemoCode },
  ],
  keyboard: [],
  related: [
    "Spinner",
    "Skeleton",
    "ProgressBar"
  ],
  props: {
    "label": "Visible title under the spinner, also read out by the status.",
    "description": "A muted line under the label.",
    "className": "Classes on the centered status column, for placement; it fills its container's width and has 24 px padding, like EmptyState."
  },
};
