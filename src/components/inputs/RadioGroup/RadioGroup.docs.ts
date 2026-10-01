import { RadioGroupDemo } from "./demos/RadioGroupDemo";
import radioGroupCode from "./demos/RadioGroupDemo.tsx?raw";
import { RadioGroupDisabledDemo } from "./demos/RadioGroupDisabledDemo";
import disabledCode from "./demos/RadioGroupDisabledDemo.tsx?raw";
import { RadioGroupFormDemo } from "./demos/RadioGroupFormDemo";
import formCode from "./demos/RadioGroupFormDemo.tsx?raw";

export default {
  description: "A group of radio buttons for choosing one option from a visible list.",
  usage: "Pass options with a value and label, keep the selected value in React state, and update it through onValueChange. Use null when no option should be selected initially.",
  anatomy: "RadioGroup renders a div with the radiogroup role. Each option is a labeled native radio input in a 40 px row; the selected dot is included. The options array supplies the items. The group has no surface of its own: place it in a Card when it needs one.",
  notes: [
    "Use label to name a standalone group. Inside Field, the group uses the field label, description, required state and error information.",
    "Set disabled on an individual option to prevent that choice, or on RadioGroup to disable the whole group.",
    "Pass name to submit the selected option through FormData. Each group gets its own generated native radio name when name is omitted.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Choose one display density. The selected value matches an option value.", Demo: RadioGroupDemo, code: radioGroupCode },
    { id: "disabled", title: "Disabled options and groups", description: "Enterprise is unavailable in the first group. The second group is entirely disabled.", Demo: RadioGroupDisabledDemo, code: disabledCode },
    { id: "form", title: "In a form", description: "Field supplies the visible group label and required state. The selected delivery value is submitted under its name.", Demo: RadioGroupFormDemo, code: formCode },
  ],
  keyboard: [
    { key: "Tab", description: "Enter or leave the radio group. The selected radio is the entry point when one is checked." },
    { key: "Arrow keys", description: "Move to and select another enabled option using native radio navigation." },
    { key: "Space", description: "Select the focused radio button." },
  ],
  related: ["Field", "Fieldset", "Select", "CheckboxGroup"],
  props: {
    options: "Choices to render. Each has value and label, with an optional icon and disabled state.",
    value: "Selected option value, or null for no selection. Leave it out to let the group track it, starting from defaultValue.",
    defaultValue: "The first selected value when the group tracks it itself. Defaults to null, no selection.",
    onValueChange: "Called with the option's value when it's picked by click or arrow key.",
    label: "Accessible name of a standalone group. Field supplies the name when used as a wrapper.",
    id: "ID on the radiogroup element. Field supplies its control ID when present.",
    name: "Shared native radio name and the key used in FormData.",
    disabled: "Disable every option in the group. Field and Fieldset disabled states also apply.",
    required: "Require one option before native form submission. Field can also make the group required.",
    className: "Classes on the radiogroup, for width and placement. Rows fill its width, so their hover reaches the edge.",
  },
};
