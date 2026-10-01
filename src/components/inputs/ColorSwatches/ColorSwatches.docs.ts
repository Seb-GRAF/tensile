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
    { id: "usage", title: "Basic usage", description: "Three named colors in a Field; the ring slides to the one picked.", Demo: ColorSwatchesDemo, code: colorSwatchesDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed row that shows the chosen color but takes no input.", Demo: ColorSwatchesDisabledDemo, code: colorSwatchesDisabledDemoCode },
    { id: "form", title: "In a form", description: "A required color in a form: name submits the picked value, and Reset restores the first one.", Demo: ColorSwatchesFormDemo, code: colorSwatchesFormDemoCode },
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
    "value": "Selected value; it must match one of the options. Leave it out to let the swatches track it, starting from defaultValue.",
    "defaultValue": "The first selected value when the swatches track it themselves. Defaults to the first option.",
    "onValueChange": "Called with a swatch's value when it's picked by click or arrow key.",
    "label": "Accessible name of the radiogroup when no Field wraps it.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the swatches and stops picks. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes on the paper pill, for placement such as margin. It sizes to its swatches."
  },
};
