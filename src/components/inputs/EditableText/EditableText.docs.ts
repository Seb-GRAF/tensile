import { EditableTextDemo } from "./demos/EditableTextDemo";
import editableTextDemoCode from "./demos/EditableTextDemo.tsx?raw";
import { EditableTextEmptyDemo } from "./demos/EditableTextEmptyDemo";
import editableTextEmptyDemoCode from "./demos/EditableTextEmptyDemo.tsx?raw";

export default {
  description: "Inline text that becomes editable on activation.",
  usage: "Keep the committed value in state; onValueChange runs when an edit is saved.",
  anatomy: "A display Button and a native text input share one shape measured to the text; while editing, its paper fill fades in and the text stays in place.",
  notes: [
    "Enter, Tab and blur commit the draft; Escape cancels it. Committing or cancelling returns focus to the display button."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Edit, commit and cancel a named value.", Demo: EditableTextDemo, code: editableTextDemoCode },
    { id: "empty", title: "Empty state", description: "Empty value with a placeholder.", Demo: EditableTextEmptyDemo, code: editableTextEmptyDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Start editing from the display button."
    },
    {
      "key": "Enter / Tab",
      "description": "Commit the draft and return focus to the display."
    },
    {
      "key": "Escape",
      "description": "Discard the draft."
    }
  ],
  related: [
    "Input",
    "Button"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "placeholder": "Hint shown while the value is empty.",
    "editLabel": "Build the accessible name of the edit button from its label and value.",
    "className": "Additional classes on the outer element."
  },
};
