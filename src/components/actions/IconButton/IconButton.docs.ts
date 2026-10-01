import { IconButtonDemo } from "./demos/IconButtonDemo";
import iconButtonCode from "./demos/IconButtonDemo.tsx?raw";
import { IconButtonSecondaryDemo } from "./demos/IconButtonSecondaryDemo";
import secondaryCode from "./demos/IconButtonSecondaryDemo.tsx?raw";
import { IconButtonGhostDemo } from "./demos/IconButtonGhostDemo";
import ghostCode from "./demos/IconButtonGhostDemo.tsx?raw";
import { IconButtonSizesDemo } from "./demos/IconButtonSizesDemo";
import sizesCode from "./demos/IconButtonSizesDemo.tsx?raw";
import { IconButtonDisabledDemo } from "./demos/IconButtonDisabledDemo";
import disabledCode from "./demos/IconButtonDisabledDemo.tsx?raw";

export default {
  description: "A square native button for an icon-only action, with a required accessible label.",
  usage: "Give every IconButton a label describing its action, and pass an Icon as its child. Handle activation with onClick. Use aria-pressed when the action toggles a persistent state.",
  anatomy: "IconButton renders one native button with label applied as aria-label. It shares Button's visual variants and native props, with equal width and height.",
  notes: [
    "The label names the action for assistive technology; it is not drawn beside the icon. Use Button when the action needs visible text.",
    "Icon size is independent of button size. These demos use a 20px icon in a 44px button and a 16px icon in a 32px button.",
    "Wrap IconButton in Tooltip for a visible explanation on hover or focus. Spread Tooltip's trigger bindings onto IconButton and keep its required label.",
    "With an href, IconButton renders a link with the same look, such as a GitHub icon in a header; inside a LinkProvider, same-origin clicks go to your router.",
    "For a toggle, keep a stable action label and expose the selected state through aria-pressed. The application owns that state.",
  ],
  examples: [
    { id: "usage", title: "Primary", description: "Save or unsave an article with a named icon action.", Demo: IconButtonDemo, code: iconButtonCode },
    { id: "secondary", title: "Secondary", description: "A paper surface for a supporting icon action.", Demo: IconButtonSecondaryDemo, code: secondaryCode },
    { id: "ghost", title: "Ghost", description: "A toggle action without a resting surface.", Demo: IconButtonGhostDemo, code: ghostCode },
    { id: "sizes", title: "Sizes", description: "Choose a 44px or 32px button, and size the child icon separately.", Demo: IconButtonSizesDemo, code: sizesCode },
    { id: "disabled", title: "Disabled", description: "The icon and accessible label remain present while activation is disabled.", Demo: IconButtonDisabledDemo, code: disabledCode },
  ],
  keyboard: [
    { key: "Tab", description: "Focus the button. Disabled buttons are skipped." },
    { key: "Enter / Space", description: "Activate the focused button." },
  ],
  related: ["Button", "Icon", "Tooltip", "Toolbar"],
  props: {
    label: "Required accessible name, applied as aria-label to the button or link.",
    href: "Render a link to this URL instead of a button, with the same look.",
    children: "Icon content. The button's label names the action.",
    variant: "Visual treatment: primary, secondary, or ghost.",
    size: "Button width and height: md is 44px and sm is 32px.",
    type: "Native button type. Defaults to button to avoid accidental form submission. Ignored with href.",
    disabled: "Prevent activation and remove the button from the Tab order.",
    onClick: "Native click handler, also called by keyboard activation.",
    className: "Classes on the native button or link, for placement, such as `absolute top-3 right-3`.",
  },
};
