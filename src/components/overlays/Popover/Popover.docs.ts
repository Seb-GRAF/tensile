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
  usage: "Control open and supply panel content. Use trigger for text or an icon, and label to name an icon-only trigger.",
  anatomy: "Expand supplies the trigger and panel. The panel is lifted above clipping containers. The caller supplies padding and interactive content.",
  notes: [
    "placement is preferred; the panel flips when the other side has more room.",
    "Use Dialog when the rest of the page should be inert."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled trigger and interactive content.", Demo: PopoverDemo, code: popoverDemoCode },
    { id: "placements", title: "Placements", description: "All six preferred placements.", Demo: PopoverPlacementsDemo, code: popoverPlacementsDemoCode },
    { id: "icontrigger", title: "Icon Trigger", description: "Named icon trigger.", Demo: PopoverIconTriggerDemo, code: popoverIconTriggerDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled trigger.", Demo: PopoverDisabledDemo, code: popoverDisabledDemoCode },
    { id: "dialog", title: "Dialog", description: "Popover inside a dialog.", Demo: PopoverDialogDemo, code: popoverDialogDemoCode },
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
    "open": "Whether the overlay is open.",
    "onOpenChange": "Called when the overlay requests an open or closed state.",
    "children": "Content rendered inside the component.",
    "trigger": "Content inside the trigger button; do not nest another button.",
    "label": "Accessible name of the control or region.",
    "panelLabel": "Accessible name of the non-modal dialog.",
    "panelWidth": "Preferred panel width in pixels, capped to the viewport.",
    "placement": "The side the panel opens toward and the trigger edge it stays aligned with; it flips when the other side has more room.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "disabled": "Disable interaction with this control.",
    "aria-labelledby": "IDs naming the trigger.",
    "aria-describedby": "IDs describing the trigger.",
    "aria-invalid": "Validation state on the trigger.",
    "className": "Additional classes on the outer element."
  },
};
