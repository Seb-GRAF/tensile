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
    { id: "usage", title: "Basic usage", description: "A title with a line of explanation in a card, for a list or search with nothing to show.", Demo: EmptyStateDemo, code: emptyStateDemoCode },
    { id: "action", title: "Action", description: "An icon and a button that creates the first item; use it when the user can fix the empty state right away.", Demo: EmptyStateActionDemo, code: emptyStateActionDemoCode },
  ],
  keyboard: [],
  related: [
    "LoadingState",
    "Card"
  ],
  props: {
    "title": "Short statement of what is empty, e.g. \"No projects yet\".",
    "description": "A line under the title on why it is empty or what to do next.",
    "icon": "Optional decorative illustration or Icon.",
    "action": "Recovery or creation control, usually a Button.",
    "className": "Classes on the centered column, for placement; it fills its container's width and has 24 px padding."
  },
};
