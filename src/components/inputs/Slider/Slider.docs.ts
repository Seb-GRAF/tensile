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
    { id: "usage", title: "Basic usage", description: "A slider in a Field: drag the knob, press anywhere on the track, or use the arrow keys.", Demo: SliderDemo, code: sliderDemoCode },
    { id: "steps", title: "Steps", description: "step makes it move in tens, and formatValue reads the value as a percentage.", Demo: SliderStepsDemo, code: sliderStepsDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed slider that shows its value and takes no input.", Demo: SliderDisabledDemo, code: sliderDisabledDemoCode },
    { id: "form", title: "In a form", description: "A slider in a form: name submits the number, and Reset restores the starting value.", Demo: SliderFormDemo, code: sliderFormDemoCode },
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
    "value": "The current number, from min to max. Leave it out to let the slider track it, starting from defaultValue.",
    "defaultValue": "The first value when the slider tracks it itself. Defaults to min.",
    "onValueChange": "Called with each new value while the knob is dragged, and on a track press or key press.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Accessible name of the knob when no Field labels it.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Dims the slider and stops drags and keys. A disabled Field or Fieldset does the same.",
    "className": "Classes on the 44 px track area, for placement. The track fills its container's width."
  },
};
