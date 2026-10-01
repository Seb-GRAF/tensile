import { HeaderDemo } from "./demos/HeaderDemo";
import headerDemoCode from "./demos/HeaderDemo.tsx?raw";
import { HeaderBarDemo } from "./demos/HeaderBarDemo";
import headerBarDemoCode from "./demos/HeaderBarDemo.tsx?raw";

export default {
  description: "Provide a sticky brand, navigation and actions.",
  usage: "Pass destination links and the current href. Connect LinkProvider to your router to update the active page.",
  anatomy: "The floating variant is a 52px pill inset 12px from the top and sides; an ink pill slides to the current link, and 44px Buttons fit its actions. The bar variant spans the width with a bottom rule and an underline under the current link. Below 768px, an IconButton opens the links in a SidebarNav inside a left Drawer. The caller supplies brand and action content.",
  notes: [
    "Breakpoints follow viewport width. Resize the window to try the mobile menu.",
    "value must follow navigation; Header does not own routing."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "The floating pill with a brand, links that mark the current page and a primary action; below 768 px the links move into a menu. The default for app and marketing pages.", Demo: HeaderDemo, code: headerDemoCode },
    { id: "bar", title: "Bar", description: "A full-width bar that underlines the current link, for denser pages where a floating pill would cover content.", Demo: HeaderBarDemo, code: headerBarDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab / Enter",
      "description": "Focus and follow links or open the menu."
    },
    {
      "key": "Escape",
      "description": "Close the mobile drawer."
    }
  ],
  related: [
    "Footer",
    "AppShell",
    "Link"
  ],
  props: {
    "brand": "Brand content, optionally a home link.",
    "links": "Navigation labels and hrefs.",
    "value": "The current page's `href`.",
    "actions": "Controls aligned at the end of the header.",
    "variant": "Floating is an inset pill with a sliding ink pill on the current link; bar is a full-width bar with an underline.",
    "menuLabel": "Names the menu button and titles the drawer it opens.",
    "navLabel": "Accessible name of the link navigation, in the header and in the menu drawer.",
    "closeLabel": "Accessible name of the × button in the menu drawer.",
    "className": "Placement of the header, which sticks to the top of its scroll container."
  },
};
