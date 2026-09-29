import { DrawerDemo } from "./demos/DrawerDemo";
import drawerDemoCode from "./demos/DrawerDemo.tsx?raw";
import { DrawerLeftDemo } from "./demos/DrawerLeftDemo";
import drawerLeftDemoCode from "./demos/DrawerLeftDemo.tsx?raw";
import { DrawerLongContentDemo } from "./demos/DrawerLongContentDemo";
import drawerLongContentDemoCode from "./demos/DrawerLongContentDemo.tsx?raw";

export default {
  description: "Show modal content from a side of the viewport.",
  usage: "Control open from a Button and pass your content. The body pads it to line up with the title.",
  anatomy: "A native modal dialog contains the backdrop and a panel that floats 12px from the top, bottom and its side, with rounded corners. The header is the drag handle. Long content scrolls inside the panel.",
  notes: [
    "Drag the header toward its edge to dismiss. A short drag springs back.",
    "Closing restores focus to the opening control."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Right drawer with controlled state.", Demo: DrawerDemo, code: drawerDemoCode },
    { id: "left", title: "Left", description: "Left drawer.", Demo: DrawerLeftDemo, code: drawerLeftDemoCode },
    { id: "longcontent", title: "Long Content", description: "Scrollable drawer content.", Demo: DrawerLongContentDemo, code: drawerLongContentDemoCode },
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
    "open": "Whether the overlay is open.",
    "onOpenChange": "Called when the overlay requests an open or closed state.",
    "title": "Title displayed by the component.",
    "children": "Content rendered inside the component.",
    "side": "Viewport edge to open from: right or left.",
    "closeLabel": "Accessible label for the close action.",
    "className": "Additional classes on the outer element."
  },
};
