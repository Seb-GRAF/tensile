import { SelectionBarDemo } from "./demos/SelectionBarDemo";
import selectionBarDemoCode from "./demos/SelectionBarDemo.tsx?raw";

export default {
  description: "Show bulk actions while items are selected.",
  usage: "Keep the selected IDs in your page and pass their count. Supply Buttons for actions and clear selection in onClear.",
  anatomy: "NumberTicker displays the count. Children provide bulk actions. An IconButton clears the selection.",
  notes: [
    "The bar is hidden when count is zero.",
    "Placement belongs to the caller; the example keeps it within the document list."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Select rows, act on the selection and clear it.", Demo: SelectionBarDemo, code: selectionBarDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move between the available actions."
    },
    {
      "key": "Enter / Space",
      "description": "Activate the focused action."
    }
  ],
  related: [
    "CheckboxGroup",
    "DataTable"
  ],
  props: {
    "count": "The number of selected items; 0 hides the bar.",
    "onClear": "Clear the caller’s selected items.",
    "children": "The actions, e.g. ghost Buttons.",
    "label": "Accessible name of the control or region.",
    "countLabel": "Format the selected count for display and announcement.",
    "clearLabel": "Accessible name of the clear button.",
    "className": "Additional classes on the outer element."
  },
};
