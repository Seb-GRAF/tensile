import { ToggleDemo } from "./demos/ToggleDemo";
import toggleDemoCode from "./demos/ToggleDemo.tsx?raw";
import { ToggleDisabledDemo } from "./demos/ToggleDisabledDemo";
import toggleDisabledDemoCode from "./demos/ToggleDisabledDemo.tsx?raw";
import { ToggleFormDemo } from "./demos/ToggleFormDemo";
import toggleFormDemoCode from "./demos/ToggleFormDemo.tsx?raw";

export default {
  description: "A native checkbox presented as an on/off switch.",
  usage: "Control checked and provide a visible Field label or an accessible label.",
  anatomy: "A checkbox with role=switch sits over a moving knob.",
  notes: [
    "The label prop supplies an accessible name; use Field to draw a visible label.",
    "Named checked switches submit their value; unchecked switches are omitted from FormData."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled switch with a visible label.", Demo: ToggleDemo, code: toggleDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled switch.", Demo: ToggleDisabledDemo, code: toggleDisabledDemoCode },
    { id: "form", title: "In a form", description: "Native named checkbox form behavior.", Demo: ToggleFormDemo, code: toggleFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus the enabled switch."
    },
    {
      "key": "Space",
      "description": "Toggle the focused switch."
    }
  ],
  related: [
    "Field",
    "Checkbox",
    "ThemeToggle"
  ],
  props: {
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "checked": "Whether the control is checked.",
    "onCheckedChange": "Called with the next checked state.",
    "label": "Accessible name when there is no Field label.",
    "children": "Decorative content inside the moving knob.",
    "name": "Native checkbox form name."
  },
};
