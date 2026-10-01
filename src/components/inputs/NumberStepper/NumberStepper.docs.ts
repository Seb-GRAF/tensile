import { NumberStepperDemo } from "./demos/NumberStepperDemo";
import numberStepperDemoCode from "./demos/NumberStepperDemo.tsx?raw";
import { NumberStepperBoundsDemo } from "./demos/NumberStepperBoundsDemo";
import numberStepperBoundsDemoCode from "./demos/NumberStepperBoundsDemo.tsx?raw";
import { NumberStepperDisabledDemo } from "./demos/NumberStepperDisabledDemo";
import numberStepperDisabledDemoCode from "./demos/NumberStepperDisabledDemo.tsx?raw";
import { NumberStepperFormDemo } from "./demos/NumberStepperFormDemo";
import numberStepperFormDemoCode from "./demos/NumberStepperFormDemo.tsx?raw";

export default {
  description: "Adjust a bounded quantity with buttons or the keyboard.",
  usage: "Keep the quantity in state and provide the permitted minimum, maximum and step.",
  anatomy: "A spinbutton displays NumberTicker. Decrease and increase IconButtons flank the value.",
  notes: [
    "Keep the controlled value within the configured bounds.",
    "Set name to include the value in FormData; reset controlled state in onReset."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A guest count between 0 and 10, changed with the minus and plus buttons, with the value in the parent's state. Use it for small whole numbers.", Demo: NumberStepperDemo, code: numberStepperDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Guests in pairs from 2 to 20. A press past a limit gives the stepper a short stretch instead of a change.", Demo: NumberStepperBoundsDemo, code: numberStepperBoundsDemoCode },
    { id: "disabled", title: "Disabled", description: "The number shows dimmed and the buttons do nothing. Use it while the count is locked.", Demo: NumberStepperDisabledDemo, code: numberStepperDisabledDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the number, and the Field supplies the label.", Demo: NumberStepperFormDemo, code: numberStepperFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down",
      "description": "Increase or decrease by one step."
    },
    {
      "key": "Home / End",
      "description": "Move to the minimum or maximum."
    }
  ],
  related: [
    "NumberInput",
    "Field"
  ],
  props: {
    "value": "The number. Pass it to control NumberStepper; leave it out and NumberStepper keeps its own number.",
    "defaultValue": "The number NumberStepper starts with when it keeps its own number.",
    "onValueChange": "Called with the new number after a button press, an arrow key, Home or End, never past `min` or `max`.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Names the stepper for screen readers when no Field labels it.",
    "decreaseLabel": "Names the minus button.",
    "increaseLabel": "Names the plus button.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Dims the stepper and stops its buttons and keys; the hidden input is left out of the form. A disabled Field or Fieldset does the same.",
    "className": "Classes for the outer box, to place it in a layout."
  },
};
