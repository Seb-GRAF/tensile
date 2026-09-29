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
    { id: "usage", title: "Basic usage", description: "Plain tag.", Demo: TagDemo, code: tagDemoCode },
    { id: "icon", title: "Icon", description: "Tag with an icon.", Demo: TagIconDemo, code: tagIconDemoCode },
    { id: "removable", title: "Removable", description: "Remove a tag from controlled local data.", Demo: TagRemovableDemo, code: tagRemovableDemoCode },
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
    "label": "Accessible name of the control or region.",
    "icon": "Optional decorative icon before the label.",
    "onRemove": "Shows a remove button beside the label that calls it.",
    "removeLabel": "Build the accessible name of the remove button.",
    "className": "Additional classes on the outer element."
  },
};
