import { SplitPaneDemo } from "./demos/SplitPaneDemo";
import splitPaneDemoCode from "./demos/SplitPaneDemo.tsx?raw";
import { SplitPaneBoundsDemo } from "./demos/SplitPaneBoundsDemo";
import splitPaneBoundsDemoCode from "./demos/SplitPaneBoundsDemo.tsx?raw";

export default {
  description: "Resize two adjacent content panes.",
  usage: "Give the parent a width and height. The divider position is a fraction of the total width; control it, or let the panes keep it.",
  anatomy: "Two Cards surround a focusable vertical separator.",
  notes: [
    "min and max are fractions, not pixels. Keep value between them.",
    "The component fills its parent; child content owns padding."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A project list beside its details, split 40/60 and resizable between the default 20% and 80%, for list-and-detail layouts.", Demo: SplitPaneDemo, code: splitPaneDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "The same panes limited to 30–70%, for when either side stops being usable below a certain width.", Demo: SplitPaneBoundsDemo, code: splitPaneBoundsDemoCode },
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
    "value": "Where the divider sits, as a fraction of the width from the left: 0..1. Set it to control the panes.",
    "defaultValue": "Where the divider starts when value isn’t set.",
    "onValueChange": "Called with the new fraction while the divider is dragged or moved with the keyboard.",
    "min": "Smallest fraction the left pane can take; dragging past it stretches and springs back.",
    "max": "Largest fraction the left pane can take; dragging past it stretches and springs back.",
    "label": "Accessible name of the divider, read with its percentage.",
    "className": "Placement of the panes; they fill the parent’s width and height."
  },
};
