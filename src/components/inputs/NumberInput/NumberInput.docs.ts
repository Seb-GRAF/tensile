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
    { id: "usage", title: "Basic usage", description: "Nullable numeric value and commit behavior.", Demo: NumberInputDemo, code: numberInputDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Minimum, maximum and step.", Demo: NumberInputBoundsDemo, code: numberInputBoundsDemoCode },
    { id: "format", title: "Custom formatting", description: "Matching custom formatting and parsing.", Demo: NumberInputFormatDemo, code: numberInputFormatDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled number entry.", Demo: NumberInputDisabledDemo, code: numberInputDisabledDemoCode },
    { id: "readonly", title: "Read only", description: "Read-only numeric value.", Demo: NumberInputReadOnlyDemo, code: numberInputReadOnlyDemoCode },
    { id: "form", title: "In a form", description: "Field composition and raw numeric form value.", Demo: NumberInputFormDemo, code: numberInputFormDemoCode },
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
    "disabled": "Disable interaction with this control.",
    "name": "Name used for the submitted form value.",
    "readOnly": "Keep the value focusable and selectable without allowing edits.",
    "inputMode": "Hints at the type of data that might be entered by the user while editing the element or its contents",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler.",
    "onKeyDown": "Native keyboard handler; preventDefault skips the built-in handling.",
    "leading": "Content before the main content.",
    "trailing": "Content after the main content.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format the number when the input is not focused.",
    "parseValue": "Parse text into a number or null. NaN keeps the previous value."
  },
};
