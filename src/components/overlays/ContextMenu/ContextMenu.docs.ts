import { ContextMenuDemo } from "./demos/ContextMenuDemo";
import contextMenuDemoCode from "./demos/ContextMenuDemo.tsx?raw";
import { ContextMenuDialogDemo } from "./demos/ContextMenuDialogDemo";
import contextMenuDialogDemoCode from "./demos/ContextMenuDialogDemo.tsx?raw";

export default {
  description: "Open actions with a right-click, long press or keyboard command.",
  usage: "Wrap the target content and pass actions. Handle the chosen action in onAction.",
  anatomy: "A focusable target group wraps your content. Menu renders enabled and disabled actions in the top layer.",
  notes: [
    "Touch opens after a 500 ms hold; moving cancels the hold.",
    "Inside a modal, the menu stays within that dialog.",
    "The target’s focus ring has the card radius, to match a Card inside it.",
    "When any action has an icon, every row keeps a 16 px icon slot so the labels line up."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Context actions and disabled items.", Demo: ContextMenuDemo, code: contextMenuDemoCode },
    { id: "dialog", title: "Dialog", description: "Context menu inside a modal.", Demo: ContextMenuDialogDemo, code: contextMenuDialogDemoCode },
  ],
  keyboard: [
    {
      "key": "Shift+F10 / Context Menu",
      "description": "Open actions from the focused target."
    },
    {
      "key": "Up / Down / Home / End",
      "description": "Move among enabled actions."
    },
    {
      "key": "Enter / Space",
      "description": "Run the selected action."
    },
    {
      "key": "Escape",
      "description": "Close and restore focus."
    },
    {
      "key": "Letters",
      "description": "Find an action by its label."
    }
  ],
  related: [
    "ActionMenu",
    "Dialog"
  ],
  props: {
    "actions": "Actions with labels, optional icons and disabled states.",
    "onAction": "Called with the chosen action.",
    "children": "Content rendered inside the component.",
    "menuLabel": "Accessible name of the target group and menu.",
    "className": "Additional classes on the outer element."
  },
};
