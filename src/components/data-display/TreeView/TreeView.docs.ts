import { TreeViewDemo } from "./demos/TreeViewDemo";
import treeViewDemoCode from "./demos/TreeViewDemo.tsx?raw";
import { TreeViewCollapsedSelectionDemo } from "./demos/TreeViewCollapsedSelectionDemo";
import treeViewCollapsedSelectionDemoCode from "./demos/TreeViewCollapsedSelectionDemo.tsx?raw";

export default {
  description: "Browse and select items in a hierarchy.",
  usage: "Use unique values throughout the tree. Control the selected value and the values of expanded parents separately.",
  anatomy: "A named tree contains level-aware treeitems. Chevron controls expand branches. The selection pill follows the nearest visible ancestor of a hidden selection.",
  notes: [
    "Arrow navigation moves focus; Enter or Space selects.",
    "Only give children to branch nodes, with at least one child."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled selection and expanded branches.", Demo: TreeViewDemo, code: treeViewDemoCode },
    { id: "collapsedselection", title: "Collapsed Selection", description: "Selection inside a collapsed branch.", Demo: TreeViewCollapsedSelectionDemo, code: treeViewCollapsedSelectionDemoCode },
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
      "key": "Enter / Space",
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
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "expanded": "Values of the open parents.",
    "onExpandedChange": "Update the array of expanded parent values.",
    "label": "Accessible name of the control or region.",
    "className": "Additional classes on the outer element."
  },
};
