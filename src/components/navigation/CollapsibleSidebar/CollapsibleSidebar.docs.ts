import { CollapsibleSidebarDemo } from "./demos/CollapsibleSidebarDemo";
import collapsibleSidebarDemoCode from "./demos/CollapsibleSidebarDemo.tsx?raw";
import { CollapsibleSidebarSlotsDemo } from "./demos/CollapsibleSidebarSlotsDemo";
import collapsibleSidebarSlotsDemoCode from "./demos/CollapsibleSidebarSlotsDemo.tsx?raw";

export default {
  description: "Switch between an icon rail and a full navigation sidebar.",
  usage: "Pass named items and control the current value. Add href and connect LinkProvider to your router for client-side links.",
  anatomy: "A named nav contains links or action buttons. aria-current marks the current destination. SidebarNav and a collapse IconButton sit in a card whose width springs between a 48 px rail and a 208 px sidebar.",
  notes: [
    "Arrow keys move focus without changing the current page.",
    "Collapsed labels remain accessible."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled expansion alongside page content.", Demo: CollapsibleSidebarDemo, code: collapsibleSidebarDemoCode },
    { id: "slots", title: "Content slots", description: "Brand and account content in expanded and collapsed states.", Demo: CollapsibleSidebarSlotsDemo, code: collapsibleSidebarSlotsDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down",
      "description": "Move focus between destinations."
    },
    {
      "key": "Enter",
      "description": "Follow the focused link or activate its action."
    },
    {
      "key": "Space",
      "description": "Activate an action button."
    }
  ],
  related: [
    "Link",
    "AppShell",
    "SidebarNav"
  ],
  props: {
    "items": "Destinations with values, labels, icons and optional hrefs.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "expanded": "Whether the content is expanded.",
    "onExpandedChange": "Called when the expanded state changes.",
    "leading": "At the top, e.g. the brand; clipped to the rail while collapsed.",
    "trailing": "At the bottom, above the collapse button, e.g. the account; clipped to the rail while collapsed.",
    "label": "Accessible name of the control or region.",
    "expandLabel": "Accessible name of the expand action.",
    "collapseLabel": "Accessible name of the collapse action.",
    "className": "Additional classes on the outer element.",
  },
};
