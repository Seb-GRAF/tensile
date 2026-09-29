import { ListDemo } from "./demos/ListDemo";
import listDemoCode from "./demos/ListDemo.tsx?raw";
import { ListSlotsDemo } from "./demos/ListSlotsDemo";
import listSlotsDemoCode from "./demos/ListSlotsDemo.tsx?raw";

export default {
  description: "Display rows with optional supporting content.",
  usage: "Pass stable IDs and titles. Use description, leading and trailing for secondary information.",
  anatomy: "A native unordered list separates rows with rules.",
  notes: [
    "Rows are display-only and do not have selection or navigation behavior.",
    "The list has no surrounding surface; add Card if needed."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Titles and descriptions.", Demo: ListDemo, code: listDemoCode },
    { id: "slots", title: "Content slots", description: "Leading and trailing content.", Demo: ListSlotsDemo, code: listSlotsDemoCode },
  ],
  keyboard: [],
  related: [
    "NotificationList",
    "Table"
  ],
  props: {
    "items": "Rows with stable IDs, titles and optional description, leading and trailing content.",
    "label": "Names the list when no visible heading does.",
    "className": "Additional classes on the outer element."
  },
};
