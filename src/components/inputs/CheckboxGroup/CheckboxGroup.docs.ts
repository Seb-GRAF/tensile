import { CheckboxGroupDemo } from "./demos/CheckboxGroupDemo";
import checkboxGroupDemoCode from "./demos/CheckboxGroupDemo.tsx?raw";
import { CheckboxGroupDisabledDemo } from "./demos/CheckboxGroupDisabledDemo";
import checkboxGroupDisabledDemoCode from "./demos/CheckboxGroupDisabledDemo.tsx?raw";
import { CheckboxGroupFormDemo } from "./demos/CheckboxGroupFormDemo";
import checkboxGroupFormDemoCode from "./demos/CheckboxGroupFormDemo.tsx?raw";

export default {
  description: "Several labeled checkboxes backed by one array of selected values.",
  usage: "Pass options and keep the selected option values in state.",
  anatomy: "A named group contains native Checkbox controls.",
  notes: [
    "Options have value, label and optional disabled fields.",
    "Use FormData.getAll(name) to read the repeated checked values. Unchecked and disabled controls are omitted."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled multiple selection.", Demo: CheckboxGroupDemo, code: checkboxGroupDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled options and whole group.", Demo: CheckboxGroupDisabledDemo, code: checkboxGroupDisabledDemoCode },
    { id: "form", title: "In a form", description: "Fieldset composition and repeated named form values.", Demo: CheckboxGroupFormDemo, code: checkboxGroupFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move through enabled checkboxes."
    },
    {
      "key": "Space",
      "description": "Toggle the focused choice."
    }
  ],
  related: [
    "Checkbox",
    "Fieldset",
    "RadioGroup"
  ],
  props: {
    "options": "Choices with value, label and optional disabled state.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
