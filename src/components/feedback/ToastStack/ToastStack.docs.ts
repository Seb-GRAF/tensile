import { ToastStackDemo } from "./demos/ToastStackDemo";
import toastStackDemoCode from "./demos/ToastStackDemo.tsx?raw";

export default {
  description: "Stack dismissible messages and expand them on hover or focus.",
  usage: "Keep an oldest-first array with stable IDs. Append new messages and remove them in onDismiss.",
  anatomy: "A named region contains an ordered list of status messages. Each row has a dismissal IconButton. A new message takes the front pill's place and blurs in while the previous one slides back into the stack. A toast whose label changes keeps its place and blur-swaps its icon and label.",
  notes: [
    "The stack expands upward; reserve space above it or position it near a viewport edge.",
    "The caller owns removal timing. This example keeps messages until dismissed; Toaster adds a 4 s lifetime and a toast() function."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Toasts kept in local state, added by a button and removed by their dismiss buttons; use ToastStack directly when you manage the list yourself.", Demo: ToastStackDemo, code: toastStackDemoCode },
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
    "label": "Name of the toast region, read when focus enters it.",
    "dismissLabel": "Accessible name of each toast’s dismissal action.",
    "className": "Places the stack, e.g. fixed near the bottom of the viewport, and sets its width; it fills its container by default."
  },
};
