import { NumberInputDemo } from "./demos/NumberInputDemo";
import numberInputDemoCode from "./demos/NumberInputDemo.tsx?raw";
import { NumberInputBoundsDemo } from "./demos/NumberInputBoundsDemo";
import numberInputBoundsDemoCode from "./demos/NumberInputBoundsDemo.tsx?raw";
import { NumberInputFormatDemo } from "./demos/NumberInputFormatDemo";
import numberInputFormatDemoCode from "./demos/NumberInputFormatDemo.tsx?raw";
import { NumberInputDisabledDemo } from "./demos/NumberInputDisabledDemo";
import numberInputDisabledDemoCode from "./demos/NumberInputDisabledDemo.tsx?raw";
import { NumberInputReadOnlyDemo } from "./demos/NumberInputReadOnlyDemo";
import numberInputReadOnlyDemoCode from "./demos/NumberInputReadOnlyDemo.tsx?raw";
import { NumberInputFormDemo } from "./demos/NumberInputFormDemo";
import numberInputFormDemoCode from "./demos/NumberInputFormDemo.tsx?raw";

export default {
  description: "Enter a number with formatting, bounds and keyboard steps.",
  usage: "Use a number or null in state. The input keeps a text draft while focused and commits on Enter or blur.",
  anatomy: "Input provides the surface and optional Field label. A hidden input submits the raw numeric value.",
  notes: [
    "An empty draft commits null. Invalid numeric text keeps the previous value.",
    "Bounds clamp committed values; step controls arrow increments.",
    "Provide matching formatValue and parseValue when accepting formatted input."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A budget field that shows the formatted number and edits the raw one; the value changes on Enter or when focus leaves, and clearing it gives null. Start here for typed numbers.", Demo: NumberInputDemo, code: numberInputDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Values are kept between 0 and 100, and the arrow keys step by 0.5. Use bounds for amounts with a real limit.", Demo: NumberInputBoundsDemo, code: numberInputBoundsDemoCode },
    { id: "format", title: "Custom formatting", description: "The number shows as \"CHF 12.50\", and `parseValue` reads that text back. Change both together, so what people see can be typed back in.", Demo: NumberInputFormatDemo, code: numberInputFormatDemoCode },
    { id: "disabled", title: "Disabled", description: "The field is dimmed and can't be focused or edited. Use it for a number that can't change in the current state.", Demo: NumberInputDisabledDemo, code: numberInputDisabledDemoCode },
    { id: "readonly", title: "Read only", description: "The formatted number can be focused and copied but not changed, and the arrow keys do nothing. Use it for computed totals.", Demo: NumberInputReadOnlyDemo, code: numberInputReadOnlyDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the plain number (\"1250.5\", not \"1,250.5\"), and the Field supplies the label.", Demo: NumberInputFormDemo, code: numberInputFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down",
      "description": "Commit a value one step higher or lower."
    },
    {
      "key": "Enter",
      "description": "Commit the draft without submitting the form."
    },
    {
      "key": "Tab",
      "description": "Commit on blur and move focus."
    }
  ],
  related: [
    "Input",
    "NumberStepper",
    "Field"
  ],
  props: {
    "form": "ID of the form that owns the visible and hidden inputs.",
    "disabled": "Disables the input and dims the pill; the hidden input is left out of the form. A disabled Field or Fieldset does the same.",
    "name": "Name used for the submitted form value.",
    "readOnly": "Keep the value focusable and selectable without allowing edits.",
    "inputMode": "Hints at the type of data that might be entered by the user while editing the element or its contents",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "onKeyDown": "Native keyboard handler; preventDefault skips the built-in handling.",
    "leading": "Content before the main content.",
    "trailing": "Content after the main content.",
    "value": "The number, or null when empty. Pass it to control NumberInput; leave it out and NumberInput keeps its own number.",
    "defaultValue": "The number NumberInput starts with when it keeps its own number.",
    "onValueChange": "Called with the clamped number, or null, when an edit is committed with Enter, on blur or with the arrow keys.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format the number when the input is not focused.",
    "parseValue": "Parse text into a number or null. NaN keeps the previous value."
  },
};
