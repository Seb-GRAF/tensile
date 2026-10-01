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
    { id: "usage", title: "Basic usage", description: "A time field that starts empty and opens into wheels; the trigger shows the time once one is picked.", Demo: TimePickerDemo, code: timePickerDemoCode },
    { id: "steps", title: "Steps", description: "minuteStep of 15 leaves four rows on the minutes wheel, for slots such as reminders.", Demo: TimePickerStepsDemo, code: timePickerStepsDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed trigger that can't open.", Demo: TimePickerDisabledDemo, code: timePickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "A time in a form: name submits it as HH:MM, and Reset clears it.", Demo: TimePickerFormDemo, code: timePickerFormDemoCode },
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
    "value": "Hours 0–23, or null while no time is chosen. Leave it out to let the picker track it, starting from defaultValue.",
    "defaultValue": "The first time when the picker tracks it itself. Defaults to null, no time.",
    "onValueChange": "Called with the new { hours, minutes } each time a wheel changes while the panel is open.",
    "placeholder": "Hint shown while the value is empty.",
    "label": "Accessible name of the open panel, and of the trigger when no Field labels it.",
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
    "disabled": "Dims the trigger and keeps the panel closed. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes on the wrapper, for width and placement. The trigger fills it, and the panel opens at its width."
  },
};
