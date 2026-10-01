import { DateFieldDemo } from "./demos/DateFieldDemo";
import dateFieldDemoCode from "./demos/DateFieldDemo.tsx?raw";
import { DateFieldBoundsDemo } from "./demos/DateFieldBoundsDemo";
import dateFieldBoundsDemoCode from "./demos/DateFieldBoundsDemo.tsx?raw";
import { DateFieldFormDemo } from "./demos/DateFieldFormDemo";
import dateFieldFormDemoCode from "./demos/DateFieldFormDemo.tsx?raw";
import { DateFieldFormatDemo } from "./demos/DateFieldFormatDemo";
import dateFieldFormatDemoCode from "./demos/DateFieldFormatDemo.tsx?raw";

export default {
  description: "Type a date or pick one from a calendar.",
  usage: "Keep an ISO date string (YYYY-MM-DD) or null in state. The input keeps the typed text while focused and commits it on Enter or blur.",
  anatomy: "An Input with a calendar button at its end. The button grows into a panel holding a DatePicker. A hidden input submits the ISO date.",
  notes: [
    "An empty field commits null. Text that isn't a date, or a date outside min and max, goes back to the previous value.",
    "By default it shows MM/DD/YYYY and reads one-digit months and days with /, -, . or a space between the parts.",
    "For another format, pass formatDate, parseDate and placeholder together, so the text people see can be typed back in. The value and the submitted date stay YYYY-MM-DD.",
    "Picking a day commits it, closes the calendar and puts focus back in the input."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A due date in a Field. Type 3/4/2026 and press Enter, or pick a day from the calendar.", Demo: DateFieldDemo, code: dateFieldDemoCode },
    { id: "bounds", title: "Bounds", description: "Days outside October 5–30 are disabled in the calendar, and typing one keeps the previous date. Use it for booking windows.", Demo: DateFieldBoundsDemo, code: dateFieldBoundsDemoCode },
    { id: "format", title: "Another format", description: "DD.MM.YYYY through formatDate, parseDate and placeholder. Type 3.4.2026 and press Enter.", Demo: DateFieldFormatDemo, code: dateFieldFormatDemoCode },
    { id: "form", title: "In a form", description: "name submits the ISO date (\"2026-10-14\", not \"10/14/2026\"), and Reset clears it through state.", Demo: DateFieldFormDemo, code: dateFieldFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter",
      "description": "Commit the typed date without submitting the form."
    },
    {
      "key": "Tab",
      "description": "Commit on blur and move focus to the calendar button."
    },
    {
      "key": "Alt + Down",
      "description": "Open the calendar from the input."
    },
    {
      "key": "Arrow keys, Page Up / Page Down",
      "description": "Move between days and months in the open calendar."
    },
    {
      "key": "Enter / Space on a day",
      "description": "Pick it, close the calendar and return to the input."
    },
    {
      "key": "Escape",
      "description": "Close the calendar and return to the input."
    }
  ],
  related: [
    "DatePicker",
    "Input",
    "NumberInput",
    "Field"
  ],
  props: {
    "value": "The date as YYYY-MM-DD, or null when empty. Leave it out to let the field track it, starting from defaultValue.",
    "defaultValue": "The first date when the field tracks it itself. Defaults to null, no date.",
    "onValueChange": "Called with the date as YYYY-MM-DD, or null, when typed text is committed with Enter or on blur, or a day is picked.",
    "min": "Earliest date as YYYY-MM-DD. Earlier days are disabled in the calendar and typing one keeps the previous date.",
    "max": "Latest date as YYYY-MM-DD. Later days are disabled in the calendar and typing one keeps the previous date.",
    "formatDate": "Turn a YYYY-MM-DD date into the text the input shows. Defaults to MM/DD/YYYY.",
    "parseDate": "Read typed text as YYYY-MM-DD, or return null when it isn't a date. Defaults to MM/DD/YYYY with /, -, . or a space.",
    "placeholder": "Hint shown while the input is empty; inside a Field with the label inside, only while it's focused.",
    "calendarLabel": "Accessible name of the calendar button and of the open calendar.",
    "formatMonth": "Format the calendar's month heading from a local Date.",
    "formatWeekday": "Format a weekday column label from a local Date.",
    "formatDay": "Format each day number from a local Date.",
    "previousLabel": "Accessible name of the calendar's previous-month button.",
    "nextLabel": "Accessible name of the calendar's next-month button.",
    "firstDayOfWeek": "First calendar column: 0 for Sunday through 6 for Saturday. Set 1 for Monday independently of the typed date format.",
    "todayLabel": "Text of the calendar's button that shows today's month.",
    "name": "Name of the hidden input that submits the ISO date.",
    "form": "ID of the form that owns the visible and hidden inputs.",
    "disabled": "Disables the input and the calendar button and dims the pill; the hidden input is left out of the form. A disabled Field or Fieldset does the same.",
    "onFocus": "Native focus event handler.",
    "onBlur": "Native blur event handler, called after the typed text is committed.",
    "onKeyDown": "Native keyboard handler; preventDefault skips the built-in Enter and Alt + Down handling.",
    "leading": "Content before the text, inside the pill."
  },
};
