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
    { id: "usage", title: "Basic usage", description: "A single success pill confirming that something finished, such as a save.", Demo: ToastDemo, code: toastDemoCode },
    { id: "loading", title: "Loading", description: "The loading pill with a spinner; set status to \"success\" with a new message when the work is done, and the pill blur-swaps and resizes.", Demo: ToastLoadingDemo, code: toastLoadingDemoCode },
  ],
  keyboard: [],
  related: [
    "ToastStack",
    "Alert"
  ],
  props: {
    "status": "Loading shows Spinner; success shows the completion icon.",
    "children": "Short message announced by the status region.",
    "className": "Classes on the pill, for placement; its width follows the message."
  },
};
