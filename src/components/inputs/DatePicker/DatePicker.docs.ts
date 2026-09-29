import { DatePickerDemo } from "./demos/DatePickerDemo";
import datePickerDemoCode from "./demos/DatePickerDemo.tsx?raw";
import { DatePickerBoundsDemo } from "./demos/DatePickerBoundsDemo";
import datePickerBoundsDemoCode from "./demos/DatePickerBoundsDemo.tsx?raw";
import { DatePickerWeekStartDemo } from "./demos/DatePickerWeekStartDemo";
import datePickerWeekStartDemoCode from "./demos/DatePickerWeekStartDemo.tsx?raw";
import { DatePickerDisabledDemo } from "./demos/DatePickerDisabledDemo";
import datePickerDisabledDemoCode from "./demos/DatePickerDisabledDemo.tsx?raw";
import { DatePickerFormDemo } from "./demos/DatePickerFormDemo";
import datePickerFormDemoCode from "./demos/DatePickerFormDemo.tsx?raw";

export default {
  description: "Choose a date in a calendar.",
  usage: "Keep an ISO date string or null in state. Dates use local YYYY-MM-DD strings.",
  anatomy: "Month navigation and a keyboard-accessible day grid with as many rows as the month has weeks; the calendar's height springs between months. Field provides the group label, description and error.",
  notes: [
    "Required is an ARIA state; validate the selected date before submitting.",
    "name creates a hidden input with the selected ISO date."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled nullable date.", Demo: DatePickerDemo, code: datePickerDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Minimum and maximum dates.", Demo: DatePickerBoundsDemo, code: datePickerBoundsDemoCode },
    { id: "weekstart", title: "Week starts on Monday", description: "Custom first day of the week.", Demo: DatePickerWeekStartDemo, code: datePickerWeekStartDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled calendar.", Demo: DatePickerDisabledDemo, code: datePickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named ISO date.", Demo: DatePickerFormDemo, code: datePickerFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Move focus by a day or week."
    },
    {
      "key": "Home / End",
      "description": "Move to the start or end of the week."
    },
    {
      "key": "Page Up / Page Down",
      "description": "Move to the previous or next month."
    },
    {
      "key": "Enter / Space",
      "description": "Select the focused date."
    }
  ],
  related: [
    "DateRangePicker",
    "Field"
  ],
  props: {
    "disabled": "Disable interaction with this control.",
    "max": "Latest permitted date as YYYY-MM-DD.",
    "min": "Earliest permitted date as YYYY-MM-DD.",
    "required": "Expose the required state. See the form example for validation.",
    "value": "Selected local date as YYYY-MM-DD, or null.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "firstDayOfWeek": "First weekday column: 0 for Sunday through 6 for Saturday.",
    "formatMonth": "Format the month heading from a local Date.",
    "formatWeekday": "Format a weekday column label from a local Date.",
    "formatDay": "Format each day number from a local Date.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "name": "Name used for the submitted form value.",
    "className": "Additional classes on the outer element."
  },
};
