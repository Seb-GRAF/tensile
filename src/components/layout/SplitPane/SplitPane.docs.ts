import { SplitPaneDemo } from "./demos/SplitPaneDemo";
import splitPaneDemoCode from "./demos/SplitPaneDemo.tsx?raw";
import { SplitPaneBoundsDemo } from "./demos/SplitPaneBoundsDemo";
import splitPaneBoundsDemoCode from "./demos/SplitPaneBoundsDemo.tsx?raw";

export default {
  description: "Resize two adjacent content panes.",
  usage: "Give the parent a width and height. Control the divider position as a fraction of total width.",
  anatomy: "Two Cards surround a focusable vertical separator.",
  notes: [
    "min and max are fractions, not pixels. Keep value between them.",
    "The component fills its parent; child content owns padding."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled resizable panes.", Demo: SplitPaneDemo, code: splitPaneDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Minimum and maximum pane fractions.", Demo: SplitPaneBoundsDemo, code: splitPaneBoundsDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right",
      "description": "Move the divider by five percentage points."
    },
    {
      "key": "Home / End",
      "description": "Move to the minimum or maximum fraction."
    }
  ],
  related: [
    "Card",
    "AppShell"
  ],
  props: {
    "left": "Content in the left pane.",
    "right": "Content in the right pane.",
    "value": "Where the divider sits, as a fraction of the width from the left: 0..1.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "label": "Accessible name of the control or region.",
    "className": "Additional classes on the outer element."
  },
};
