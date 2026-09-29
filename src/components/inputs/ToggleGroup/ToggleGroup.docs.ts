import { ToggleGroupDemo } from "./demos/ToggleGroupDemo";
import toggleGroupDemoCode from "./demos/ToggleGroupDemo.tsx?raw";
import { ToggleGroupIconsDemo } from "./demos/ToggleGroupIconsDemo";
import toggleGroupIconsDemoCode from "./demos/ToggleGroupIconsDemo.tsx?raw";
import { ToggleGroupDisabledDemo } from "./demos/ToggleGroupDisabledDemo";
import toggleGroupDisabledDemoCode from "./demos/ToggleGroupDisabledDemo.tsx?raw";
import { ToggleGroupFormDemo } from "./demos/ToggleGroupFormDemo";
import toggleGroupFormDemoCode from "./demos/ToggleGroupFormDemo.tsx?raw";

export default {
  description: "Toggle independent choices in a row of buttons.",
  usage: "Keep selected values in an array. Supply an icon and a label for icon-only choices.",
  anatomy: "A named group contains toggle buttons. Each pressed button exposes aria-pressed. Named values are submitted as repeated hidden inputs.",
  notes: [
    "More than one choice can be pressed. Use RadioGroup for one required choice.",
    "Arrow keys move focus without changing the selection."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled text choices.", Demo: ToggleGroupDemo, code: toggleGroupDemoCode },
    { id: "icons", title: "With icons", description: "Named icon choices.", Demo: ToggleGroupIconsDemo, code: toggleGroupIconsDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled toggle group.", Demo: ToggleGroupDisabledDemo, code: toggleGroupDisabledDemoCode },
    { id: "form", title: "In a form", description: "Field composition and named selected values.", Demo: ToggleGroupFormDemo, code: toggleGroupFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right",
      "description": "Move focus between choices."
    },
    {
      "key": "Home / End",
      "description": "Focus the first or last choice."
    },
    {
      "key": "Enter / Space",
      "description": "Toggle the focused choice."
    }
  ],
  related: [
    "RadioGroup",
    "CheckboxGroup",
    "Field"
  ],
  props: {
    "options": "Available choices. Each option supplies a value and visible label.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
