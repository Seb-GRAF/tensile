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
    { id: "usage", title: "Basic usage", description: "Buttons that switch the visible section, with filled icons on the current one.", Demo: TabBarDemo, code: tabBarDemoCode },
    { id: "links", title: "Links", description: "Items with an href are links; aria-current marks the page your router says is current.", Demo: TabBarLinksDemo, code: tabBarLinksDemoCode },
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
    "value": "The current destination's value. Leave it out to let the bar track it for button items, starting from defaultValue.",
    "defaultValue": "The first current item when the bar tracks it itself. Defaults to the first item.",
    "onValueChange": "Called with a button item's value when it's pressed. Link items leave the selection to your router.",
    "label": "Accessible name of the navigation landmark.",
    "className": "Classes on the bar, for placement such as `fixed inset-x-3 bottom-3`."
  },
};
