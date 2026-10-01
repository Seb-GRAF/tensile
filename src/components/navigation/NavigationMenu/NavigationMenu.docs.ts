import { NavigationMenuDemo } from "./demos/NavigationMenuDemo";
import navigationMenuDemoCode from "./demos/NavigationMenuDemo.tsx?raw";

export default {
  description: "Group site navigation into links and panels of links.",
  usage: "Pass top-level items: a link has an href, a trigger has links that open in a panel. Place it in a paper header and wrap the app in LinkProvider to route clicks.",
  anatomy: "A row of 44px pills: links, and triggers with a chevron. One paper panel opens 8px below the row, aligned to its trigger and kept 16px from the viewport's edges. Moving to another trigger springs the same panel to that trigger's position and size while its links blur-swap. It draws no surface of its own.",
  notes: [
    "Resting the pointer on a trigger opens its panel after 200 ms; once a panel is open, other triggers switch at once. Leaving closes it after 150 ms. With openOnHover off, panels open and switch only by click or keyboard, and stay open until a click outside, Escape or focus leaving.",
    "Below 768px, show the links in a Drawer instead, as Header does.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Two panels of links around a plain link, with clicks routed through LinkProvider.", Demo: NavigationMenuDemo, code: navigationMenuDemoCode },
  ],
  keyboard: [
    { key: "Enter / Space", description: "Open or close the focused trigger's panel." },
    { key: "Tab", description: "From an open trigger, move into its panel; from the panel's last link, move to the next item." },
    { key: "Shift + Tab", description: "From the panel's first link, return to its trigger." },
    { key: "Arrow Left / Arrow Right", description: "Move between top-level items." },
    { key: "Escape", description: "Close the panel and return focus to its trigger." },
  ],
  related: [
    "Header",
    "Link",
    "ActionMenu",
  ],
  props: {
    items: "Top-level links (`label`, `href`) and triggers (`label`, `links`); each panel link has a `label`, an `href` and an optional `description`.",
    value: "The `label` of the item whose panel is open; null while none is.",
    defaultValue: "The open item when uncontrolled.",
    onValueChange: "Called with the item that opens, or null when the panel closes.",
    label: "Accessible name of the navigation landmark.",
    openOnHover: "Open a panel when the pointer rests on its trigger; turn off to open panels only by click or keyboard.",
    className: "Placement of the navigation.",
  },
};
