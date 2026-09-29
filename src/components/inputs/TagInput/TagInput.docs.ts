import { TagInputDemo } from "./demos/TagInputDemo";
import tagInputDemoCode from "./demos/TagInputDemo.tsx?raw";
import { TagInputAboveDemo } from "./demos/TagInputAboveDemo";
import tagInputAboveDemoCode from "./demos/TagInputAboveDemo.tsx?raw";
import { TagInputDisabledDemo } from "./demos/TagInputDisabledDemo";
import tagInputDisabledDemoCode from "./demos/TagInputDisabledDemo.tsx?raw";
import { TagInputFormDemo } from "./demos/TagInputFormDemo";
import tagInputFormDemoCode from "./demos/TagInputFormDemo.tsx?raw";

export default {
  description: "Enter and remove a list of text values.",
  usage: "Keep tags in a string array. Use Field for the label and explain how to confirm a tag.",
  anatomy: "Field supplies the label and validation message. Each confirmed value becomes a removable Tag. The text input adds new values.",
  notes: [
    "Empty and duplicate values are not added; whitespace around a new value is trimmed.",
    "Only confirmed tags are submitted, using repeated inputs with the same name.",
    "The required state is ARIA only. Validate the array in your submit handler."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Add and remove tags.", Demo: TagInputDemo, code: tagInputDemoCode },
    { id: "above", title: "Label above", description: "Label above the input.", Demo: TagInputAboveDemo, code: tagInputAboveDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled tag editing.", Demo: TagInputDisabledDemo, code: tagInputDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field validation and repeated named values.", Demo: TagInputFormDemo, code: tagInputFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / comma",
      "description": "Confirm the typed tag."
    },
    {
      "key": "Backspace",
      "description": "Remove the last tag when the text input is empty."
    },
    {
      "key": "Tab",
      "description": "Move between the input and remove buttons."
    }
  ],
  related: [
    "Tag",
    "Field",
    "MultiSelect"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "placeholder": "Hint shown while the value is empty.",
    "removeLabel": "Accessible label for each tag removal action.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element."
  },
};
