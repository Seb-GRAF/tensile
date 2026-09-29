import { IslandDemo } from "./demos/IslandDemo";
import islandDemoCode from "./demos/IslandDemo.tsx?raw";
import { IslandActivityDemo } from "./demos/IslandActivityDemo";
import islandActivityDemoCode from "./demos/IslandActivityDemo.tsx?raw";

export default {
  description: "Expand a compact activity pill into a detail panel.",
  usage: "Supply compact leading and trailing content and a fixed-size expanded view. Keep expanded in state.",
  anatomy: "The compact pill is a single trigger. A named detail panel contains children.",
  notes: [
    "Changing activity swaps the content and adjusts the compact width.",
    "Keep compact content non-interactive; place actions in the expanded panel."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled expanded content.", Demo: IslandDemo, code: islandDemoCode },
    { id: "activity", title: "Activity", description: "Change the activity and compact content.", Demo: IslandActivityDemo, code: islandActivityDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Expand the pill."
    },
    {
      "key": "Escape",
      "description": "Close the panel."
    }
  ],
  related: [
    "Popover",
    "MusicPlayer"
  ],
  props: {
    "activity": "Name of the current activity, e.g. \"Timer\". It names the expanded view; a new one blur-swaps the content and springs the pill to its width.",
    "leading": "Start of the compact pill.",
    "trailing": "End of the compact pill.",
    "children": "The expanded view, laid out in a panelWidth × panelHeight box.",
    "expanded": "Whether the content is expanded.",
    "onExpandedChange": "Called when the expanded state changes.",
    "openLabel": "Build the accessible name of the compact trigger.",
    "panelWidth": "Expanded panel width in pixels.",
    "panelHeight": "Expanded panel height in pixels.",
    "className": "Additional classes on the outer element."
  },
};
