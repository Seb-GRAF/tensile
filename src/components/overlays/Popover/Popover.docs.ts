import { PopoverDemo } from "./demos/PopoverDemo";
import popoverDemoCode from "./demos/PopoverDemo.tsx?raw";
import { PopoverPlacementsDemo } from "./demos/PopoverPlacementsDemo";
import popoverPlacementsDemoCode from "./demos/PopoverPlacementsDemo.tsx?raw";
import { PopoverIconTriggerDemo } from "./demos/PopoverIconTriggerDemo";
import popoverIconTriggerDemoCode from "./demos/PopoverIconTriggerDemo.tsx?raw";
import { PopoverDisabledDemo } from "./demos/PopoverDisabledDemo";
import popoverDisabledDemoCode from "./demos/PopoverDisabledDemo.tsx?raw";
import { PopoverDialogDemo } from "./demos/PopoverDialogDemo";
import popoverDialogDemoCode from "./demos/PopoverDialogDemo.tsx?raw";

export default {
  description: "Expand a trigger into a non-modal panel.",
  usage: "Supply panel content; control open, or let the popover keep it. Use trigger for text or an icon, and label to name an icon-only trigger.",
  anatomy: "Expand supplies the trigger and panel. The panel is lifted above clipping containers. The caller supplies padding and interactive content.",
  notes: [
    "placement is preferred; the panel flips when the other side has more room.",
    "Use Dialog when the rest of the page should be inert."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A trigger that grows into a short note with a button that closes it, for details that don’t need a modal.", Demo: PopoverDemo, code: popoverDemoCode },
    { id: "placements", title: "Placements", description: "The six placements side by side; pick one for where the trigger sits, and the panel still flips when there isn’t room.", Demo: PopoverPlacementsDemo, code: popoverPlacementsDemoCode },
    { id: "icontrigger", title: "Icon Trigger", description: "An icon-only trigger named by label, for a help or info button next to other content.", Demo: PopoverIconTriggerDemo, code: popoverIconTriggerDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed trigger that doesn’t open, for details that aren’t available yet.", Demo: PopoverDisabledDemo, code: popoverDisabledDemoCode },
    { id: "dialog", title: "Dialog", description: "A popover inside a Dialog that grows over the dialog’s edges, for help text inside a form in a modal.", Demo: PopoverDialogDemo, code: popoverDialogDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Open the focused trigger."
    },
    {
      "key": "Escape",
      "description": "Close the panel and return focus."
    },
    {
      "key": "Tab",
      "description": "Move through the panel controls."
    }
  ],
  related: [
    "Dialog",
    "Tooltip",
    "TimePicker"
  ],
  props: {
    "open": "Whether the panel is open. Set it to control the popover.",
    "defaultOpen": "Whether the panel starts open when open isn’t set.",
    "onOpenChange": "Called with true when the trigger is pressed, and with false on Escape or a press outside.",
    "children": "Content of the panel, which sizes to it up to the viewport and scrolls beyond.",
    "trigger": "Content inside the trigger button; do not nest another button.",
    "label": "Accessible name of the trigger; required when the trigger shows only an icon.",
    "panelLabel": "Accessible name of the non-modal dialog.",
    "panelWidth": "Preferred panel width in pixels, capped to the viewport.",
    "placement": "The side the panel opens toward and the trigger edge it stays aligned with; it flips when the other side has more room.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "disabled": "Dims the trigger and keeps the panel from opening.",
    "aria-labelledby": "IDs naming the trigger.",
    "aria-describedby": "IDs describing the trigger.",
    "aria-invalid": "Validation state on the trigger.",
    "className": "Placement of the trigger; the open panel overlays the page."
  },
};
