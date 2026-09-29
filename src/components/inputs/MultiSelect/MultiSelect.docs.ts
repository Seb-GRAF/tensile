import { MultiSelectDemo } from "./demos/MultiSelectDemo";
import multiSelectDemoCode from "./demos/MultiSelectDemo.tsx?raw";
import { MultiSelectSummaryDemo } from "./demos/MultiSelectSummaryDemo";
import multiSelectSummaryDemoCode from "./demos/MultiSelectSummaryDemo.tsx?raw";
import { MultiSelectEmptyDemo } from "./demos/MultiSelectEmptyDemo";
import multiSelectEmptyDemoCode from "./demos/MultiSelectEmptyDemo.tsx?raw";
import { MultiSelectDisabledDemo } from "./demos/MultiSelectDisabledDemo";
import multiSelectDisabledDemoCode from "./demos/MultiSelectDisabledDemo.tsx?raw";
import { MultiSelectFormDemo } from "./demos/MultiSelectFormDemo";
import multiSelectFormDemoCode from "./demos/MultiSelectFormDemo.tsx?raw";

export default {
  description: "Choose several options without closing the list.",
  usage: "Keep the selected values in state and pass options with stable values and visible labels. Wrap MultiSelect in Field for a label, description and validation message.",
  anatomy: "Field provides the visible label and error. The control opens a listbox above other page content; each option shows a box that fills with a check when it is picked. A named control adds hidden inputs for form submission.",
  notes: [
    "The required state is exposed to assistive technology; validate the selection in your submit handler.",
    "Reset controlled state explicitly when resetting a form."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled multiple selection.", Demo: MultiSelectDemo, code: multiSelectDemoCode },
    { id: "summary", title: "Summary", description: "Custom selected-value summary.", Demo: MultiSelectSummaryDemo, code: multiSelectSummaryDemoCode },
    { id: "empty", title: "Empty state", description: "Empty options.", Demo: MultiSelectEmptyDemo, code: multiSelectEmptyDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled multiselect.", Demo: MultiSelectDisabledDemo, code: multiSelectDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and repeated named values.", Demo: MultiSelectFormDemo, code: multiSelectFormDemoCode },
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
      "description": "Toggle the focused option."
    },
    {
      "key": "Escape",
      "description": "Close the list."
    }
  ],
  related: [
    "Field",
    "Select",
    "TagInput"
  ],
  props: {
    "options": "Choices with a stable value, visible label and optional icon.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "placeholder": "Hint shown while the value is empty.",
    "label": "Accessible name of the control or region.",
    "emptyText": "Message shown when there are no options or results.",
    "summary": "Format the selected labels in the closed control.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element."
  },
};
