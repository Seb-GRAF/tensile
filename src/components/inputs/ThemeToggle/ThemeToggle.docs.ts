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
    { id: "usage", title: "Basic usage", description: "The toggle switches a Card between paper and ink, to show how an app applies the choice itself.", Demo: ThemeToggleDemo, code: themeToggleDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed toggle that shows the current theme and can't be switched.", Demo: ThemeToggleDisabledDemo, code: themeToggleDisabledDemoCode },
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
    "value": "The current theme, light or dark. Leave it out to let the toggle track it, starting from defaultValue.",
    "defaultValue": "The first theme when the toggle tracks it itself. Defaults to light.",
    "onValueChange": "Called with light or dark when the toggle is clicked or switched with Space.",
    "label": "Accessible name of the switch when no Field labels it.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the toggle and stops it from switching. A disabled Field or Fieldset does the same.",
    "className": "Classes on the track, for placement such as margin. The track keeps its 52 × 32 px size."
  },
};
