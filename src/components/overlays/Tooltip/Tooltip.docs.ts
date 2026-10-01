import { TooltipDemo } from "./demos/TooltipDemo";
import tooltipDemoCode from "./demos/TooltipDemo.tsx?raw";
import { TooltipGroupDemo } from "./demos/TooltipGroupDemo";
import tooltipGroupDemoCode from "./demos/TooltipGroupDemo.tsx?raw";

export default {
  description: "Show supporting text when a trigger is hovered or focused.",
  usage: "Spread every binding from the render-function child onto the trigger. Keep the trigger’s own accessible name.",
  anatomy: "The caller supplies a focusable trigger. A top-layer bubble contains the label and wraps it past 256 px. Inside Toolbar, nearby tooltips share one moving bubble.",
  notes: [
    "Tooltips supplement a control; do not use them as its only accessible name.",
    "The first tooltip appears after a short delay."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "An IconButton that spreads the trigger bindings and shows its name in a tooltip, the usual way to label an icon-only button.", Demo: TooltipDemo, code: tooltipDemoCode },
    { id: "group", title: "Group", description: "Tooltips inside a Toolbar share one bubble that glides between buttons without the delay, for rows of icon buttons.", Demo: TooltipGroupDemo, code: tooltipGroupDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus the trigger and reveal its tooltip."
    },
    {
      "key": "Escape",
      "description": "Dismiss the tooltip."
    }
  ],
  related: [
    "Toolbar",
    "IconButton",
    "Popover"
  ],
  props: {
    "label": "Text in the bubble; also describes the trigger through aria-describedby.",
    "children": "Render function receiving ref, pointer/focus handlers and aria-describedby. Spread these onto the trigger.",
    "className": "Placement of the wrapper around the trigger."
  },
};
