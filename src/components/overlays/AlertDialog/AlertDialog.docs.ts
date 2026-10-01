import { AlertDialogDemo } from "./demos/AlertDialogDemo";
import alertDialogDemoCode from "./demos/AlertDialogDemo.tsx?raw";
import { AlertDialogExternalTriggerDemo } from "./demos/AlertDialogExternalTriggerDemo";
import alertDialogExternalTriggerDemoCode from "./demos/AlertDialogExternalTriggerDemo.tsx?raw";

export default {
  description: "Ask for confirmation before an action.",
  usage: "Supply a clear title, description and action label. Perform the action in onConfirm. Without trigger, control open from the button that asks for confirmation.",
  anatomy: "Dialog provides modal behavior and a described message. Cancel receives initial focus. Confirm calls onConfirm and then closes.",
  notes: [
    "There is no close button, and pressing the backdrop does not dismiss the confirmation; Cancel or Escape does.",
    "onConfirm is synchronous; use a controlled Dialog for an asynchronous confirmation flow."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "An Archive button that asks first and shows the result below, for an action that is hard to undo.", Demo: AlertDialogDemo, code: alertDialogDemoCode },
    { id: "externaltrigger", title: "External Trigger", description: "A confirmation opened by a button the page already has, with open kept in state, for when the action sits in a toolbar or a menu.", Demo: AlertDialogExternalTriggerDemo, code: alertDialogExternalTriggerDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab / Shift+Tab",
      "description": "Move within the confirmation."
    },
    {
      "key": "Enter / Space",
      "description": "Activate the focused action."
    },
    {
      "key": "Escape",
      "description": "Cancel and close."
    }
  ],
  related: [
    "Dialog",
    "Button"
  ],
  props: {
    "open": "Whether the confirmation is open. Set it to control the dialog.",
    "defaultOpen": "Whether the confirmation starts open when open isn’t set.",
    "onOpenChange": "Called with true when the trigger is pressed, and with false on Cancel, Confirm or Escape.",
    "title": "The question at the top, such as “Delete playlist?”; also names the dialog.",
    "description": "What happens if the person confirms; read when the dialog opens.",
    "onConfirm": "Run the confirmed action before the dialog closes.",
    "confirmLabel": "Text of the confirmation button.",
    "cancelLabel": "Text of the Cancel button.",
    "trigger": "Optional built-in trigger content; defaults to no trigger.",
    "className": "Placement of the built-in trigger button."
  },
};
