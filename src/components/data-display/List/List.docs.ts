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
    { id: "usage", title: "Basic usage", description: "Rows with a title and a line of description; use it for a short read-only list such as documents.", Demo: ListDemo, code: listDemoCode },
    { id: "slots", title: "Content slots", description: "An Avatar in each row's leading slot and a StatusBadge in its trailing slot, for lists of people or items with a status.", Demo: ListSlotsDemo, code: listSlotsDemoCode },
  ],
  keyboard: [],
  related: [
    "NotificationList",
    "Table"
  ],
  props: {
    "items": "Rows with stable IDs, titles and optional description, leading and trailing content.",
    "label": "Names the list when no visible heading does.",
    "className": "Classes on the `<ul>`, for width and placement. It draws no card; place it in a Card."
  },
};
