import { TimePickerDemo } from "./demos/TimePickerDemo";
import timePickerDemoCode from "./demos/TimePickerDemo.tsx?raw";
import { TimePickerStepsDemo } from "./demos/TimePickerStepsDemo";
import timePickerStepsDemoCode from "./demos/TimePickerStepsDemo.tsx?raw";
import { TimePickerDisabledDemo } from "./demos/TimePickerDisabledDemo";
import timePickerDisabledDemoCode from "./demos/TimePickerDisabledDemo.tsx?raw";
import { TimePickerFormDemo } from "./demos/TimePickerFormDemo";
import timePickerFormDemoCode from "./demos/TimePickerFormDemo.tsx?raw";

export default {
  description: "Choose a time in a popup.",
  usage: "Keep { hours, minutes } in state, using hours from 0 to 23. Use null until a time is chosen.",
  anatomy: "A full-width trigger shows the time or the placeholder, with a Field's label inside, and grows into a panel with spinbuttons for hours, minutes and AM/PM. A named hidden input submits HH:MM.",
  notes: [
    "Use a minuteStep that divides 60, with minutes on a step boundary.",
    "Required is an ARIA state, not native form validation.",
    "Opening the picker does not commit a time; changing a wheel does."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Nullable time in a popover.", Demo: TimePickerDemo, code: timePickerDemoCode },
    { id: "steps", title: "Steps", description: "Custom minute step.", Demo: TimePickerStepsDemo, code: timePickerStepsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled time picker.", Demo: TimePickerDisabledDemo, code: timePickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named HH:MM value.", Demo: TimePickerFormDemo, code: timePickerFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down",
      "description": "Increase or decrease the focused wheel."
    },
    {
      "key": "Home / End",
      "description": "Choose the first or last wheel item."
    },
    {
      "key": "Enter / Space on trigger",
      "description": "Open the picker."
    },
    {
      "key": "Enter / Escape",
      "description": "Close the picker."
    }
  ],
  related: [
    "TimeWheel",
    "Field"
  ],
  props: {
    "value": "Hours 0–23, or null while no time is chosen.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "placeholder": "Hint shown while the value is empty.",
    "label": "Accessible name of the control or region.",
    "formatTime": "Format the selected hours and minutes on the closed trigger.",
    "minuteStep": "Minutes between two rows of the minutes wheel.",
    "formatNumber": "Format the numbers shown in the wheels.",
    "amLabel": "Text for the morning period.",
    "pmLabel": "Text for the afternoon and evening period.",
    "hoursLabel": "Accessible name of the hours wheel.",
    "minutesLabel": "Accessible name of the minutes wheel.",
    "periodLabel": "Accessible name of the AM/PM wheel.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element."
  },
};
