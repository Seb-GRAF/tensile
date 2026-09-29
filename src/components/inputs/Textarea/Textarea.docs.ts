import { TextareaDemo } from "./demos/TextareaDemo";
import textareaDemoCode from "./demos/TextareaDemo.tsx?raw";
import { TextareaAboveDemo } from "./demos/TextareaAboveDemo";
import textareaAboveDemoCode from "./demos/TextareaAboveDemo.tsx?raw";
import { TextareaErrorDemo } from "./demos/TextareaErrorDemo";
import textareaErrorDemoCode from "./demos/TextareaErrorDemo.tsx?raw";
import { TextareaDisabledDemo } from "./demos/TextareaDisabledDemo";
import textareaDisabledDemoCode from "./demos/TextareaDisabledDemo.tsx?raw";
import { TextareaReadOnlyDemo } from "./demos/TextareaReadOnlyDemo";
import textareaReadOnlyDemoCode from "./demos/TextareaReadOnlyDemo.tsx?raw";

export default {
  description: "A controlled textarea that grows with its content.",
  usage: "Store the value in React state and pass its setter to onValueChange.",
  anatomy: "The outer surface contains a native textarea with the design-system focus and error treatment.",
  notes: [
    "Native input attributes such as name and autoComplete pass through. Reset controlled values in the form’s onReset handler.",
    "Use Field for a visible label, description and error. Without Field, provide an accessible name directly."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled multiline entry with a Field label.", Demo: TextareaDemo, code: textareaDemoCode },
    { id: "above", title: "Label above", description: "Label above the textarea.", Demo: TextareaAboveDemo, code: textareaAboveDemoCode },
    { id: "error", title: "Validation", description: "Growing field error.", Demo: TextareaErrorDemo, code: textareaErrorDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled multiline entry.", Demo: TextareaDisabledDemo, code: textareaDisabledDemoCode },
    { id: "readonly", title: "Read only", description: "Read-only multiline value.", Demo: TextareaReadOnlyDemo, code: textareaReadOnlyDemoCode },
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
    "disabled": "Disable the input and any built-in actions.",
    "required": "Use native required validation.",
    "className": "Additional classes on the outer surface, not the native input.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "rows": "Minimum visible text rows before the textarea grows.",
    "value": "Current text value.",
    "onValueChange": "Called with the new text when the user types.",
    "name": "Native form field name.",
    "readOnly": "Allow focus and selection while preventing text edits."
  },
};
