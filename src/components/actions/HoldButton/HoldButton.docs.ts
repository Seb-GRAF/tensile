import { HoldButtonDemo } from "./demos/HoldButtonDemo";
import holdButtonDemoCode from "./demos/HoldButtonDemo.tsx?raw";
import { HoldButtonDurationDemo } from "./demos/HoldButtonDurationDemo";
import holdButtonDurationDemoCode from "./demos/HoldButtonDurationDemo.tsx?raw";

export default {
  description: "Require a sustained press before confirming an action.",
  usage: "Set done when onDone runs. Set it back to false to allow another hold.",
  anatomy: "A native button fills while held. Completion replaces the label with a check and announces doneLabel.",
  notes: [
    "Releasing before completion returns the fill to zero.",
    "duration is measured in milliseconds."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Hold to confirm with a reset action.", Demo: HoldButtonDemo, code: holdButtonDemoCode },
    { id: "duration", title: "Duration", description: "Custom hold duration.", Demo: HoldButtonDurationDemo, code: holdButtonDurationDemoCode },
  ],
  keyboard: [
    {
      "key": "Hold Enter / Space",
      "description": "Fill the button and confirm after the configured duration."
    },
    {
      "key": "Release",
      "description": "Cancel an unfinished hold."
    }
  ],
  related: [
    "SwipeButton",
    "AlertDialog"
  ],
  props: {
    "done": "Whether the confirmed state is shown.",
    "onDone": "Called when the fill reaches the end; set `done` to show the check.",
    "children": "Content rendered inside the component.",
    "doneLabel": "Accessible completion label.",
    "duration": "How long to hold, in ms.",
    "className": "Additional classes on the outer element."
  },
};
