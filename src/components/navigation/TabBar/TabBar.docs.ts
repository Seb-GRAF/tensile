import { TabBarDemo } from "./demos/TabBarDemo";
import tabBarDemoCode from "./demos/TabBarDemo.tsx?raw";
import { TabBarLinksDemo } from "./demos/TabBarLinksDemo";
import tabBarLinksDemoCode from "./demos/TabBarLinksDemo.tsx?raw";

export default {
  description: "Navigate between primary destinations in an icon bar.",
  usage: "Pass named items and control the current value. Add href and connect LinkProvider to your router for client-side links.",
  anatomy: "A named nav contains links or action buttons in a floating pill. aria-current marks the current destination; an ink pill slides to it, and under the pill every item shows its activeIcon in paper.",
  notes: [
    "Arrow keys move focus without changing the current page.",
    "For link items, update value from your router; onValueChange handles action buttons."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Action-based navigation with active icons.", Demo: TabBarDemo, code: tabBarDemoCode },
    { id: "links", title: "Links", description: "Link navigation and current-page state.", Demo: TabBarLinksDemo, code: tabBarLinksDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right",
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
    "items": "Destinations with values, labels, idle and active icons, and optional hrefs.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "className": "Additional classes on the outer element."
  },
};
