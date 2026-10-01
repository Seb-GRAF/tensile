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
    { id: "usage", title: "Basic usage", description: "A brand color in a Field: drag in the area or along the hue strip, or type a hex code.", Demo: ColorPickerDemo, code: colorPickerDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed picker that shows its color and takes no input.", Demo: ColorPickerDisabledDemo, code: colorPickerDisabledDemoCode },
    { id: "form", title: "In a form", description: "A color in a form: name submits the hex code, and Reset restores the starting color.", Demo: ColorPickerFormDemo, code: colorPickerFormDemoCode },
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
    "value": "A lowercase \"#rrggbb\" color. Leave it out to let the picker track it, starting from defaultValue.",
    "defaultValue": "The first color when the picker tracks it itself. Defaults to #000000.",
    "onValueChange": "Called with a lowercase \"#rrggbb\" color while a knob is dragged or moved by key, and when a valid hex code is committed.",
    "label": "Accessible name of the group when no Field labels it.",
    "areaLabel": "Accessible name of the saturation and brightness control.",
    "hueLabel": "Accessible name of the hue slider.",
    "hexLabel": "Accessible name of the hex text input.",
    "formatArea": "The area knob's value text, from saturation and brightness between 0 and 1.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the area and hue strip and disables the hex input. A disabled Field or Fieldset does the same.",
    "className": "Classes on the card, for width and placement. The area, strip and input fill its width."
  },
};
