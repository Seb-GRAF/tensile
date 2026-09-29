import { BottomSheetDemo } from "./demos/BottomSheetDemo";
import bottomSheetDemoCode from "./demos/BottomSheetDemo.tsx?raw";
import { BottomSheetLongContentDemo } from "./demos/BottomSheetLongContentDemo";
import bottomSheetLongContentDemoCode from "./demos/BottomSheetLongContentDemo.tsx?raw";

export default {
  description: "Show modal content from the bottom of the viewport.",
  usage: "Control open from a Button and pass your content. Add padding to the body.",
  anatomy: "A native modal dialog contains the backdrop and sheet. From 640px the sheet is at most 32rem wide and centered. The header is the drag handle. Long content scrolls inside the sheet.",
  notes: [
    "Drag the header toward its edge to dismiss. A short drag springs back.",
    "Closing restores focus to the opening control."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled sheet with close and drag behavior.", Demo: BottomSheetDemo, code: bottomSheetDemoCode },
    { id: "longcontent", title: "Long Content", description: "Scrollable sheet content.", Demo: BottomSheetLongContentDemo, code: bottomSheetLongContentDemoCode },
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
    "Drawer"
  ],
  props: {
    "open": "Whether the overlay is open.",
    "onOpenChange": "Called when the overlay requests an open or closed state.",
    "children": "Content rendered inside the component.",
    "label": "Accessible name of the control or region.",
    "handleLabel": "Accessible name of the handle button, which closes the sheet.",
    "className": "Additional classes on the outer element."
  },
};
