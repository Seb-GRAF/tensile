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
    { id: "usage", title: "Basic usage", description: "The sidebar's width springs between the rail and the full sidebar while the page beside it makes room.", Demo: CollapsibleSidebarDemo, code: collapsibleSidebarDemoCode },
    { id: "slots", title: "Content slots", description: "A brand at the top and an account at the bottom, shown in full when expanded and as their first 32 px in the rail.", Demo: CollapsibleSidebarSlotsDemo, code: collapsibleSidebarSlotsDemoCode },
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
    "value": "The current destination's value. Leave it out to let the sidebar track it, starting from defaultValue.",
    "defaultValue": "The current destination when the sidebar tracks it itself. Empty marks none.",
    "onValueChange": "Called with an item's value when it's activated.",
    "expanded": "Whether the sidebar shows its labels. Leave it out to let the sidebar track it, starting from defaultExpanded.",
    "defaultExpanded": "Whether the sidebar starts expanded when it tracks this itself. Defaults to true.",
    "onExpandedChange": "Called when the collapse button is pressed.",
    "leading": "At the top, e.g. the brand; laid out at the expanded width, so the rail clips it to its first 32 px.",
    "trailing": "At the bottom, above the collapse button, e.g. the account; laid out at the expanded width, so the rail clips it to its first 32 px.",
    "label": "Accessible name of the navigation landmark.",
    "expandLabel": "Accessible name of the expand action.",
    "collapseLabel": "Accessible name of the collapse action.",
    "className": "Classes on the sidebar's card, for height and placement, such as `h-full`.",
  },
};
