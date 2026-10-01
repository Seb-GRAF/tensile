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
    { id: "usage", title: "Basic usage", description: "A card with Rename, a disabled Download and Archive on right-click or long press, for shortcuts on items people already know how to open.", Demo: ContextMenuDemo, code: contextMenuDemoCode },
    { id: "dialog", title: "Dialog", description: "The same menu on content inside a Dialog, where it opens above the dialog, for item actions in a modal list.", Demo: ContextMenuDialogDemo, code: contextMenuDialogDemoCode },
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
    "children": "The target area that opens the menu on right-click, long press, Shift+F10 or the menu key.",
    "menuLabel": "Accessible name of the target group and menu.",
    "className": "Size and placement of the target area."
  },
};
