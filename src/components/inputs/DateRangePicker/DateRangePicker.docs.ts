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
  anatomy: "A header with the month and month arrows, a Today button in the footer, and a keyboard-accessible day grid with as many rows as the month has weeks; the calendar's height springs between months. Field provides the group label, description and error.",
  notes: [
    "Required is an ARIA state; validate both dates before submitting.",
    "The range is drawn as ink pills on its start and end days with a light band between them. The first pick moves both pills to that day, and the band grows from it toward the hovered or focused day. The second pick emits a complete range ordered from earliest to latest, and the pill for the other end moves to it.",
    "Today shows today's month without picking a day.",
    "startName and endName create separate hidden form values.",
    "Resetting the enclosing form drops a first pick that has no second day yet."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A range picker in a Field, starting from a chosen range.", Demo: DateRangePickerDemo, code: dateRangePickerDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Days outside min and max are disabled and the month arrows stop at their months; use it for booking windows.", Demo: DateRangePickerBoundsDemo, code: dateRangePickerBoundsDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed calendar that shows its range but takes no input.", Demo: DateRangePickerDisabledDemo, code: dateRangePickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "A required range in a form: startName and endName submit two dates, and Save shows an error until both are picked.", Demo: DateRangePickerFormDemo, code: dateRangePickerFormDemoCode },
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
    "disabled": "Dims the calendar and stops day picks and month changes. A disabled Field or Fieldset does the same.",
    "max": "Latest permitted date as YYYY-MM-DD.",
    "min": "Earliest permitted date as YYYY-MM-DD.",
    "required": "Describe the selection as required. See the form example for validation.",
    "requiredLabel": "Accessible description when a selection is required. Defaults to Required.",
    "className": "Classes on the wrapper around the calendar, for width and placement. The calendar fills it.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "firstDayOfWeek": "First weekday column: 0 for Sunday through 6 for Saturday.",
    "formatMonth": "Format the month heading from a local Date.",
    "formatWeekday": "Format a weekday column label from a local Date.",
    "formatDay": "Format each day number from a local Date.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "todayLabel": "Text of the button that shows today's month.",
    "value": "The complete range, start before end, or null. Leave it out to let the picker track it, starting from defaultValue.",
    "defaultValue": "The first range when the picker tracks it itself. Defaults to null, no range.",
    "onValueChange": "Called with the ordered range when the second day is picked. The first pick only previews.",
    "startName": "Name for the start-date hidden input.",
    "endName": "Name for the end-date hidden input."
  },
};
