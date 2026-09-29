import { CheckboxDemo } from "./demos/CheckboxDemo";
import checkboxCode from "./demos/CheckboxDemo.tsx?raw";
import { CheckboxDisabledDemo } from "./demos/CheckboxDisabledDemo";
import disabledCode from "./demos/CheckboxDisabledDemo.tsx?raw";
import { CheckboxIndeterminateDemo } from "./demos/CheckboxIndeterminateDemo";
import indeterminateCode from "./demos/CheckboxIndeterminateDemo.tsx?raw";
import { CheckboxFormDemo } from "./demos/CheckboxFormDemo";
import formCode from "./demos/CheckboxFormDemo.tsx?raw";

export default {
  description: "A labeled checkbox for selecting an option or accepting a condition.",
  usage: "Keep the checked value in React state and pass its setter to onCheckedChange. Use label for the visible text beside the checkbox.",
  anatomy: "Checkbox renders a native checkbox input inside a label. The checkmark and mixed-state dash are included; no separate indicator component is needed.",
  notes: [
    "Indeterminate is a separate visual state. Derive it from a partial selection, and update checked when the user selects or clears the whole group.",
    "Pass name and value to include the checked option in FormData. Unchecked and disabled checkboxes are omitted. The required prop uses native form validation.",
    "Use CheckboxGroup when several checkboxes share one array of selected values.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A controlled checkbox with a visible label.", Demo: CheckboxDemo, code: checkboxCode },
    { id: "disabled", title: "Disabled", description: "Disabled checkboxes keep their value and are skipped during keyboard navigation.", Demo: CheckboxDisabledDemo, code: disabledCode },
    { id: "indeterminate", title: "Indeterminate", description: "The parent shows a dash while some notifications are selected. Select it to check or clear every option.", Demo: CheckboxIndeterminateDemo, code: indeterminateCode },
    { id: "form", title: "In a form", description: "Require agreement before submitting. Reset restores the React state as well as the form.", Demo: CheckboxFormDemo, code: formCode },
  ],
  keyboard: [
    { key: "Tab", description: "Move focus to the checkbox. Disabled checkboxes are skipped." },
    { key: "Space", description: "Toggle the focused checkbox." },
  ],
  related: ["CheckboxGroup", "Field", "Fieldset"],
  props: {
    checked: "Whether the checkbox is checked. The parent owns this value.",
    onCheckedChange: "Called with the next boolean value when the user toggles the checkbox.",
    label: "Visible text beside the checkbox and its accessible name.",
    indeterminate: "Show a dash to represent a partial selection. This does not set checked.",
    disabled: "Disable interaction. A surrounding Field or Fieldset can also disable the control.",
    name: "Name of the checkbox entry in the submitted form.",
    value: "Value submitted when the checkbox is checked. The native default is on.",
    required: "Require the checkbox to be checked before native form submission.",
    id: "ID applied to the native checkbox input.",
    className: "Additional classes on the wrapping label.",
  },
};
