import { BottomSheetDemo } from "./demos/BottomSheetDemo";
import bottomSheetDemoCode from "./demos/BottomSheetDemo.tsx?raw";
import { BottomSheetLongContentDemo } from "./demos/BottomSheetLongContentDemo";
import bottomSheetLongContentDemoCode from "./demos/BottomSheetLongContentDemo.tsx?raw";

export default {
  description: "Show modal content from the bottom of the viewport.",
  usage: "Control open from a Button and pass your content. Add padding to the body. Without open, the sheet keeps its own state, starting from defaultOpen.",
  anatomy: "A native modal dialog contains the backdrop and sheet. From 640px the sheet is at most 32rem wide and centered. The header is the drag handle. Long content scrolls inside the sheet.",
  notes: [
    "Drag the header toward its edge to dismiss. A short drag springs back.",
    "Closing restores focus to the opening control."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A sheet opened from a button and closed by Done, the handle or a drag down, for short secondary tasks on phones.", Demo: BottomSheetDemo, code: bottomSheetDemoCode },
    { id: "longcontent", title: "Long Content", description: "A sheet with more content than fits, which grows to the screen’s height and scrolls inside, for long lists or forms.", Demo: BottomSheetLongContentDemo, code: bottomSheetLongContentDemoCode },
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
    "open": "Whether the sheet is open. Set it to control the sheet.",
    "defaultOpen": "Whether the sheet starts open when open isn’t set.",
    "onOpenChange": "Called with false when the sheet is dragged down, its handle or the backdrop is pressed, or Escape is pressed.",
    "children": "Body of the sheet, below the handle; it scrolls when taller than the screen.",
    "label": "Accessible name of the sheet’s dialog.",
    "handleLabel": "Accessible name of the handle button, which closes the sheet.",
    "className": "Size of the sheet panel."
  },
};
