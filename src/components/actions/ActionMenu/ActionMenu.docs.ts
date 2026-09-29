import { ActionMenuDemo } from "./demos/ActionMenuDemo";
import actionMenuDemoCode from "./demos/ActionMenuDemo.tsx?raw";
import { ActionMenuIconTriggerDemo } from "./demos/ActionMenuIconTriggerDemo";
import actionMenuIconTriggerDemoCode from "./demos/ActionMenuIconTriggerDemo.tsx?raw";
import { ActionMenuSizesDemo } from "./demos/ActionMenuSizesDemo";
import actionMenuSizesDemoCode from "./demos/ActionMenuSizesDemo.tsx?raw";

export default {
  description: "Open a list of actions from a button.",
  usage: "Pass named actions and handle the chosen action in onAction. Use label to name a custom icon trigger.",
  anatomy: "A native trigger button expands into Menu. Disabled actions stay visible and are skipped by keyboard navigation.",
  notes: [
    "Use trigger for content, not a nested button.",
    "The menu flips upward, or grows leftward from the trigger near the right edge, keeps 16 px from the viewport's sides and limits its height to available space."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Text trigger, named actions and disabled items.", Demo: ActionMenuDemo, code: actionMenuDemoCode },
    { id: "icontrigger", title: "Icon Trigger", description: "Custom named icon trigger.", Demo: ActionMenuIconTriggerDemo, code: actionMenuIconTriggerDemoCode },
    { id: "sizes", title: "Sizes", description: "Default and small triggers.", Demo: ActionMenuSizesDemo, code: actionMenuSizesDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space / Down",
      "description": "Open the menu."
    },
    {
      "key": "Up on trigger",
      "description": "Open at the last action."
    },
    {
      "key": "Up / Down / Home / End",
      "description": "Move among enabled actions."
    },
    {
      "key": "Letters",
      "description": "Find an action by label."
    },
    {
      "key": "Escape",
      "description": "Close and return focus."
    }
  ],
  related: [
    "ContextMenu",
    "IconButton"
  ],
  props: {
    "actions": "Actions with labels, optional icons and disabled states.",
    "onAction": "Called with the selected action.",
    "label": "Accessible name of the control or region.",
    "menuLabel": "Accessible name of the opened menu.",
    "trigger": "Optional custom content inside the trigger button.",
    "size": "`sm` is the 32 px trigger for dense rows, e.g. an icon trigger in a table.",
    "className": "Additional classes on the outer element."
  },
};
