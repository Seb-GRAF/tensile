import { StatusBadgeDemo } from "./demos/StatusBadgeDemo";
import statusBadgeDemoCode from "./demos/StatusBadgeDemo.tsx?raw";
import { StatusBadgeSuccessDemo } from "./demos/StatusBadgeSuccessDemo";
import statusBadgeSuccessDemoCode from "./demos/StatusBadgeSuccessDemo.tsx?raw";
import { StatusBadgeWarningDemo } from "./demos/StatusBadgeWarningDemo";
import statusBadgeWarningDemoCode from "./demos/StatusBadgeWarningDemo.tsx?raw";
import { StatusBadgeNeutralDemo } from "./demos/StatusBadgeNeutralDemo";
import statusBadgeNeutralDemoCode from "./demos/StatusBadgeNeutralDemo.tsx?raw";

export default {
  description: "Label the current state of an item.",
  usage: "Choose a status tone and a short label that explains it.",
  anatomy: "A compact pill changes color and width with its label. Warning and neutral pills have a line rim, so they keep an edge on light surfaces.",
  notes: [
    "The label communicates the state without relying on color.",
    "StatusBadge is not a live region. Use Alert or Toast for an announced update."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Informational status.", Demo: StatusBadgeDemo, code: statusBadgeDemoCode },
    { id: "success", title: "Success", description: "Success status.", Demo: StatusBadgeSuccessDemo, code: statusBadgeSuccessDemoCode },
    { id: "warning", title: "Warning", description: "Warning status.", Demo: StatusBadgeWarningDemo, code: statusBadgeWarningDemoCode },
    { id: "neutral", title: "Neutral", description: "Neutral status.", Demo: StatusBadgeNeutralDemo, code: statusBadgeNeutralDemoCode },
  ],
  keyboard: [],
  related: [
    "Badge",
    "Alert"
  ],
  props: {
    "status": "Info, success, warning or neutral appearance.",
    "label": "Accessible name of the control or region.",
    "className": "Additional classes on the outer element."
  },
};
