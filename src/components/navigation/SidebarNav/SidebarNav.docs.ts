import { SidebarNavDemo } from "./demos/SidebarNavDemo";
import sidebarNavDemoCode from "./demos/SidebarNavDemo.tsx?raw";
import { SidebarNavLinksDemo } from "./demos/SidebarNavLinksDemo";
import sidebarNavLinksDemoCode from "./demos/SidebarNavLinksDemo.tsx?raw";
import { SidebarNavCollapsedDemo } from "./demos/SidebarNavCollapsedDemo";
import sidebarNavCollapsedDemoCode from "./demos/SidebarNavCollapsedDemo.tsx?raw";
import { SidebarNavSlotsDemo } from "./demos/SidebarNavSlotsDemo";
import sidebarNavSlotsDemoCode from "./demos/SidebarNavSlotsDemo.tsx?raw";
import { SidebarNavCategoriesDemo } from "./demos/SidebarNavCategoriesDemo";
import sidebarNavCategoriesDemoCode from "./demos/SidebarNavCategoriesDemo.tsx?raw";

export default {
  description: "Navigate between sections in a vertical list.",
  usage: "Pass named items and control the current value. Add href and connect LinkProvider to your router for client-side links.",
  anatomy: "A named nav contains links or action buttons, optionally in categories, each a heading that names its own list. aria-current marks the current destination, and one ink pill springs to it across categories. With no current destination the pill fades out; it fades back in on the next one. It draws no surface of its own.",
  notes: [
    "Arrow keys move focus without changing the current page.",
    "Collapsed labels remain accessible.",
    "Place it in a Card with padding when it stands alone."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Buttons that switch views inside an app, with the ink pill on the current one.", Demo: SidebarNavDemo, code: sidebarNavDemoCode },
    { id: "links", title: "Links", description: "Items with an href are links for page navigation.", Demo: SidebarNavLinksDemo, code: sidebarNavLinksDemoCode },
    { id: "collapsed", title: "Collapsed", description: "Icons only, for a narrow rail; each item keeps its accessible name.", Demo: SidebarNavCollapsedDemo, code: sidebarNavCollapsedDemoCode },
    { id: "slots", title: "Content slots", description: "A brand above the list and an account pinned to the bottom.", Demo: SidebarNavSlotsDemo, code: sidebarNavSlotsDemoCode },
    { id: "categories", title: "Categories", description: "Destinations grouped under headings, with one pill across them.", Demo: SidebarNavCategoriesDemo, code: sidebarNavCategoriesDemoCode },
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
    "items": "Destinations with values, labels, icons and optional hrefs, or categories of them with a heading label.",
    "value": "The current destination's value. Leave it out to let the nav track it, starting from defaultValue.",
    "defaultValue": "The current destination when the nav tracks it itself. Empty marks none.",
    "onValueChange": "Called with an item's value when it's activated, links included.",
    "label": "Accessible name of the navigation landmark.",
    "collapsed": "Hide visible labels while keeping accessible names.",
    "leading": "Content above the list, such as a brand.",
    "trailing": "Pinned to the bottom, e.g. the account.",
    "className": "Classes on the nav element, for height and width, such as `h-full` or `w-8` when collapsed.",
  },
};
