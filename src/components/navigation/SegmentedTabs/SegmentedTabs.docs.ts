import { SegmentedTabsDemo } from "./demos/SegmentedTabsDemo";
import segmentedTabsDemoCode from "./demos/SegmentedTabsDemo.tsx?raw";
import { SegmentedTabsIconsDemo } from "./demos/SegmentedTabsIconsDemo";
import segmentedTabsIconsDemoCode from "./demos/SegmentedTabsIconsDemo.tsx?raw";

export default {
  description: "Switch sections with a filled selection pill.",
  usage: "Keep value equal to one option. Use Tabs for a ready-made panel, or connect your panel IDs as shown.",
  anatomy: "A tablist renders one button per option. The selected tab has the tab stop. The caller provides the associated tabpanel.",
  notes: [
    "With id supplied, tab IDs are id-index and panel IDs are id-index-panel.",
    "Arrow keys both select and focus the next tab."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A segmented control that switches the panel below, wired with id for tab and panel semantics.", Demo: SegmentedTabsDemo, code: segmentedTabsDemoCode },
    { id: "icons", title: "With icons", description: "Options with an icon beside the label.", Demo: SegmentedTabsIconsDemo, code: segmentedTabsIconsDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right",
      "description": "Select the adjacent tab."
    },
    {
      "key": "Home / End",
      "description": "Select the first or last tab."
    },
    {
      "key": "Tab",
      "description": "Move from the tablist to its content."
    }
  ],
  related: [
    "Tabs",
    "UnderlineTabs"
  ],
  props: {
    "options": "Available choices. Each option supplies a value and visible label.",
    "value": "The selected option's value. Leave it out to let the tabs track it, starting from defaultValue.",
    "defaultValue": "The first selected option when the tabs track it themselves. Defaults to the first option.",
    "onValueChange": "Called with an option's value when it's picked by click or arrow key.",
    "label": "Accessible name of the tablist.",
    "id": "Prefix used to link each tab with its associated panel.",
    "className": "Classes on the tablist, for placement. It sizes to its labels."
  },
};
