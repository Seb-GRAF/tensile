import { InputDemo } from "./demos/InputDemo";
import inputDemoCode from "./demos/InputDemo.tsx?raw";
import { InputSlotsDemo } from "./demos/InputSlotsDemo";
import inputSlotsDemoCode from "./demos/InputSlotsDemo.tsx?raw";
import { InputDisabledDemo } from "./demos/InputDisabledDemo";
import inputDisabledDemoCode from "./demos/InputDisabledDemo.tsx?raw";
import { InputReadOnlyDemo } from "./demos/InputReadOnlyDemo";
import inputReadOnlyDemoCode from "./demos/InputReadOnlyDemo.tsx?raw";
import { InputFormDemo } from "./demos/InputFormDemo";
import inputFormDemoCode from "./demos/InputFormDemo.tsx?raw";

export default {
  description: "A controlled native text input with optional leading and trailing content.",
  usage: "Store the value in React state and pass its setter to onValueChange.",
  anatomy: "The outer surface contains a native input with the design-system focus and error treatment.",
  notes: [
    "Native input attributes such as name and autoComplete pass through. Reset controlled values in the form’s onReset handler.",
    "Use Field for a visible label, description and error. Without Field, provide an accessible name directly."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled text entry with a visible Field label.", Demo: InputDemo, code: inputDemoCode },
    { id: "slots", title: "Content slots", description: "Leading icon and trailing action.", Demo: InputSlotsDemo, code: inputSlotsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled text entry.", Demo: InputDisabledDemo, code: inputDisabledDemoCode },
    { id: "readonly", title: "Read only", description: "Read-only value.", Demo: InputReadOnlyDemo, code: inputReadOnlyDemoCode },
    { id: "form", title: "In a form", description: "Named input with native submission and reset.", Demo: InputFormDemo, code: inputFormDemoCode },
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
    "Textarea",
    "TextField"
  ],
  props: {
    "style": "Inline styles on the outer surface.",
    "disabled": "Disable the input and any built-in actions.",
    "required": "Use native required validation.",
    "className": "Additional classes on the outer surface, not the native input.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "value": "Current text value.",
    "onValueChange": "Called with the new text when the user types.",
    "leading": "Content before the input.",
    "trailing": "Content after the input.",
    "name": "Native form field name.",
    "readOnly": "Allow focus and selection while preventing text edits."
  },
};
