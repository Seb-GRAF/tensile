import { FieldDemo } from "./demos/FieldDemo";
import fieldDemoCode from "./demos/FieldDemo.tsx?raw";
import { FieldAboveDemo } from "./demos/FieldAboveDemo";
import fieldAboveDemoCode from "./demos/FieldAboveDemo.tsx?raw";
import { FieldErrorDemo } from "./demos/FieldErrorDemo";
import fieldErrorDemoCode from "./demos/FieldErrorDemo.tsx?raw";
import { FieldDisabledDemo } from "./demos/FieldDisabledDemo";
import fieldDisabledDemoCode from "./demos/FieldDisabledDemo.tsx?raw";
import { FieldExample } from "./demos/FieldExample";
import existingCode from "./demos/FieldExample.tsx?raw";

export default {
  description: "A label, description and validation message connected to one control.",
  usage: "Wrap a Field-aware control and keep its value in React state.",
  anatomy: "Field renders a label and supporting text and supplies shared state through context.",
  notes: [
    "Field supplies the control ID, label, description, invalid, required and disabled state. Use one Field per control.",
    "Inside labels are supported by Input, Textarea, Select, Combobox, MultiSelect and TagInput. Other controls keep the label above.",
    "The application supplies validation messages. A required state does not implement every form validation rule."
  ],
  examples: [
    { id: "form", title: "In a form", description: "Submitting with the name empty shows the error inside the field and moves focus to it; submitting a name clears it. Use this pattern for checks that run on submit.", Demo: FieldExample, code: existingCode },
    { id: "usage", title: "Basic usage", description: "A label that rests inside the Input and floats up while you type, plus a description below. Wrap every Field-aware control this way.", Demo: FieldDemo, code: fieldDemoCode },
    { id: "above", title: "Label above", description: "`labelPlacement=\"above\"` keeps the label over the control at all times. Use it when a form mixes text fields with controls that always show their label above.", Demo: FieldAboveDemo, code: fieldAboveDemoCode },
    { id: "error", title: "Validation", description: "The error shows while the name is too short and clears as soon as it's long enough. Use it for checks you can run as people type.", Demo: FieldErrorDemo, code: fieldErrorDemoCode },
    { id: "disabled", title: "Disabled", description: "`disabled` on the Field dims and disables the control inside it, so the control needs no prop of its own.", Demo: FieldDisabledDemo, code: fieldDisabledDemoCode },
  ],
  keyboard: [],
  related: [
    "Input",
    "TextField",
    "Fieldset"
  ],
  props: {
    "label": "Visible label connected to the enclosed control.",
    "description": "Supporting content explaining the control or group.",
    "error": "Validation message supplied by the application.",
    "required": "Mark the field required and pass that state to its control.",
    "disabled": "Disable the enclosed Field-aware control.",
    "labelPlacement": "Place the label inside supported text controls or above the control.",
    "children": "One Field-aware control.",
    "className": "Classes for the Field's outer box, to set its width or place it in a form layout."
  },
};
