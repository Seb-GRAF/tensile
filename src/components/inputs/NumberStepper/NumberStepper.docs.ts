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
    { id: "usage", title: "Basic usage", description: "Controlled quantity.", Demo: NumberStepperDemo, code: numberStepperDemoCode },
    { id: "bounds", title: "Bounds and steps", description: "Step and bounds.", Demo: NumberStepperBoundsDemo, code: numberStepperBoundsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled spinbutton.", Demo: NumberStepperDisabledDemo, code: numberStepperDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named quantity.", Demo: NumberStepperFormDemo, code: numberStepperFormDemoCode },
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
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "min": "Minimum permitted value.",
    "max": "Maximum permitted value.",
    "step": "Increment used when changing the value.",
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Accessible name of the control or region.",
    "decreaseLabel": "Accessible name for the decrease button.",
    "increaseLabel": "Accessible name for the increase button.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "required": "Expose the required state. See the form example for validation.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
