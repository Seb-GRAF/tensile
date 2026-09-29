import { SelectDemo } from "./demos/SelectDemo";
import selectDemoCode from "./demos/SelectDemo.tsx?raw";
import { SelectEmptyDemo } from "./demos/SelectEmptyDemo";
import selectEmptyDemoCode from "./demos/SelectEmptyDemo.tsx?raw";
import { SelectIconsDemo } from "./demos/SelectIconsDemo";
import selectIconsDemoCode from "./demos/SelectIconsDemo.tsx?raw";
import { SelectDisabledDemo } from "./demos/SelectDisabledDemo";
import selectDisabledDemoCode from "./demos/SelectDisabledDemo.tsx?raw";
import { SelectFormDemo } from "./demos/SelectFormDemo";
import selectFormDemoCode from "./demos/SelectFormDemo.tsx?raw";

export default {
  description: "Choose one option from a popup list.",
  usage: "Keep the selected value in state and pass options with stable values and visible labels. Wrap Select in Field for a label, description and validation message.",
  anatomy: "Field provides the visible label and error. The control opens a listbox above other page content. A named control adds hidden inputs for form submission.",
  notes: [
    "The required state is exposed to assistive technology; validate the selection in your submit handler.",
    "Reset controlled state explicitly when resetting a form."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled single selection.", Demo: SelectDemo, code: selectDemoCode },
    { id: "empty", title: "Empty state", description: "Empty options and placeholder.", Demo: SelectEmptyDemo, code: selectEmptyDemoCode },
    { id: "icons", title: "With icons", description: "Options with icons.", Demo: SelectIconsDemo, code: selectIconsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled selection.", Demo: SelectDisabledDemo, code: selectDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition, named value and validation.", Demo: SelectFormDemo, code: selectFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow Up / Arrow Down",
      "description": "Open the list and move between options."
    },
    {
      "key": "Home / End",
      "description": "Move to the first or last option while open."
    },
    {
      "key": "Enter / Space",
      "description": "Choose the focused option."
    },
    {
      "key": "Escape",
      "description": "Close the list."
    }
  ],
  related: [
    "Field",
    "Combobox",
    "MultiSelect"
  ],
  props: {
    "options": "Available choices. Each option supplies a value and visible label.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "placeholder": "Hint shown while the value is empty.",
    "label": "Accessible name of the control or region.",
    "emptyText": "Message shown when there are no options or results.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element."
  },
};
