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
    { id: "usage", title: "Basic usage", description: "A switch named by a Field label and description; the usual way to place one in settings.", Demo: ToggleDemo, code: toggleDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed switch that keeps its state and can't be toggled.", Demo: ToggleDisabledDemo, code: toggleDisabledDemoCode },
    { id: "form", title: "In a form", description: "A named switch in a form: its value is submitted only while it's on, and Reset turns it off.", Demo: ToggleFormDemo, code: toggleFormDemoCode },
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
    "disabled": "Dims the switch and stops it from toggling. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes on the track, for placement such as margin. The track keeps its 52 × 32 px size.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "checked": "Whether the switch is on. Leave it out to let the switch track it, starting from defaultChecked.",
    "defaultChecked": "Whether the switch starts on when it tracks its own state. Defaults to false.",
    "onCheckedChange": "Called with the new state when the switch is clicked or toggled with Space.",
    "label": "Accessible name of the switch when no Field labels it. A Field label or aria-label replaces it.",
    "children": "Decorative content inside the moving knob.",
    "name": "Native checkbox form name."
  },
};
