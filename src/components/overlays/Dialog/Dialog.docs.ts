import { DialogDemo } from "./demos/DialogDemo";
import dialogDemoCode from "./demos/DialogDemo.tsx?raw";
import { DialogWithoutTriggerDemo } from "./demos/DialogWithoutTriggerDemo";
import dialogWithoutTriggerDemoCode from "./demos/DialogWithoutTriggerDemo.tsx?raw";
import { DialogLongContentDemo } from "./demos/DialogLongContentDemo";
import dialogLongContentDemoCode from "./demos/DialogLongContentDemo.tsx?raw";

export default {
  description: "Open a modal panel for a focused task.",
  usage: "Keep open in state. Supply a title, trigger content and body; use trigger={null} when another control opens it.",
  anatomy: "A native modal dialog makes the page behind it inert. The title and, for role dialog, the close button stay above the scrollable body. The trigger provides the opening and closing origin.",
  notes: [
    "Put text or non-interactive content in trigger; Dialog already renders a Button.",
    "Long content scrolls inside the panel.",
    "Use AlertDialog for an explicit confirmation with initial focus on Cancel."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled dialog with its own trigger.", Demo: DialogDemo, code: dialogDemoCode },
    { id: "withouttrigger", title: "Without Trigger", description: "External trigger and trigger=null.", Demo: DialogWithoutTriggerDemo, code: dialogWithoutTriggerDemoCode },
    { id: "longcontent", title: "Long Content", description: "Scrollable content and focus return.", Demo: DialogLongContentDemo, code: dialogLongContentDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Activate the trigger."
    },
    {
      "key": "Tab / Shift+Tab",
      "description": "Move focus within the modal."
    },
    {
      "key": "Escape",
      "description": "Close the dialog and return focus."
    }
  ],
  related: [
    "AlertDialog",
    "Drawer",
    "Popover"
  ],
  props: {
    "open": "Whether the overlay is open.",
    "onOpenChange": "Called when the overlay requests an open or closed state.",
    "children": "Content rendered inside the component.",
    "trigger": "Trigger button content, or null to omit the built-in trigger.",
    "title": "Title displayed by the component.",
    "closeLabel": "Accessible label for the close action.",
    "role": "Dialog semantics; alertdialog also disables backdrop dismissal and omits the close button.",
    "aria-describedby": "ID of content describing the dialog.",
    "className": "Classes on the built-in trigger button."
  },
};
