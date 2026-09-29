import { ToastStackDemo } from "./demos/ToastStackDemo";
import toastStackDemoCode from "./demos/ToastStackDemo.tsx?raw";

export default {
  description: "Stack dismissible messages and expand them on hover or focus.",
  usage: "Keep an oldest-first array with stable IDs. Append new messages and remove them in onDismiss.",
  anatomy: "A named region contains an ordered list of status messages. Each row has a dismissal IconButton. A new message takes the front pill's place and blurs in while the previous one slides back into the stack.",
  notes: [
    "The stack expands upward; reserve space above it or position it near a viewport edge.",
    "The caller owns removal timing. This example keeps messages until dismissed."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Add and dismiss local toasts.", Demo: ToastStackDemo, code: toastStackDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus a dismissal button and expand the stack."
    },
    {
      "key": "Enter / Space",
      "description": "Dismiss the focused message."
    }
  ],
  related: [
    "Toast",
    "NotificationList"
  ],
  props: {
    "toasts": "Oldest first: the last toast is in front.",
    "onDismiss": "Remove the toast with this ID.",
    "label": "Accessible name of the control or region.",
    "dismissLabel": "Accessible name of each toast’s dismissal action.",
    "className": "Additional classes on the outer element."
  },
};
