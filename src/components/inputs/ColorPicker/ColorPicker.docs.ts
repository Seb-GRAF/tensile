import { ColorPickerDemo } from "./demos/ColorPickerDemo";
import colorPickerDemoCode from "./demos/ColorPickerDemo.tsx?raw";
import { ColorPickerDisabledDemo } from "./demos/ColorPickerDisabledDemo";
import colorPickerDisabledDemoCode from "./demos/ColorPickerDisabledDemo.tsx?raw";
import { ColorPickerFormDemo } from "./demos/ColorPickerFormDemo";
import colorPickerFormDemoCode from "./demos/ColorPickerFormDemo.tsx?raw";

export default {
  description: "Choose a hex color using an area, hue slider and text input.",
  usage: "Start with a lowercase six-digit hex color, including #. Keep the emitted color in state.",
  anatomy: "One card holds the two-dimensional area for saturation and brightness, a hue strip, and an Input that accepts a hex color beside a swatch of the current one.",
  notes: [
    "Hex entry accepts three or six digits, with or without #. Invalid text reverts on commit.",
    "The named hidden input submits the current hex value."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled color area, hue and hex value.", Demo: ColorPickerDemo, code: colorPickerDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled color picker.", Demo: ColorPickerDisabledDemo, code: colorPickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named hex value.", Demo: ColorPickerFormDemo, code: colorPickerFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys in the area",
      "description": "Change saturation horizontally and brightness vertically."
    },
    {
      "key": "Arrow keys, Home / End on hue",
      "description": "Adjust hue; Home and End jump to 0 and 360."
    },
    {
      "key": "Enter / blur in Hex",
      "description": "Commit the typed color."
    }
  ],
  related: [
    "ColorSwatches",
    "Field"
  ],
  props: {
    "value": "A lowercase \"#rrggbb\" color.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "areaLabel": "Accessible name of the saturation and brightness control.",
    "hueLabel": "Accessible name of the hue slider.",
    "hexLabel": "Accessible name of the hex text input.",
    "formatArea": "The area knob's value text, from saturation and brightness between 0 and 1.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
