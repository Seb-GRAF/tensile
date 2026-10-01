import { ComboboxDemo } from "./demos/ComboboxDemo";
import comboboxDemoCode from "./demos/ComboboxDemo.tsx?raw";
import { ComboboxEmptyDemo } from "./demos/ComboboxEmptyDemo";
import comboboxEmptyDemoCode from "./demos/ComboboxEmptyDemo.tsx?raw";
import { ComboboxDisabledDemo } from "./demos/ComboboxDisabledDemo";
import comboboxDisabledDemoCode from "./demos/ComboboxDisabledDemo.tsx?raw";
import { ComboboxFormDemo } from "./demos/ComboboxFormDemo";
import comboboxFormDemoCode from "./demos/ComboboxFormDemo.tsx?raw";
import { ComboboxGroupsDemo } from "./demos/ComboboxGroupsDemo";
import comboboxGroupsDemoCode from "./demos/ComboboxGroupsDemo.tsx?raw";

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
    { id: "usage", title: "Basic usage", description: "A team picker that narrows as you type, with the value in the parent's state. Use it instead of Select when the list is long enough that typing beats scrolling.", Demo: ComboboxDemo, code: comboboxDemoCode },
    { id: "empty", title: "Empty state", description: "A query that matches nothing shows the empty text in the open list. Set `emptyText` to tell people what to try instead.", Demo: ComboboxEmptyDemo, code: comboboxEmptyDemoCode },
    { id: "disabled", title: "Disabled", description: "The field is dimmed, can't be focused or typed in, and still shows its value. Use it while a choice is locked.", Demo: ComboboxDisabledDemo, code: comboboxDisabledDemoCode },
    { id: "groups", title: "Groups and disabled options", description: "People listed under team headings; filtering hides empty teams, and people on leave stay visible but can't be picked. Use it for long lists with natural categories.", Demo: ComboboxGroupsDemo, code: comboboxGroupsDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the picked value (never the typed text) and the Field shows the label and error.", Demo: ComboboxFormDemo, code: comboboxFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow Up / Arrow Down",
      "description": "Open the list and move between options, across groups, passing over disabled ones."
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
    "options": "The choices: `{ value, label, icon?, disabled? }`, or groups `{ label, options }` whose options show under a heading. Typing filters options by the start of their words; a group with no matches is hidden. A disabled option is dimmed and can't be picked.",
    "value": "The selected value, or null for none. Pass it to control Combobox; leave it out and Combobox keeps its own value.",
    "defaultValue": "The value Combobox starts with when it keeps its own value.",
    "onValueChange": "Called with the value of the option the user picks; typing alone doesn't call it.",
    "placeholder": "Shown in the empty input; inside a Field with the label inside, only while it has focus.",
    "label": "Names the input and its list for screen readers when no Field labels them.",
    "emptyText": "Shown in the open list when nothing matches the typed text.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the field and disables the input, so it can't be focused or opened; the hidden input is left out of the form. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes for the outer box, to set its width or place it in a layout."
  },
};
