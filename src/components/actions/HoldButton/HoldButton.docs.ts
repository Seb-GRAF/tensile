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
    { id: "usage", title: "Basic usage", description: "Hold to confirm a destructive action, such as deleting a project; release early and it springs back.", Demo: HoldButtonDemo, code: holdButtonDemoCode },
    { id: "duration", title: "Duration", description: "A longer hold for actions that are harder to undo.", Demo: HoldButtonDurationDemo, code: holdButtonDurationDemoCode },
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
    "children": "The visible label, also the accessible name until the hold completes.",
    "doneLabel": "Accessible name once confirmed, since the check has no text.",
    "duration": "How long to hold, in ms.",
    "className": "Classes on the button, for placement."
  },
};
