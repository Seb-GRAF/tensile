import { SearchFieldDemo } from "./demos/SearchFieldDemo";
import searchFieldDemoCode from "./demos/SearchFieldDemo.tsx?raw";
import { SearchFieldFormDemo } from "./demos/SearchFieldFormDemo";
import searchFieldFormDemoCode from "./demos/SearchFieldFormDemo.tsx?raw";

export default {
  description: "A search button that expands into an editable search field.",
  usage: "Control the query and use it to filter your own data.",
  anatomy: "A trigger button expands into a searchbox with a clear action.",
  notes: [
    "Escape clears the query first, then closes an empty search. Blurring an empty field also closes it.",
    "The named input exists only while expanded; a closed empty field is absent from FormData."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Expand, filter a small result list, clear and close.", Demo: SearchFieldDemo, code: searchFieldDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the query with the form's other values.", Demo: SearchFieldFormDemo, code: searchFieldFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Open the focused search trigger."
    },
    {
      "key": "Escape",
      "description": "Clear the query, then close when already empty."
    }
  ],
  related: [
    "Input",
    "CommandPalette"
  ],
  props: {
    "value": "The query. Pass it to control SearchField; leave it out and SearchField keeps its own query.",
    "defaultValue": "The query SearchField starts with when it keeps its own query.",
    "onValueChange": "Called with the query as the user types, and with an empty string when it's cleared.",
    "label": "Names the search input for screen readers.",
    "placeholder": "Hint shown while the value is empty.",
    "openLabel": "Names the round button that opens the field.",
    "clearLabel": "Names the button that clears the query.",
    "name": "Name used for the submitted form value.",
    "className": "Classes for the outer box, to set its width or place it; the open field grows to fill it."
  },
};
