import { TimeWheelDemo } from "./demos/TimeWheelDemo";
import timeWheelDemoCode from "./demos/TimeWheelDemo.tsx?raw";
import { TimeWheelStepsDemo } from "./demos/TimeWheelStepsDemo";
import timeWheelStepsDemoCode from "./demos/TimeWheelStepsDemo.tsx?raw";
import { TimeWheelDisabledDemo } from "./demos/TimeWheelDisabledDemo";
import timeWheelDisabledDemoCode from "./demos/TimeWheelDisabledDemo.tsx?raw";
import { TimeWheelFormDemo } from "./demos/TimeWheelFormDemo";
import timeWheelFormDemoCode from "./demos/TimeWheelFormDemo.tsx?raw";

export default {
  description: "Choose a time with hour, minute and period wheels.",
  usage: "Keep { hours, minutes } in state, using hours from 0 to 23. Supply a minute value aligned with minuteStep.",
  anatomy: "Three spinbuttons control hours, minutes and AM/PM. A named hidden input submits HH:MM.",
  notes: [
    "Use a minuteStep that divides 60, with minutes on a step boundary.",
    "Required is an ARIA state, not native form validation."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Hour, minute and AM/PM wheels in a Field: drag or flick a wheel, or focus it and use the arrow keys.", Demo: TimeWheelDemo, code: timeWheelDemoCode },
    { id: "steps", title: "Steps", description: "minuteStep of 15 leaves four rows on the minutes wheel, for slots such as reminders.", Demo: TimeWheelStepsDemo, code: timeWheelStepsDemoCode },
    { id: "disabled", title: "Disabled", description: "Dimmed wheels that show the time and take no input.", Demo: TimeWheelDisabledDemo, code: timeWheelDisabledDemoCode },
    { id: "form", title: "In a form", description: "A time in a form: name submits it as HH:MM, and Reset restores the starting time.", Demo: TimeWheelFormDemo, code: timeWheelFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down",
      "description": "Increase or decrease the focused wheel."
    },
    {
      "key": "Home / End",
      "description": "Choose the first or last wheel item."
    }
  ],
  related: [
    "TimePicker",
    "Field"
  ],
  props: {
    "value": "Hours 0–23; the wheels show them as 12, 1–11 and AM or PM. Leave it out to let the wheels track it, starting from defaultValue.",
    "defaultValue": "The first time when the wheels track it themselves. Defaults to 0:00, shown as 12:00 AM.",
    "onValueChange": "Called with the new { hours, minutes } when a drag or flick is let go over a new row, or on an arrow, Home or End key.",
    "minuteStep": "Minutes between two rows of the minutes wheel.",
    "formatNumber": "Format the numbers shown in the wheels.",
    "amLabel": "Text for the morning period.",
    "pmLabel": "Text for the afternoon and evening period.",
    "label": "Accessible name of the group of wheels when no Field labels it.",
    "hoursLabel": "Accessible name of the hours wheel.",
    "minutesLabel": "Accessible name of the minutes wheel.",
    "periodLabel": "Accessible name of the AM/PM wheel.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the wheels and stops drags and keys. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes on the card that holds the wheels, for placement such as margin. It sizes to its wheels."
  },
};
