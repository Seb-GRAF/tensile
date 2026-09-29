import { RangeSliderDemo } from "./demos/RangeSliderDemo";
import rangeSliderDemoCode from "./demos/RangeSliderDemo.tsx?raw";
import { RangeSliderStepsDemo } from "./demos/RangeSliderStepsDemo";
import rangeSliderStepsDemoCode from "./demos/RangeSliderStepsDemo.tsx?raw";
import { RangeSliderDisabledDemo } from "./demos/RangeSliderDisabledDemo";
import rangeSliderDisabledDemoCode from "./demos/RangeSliderDisabledDemo.tsx?raw";
import { RangeSliderFormDemo } from "./demos/RangeSliderFormDemo";
import rangeSliderFormDemoCode from "./demos/RangeSliderFormDemo.tsx?raw";

export default {
  description: "Choose lower and upper values on one track.",
  usage: "Keep an ordered pair of numbers in state. Name each knob for its purpose.",
  anatomy: "Two independently focusable knobs share the track. A press on the track moves the nearer knob.",
  notes: [
    "Keep the controlled value within the configured bounds.",
    "Set name to include the value in FormData; reset controlled state in onReset.",
    "The knobs cannot cross. FormData.getAll(name) returns the lower value followed by the upper value."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled lower and upper values.", Demo: RangeSliderDemo, code: rangeSliderDemoCode },
    { id: "steps", title: "Steps", description: "Bounds, steps and value labels.", Demo: RangeSliderStepsDemo, code: rangeSliderStepsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled range.", Demo: RangeSliderDisabledDemo, code: rangeSliderDisabledDemoCode },
    { id: "form", title: "In a form", description: "Named values in lower-upper order.", Demo: RangeSliderFormDemo, code: rangeSliderFormDemoCode },
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
    "Slider",
    "Field"
  ],
  props: {
    "value": "Ordered pair: lower value, then upper value.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format a value for display or accessible value text.",
    "lowerLabel": "Accessible name for the lower-value knob.",
    "upperLabel": "Accessible name for the upper-value knob.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
