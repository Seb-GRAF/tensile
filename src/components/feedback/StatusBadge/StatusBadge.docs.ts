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
    { id: "usage", title: "Basic usage", description: "An ink info badge for a neutral, in-progress state such as \"In review\".", Demo: StatusBadgeDemo, code: statusBadgeDemoCode },
    { id: "success", title: "Success", description: "An accent badge for a finished or approved state.", Demo: StatusBadgeSuccessDemo, code: statusBadgeSuccessDemoCode },
    { id: "warning", title: "Warning", description: "A paper badge with an ink icon for a state that needs attention.", Demo: StatusBadgeWarningDemo, code: statusBadgeWarningDemoCode },
    { id: "neutral", title: "Neutral", description: "A quiet hover-tone badge for a resting state such as \"Draft\".", Demo: StatusBadgeNeutralDemo, code: statusBadgeNeutralDemoCode },
  ],
  keyboard: [],
  related: [
    "Badge",
    "Alert"
  ],
  props: {
    "status": "Info, success, warning or neutral appearance.",
    "label": "The visible status text; a new label blur-swaps and the badge's width follows it.",
    "className": "Classes on the 24 px pill, for placement."
  },
};
