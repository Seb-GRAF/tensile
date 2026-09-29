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
    { id: "usage", title: "Basic usage", description: "Interactive rating.", Demo: RatingDemo, code: ratingDemoCode },
    { id: "readonly", title: "Read only", description: "Display-only rating.", Demo: RatingReadOnlyDemo, code: ratingReadOnlyDemoCode },
    { id: "count", title: "Custom scale", description: "Custom rating scale.", Demo: RatingCountDemo, code: ratingCountDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled rating.", Demo: RatingDisabledDemo, code: ratingDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named rating.", Demo: RatingFormDemo, code: ratingFormDemoCode },
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
    "value": "Whole stars, from 0 to `count`.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "count": "Number of stars.",
    "label": "Accessible name of the control or region.",
    "valueLabel": "Screen reader text for the value.",
    "readOnly": "Display a named image with no focus or interaction.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
