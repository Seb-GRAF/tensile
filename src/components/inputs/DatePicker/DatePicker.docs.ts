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
  anatomy: "A header with the month and month arrows, a Today button in the footer, and a keyboard-accessible day grid with as many rows as the month has weeks; the calendar's height springs between months. Field provides the group label, description and error.",
  notes: [
    "Required is an ARIA state; validate the selected date before submitting.",
    "name creates a hidden input with the selected ISO date.",
    "Today shows today's month and makes today the day Tab reaches in the grid; it doesn't pick it. With min or max, it stops at the nearest allowed month.",
    "Picking another day moves the ink pill there at its size."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A date picker in a Field, starting from a chosen date.", Demo: DatePickerDemo, code: datePickerDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Days outside min and max are disabled and the month arrows stop at their months; use it for booking windows.", Demo: DatePickerBoundsDemo, code: datePickerBoundsDemoCode },
    { id: "weekstart", title: "Week starts on Monday", description: "Weeks start on Monday with firstDayOfWeek, as most of Europe expects.", Demo: DatePickerWeekStartDemo, code: datePickerWeekStartDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed calendar that shows its date but takes no input.", Demo: DatePickerDisabledDemo, code: datePickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "A required date in a form: name submits the ISO date, and Save shows an error until a day is picked.", Demo: DatePickerFormDemo, code: datePickerFormDemoCode },
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
    "disabled": "Dims the calendar and stops day picks and month changes. A disabled Field or Fieldset does the same.",
    "max": "Latest permitted date as YYYY-MM-DD.",
    "min": "Earliest permitted date as YYYY-MM-DD.",
    "required": "Expose the required state. See the form example for validation.",
    "value": "The selected local date as YYYY-MM-DD, or null. Leave it out to let the picker track it, starting from defaultValue.",
    "defaultValue": "The first selected date when the picker tracks it itself. Defaults to null, no date.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "onValueChange": "Called with the date as YYYY-MM-DD when a day is picked by click, Enter or Space.",
    "firstDayOfWeek": "First weekday column: 0 for Sunday through 6 for Saturday.",
    "formatMonth": "Format the month heading from a local Date.",
    "formatWeekday": "Format a weekday column label from a local Date.",
    "formatDay": "Format each day number from a local Date.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "todayLabel": "Text of the button that shows today's month.",
    "name": "Name used for the submitted form value.",
    "className": "Classes on the wrapper around the calendar, for width and placement. The calendar fills it."
  },
};
