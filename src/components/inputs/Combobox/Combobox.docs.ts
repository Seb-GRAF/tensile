import { ComboboxDemo } from "./demos/ComboboxDemo";
import comboboxDemoCode from "./demos/ComboboxDemo.tsx?raw";
import { ComboboxEmptyDemo } from "./demos/ComboboxEmptyDemo";
import comboboxEmptyDemoCode from "./demos/ComboboxEmptyDemo.tsx?raw";
import { ComboboxDisabledDemo } from "./demos/ComboboxDisabledDemo";
import comboboxDisabledDemoCode from "./demos/ComboboxDisabledDemo.tsx?raw";
import { ComboboxFormDemo } from "./demos/ComboboxFormDemo";
import comboboxFormDemoCode from "./demos/ComboboxFormDemo.tsx?raw";

export default {
  description: "Filter a list by typing, then choose an option.",
  usage: "Keep the selected value in state and pass options with stable values and visible labels. Wrap Combobox in Field for a label, description and validation message.",
  anatomy: "Field provides the visible label and error. The control opens a listbox above other page content. A named control adds hidden inputs for form submission.",
  notes: [
    "The required state is exposed to assistive technology; validate the selection in your submit handler.",
    "Reset controlled state explicitly when resetting a form.",
    "Typed text filters the list; only choosing an option changes the submitted value.",
    "Try a query such as “finance” in the no-results example."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Type to filter and choose an option.", Demo: ComboboxDemo, code: comboboxDemoCode },
    { id: "empty", title: "Empty state", description: "No matching results.", Demo: ComboboxEmptyDemo, code: comboboxEmptyDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled combobox.", Demo: ComboboxDisabledDemo, code: comboboxDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named selection.", Demo: ComboboxFormDemo, code: comboboxFormDemoCode },
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
      "key": "Enter",
      "description": "Choose the focused option."
    },
    {
      "key": "Escape",
      "description": "Close the list."
    }
  ],
  related: [
    "Field",
    "Select",
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
