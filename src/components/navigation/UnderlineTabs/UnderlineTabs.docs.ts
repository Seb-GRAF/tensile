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
    { id: "usage", title: "Basic usage", description: "Controlled tablist wired to a tabpanel.", Demo: UnderlineTabsDemo, code: underlineTabsDemoCode },
    { id: "icons", title: "With icons", description: "Tabs with icons and content.", Demo: UnderlineTabsIconsDemo, code: underlineTabsIconsDemoCode },
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
    "value": "Selected option value; must match one option.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "id": "Prefix used to link each tab with its associated panel.",
    "className": "Additional classes on the outer element."
  },
};
