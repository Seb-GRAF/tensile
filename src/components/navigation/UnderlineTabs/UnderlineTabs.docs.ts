import { UnderlineTabsDemo } from "./demos/UnderlineTabsDemo";
import underlineTabsDemoCode from "./demos/UnderlineTabsDemo.tsx?raw";
import { UnderlineTabsIconsDemo } from "./demos/UnderlineTabsIconsDemo";
import underlineTabsIconsDemoCode from "./demos/UnderlineTabsIconsDemo.tsx?raw";

export default {
  description: "Switch sections with an underline.",
  usage: "Keep value equal to one option. Use Tabs for a ready-made panel, or connect your panel IDs as shown.",
  anatomy: "A tablist renders one button per option. The selected tab has the tab stop. The caller provides the associated tabpanel.",
  notes: [
    "With id supplied, tab IDs are id-index and panel IDs are id-index-panel.",
    "Arrow keys both select and focus the next tab."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A tablist that switches the panel below, wired with id for tab and panel semantics.", Demo: UnderlineTabsDemo, code: underlineTabsDemoCode },
    { id: "icons", title: "With icons", description: "Options with an icon beside the label.", Demo: UnderlineTabsIconsDemo, code: underlineTabsIconsDemoCode },
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
    "SegmentedTabs"
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
