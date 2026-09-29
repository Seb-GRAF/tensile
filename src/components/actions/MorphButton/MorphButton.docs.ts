import { MorphButtonStatesDemo } from "./demos/MorphButtonStatesDemo";
import morphButtonStatesDemoCode from "./demos/MorphButtonStatesDemo.tsx?raw";
import { MorphButtonDisabledDemo } from "./demos/MorphButtonDisabledDemo";
import morphButtonDisabledDemoCode from "./demos/MorphButtonDisabledDemo.tsx?raw";
import { MorphButtonFormDemo } from "./demos/MorphButtonFormDemo";
import morphButtonFormDemoCode from "./demos/MorphButtonFormDemo.tsx?raw";
import { MorphButtonExample } from "./demos/MorphButtonExample";
import existingCode from "./demos/MorphButtonExample.tsx?raw";

export default {
  description: "Turn an action into loading and success feedback.",
  usage: "Keep status in the caller. Start the task from onClick or a form submit handler, then update status when it finishes.",
  anatomy: "A native button contains the idle label. Loading swaps the label for Spinner. Success shows a Check.",
  notes: [
    "The button cannot activate while loading or successful. Set status back to idle to allow another action.",
    "Use type=\"submit\" inside a form; the default is button."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A standalone example using public component imports.", Demo: MorphButtonExample, code: existingCode },
    { id: "states", title: "States", description: "Idle, loading and success states.", Demo: MorphButtonStatesDemo, code: morphButtonStatesDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled idle action.", Demo: MorphButtonDisabledDemo, code: morphButtonDisabledDemoCode },
    { id: "form", title: "In a form", description: "Submit a local form with caller-controlled status.", Demo: MorphButtonFormDemo, code: morphButtonFormDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Activate the idle button."
    }
  ],
  related: [
    "Button",
    "Spinner",
    "HoldButton"
  ],
  props: {
    "type": "Native input type.",
    "children": "Content rendered inside the component.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element.",
    "status": "Caller-controlled idle, loading or success state.",
    "loadingLabel": "Accessible name during loading.",
    "successLabel": "Accessible name after success.",
    "aria-label": "Optional accessible name while idle."
  },
};
