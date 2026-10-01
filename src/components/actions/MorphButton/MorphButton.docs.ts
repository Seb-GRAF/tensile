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
    "While loading or successful the button ignores clicks and Enter, so a form can't be sent twice, but it stays focusable and keeps focus, so keyboard users don't lose their place. It reports aria-disabled meanwhile. Set status back to idle to allow another action.",
    "Use type=\"submit\" inside a form; the default is button."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Start a task on click and show its progress in the button until it finishes.", Demo: MorphButtonExample, code: existingCode },
    { id: "states", title: "States", description: "The three statuses side by side: the label, the spinner, and the check on the accent fill.", Demo: MorphButtonStatesDemo, code: morphButtonStatesDemoCode },
    { id: "disabled", title: "Disabled", description: "An action that isn't available yet, such as Save before anything has changed.", Demo: MorphButtonDisabledDemo, code: morphButtonDisabledDemoCode },
    { id: "form", title: "In a form", description: "A submit button that shows the request's progress; Enter in the field submits too.", Demo: MorphButtonFormDemo, code: morphButtonFormDemoCode },
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
    "type": "Native button type. Use submit inside a form; the default is button.",
    "children": "The idle label. The button narrows to a circle around the spinner and the check.",
    "disabled": "Native disabled: dims the button and removes it from the Tab order. Loading and success block activation without this.",
    "className": "Classes on the button, for placement, such as `justify-self-end`.",
    "status": "idle shows the label; loading shows a spinner; success shows a check on the accent fill.",
    "loadingLabel": "Accessible name while loading, since the spinner has no text.",
    "successLabel": "Accessible name after success, since the check has no text.",
    "aria-label": "Accessible name while idle, when the label alone isn't clear enough."
  },
};
