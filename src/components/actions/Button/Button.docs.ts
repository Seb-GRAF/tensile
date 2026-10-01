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
import { ButtonLinkDemo } from "./demos/ButtonLinkDemo";
import linkCode from "./demos/ButtonLinkDemo.tsx?raw";

export default {
  description: "A native button for actions, with three visual variants and two sizes.",
  usage: "Use children for the visible label and onClick for an action. Primary is the default variant. Button defaults to type=\"button\"; set type=\"submit\" when it should submit a form.",
  anatomy: "Button renders one native button element, or a link when it has an href. Its children can combine text and an Icon or Spinner. Native button or link props and event handlers pass through to that element.",
  notes: [
    "Primary uses an ink surface, secondary uses a paper surface, and ghost uses the surrounding text color with the hover token behind it on hover. Inside a dark region, such as Card's ink tone, ghost buttons hover with the dark hover token on their own. A small ink pill that holds ghost buttons sets `--tn-ghost-hover` to `--tn-color-ink-3`, as ToastStack's toasts do. Both sizes work with every variant.",
    "Use disabled to prevent activation and remove the button from the Tab order. For loading feedback, compose Spinner with Button, or use MorphButton for a changing action status.",
    "Give Button an href when an action looks like a button but goes to another page, such as a call to action. It then renders a native link with the same look; inside a LinkProvider, same-origin clicks go to your router, as with Link. Use Link for links in running text and IconButton when there is no visible text label. Do not put another button or link inside Button.",
    "A reset button triggers the form's reset event. Reset controlled React values in the form's onReset handler, as shown in the form demo.",
  ],
  examples: [
    { id: "usage", title: "Primary", description: "The main action, with a visible result after activation.", Demo: ButtonDemo, code: buttonCode },
    { id: "secondary", title: "Secondary", description: "A paper surface for a supporting action.", Demo: ButtonSecondaryDemo, code: secondaryCode },
    { id: "ghost", title: "Ghost", description: "A quieter action that inherits the surrounding text color.", Demo: ButtonGhostDemo, code: ghostCode },
    { id: "sizes", title: "Sizes", description: "The default md size is 44px tall; sm is 32px tall.", Demo: ButtonSizesDemo, code: sizesCode },
    { id: "disabled", title: "Disabled", description: "A disabled button cannot be activated and is skipped by Tab.", Demo: ButtonDisabledDemo, code: disabledCode },
    { id: "icon", title: "With an icon", description: "Place an Icon beside the label. The text supplies the accessible name.", Demo: ButtonIconDemo, code: iconCode },
    { id: "link", title: "As a link", description: "Calls to action that go to another page: a link with the button's look.", Demo: ButtonLinkDemo, code: linkCode },
    { id: "form", title: "In a form", description: "Submit a display name with native form validation, or reset the controlled field.", Demo: ButtonFormDemo, code: formCode },
  ],
  keyboard: [
    { key: "Tab", description: "Focus the button. Disabled buttons are skipped." },
    { key: "Enter / Space", description: "Activate the focused button." },
  ],
  related: ["IconButton", "MorphButton", "Spinner", "Link"],
  props: {
    children: "Visible button content. Text supplies the accessible name.",
    href: "Render a link to this URL instead of a button, with the same look.",
    variant: "Visual treatment: primary, secondary, or ghost.",
    size: "Control height: md is 44px and sm is 32px.",
    type: "Native button type. Use submit or reset for form actions. Ignored with href.",
    disabled: "Prevent activation and remove the button from the Tab order.",
    onClick: "Native click handler, also called by keyboard activation.",
    name: "Name included in form submission when this button is the submitter.",
    value: "Value submitted under the button's name.",
    form: "ID of the form this button belongs to, including a form outside its ancestors.",
    className: "Classes on the native button or link, for placement and width, such as `w-full` or `justify-self-end`.",
  },
};
