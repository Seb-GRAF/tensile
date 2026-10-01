import { TextFieldDemo } from "./demos/TextFieldDemo";
import textFieldDemoCode from "./demos/TextFieldDemo.tsx?raw";
import { TextFieldErrorDemo } from "./demos/TextFieldErrorDemo";
import textFieldErrorDemoCode from "./demos/TextFieldErrorDemo.tsx?raw";
import { TextFieldDisabledDemo } from "./demos/TextFieldDisabledDemo";
import textFieldDisabledDemoCode from "./demos/TextFieldDisabledDemo.tsx?raw";
import { TextFieldFormDemo } from "./demos/TextFieldFormDemo";
import textFieldFormDemoCode from "./demos/TextFieldFormDemo.tsx?raw";

export default {
  description: "A standalone text input with its own floating label and error.",
  usage: "Store the value in React state and pass its setter to onValueChange.",
  anatomy: "The outer surface contains a native input with the design-system focus and error treatment.",
  notes: [
    "Native input attributes such as name and autoComplete pass through. Reset controlled values in the form’s onReset handler.",
    "TextField includes its own label and does not need Field. It has no placeholder prop."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A text field with its own label, which floats up while you type. Use it where a single field stands alone, without a Field around it.", Demo: TextFieldDemo, code: textFieldDemoCode },
    { id: "error", title: "Validation", description: "The error shows inside the field while the name is too short and clears as soon as it's long enough. Use it for checks you can run as people type.", Demo: TextFieldErrorDemo, code: textFieldErrorDemoCode },
    { id: "disabled", title: "Disabled", description: "The field is dimmed and can't be focused or edited. Use it for a value that can't change in the current state.", Demo: TextFieldDisabledDemo, code: textFieldDisabledDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the text; Reset clears it through the parent's state.", Demo: TextFieldFormDemo, code: textFieldFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move focus into or out of the input."
    },
    {
      "key": "Typing",
      "description": "Edit the controlled text value using native text-entry keys."
    }
  ],
  related: [
    "Field",
    "Button"
  ],
  props: {
    "style": "Inline styles on the outer surface.",
    "className": "Classes for the shape around the input, to set its width or place it; other props go to the input.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "value": "The text. Pass it to control TextField; leave it out and TextField keeps its own text.",
    "defaultValue": "The text TextField starts with when it keeps its own text; the label starts up when it isn't empty.",
    "onValueChange": "Called with the new text when the user types.",
    "label": "The visible label inside the field, which also names the input; it floats up while the field has focus or text.",
    "error": "Validation message supplied by the application.",
    "name": "Native form field name.",
    "disabled": "Disables the native input and dims the field.",
    "required": "Use native required validation."
  },
};
