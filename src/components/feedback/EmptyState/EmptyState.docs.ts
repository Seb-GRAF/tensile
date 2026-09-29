import { EmptyStateDemo } from "./demos/EmptyStateDemo";
import emptyStateDemoCode from "./demos/EmptyStateDemo.tsx?raw";
import { EmptyStateActionDemo } from "./demos/EmptyStateActionDemo";
import emptyStateActionDemoCode from "./demos/EmptyStateActionDemo.tsx?raw";

export default {
  description: "Explain an empty view and offer a useful next action.",
  usage: "Provide a title and, when useful, a description, icon and action.",
  anatomy: "An h2 introduces the empty state. The optional action accepts a Button or other appropriate control.",
  notes: [
    "EmptyState has no card surface of its own. Wrap it in Card when the surrounding layout needs one."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Title and description.", Demo: EmptyStateDemo, code: emptyStateDemoCode },
    { id: "action", title: "Action", description: "Icon and working recovery action.", Demo: EmptyStateActionDemo, code: emptyStateActionDemoCode },
  ],
  keyboard: [],
  related: [
    "LoadingState",
    "Card"
  ],
  props: {
    "title": "Title displayed by the component.",
    "description": "Supporting content explaining the control or group.",
    "icon": "Optional decorative illustration or Icon.",
    "action": "Recovery or creation control, usually a Button.",
    "className": "Additional classes on the outer element."
  },
};
