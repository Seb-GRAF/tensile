import { ToasterDemo } from "./demos/ToasterDemo";
import toasterDemoCode from "./demos/ToasterDemo.tsx?raw";

export default {
  description: "Show toasts from anywhere in the app with toast(), rendered by one mounted ToastStack.",
  usage: "Mount one Toaster and place it with className, e.g. `fixed inset-x-4 bottom-4 sm:left-auto sm:w-80`. Call toast(label, { status }) from any event handler; it returns the toast's id. Pass that id back to update the toast, or to toast.dismiss(id) to remove it.",
  anatomy: "A ToastStack fed by a module-level store. toast() adds a toast or replaces the one with the same id, whose icon and label then blur-swap in place. Each toast leaves after 4 s, counted from its last update; a loading toast stays until it is updated or dismissed.",
  notes: [
    "Mount one Toaster per app: every mounted Toaster shows the same toasts.",
    "status \"loading\" shows a Spinner and \"success\" an accent check; leave it out for a toast without an icon.",
    "The stack expands upward; place it near the bottom of the viewport."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Save draft shows a success toast, and Upload photo shows a loading toast that the same id later turns into a success; use this pattern for any action that takes a moment.", Demo: ToasterDemo, code: toasterDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus a dismissal button and expand the stack."
    },
    {
      "key": "Enter / Space",
      "description": "Dismiss the focused toast."
    }
  ],
  related: [
    "ToastStack",
    "Toast"
  ],
  props: {
    "label": "Name of the toast region, read when focus enters it.",
    "dismissLabel": "Name of each toast’s dismiss button, built from the toast’s label.",
    "className": "Places the stack, e.g. fixed near the bottom of the viewport, and sets its width."
  },
};
