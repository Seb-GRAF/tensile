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
    { id: "usage", title: "Basic usage", description: "Standalone floating-label input.", Demo: TextFieldDemo, code: textFieldDemoCode },
    { id: "error", title: "Validation", description: "Validation error and recovery.", Demo: TextFieldErrorDemo, code: textFieldErrorDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled text field.", Demo: TextFieldDisabledDemo, code: textFieldDisabledDemoCode },
    { id: "form", title: "In a form", description: "Named field with submission and reset.", Demo: TextFieldFormDemo, code: textFieldFormDemoCode },
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
    "className": "Additional classes on the outer surface, not the native input.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "value": "Current text value.",
    "onValueChange": "Called with the new text when the user types.",
    "label": "Accessible name of the control or region.",
    "error": "Validation message supplied by the application.",
    "name": "Native form field name.",
    "disabled": "Disable the input and any built-in actions.",
    "required": "Use native required validation."
  },
};
