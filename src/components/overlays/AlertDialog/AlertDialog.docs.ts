import { AlertDialogDemo } from "./demos/AlertDialogDemo";
import alertDialogDemoCode from "./demos/AlertDialogDemo.tsx?raw";
import { AlertDialogExternalTriggerDemo } from "./demos/AlertDialogExternalTriggerDemo";
import alertDialogExternalTriggerDemoCode from "./demos/AlertDialogExternalTriggerDemo.tsx?raw";

export default {
  description: "Ask for confirmation before an action.",
  usage: "Supply a clear title, description and action label. Perform the action in onConfirm.",
  anatomy: "Dialog provides modal behavior and a described message. Cancel receives initial focus. Confirm calls onConfirm and then closes.",
  notes: [
    "There is no close button, and pressing the backdrop does not dismiss the confirmation; Cancel or Escape does.",
    "onConfirm is synchronous; use a controlled Dialog for an asynchronous confirmation flow."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Confirmation with a visible local result.", Demo: AlertDialogDemo, code: alertDialogDemoCode },
    { id: "externaltrigger", title: "External Trigger", description: "Externally controlled confirmation.", Demo: AlertDialogExternalTriggerDemo, code: alertDialogExternalTriggerDemoCode },
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
    "open": "Whether the overlay is open.",
    "onOpenChange": "Called when the overlay requests an open or closed state.",
    "title": "Title displayed by the component.",
    "description": "Supporting content explaining the control or group.",
    "onConfirm": "Run the confirmed action before the dialog closes.",
    "confirmLabel": "Text of the confirmation button.",
    "cancelLabel": "Text of the Cancel button.",
    "trigger": "Optional built-in trigger content; defaults to no trigger.",
    "className": "Additional classes on the outer element."
  },
};
