import { DialogDemo } from "./demos/DialogDemo";
import dialogDemoCode from "./demos/DialogDemo.tsx?raw";
import { DialogWithoutTriggerDemo } from "./demos/DialogWithoutTriggerDemo";
import dialogWithoutTriggerDemoCode from "./demos/DialogWithoutTriggerDemo.tsx?raw";
import { DialogLongContentDemo } from "./demos/DialogLongContentDemo";
import dialogLongContentDemoCode from "./demos/DialogLongContentDemo.tsx?raw";

export default {
  description: "Open a modal panel for a focused task.",
  usage: "Supply a title, trigger content and body; the dialog keeps its open state, or you control it with open. Use trigger={null} and control open when another control opens it.",
  anatomy: "A native modal dialog makes the page behind it inert. The title and, for role dialog, the close button stay above the scrollable body. The trigger provides the opening and closing origin.",
  notes: [
    "Put text or non-interactive content in trigger; Dialog already renders a Button.",
    "Long content scrolls inside the panel.",
    "Use AlertDialog for an explicit confirmation with initial focus on Cancel."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A dialog that flies out of its own button and closes from a Done button inside, for a short task that needs the whole screen’s attention.", Demo: DialogDemo, code: dialogDemoCode },
    { id: "withouttrigger", title: "Without Trigger", description: "A dialog opened by a button elsewhere on the page, with trigger={null}, for when the opener is a menu item or a row action.", Demo: DialogWithoutTriggerDemo, code: dialogWithoutTriggerDemoCode },
    { id: "longcontent", title: "Long Content", description: "A body longer than the screen that scrolls inside the panel while the title stays put; focus returns to the trigger on close.", Demo: DialogLongContentDemo, code: dialogLongContentDemoCode },
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
    "open": "Whether the dialog is open. Set it to control the dialog.",
    "defaultOpen": "Whether the dialog starts open when open isn’t set.",
    "onOpenChange": "Called with true when the trigger is pressed, and with false on Escape, a backdrop click or the close button.",
    "children": "Body of the dialog, below the title; it scrolls when it’s taller than the screen.",
    "trigger": "Trigger button content, or null to omit the built-in trigger.",
    "title": "Heading at the top of the panel; also names the dialog.",
    "closeLabel": "Accessible name of the × button in the panel’s header.",
    "role": "Dialog semantics; alertdialog also disables backdrop dismissal and omits the close button.",
    "aria-describedby": "ID of the text in the body that describes the dialog, read when it opens.",
    "className": "Classes on the built-in trigger button."
  },
};
