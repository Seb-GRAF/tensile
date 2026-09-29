import { TabsSegmentedDemo } from "./demos/TabsSegmentedDemo";
import tabsSegmentedDemoCode from "./demos/TabsSegmentedDemo.tsx?raw";
import { TabsExample } from "./demos/TabsExample";
import existingCode from "./demos/TabsExample.tsx?raw";

export default {
  description: "Switch between named content panels.",
  usage: "Pass items with value, label and content. Keep value equal to an item and choose underline or segmented styling.",
  anatomy: "A tablist controls a named focusable panel. The panel follows the height of the selected content. Tabs draws no surface: to show it on one, wrap Tabs in a Card and pass plain content.",
  notes: [
    "Only the active content stays mounted. Keep state above Tabs if it must survive tab changes."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A standalone example using public component imports.", Demo: TabsExample, code: existingCode },
    { id: "segmented", title: "Segmented", description: "Segmented variant with controlled content.", Demo: TabsSegmentedDemo, code: tabsSegmentedDemoCode },
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
      "description": "Move into the selected panel."
    }
  ],
  related: [
    "SegmentedTabs",
    "UnderlineTabs"
  ],
  props: {
    "items": "Tabs with stable values, labels, optional icons and panel content.",
    "value": "Selected item value; must match one item.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "variant": "Tablist appearance: underline or segmented.",
    "className": "Additional classes on the outer element."
  },
};
