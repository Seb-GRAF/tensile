import { DrawerDemo } from "./demos/DrawerDemo";
import drawerDemoCode from "./demos/DrawerDemo.tsx?raw";
import { DrawerLeftDemo } from "./demos/DrawerLeftDemo";
import drawerLeftDemoCode from "./demos/DrawerLeftDemo.tsx?raw";
import { DrawerLongContentDemo } from "./demos/DrawerLongContentDemo";
import drawerLongContentDemoCode from "./demos/DrawerLongContentDemo.tsx?raw";

export default {
  description: "Show modal content from a side of the viewport.",
  usage: "Control open from a Button and pass your content. The body pads it to line up with the title. Without open, the drawer keeps its own state, starting from defaultOpen.",
  anatomy: "A native modal dialog contains the backdrop and a panel that floats 12px from the top, bottom and its side, with rounded corners. The header is the drag handle. Long content scrolls inside the panel.",
  notes: [
    "Drag the header toward its edge to dismiss. A short drag springs back.",
    "Closing restores focus to the opening control."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Project details in a drawer from the right, opened by a button and closed by Done, for details or settings beside the page they belong to.", Demo: DrawerDemo, code: drawerDemoCode },
    { id: "left", title: "Left", description: "The same drawer from the left, for navigation or filters that sit on the left of the page.", Demo: DrawerLeftDemo, code: drawerLeftDemoCode },
    { id: "longcontent", title: "Long Content", description: "A drawer with more content than fits, which scrolls below a fixed header, for long forms or lists.", Demo: DrawerLongContentDemo, code: drawerLongContentDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab / Shift+Tab",
      "description": "Move within the modal."
    },
    {
      "key": "Escape",
      "description": "Close and restore focus."
    }
  ],
  related: [
    "Dialog",
    "BottomSheet"
  ],
  props: {
    "open": "Whether the drawer is open. Set it to control the drawer.",
    "defaultOpen": "Whether the drawer starts open when open isn’t set.",
    "onOpenChange": "Called with false when the drawer is dragged toward its edge, the × button or the backdrop is pressed, or Escape is pressed.",
    "title": "Heading in the drawer’s header; also names the drawer.",
    "children": "Body of the drawer, padded to line up with the title; it scrolls when taller than the panel.",
    "side": "Viewport edge to open from: right or left.",
    "closeLabel": "Accessible name of the × button in the header.",
    "className": "Size of the drawer panel."
  },
};
