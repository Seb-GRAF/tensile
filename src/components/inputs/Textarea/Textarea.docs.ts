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
    { id: "usage", title: "Basic usage", description: "A message box labelled by a Field that grows as you type, with its text in the parent's state. Use it for text longer than one line.", Demo: TextareaDemo, code: textareaDemoCode },
    { id: "above", title: "Label above", description: "`labelPlacement=\"above\"` on the Field puts the label over the box instead of inside it. Use it when the box starts tall or holds a long prompt.", Demo: TextareaAboveDemo, code: textareaAboveDemoCode },
    { id: "error", title: "Validation", description: "An error from the Field opens inside the box, below the text. Use it to explain what to fix after a check fails.", Demo: TextareaErrorDemo, code: textareaErrorDemoCode },
    { id: "disabled", title: "Disabled", description: "The box is dimmed and can't be focused or edited. Use it for text that can't change in the current state.", Demo: TextareaDisabledDemo, code: textareaDisabledDemoCode },
    { id: "readonly", title: "Read only", description: "The text can be focused, selected and copied but not edited. Use it to show submitted text in place.", Demo: TextareaReadOnlyDemo, code: textareaReadOnlyDemoCode },
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
    "disabled": "Disables the native textarea and dims the box; a disabled Field or Fieldset does the same.",
    "required": "Use native required validation.",
    "className": "Classes for the box around the textarea, to set its width or place it; other props go to the textarea.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "rows": "Minimum visible text rows before the textarea grows.",
    "value": "The text. Pass it to control Textarea; leave it out and Textarea keeps its own text.",
    "defaultValue": "The text Textarea starts with when it keeps its own text; the floating label starts up when it isn't empty.",
    "onValueChange": "Called with the new text when the user types.",
    "name": "Native form field name.",
    "readOnly": "Allow focus and selection while preventing text edits."
  },
};
