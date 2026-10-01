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
    { id: "usage", title: "Basic usage", description: "A project name shown as text; click it to edit, Enter or leaving the field saves, Escape cancels. Use it for names and titles edited in place.", Demo: EditableTextDemo, code: editableTextDemoCode },
    { id: "empty", title: "Empty state", description: "With no name yet, the placeholder shows in muted text, so there is still something to click. Use it for values people fill in later.", Demo: EditableTextEmptyDemo, code: editableTextEmptyDemoCode },
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
    "value": "The saved text. Pass it to control EditableText; leave it out and EditableText keeps its own text.",
    "defaultValue": "The text EditableText starts with when it keeps its own text.",
    "onValueChange": "Called with the new text when an edit is saved, not on every keystroke.",
    "label": "Names the input while editing, and goes into the edit button's name through `editLabel`.",
    "placeholder": "Hint shown while the value is empty.",
    "editLabel": "Names the button that starts editing, given the label and the saved text.",
    "className": "Classes for the outer box, to place it in a layout."
  },
};
