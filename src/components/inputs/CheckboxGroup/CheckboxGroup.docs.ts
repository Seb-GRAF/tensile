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
    { id: "usage", title: "Basic usage", description: "A group of channels where any number can be on; one option is disabled on its own.", Demo: CheckboxGroupDemo, code: checkboxGroupDemoCode },
    { id: "disabled", title: "Disabled", description: "A disabled group keeps its checked boxes but takes no input.", Demo: CheckboxGroupDisabledDemo, code: checkboxGroupDisabledDemoCode },
    { id: "form", title: "In a form", description: "The group in a Fieldset: name submits one entry per checked option, and Reset restores the first choice.", Demo: CheckboxGroupFormDemo, code: checkboxGroupFormDemoCode },
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
    "value": "Values of the checked options. Leave it out to let the group track them, starting from defaultValue.",
    "defaultValue": "The first checked values when the group tracks them itself. Defaults to none.",
    "onValueChange": "Called with every checked value, in the order they were checked, when a box is toggled.",
    "label": "Accessible name of the group when no Field or Fieldset wraps it.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims every option and stops them from toggling. A disabled Field or Fieldset does the same.",
    "className": "Classes on the group, for width and placement. Rows fill its width, so their hover reaches the edge."
  },
};
