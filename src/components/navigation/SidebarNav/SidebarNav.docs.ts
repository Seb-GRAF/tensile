import { SidebarNavDemo } from "./demos/SidebarNavDemo";
import sidebarNavDemoCode from "./demos/SidebarNavDemo.tsx?raw";
import { SidebarNavLinksDemo } from "./demos/SidebarNavLinksDemo";
import sidebarNavLinksDemoCode from "./demos/SidebarNavLinksDemo.tsx?raw";
import { SidebarNavCollapsedDemo } from "./demos/SidebarNavCollapsedDemo";
import sidebarNavCollapsedDemoCode from "./demos/SidebarNavCollapsedDemo.tsx?raw";
import { SidebarNavSlotsDemo } from "./demos/SidebarNavSlotsDemo";
import sidebarNavSlotsDemoCode from "./demos/SidebarNavSlotsDemo.tsx?raw";

export default {
  description: "Navigate between sections in a vertical list.",
  usage: "Pass named items and control the current value. Add href and connect LinkProvider to your router for client-side links.",
  anatomy: "A named nav contains links or action buttons. aria-current marks the current destination, and an ink pill springs to it. It draws no surface of its own.",
  notes: [
    "Arrow keys move focus without changing the current page.",
    "Collapsed labels remain accessible.",
    "Place it in a Card with padding when it stands alone."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled navigation actions.", Demo: SidebarNavDemo, code: sidebarNavDemoCode },
    { id: "links", title: "Links", description: "Link navigation.", Demo: SidebarNavLinksDemo, code: sidebarNavLinksDemoCode },
    { id: "collapsed", title: "Collapsed", description: "Collapsed icon navigation.", Demo: SidebarNavCollapsedDemo, code: sidebarNavCollapsedDemoCode },
    { id: "slots", title: "Content slots", description: "Leading brand and trailing account content.", Demo: SidebarNavSlotsDemo, code: sidebarNavSlotsDemoCode },
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
    "CollapsibleSidebar"
  ],
  props: {
    "items": "Destinations with values, labels, icons and optional hrefs.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "collapsed": "Hide visible labels while keeping accessible names.",
    "leading": "Content before the main content.",
    "trailing": "Pinned to the bottom, e.g. the account.",
    "className": "Additional classes on the outer element.",
  },
};
