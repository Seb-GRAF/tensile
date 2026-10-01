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
import { MultiSelectGroupsDemo } from "./demos/MultiSelectGroupsDemo";
import multiSelectGroupsDemoCode from "./demos/MultiSelectGroupsDemo.tsx?raw";

export default {
  description: "Choose several options without closing the list.",
  usage: "Keep the selected values in state and pass options with stable values and visible labels. Wrap MultiSelect in Field for a label, description and validation message.",
  anatomy: "Field provides the visible label and error. The control opens a listbox above other page content; each option shows a box that fills with a check when it is picked. A named control adds hidden inputs for form submission.",
  notes: [
    "The required state is exposed to assistive technology; validate the selection in your submit handler.",
    "Reset controlled state explicitly when resetting a form."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A team picker whose list stays open while you tick several teams, with the values in the parent's state. Start here when more than one answer is allowed.", Demo: MultiSelectDemo, code: multiSelectDemoCode },
    { id: "summary", title: "Summary", description: "`summary` turns the picked labels into a count, \"2 teams selected\". Use it when the labels are long or many are usually picked.", Demo: MultiSelectSummaryDemo, code: multiSelectSummaryDemoCode },
    { id: "empty", title: "Empty state", description: "With no options, the open list shows the empty text. Use it when the list can come back empty.", Demo: MultiSelectEmptyDemo, code: multiSelectEmptyDemoCode },
    { id: "disabled", title: "Disabled", description: "The whole control is dimmed and won't open, but still shows the summary of its values. Use it while the choice is locked.", Demo: MultiSelectDisabledDemo, code: multiSelectDisabledDemoCode },
    { id: "groups", title: "Groups and disabled options", description: "Toppings listed under headings, with sold-out ones dimmed and skipped by the keyboard. Use it for longer lists with natural categories.", Demo: MultiSelectGroupsDemo, code: multiSelectGroupsDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits one value per picked option under the same name, and the Field shows the label and error.", Demo: MultiSelectFormDemo, code: multiSelectFormDemoCode },
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
    "options": "The choices: `{ value, label, icon?, disabled? }`, or groups `{ label, options }` whose options show under a heading. A disabled option is dimmed and can't be picked.",
    "value": "The picked values. Pass it to control MultiSelect; leave it out and MultiSelect keeps its own values.",
    "defaultValue": "The values MultiSelect starts with when it keeps its own values.",
    "onValueChange": "Called with all picked values each time an option is ticked or unticked.",
    "placeholder": "Hint shown while the value is empty.",
    "label": "Names the pill and its list for screen readers when no Field labels them.",
    "emptyText": "Shown in the open list when there are no options.",
    "summary": "Format the selected labels in the closed control.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the pill and stops it from opening or taking focus; the hidden inputs are left out of the form. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes for the outer box, to set its width or place it in a layout."
  },
};
