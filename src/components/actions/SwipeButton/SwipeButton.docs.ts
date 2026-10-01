import { SwipeButtonDemo } from "./demos/SwipeButtonDemo";
import swipeButtonDemoCode from "./demos/SwipeButtonDemo.tsx?raw";

export default {
  description: "Confirm an action by sliding a handle to the end.",
  usage: "Place the full-width control in a sized container. Set confirmed in onConfirm and reset it when another action is available.",
  anatomy: "A native button provides keyboard activation. The draggable knob pulls an accent fill behind it, and the label turns to the on-accent color under the fill. At the end the track turns accent and the knob shows a check beside the confirmed label.",
  notes: [
    "A partial drag returns to the start.",
    "Keyboard users can confirm without a dragging gesture."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Drag the knob to the end, or focus it and press Enter, to confirm; the reset button starts over.", Demo: SwipeButtonDemo, code: swipeButtonDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Confirm the action."
    }
  ],
  related: [
    "HoldButton",
    "AlertDialog"
  ],
  props: {
    "confirmed": "The done state. Set it to true in `onConfirm`, and back to false to let the user swipe again.",
    "onConfirm": "Called when the handle reaches the end or the button is activated by keyboard.",
    "label": "The text on the track, which is also the accessible name before confirming.",
    "confirmedLabel": "Visible and accessible completion label.",
    "className": "Classes on the track, for width and placement. It fills its container by default."
  },
};
