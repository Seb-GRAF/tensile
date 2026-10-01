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
    { id: "usage", title: "Basic usage", description: "Underline tabs that swap the content below, for sections of one page.", Demo: TabsExample, code: existingCode },
    { id: "segmented", title: "Segmented", description: "The segmented look, for switching views of the same data, such as day, week and month.", Demo: TabsSegmentedDemo, code: tabsSegmentedDemoCode },
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
    "value": "The selected tab's value. Leave it out to let Tabs track it, starting from defaultValue.",
    "defaultValue": "The first selected tab when Tabs tracks it itself. Defaults to the first item.",
    "onValueChange": "Called with a tab's value when it's picked by click or arrow key.",
    "label": "Accessible name of the tablist.",
    "variant": "Tablist appearance: underline or segmented.",
    "className": "Classes on the outer grid, for width and placement."
  },
};
