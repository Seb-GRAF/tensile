import { ToggleGroupDemo } from "./demos/ToggleGroupDemo";
import toggleGroupDemoCode from "./demos/ToggleGroupDemo.tsx?raw";
import { ToggleGroupIconsDemo } from "./demos/ToggleGroupIconsDemo";
import toggleGroupIconsDemoCode from "./demos/ToggleGroupIconsDemo.tsx?raw";
import { ToggleGroupDisabledDemo } from "./demos/ToggleGroupDisabledDemo";
import toggleGroupDisabledDemoCode from "./demos/ToggleGroupDisabledDemo.tsx?raw";
import { ToggleGroupFormDemo } from "./demos/ToggleGroupFormDemo";
import toggleGroupFormDemoCode from "./demos/ToggleGroupFormDemo.tsx?raw";
import { ToggleGroupSingleDemo } from "./demos/ToggleGroupSingleDemo";
import toggleGroupSingleDemoCode from "./demos/ToggleGroupSingleDemo.tsx?raw";

export default {
  description: "Toggle independent choices in a row of buttons, or pick one in a segmented row.",
  usage: "Keep selected values in an array. Supply an icon and a label for icon-only choices. With type=\"single\", the value is one string and an ink pill slides to the picked choice.",
  anatomy: "A named group contains toggle buttons. Each pressed button exposes aria-pressed. Named values are submitted as repeated hidden inputs. In single mode the row is a radiogroup of radios with aria-checked, and the value is submitted as one hidden input.",
  notes: [
    "More than one choice can be pressed. Use type=\"single\" when exactly one choice applies, such as a billing period or a view.",
    "Arrow keys move focus without changing the selection. In single mode they move and pick, as in a radio group."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Text buttons where any number can be pressed, such as filters or teams.", Demo: ToggleGroupDemo, code: toggleGroupDemoCode },
    { id: "icons", title: "With icons", description: "Icon-only buttons named by their labels, as in a text-style bar.", Demo: ToggleGroupIconsDemo, code: toggleGroupIconsDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed group that shows its pressed buttons and takes no input.", Demo: ToggleGroupDisabledDemo, code: toggleGroupDisabledDemoCode },
    { id: "single", title: "Single choice", description: "A segmented row where exactly one choice is picked, such as a billing period.", Demo: ToggleGroupSingleDemo, code: toggleGroupSingleDemoCode },
    { id: "form", title: "In a form", description: "The group in a Field and a form: name submits one entry per pressed button, and Reset restores the first choice.", Demo: ToggleGroupFormDemo, code: toggleGroupFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right",
      "description": "Move focus between choices. In single mode, Up and Down do the same and every move picks the choice."
    },
    {
      "key": "Home / End",
      "description": "Focus the first or last choice."
    },
    {
      "key": "Enter / Space",
      "description": "Toggle the focused choice. In single mode, Space picks it."
    }
  ],
  related: [
    "RadioGroup",
    "CheckboxGroup",
    "Field"
  ],
  props: {
    "options": "Available choices. Each option supplies a value and visible label.",
    "type": "\"multiple\" (default) lets any number of buttons be pressed; \"single\" picks exactly one in a segmented row.",
    "value": "Values of the pressed buttons, or the picked value in single mode. Leave it out to let the group track it, starting from defaultValue.",
    "defaultValue": "The first value when the group tracks it itself. Defaults to none, or the first option in single mode.",
    "onValueChange": "Called with every pressed value, in the order they were pressed, when a button is clicked or toggled with Enter or Space. In single mode, called with the picked value.",
    "label": "Accessible name of the group when no Field labels it.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the buttons and stops them from toggling. A disabled Field or Fieldset does the same.",
    "className": "Classes on the wrapping row of buttons, for width and placement. Buttons wrap onto new lines when it's narrow."
  },
};
