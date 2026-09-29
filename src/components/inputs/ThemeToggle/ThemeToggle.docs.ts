import { ThemeToggleDemo } from "./demos/ThemeToggleDemo";
import themeToggleDemoCode from "./demos/ThemeToggleDemo.tsx?raw";
import { ThemeToggleDisabledDemo } from "./demos/ThemeToggleDisabledDemo";
import themeToggleDisabledDemoCode from "./demos/ThemeToggleDisabledDemo.tsx?raw";

export default {
  description: "Choose between light and dark appearance.",
  usage: "Keep the theme in state and apply it to the page or surface that should change. The example changes a local Card.",
  anatomy: "A Toggle renders a native checkbox with switch semantics. The knob changes between sun and moon shapes.",
  notes: [
    "The component emits light or dark; it does not change the document theme for you.",
    "With name set, the native checkbox submits “on” only when dark is selected."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled light and dark choice applied to a local preview.", Demo: ThemeToggleDemo, code: themeToggleDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled theme choice.", Demo: ThemeToggleDisabledDemo, code: themeToggleDisabledDemoCode },
  ],
  keyboard: [
    {
      "key": "Space",
      "description": "Switch between light and dark."
    }
  ],
  related: [
    "Toggle",
    "Card"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
