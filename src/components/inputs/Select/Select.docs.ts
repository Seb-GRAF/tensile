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
import { SelectDisabledOptionsDemo } from "./demos/SelectDisabledOptionsDemo";
import selectDisabledOptionsDemoCode from "./demos/SelectDisabledOptionsDemo.tsx?raw";
import { SelectGroupsDemo } from "./demos/SelectGroupsDemo";
import selectGroupsDemoCode from "./demos/SelectGroupsDemo.tsx?raw";

export default {
  description: "Choose one option from a popup list.",
  usage: "Keep the selected value in state and pass options with stable values and visible labels. Wrap Select in Field for a label, description and validation message.",
  anatomy: "Field provides the visible label and error. The control opens a listbox above other page content. A named control adds hidden inputs for form submission.",
  notes: [
    "The required state is exposed to assistive technology; validate the selection in your submit handler.",
    "Reset controlled state explicitly when resetting a form."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A team picker whose value lives in the parent's state, labelled by a Field. Start here for a single choice from a short list.", Demo: SelectDemo, code: selectDemoCode },
    { id: "empty", title: "Empty state", description: "With no options, the open list shows the empty text. Use it when a list can come back empty, such as teams the user can't see yet.", Demo: SelectEmptyDemo, code: selectEmptyDemoCode },
    { id: "icons", title: "With icons", description: "Each option shows an icon before its label. Use icons when they help tell options apart at a glance.", Demo: SelectIconsDemo, code: selectIconsDemoCode },
    { id: "disabled", title: "Disabled", description: "The whole control is dimmed and won't open, but still shows its value. Use it while a choice is locked, for example until a plan is upgraded.", Demo: SelectDisabledDemo, code: selectDisabledDemoCode },
    { id: "disabled-options", title: "Disabled options", description: "Overnight shipping stays in the list, dimmed, and can't be picked; the keyboard passes over it. Use it when an option exists but isn't available right now.", Demo: SelectDisabledOptionsDemo, code: selectDisabledOptionsDemoCode },
    { id: "groups", title: "Groups", description: "Time zones listed under region headings. Use groups when a longer list has natural categories.", Demo: SelectGroupsDemo, code: selectGroupsDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the value and the Field shows an error until a team is picked; Reset clears both.", Demo: SelectFormDemo, code: selectFormDemoCode },
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
    "options": "The choices: `{ value, label, icon?, disabled? }`, or groups `{ label, options }` whose options show under a heading. A disabled option is dimmed and can't be picked.",
    "value": "The selected value, or null for none. Pass it to control Select; leave it out and Select keeps its own value.",
    "defaultValue": "The value Select starts with when it keeps its own value.",
    "onValueChange": "Called with the value of the option the user picks.",
    "placeholder": "Hint shown while the value is empty.",
    "label": "Names the pill and its list for screen readers when no Field labels them.",
    "emptyText": "Shown in the open list when there are no options.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the pill and stops it from opening or taking focus; the hidden input is left out of the form. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes for the outer box, to set its width or place it in a layout."
  },
};
