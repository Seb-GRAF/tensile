import { IslandDemo } from "./demos/IslandDemo";
import islandDemoCode from "./demos/IslandDemo.tsx?raw";
import { IslandActivityDemo } from "./demos/IslandActivityDemo";
import islandActivityDemoCode from "./demos/IslandActivityDemo.tsx?raw";

export default {
  description: "Expand a compact activity pill into a detail panel.",
  usage: "Supply compact leading and trailing content and a fixed-size expanded view; control expanded, or let the island keep it.",
  anatomy: "The compact pill is a single trigger. A named detail panel contains children.",
  notes: [
    "Changing activity swaps the content and adjusts the compact width.",
    "Keep compact content non-interactive; place actions in the expanded panel."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A compact pill for a running review that grows into a panel with actions, for a background task people check now and then.", Demo: IslandDemo, code: islandDemoCode },
    { id: "activity", title: "Activity", description: "A button that switches the activity, so the pill blur-swaps its content and springs to the new width, for a status that moves between tasks.", Demo: IslandActivityDemo, code: islandActivityDemoCode },
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
    "expanded": "Whether the pill is expanded into its panel. Set it to control the island.",
    "defaultExpanded": "Whether the island starts expanded when expanded isn’t set.",
    "onExpandedChange": "Called with true when the pill is pressed, and with false on Escape or a press outside.",
    "openLabel": "Builds the pill button’s accessible name from the activity.",
    "panelWidth": "Width of the expanded panel in pixels.",
    "panelHeight": "Height of the expanded panel in pixels.",
    "className": "Placement of the pill; the panel grows from its center over the page."
  },
};
