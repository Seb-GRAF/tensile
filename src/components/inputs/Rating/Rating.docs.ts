import { RatingDemo } from "./demos/RatingDemo";
import ratingDemoCode from "./demos/RatingDemo.tsx?raw";
import { RatingReadOnlyDemo } from "./demos/RatingReadOnlyDemo";
import ratingReadOnlyDemoCode from "./demos/RatingReadOnlyDemo.tsx?raw";
import { RatingCountDemo } from "./demos/RatingCountDemo";
import ratingCountDemoCode from "./demos/RatingCountDemo.tsx?raw";
import { RatingDisabledDemo } from "./demos/RatingDisabledDemo";
import ratingDisabledDemoCode from "./demos/RatingDisabledDemo.tsx?raw";
import { RatingFormDemo } from "./demos/RatingFormDemo";
import ratingFormDemoCode from "./demos/RatingFormDemo.tsx?raw";

export default {
  description: "Choose a whole-star rating or display an existing one.",
  usage: "Control the rating with a value from zero to count. Use readOnly to present a rating as a named image.",
  anatomy: "Interactive ratings expose a slider. Read-only ratings expose an image named by valueLabel.",
  notes: [
    "Hover previews a rating; click commits it.",
    "A named hidden input submits the rating, including zero. Required is an ARIA state and does not reject zero."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A rating in a Field: hover previews the fill, a click or an arrow key sets it.", Demo: RatingDemo, code: ratingDemoCode },
    { id: "readonly", title: "Read only", description: "readOnly shows a score as a named image with no focus, for reviews and listings.", Demo: RatingReadOnlyDemo, code: ratingReadOnlyDemoCode },
    { id: "count", title: "Custom scale", description: "count sets a three-star scale, with valueLabel wording the value to match.", Demo: RatingCountDemo, code: ratingCountDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed rating that shows its value and takes no input.", Demo: RatingDisabledDemo, code: ratingDisabledDemoCode },
    { id: "form", title: "In a form", description: "A rating in a form: name submits the number of stars, and Reset restores the starting value.", Demo: RatingFormDemo, code: ratingFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Increase or decrease by one step."
    },
    {
      "key": "Home / End",
      "description": "Move to the permitted endpoints."
    }
  ],
  related: [
    "Field",
    "NumberStepper"
  ],
  props: {
    "value": "Whole stars, from 0 to `count`. Leave it out to let the rating track it, starting from defaultValue.",
    "defaultValue": "The first rating when it tracks its own value. Defaults to 0.",
    "onValueChange": "Called with the new number of stars on a star click, an arrow key, Home or End.",
    "count": "Number of stars.",
    "label": "Accessible name of the slider when no Field labels it. A read-only rating is named by valueLabel instead.",
    "valueLabel": "Screen reader text for the value.",
    "readOnly": "Display a named image with no focus or interaction.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Dims the stars and stops changes. A disabled Field or Fieldset does the same.",
    "className": "Classes on the paper pill, for placement such as margin. It sizes to its stars."
  },
};
