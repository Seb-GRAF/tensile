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
    { id: "usage", title: "Basic usage", description: "Events with a time and a description, joined through dots; use it for an activity history.", Demo: TimelineDemo, code: timelineDemoCode },
    { id: "icons", title: "With icons", description: "An icon in a circle replaces each dot, to show what kind of event happened.", Demo: TimelineIconsDemo, code: timelineIconsDemoCode },
  ],
  keyboard: [],
  related: [
    "List",
    "DescriptionList"
  ],
  props: {
    "items": "Events with stable IDs, titles, optional descriptions, time strings and icons.",
    "label": "Names the list when no visible heading does.",
    "className": "Classes on the `<ol>`, for width and placement. It draws no card; place it in a Card."
  },
};
