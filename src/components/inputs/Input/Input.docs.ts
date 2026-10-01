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
    { id: "usage", title: "Basic usage", description: "A text field labelled by a Field, with its text in the parent's state. Start here for any single line of text.", Demo: InputDemo, code: inputDemoCode },
    { id: "slots", title: "Content slots", description: "A search icon before the text and a clear button after it. Use the slots for icons, units or a small action that belongs to the field.", Demo: InputSlotsDemo, code: inputSlotsDemoCode },
    { id: "disabled", title: "Disabled", description: "The field is dimmed and can't be focused or edited. Use it for a value that can't change in the current state.", Demo: InputDisabledDemo, code: inputDisabledDemoCode },
    { id: "readonly", title: "Read only", description: "The text can be focused, selected and copied but not edited. Use it for a value people need to see or copy, such as an ID.", Demo: InputReadOnlyDemo, code: inputReadOnlyDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the text; Reset clears it through the parent's state.", Demo: InputFormDemo, code: inputFormDemoCode },
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
    "disabled": "Disables the native input and dims the pill; a disabled Field or Fieldset does the same.",
    "required": "Use native required validation.",
    "className": "Classes for the pill around the input, to set its width or place it; other props go to the input.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "value": "The text. Pass it to control Input; leave it out and Input keeps its own text.",
    "defaultValue": "The text Input starts with when it keeps its own text; the floating label starts up when it isn't empty.",
    "onValueChange": "Called with the new text when the user types.",
    "leading": "Content before the input.",
    "trailing": "Content after the input.",
    "name": "Native form field name.",
    "readOnly": "Allow focus and selection while preventing text edits."
  },
};
