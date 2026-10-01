import { TreeViewDemo } from "./demos/TreeViewDemo";
import treeViewDemoCode from "./demos/TreeViewDemo.tsx?raw";
import { TreeViewCollapsedSelectionDemo } from "./demos/TreeViewCollapsedSelectionDemo";
import treeViewCollapsedSelectionDemoCode from "./demos/TreeViewCollapsedSelectionDemo.tsx?raw";

export default {
  description: "Browse and select items in a hierarchy.",
  usage: "Use unique values throughout the tree. Control the selected value and the open parents, or let the tree keep them, starting from `defaultValue` and `defaultExpanded`.",
  anatomy: "A named tree contains level-aware treeitems. A click on a folder row selects it and opens or closes it; its chevron opens or closes it without selecting. A light pill with an ink marker shows the selection and follows the nearest visible ancestor of a hidden selection.",
  notes: [
    "Arrow navigation moves focus; Enter selects and opens or closes a folder, Space only selects.",
    "Only give children to branch nodes, with at least one child."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A file tree whose selection and open folders live in the parent's state, so other parts of the page can read and change them.", Demo: TreeViewDemo, code: treeViewDemoCode },
    { id: "collapsedselection", title: "Collapsed Selection", description: "The selected item sits inside a closed folder, so the pill marks that folder until its chevron opens it; this happens when the selection comes from elsewhere, such as the URL.", Demo: TreeViewCollapsedSelectionDemo, code: treeViewCollapsedSelectionDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down / Home / End",
      "description": "Move through visible rows."
    },
    {
      "key": "Right",
      "description": "Expand a branch or enter its first child."
    },
    {
      "key": "Left",
      "description": "Collapse a branch or focus its parent."
    },
    {
      "key": "Enter",
      "description": "Select the focused item, and open or close it if it's a folder."
    },
    {
      "key": "Space",
      "description": "Select the focused item."
    },
    {
      "key": "Letters",
      "description": "Jump to a matching label."
    }
  ],
  related: [
    "SidebarNav",
    "List"
  ],
  props: {
    "items": "Hierarchical items with unique values, labels, optional icons and non-empty children.",
    "value": "The selected item's value, or null for none. Set it to control the selection.",
    "defaultValue": "The item selected at first when `value` isn't set (null by default).",
    "onValueChange": "Called with an item's value when the user clicks its row or presses Enter or Space on it.",
    "expanded": "Values of the open parents. Set it to control which parents are open.",
    "defaultExpanded": "The parents open at first when `expanded` isn't set ([] by default).",
    "onExpandedChange": "Called with the new list of open parents when the user opens or closes one: a click on its row or chevron, Enter, or ArrowRight and ArrowLeft.",
    "label": "Names the tree for screen readers, such as \"Project files\".",
    "className": "Classes on the tree element, for width and placement. It draws no card; place it in a Card."
  },
};
