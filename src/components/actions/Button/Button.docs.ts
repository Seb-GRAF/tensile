import { ButtonDemo } from "./demos/ButtonDemo";
import buttonCode from "./demos/ButtonDemo.tsx?raw";
import { ButtonSecondaryDemo } from "./demos/ButtonSecondaryDemo";
import secondaryCode from "./demos/ButtonSecondaryDemo.tsx?raw";
import { ButtonGhostDemo } from "./demos/ButtonGhostDemo";
import ghostCode from "./demos/ButtonGhostDemo.tsx?raw";
import { ButtonSizesDemo } from "./demos/ButtonSizesDemo";
import sizesCode from "./demos/ButtonSizesDemo.tsx?raw";
import { ButtonDisabledDemo } from "./demos/ButtonDisabledDemo";
import disabledCode from "./demos/ButtonDisabledDemo.tsx?raw";
import { ButtonIconDemo } from "./demos/ButtonIconDemo";
import iconCode from "./demos/ButtonIconDemo.tsx?raw";
import { ButtonFormDemo } from "./demos/ButtonFormDemo";
import formCode from "./demos/ButtonFormDemo.tsx?raw";

export default {
  description: "A native button for actions, with three visual variants and two sizes.",
  usage: "Use children for the visible label and onClick for an action. Primary is the default variant. Button defaults to type=\"button\"; set type=\"submit\" when it should submit a form.",
  anatomy: "Button renders one native button element. Its children can combine text and an Icon or Spinner. Native button props and event handlers pass through to that element.",
  notes: [
    "Primary uses an ink surface, secondary uses a paper surface, and ghost uses the surrounding text color with the hover token behind it on hover. A dark surface sets `--ghost-hover` to `--color-ink-3` on its root, as Card's ink tone does, so ghost buttons on it hover dark while paper controls inside keep the light hover. Both sizes work with every variant.",
    "Use disabled to prevent activation and remove the button from the Tab order. For loading feedback, compose Spinner with Button, or use MorphButton for a changing action status.",
    "Use Link for navigation and IconButton when there is no visible text label. Do not put another button or link inside Button.",
    "A reset button triggers the form's reset event. Reset controlled React values in the form's onReset handler, as shown in the form demo.",
  ],
  examples: [
    { id: "usage", title: "Primary", description: "The main action, with a visible result after activation.", Demo: ButtonDemo, code: buttonCode },
    { id: "secondary", title: "Secondary", description: "A paper surface for a supporting action.", Demo: ButtonSecondaryDemo, code: secondaryCode },
    { id: "ghost", title: "Ghost", description: "A quieter action that inherits the surrounding text color.", Demo: ButtonGhostDemo, code: ghostCode },
    { id: "sizes", title: "Sizes", description: "The default md size is 44px tall; sm is 32px tall.", Demo: ButtonSizesDemo, code: sizesCode },
    { id: "disabled", title: "Disabled", description: "A disabled button cannot be activated and is skipped by Tab.", Demo: ButtonDisabledDemo, code: disabledCode },
    { id: "icon", title: "With an icon", description: "Place an Icon beside the label. The text supplies the accessible name.", Demo: ButtonIconDemo, code: iconCode },
    { id: "form", title: "In a form", description: "Submit a display name with native form validation, or reset the controlled field.", Demo: ButtonFormDemo, code: formCode },
  ],
  keyboard: [
    { key: "Tab", description: "Focus the button. Disabled buttons are skipped." },
    { key: "Enter / Space", description: "Activate the focused button." },
  ],
  related: ["IconButton", "MorphButton", "Spinner", "Link"],
  props: {
    children: "Visible button content. Text supplies the accessible name.",
    variant: "Visual treatment: primary, secondary, or ghost.",
    size: "Control height: md is 44px and sm is 32px.",
    type: "Native button type. Use submit or reset for form actions.",
    disabled: "Prevent activation and remove the button from the Tab order.",
    onClick: "Native click handler, also called by keyboard activation.",
    name: "Name included in form submission when this button is the submitter.",
    value: "Value submitted under the button's name.",
    form: "ID of the form this button belongs to, including a form outside its ancestors.",
    className: "Additional classes on the native button.",
  },
};
