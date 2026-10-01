import { TagDemo } from "./demos/TagDemo";
import tagDemoCode from "./demos/TagDemo.tsx?raw";
import { TagIconDemo } from "./demos/TagIconDemo";
import tagIconDemoCode from "./demos/TagIconDemo.tsx?raw";
import { TagRemovableDemo } from "./demos/TagRemovableDemo";
import tagRemovableDemoCode from "./demos/TagRemovableDemo.tsx?raw";

export default {
  description: "Label an item or represent a removable value.",
  usage: "Supply label and optional icon. Add onRemove to expose a removal button.",
  anatomy: "A compact pill contains the label. The optional native button has a label-specific accessible name.",
  notes: [
    "The parent removes the value from its data.",
    "When removing the focused tag, move focus to an appropriate remaining control."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A tag with only its label; use it to mark a category or keyword on an item.", Demo: TagDemo, code: tagDemoCode },
    { id: "icon", title: "Icon", description: "A 14 px Icon before the label, to tell kinds of tags apart at a glance.", Demo: TagIconDemo, code: tagIconDemoCode },
    { id: "removable", title: "Removable", description: "Each tag's remove button drops it from the parent's list and moves focus to the restore button; use it for filters the user can clear.", Demo: TagRemovableDemo, code: tagRemovableDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus the remove button when present."
    },
    {
      "key": "Enter / Space",
      "description": "Remove the tag."
    }
  ],
  related: [
    "TagInput",
    "Badge"
  ],
  props: {
    "label": "The text in the pill; the remove button's name is built from it.",
    "icon": "Optional decorative icon before the label.",
    "onRemove": "Shows a remove button beside the label that calls it.",
    "removeLabel": "Names the remove button from the label (\"Remove Design\" by default).",
    "className": "Classes on the pill, for margin and placement."
  },
};
