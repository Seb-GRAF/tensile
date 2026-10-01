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
    { id: "usage", title: "Basic usage", description: "Topics typed and added with Enter or a comma, each removable with its button, labelled by a Field. Use it for free-form keywords.", Demo: TagInputDemo, code: tagInputDemoCode },
    { id: "above", title: "Label above", description: "`labelPlacement=\"above\"` on the Field puts the label over the shape instead of inside it. Use it when many tags make the shape tall.", Demo: TagInputAboveDemo, code: tagInputAboveDemoCode },
    { id: "disabled", title: "Disabled", description: "The tags stay visible but can't be added or removed. Use it while the list is locked.", Demo: TagInputDisabledDemo, code: tagInputDisabledDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits one value per tag under the same name, and the Field shows an error while there are none.", Demo: TagInputFormDemo, code: tagInputFormDemoCode },
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
    "value": "The tags. Pass it to control TagInput; leave it out and TagInput keeps its own tags.",
    "defaultValue": "The tags TagInput starts with when it keeps its own tags.",
    "onValueChange": "Called with all tags each time one is added or removed.",
    "label": "Names the text input for screen readers when no Field labels it.",
    "placeholder": "Hint shown while the value is empty.",
    "removeLabel": "Names each tag's remove button, given the tag.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the shape and disables the input and remove buttons; the hidden inputs are left out of the form. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes for the outer box, to set its width or place it in a layout."
  },
};
