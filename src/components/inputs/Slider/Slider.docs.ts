import { SliderDemo } from "./demos/SliderDemo";
import sliderDemoCode from "./demos/SliderDemo.tsx?raw";
import { SliderStepsDemo } from "./demos/SliderStepsDemo";
import sliderStepsDemoCode from "./demos/SliderStepsDemo.tsx?raw";
import { SliderDisabledDemo } from "./demos/SliderDisabledDemo";
import sliderDisabledDemoCode from "./demos/SliderDisabledDemo.tsx?raw";
import { SliderFormDemo } from "./demos/SliderFormDemo";
import sliderFormDemoCode from "./demos/SliderFormDemo.tsx?raw";

export default {
  description: "Choose a number along a horizontal track.",
  usage: "Place the full-width control in a sized container or Field and keep its value in state.",
  anatomy: "One draggable knob exposes slider semantics. A hidden input carries the named value.",
  notes: [
    "Keep the controlled value within the configured bounds.",
    "Set name to include the value in FormData; reset controlled state in onReset."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled single value.", Demo: SliderDemo, code: sliderDemoCode },
    { id: "steps", title: "Steps", description: "Bounds, steps and formatted value.", Demo: SliderStepsDemo, code: sliderStepsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled slider.", Demo: SliderDisabledDemo, code: sliderDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named value.", Demo: SliderFormDemo, code: sliderFormDemoCode },
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
    "RangeSlider",
    "Field"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Accessible name of the control or region.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
