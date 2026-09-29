import { AlertDemo } from "./demos/AlertDemo";
import alertDemoCode from "./demos/AlertDemo.tsx?raw";
import { AlertSuccessDemo } from "./demos/AlertSuccessDemo";
import alertSuccessDemoCode from "./demos/AlertSuccessDemo.tsx?raw";
import { AlertWarningDemo } from "./demos/AlertWarningDemo";
import alertWarningDemoCode from "./demos/AlertWarningDemo.tsx?raw";

export default {
  description: "Draw attention to information, a warning or a successful result.",
  usage: "Use a short title and a description that explains what happened or what to do next.",
  anatomy: "A status-colored surface contains an icon and text.",
  notes: [
    "Warnings use role=\"alert\". Information and success use role=\"status\".",
    "There is no dismiss action; keep visibility in the parent when needed."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Informational alert.", Demo: AlertDemo, code: alertDemoCode },
    { id: "success", title: "Success", description: "Success alert.", Demo: AlertSuccessDemo, code: alertSuccessDemoCode },
    { id: "warning", title: "Warning", description: "Warning alert.", Demo: AlertWarningDemo, code: alertWarningDemoCode },
  ],
  keyboard: [],
  related: [
    "StatusBadge",
    "Toast"
  ],
  props: {
    "status": "Info, warning or success tone and announcement semantics.",
    "title": "Title displayed by the component.",
    "description": "Supporting content explaining the control or group.",
    "className": "Additional classes on the outer element."
  },
};
