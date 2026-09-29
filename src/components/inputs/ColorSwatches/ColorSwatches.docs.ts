import { ColorSwatchesDemo } from "./demos/ColorSwatchesDemo";
import colorSwatchesDemoCode from "./demos/ColorSwatchesDemo.tsx?raw";
import { ColorSwatchesDisabledDemo } from "./demos/ColorSwatchesDisabledDemo";
import colorSwatchesDisabledDemoCode from "./demos/ColorSwatchesDisabledDemo.tsx?raw";
import { ColorSwatchesFormDemo } from "./demos/ColorSwatchesFormDemo";
import colorSwatchesFormDemoCode from "./demos/ColorSwatchesFormDemo.tsx?raw";

export default {
  description: "Choose one color from named swatches.",
  usage: "Provide a color, visible-in-accessibility label and stable value for every option. Start with a value from that list.",
  anatomy: "A radiogroup contains native radio inputs. A shared ring marks the selected color.",
  notes: [
    "Use meaningful color labels so the choice does not rely on color alone.",
    "The selected value is submitted under name. Native required validation is supported."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Named color choices.", Demo: ColorSwatchesDemo, code: colorSwatchesDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled swatches.", Demo: ColorSwatchesDisabledDemo, code: colorSwatchesDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named color choice.", Demo: ColorSwatchesFormDemo, code: colorSwatchesFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Move between and select colors."
    },
    {
      "key": "Space",
      "description": "Select the focused color."
    }
  ],
  related: [
    "RadioGroup",
    "ColorPicker",
    "Field"
  ],
  props: {
    "options": "Swatches with a value, accessible label and CSS color.",
    "value": "Selected value; it must match one of the options.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element."
  },
};
