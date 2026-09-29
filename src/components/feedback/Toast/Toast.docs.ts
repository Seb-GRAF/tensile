import { ToastDemo } from "./demos/ToastDemo";
import toastDemoCode from "./demos/ToastDemo.tsx?raw";
import { ToastLoadingDemo } from "./demos/ToastLoadingDemo";
import toastLoadingDemoCode from "./demos/ToastLoadingDemo.tsx?raw";

export default {
  description: "Show a compact loading or success message.",
  usage: "Control status and message text in the caller. Place and remove the toast as part of your page’s notification flow.",
  anatomy: "A status region contains Spinner or a success icon and text.",
  notes: [
    "Toast does not provide a timer, dismiss button or global notification service.",
    "Keep messages short enough for the available width."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Success message.", Demo: ToastDemo, code: toastDemoCode },
    { id: "loading", title: "Loading", description: "Loading message.", Demo: ToastLoadingDemo, code: toastLoadingDemoCode },
  ],
  keyboard: [],
  related: [
    "ToastStack",
    "Alert"
  ],
  props: {
    "status": "Loading shows Spinner; success shows the completion icon.",
    "children": "Short message announced by the status region.",
    "className": "Additional classes on the outer element."
  },
};
