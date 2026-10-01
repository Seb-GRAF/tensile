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
    { id: "usage", title: "Basic usage", description: "An ink info alert for neutral news, such as an upcoming event.", Demo: AlertDemo, code: alertDemoCode },
    { id: "success", title: "Success", description: "An accent success alert to confirm that an action worked.", Demo: AlertSuccessDemo, code: alertSuccessDemoCode },
    { id: "warning", title: "Warning", description: "A paper warning alert, announced at once, for a problem the user should act on.", Demo: AlertWarningDemo, code: alertWarningDemoCode },
  ],
  keyboard: [],
  related: [
    "StatusBadge",
    "Toast"
  ],
  props: {
    "status": "Info, warning or success tone and announcement semantics.",
    "title": "The alert's message in a few words.",
    "description": "Detail under the title; leave it out for a one-line alert.",
    "className": "Classes on the alert card, for placement; it fills its container's width."
  },
};
