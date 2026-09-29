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
    { id: "usage", title: "Basic usage", description: "Named loading message.", Demo: LoadingStateDemo, code: loadingStateDemoCode },
    { id: "description", title: "Description", description: "Loading title and supporting description.", Demo: LoadingStateDescriptionDemo, code: loadingStateDescriptionDemoCode },
  ],
  keyboard: [],
  related: [
    "Spinner",
    "Skeleton",
    "ProgressBar"
  ],
  props: {
    "label": "Accessible name of the control or region.",
    "description": "Supporting content explaining the control or group.",
    "className": "Additional classes on the outer element."
  },
};
