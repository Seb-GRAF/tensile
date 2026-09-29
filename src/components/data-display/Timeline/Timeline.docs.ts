import { TimelineDemo } from "./demos/TimelineDemo";
import timelineDemoCode from "./demos/TimelineDemo.tsx?raw";
import { TimelineIconsDemo } from "./demos/TimelineIconsDemo";
import timelineIconsDemoCode from "./demos/TimelineIconsDemo.tsx?raw";

export default {
  description: "Display a sequence of events.",
  usage: "Pass events in the order they should appear, with stable IDs and titles.",
  anatomy: "An ordered list joins events with a vertical line. Events use a dot or an optional decorative icon.",
  notes: [
    "Sorting and time formatting belong to the caller.",
    "Keep time labels brief to leave room for the event title."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Dated events and descriptions.", Demo: TimelineDemo, code: timelineDemoCode },
    { id: "icons", title: "With icons", description: "Events with icons.", Demo: TimelineIconsDemo, code: timelineIconsDemoCode },
  ],
  keyboard: [],
  related: [
    "List",
    "DescriptionList"
  ],
  props: {
    "items": "Events with stable IDs, titles, optional descriptions, time strings and icons.",
    "label": "Names the list when no visible heading does.",
    "className": "Additional classes on the outer element."
  },
};
