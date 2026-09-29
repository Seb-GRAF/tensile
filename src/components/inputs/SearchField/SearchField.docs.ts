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
    { id: "form", title: "In a form", description: "Named search value submitted through a form.", Demo: SearchFieldFormDemo, code: searchFieldFormDemoCode },
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
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "placeholder": "Hint shown while the value is empty.",
    "openLabel": "Accessible name of the collapsed trigger.",
    "clearLabel": "Accessible name of the clear action.",
    "name": "Name used for the submitted form value.",
    "className": "Additional classes on the outer element."
  },
};
