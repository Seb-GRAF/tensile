import { DateRangePickerDemo } from "./demos/DateRangePickerDemo";
import dateRangePickerDemoCode from "./demos/DateRangePickerDemo.tsx?raw";
import { DateRangePickerBoundsDemo } from "./demos/DateRangePickerBoundsDemo";
import dateRangePickerBoundsDemoCode from "./demos/DateRangePickerBoundsDemo.tsx?raw";
import { DateRangePickerDisabledDemo } from "./demos/DateRangePickerDisabledDemo";
import dateRangePickerDisabledDemoCode from "./demos/DateRangePickerDisabledDemo.tsx?raw";
import { DateRangePickerFormDemo } from "./demos/DateRangePickerFormDemo";
import dateRangePickerFormDemoCode from "./demos/DateRangePickerFormDemo.tsx?raw";

export default {
  description: "Choose a date range in a calendar.",
  usage: "Keep a { start, end } date pair or null in state. Dates use local YYYY-MM-DD strings.",
  anatomy: "Month navigation and a keyboard-accessible day grid with as many rows as the month has weeks; the calendar's height springs between months. Field provides the group label, description and error.",
  notes: [
    "Required is an ARIA state; validate both dates before submitting.",
    "The first selection starts a light preview band. The second emits a complete range ordered from earliest to latest, drawn as an ink band with accent start and end days.",
    "startName and endName create separate hidden form values."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Select an ordered date range.", Demo: DateRangePickerDemo, code: dateRangePickerDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Bounded date range.", Demo: DateRangePickerBoundsDemo, code: dateRangePickerBoundsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled range calendar.", Demo: DateRangePickerDisabledDemo, code: dateRangePickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and separate start/end values.", Demo: DateRangePickerFormDemo, code: dateRangePickerFormDemoCode },
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
    "DatePicker",
    "Field"
  ],
  props: {
    "disabled": "Disable interaction with this control.",
    "max": "Latest permitted date as YYYY-MM-DD.",
    "min": "Earliest permitted date as YYYY-MM-DD.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "firstDayOfWeek": "First weekday column: 0 for Sunday through 6 for Saturday.",
    "formatMonth": "Format the month heading from a local Date.",
    "formatWeekday": "Format a weekday column label from a local Date.",
    "formatDay": "Format each day number from a local Date.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "value": "Complete ordered date range, or null before selection.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "startName": "Name for the start-date hidden input.",
    "endName": "Name for the end-date hidden input."
  },
};
