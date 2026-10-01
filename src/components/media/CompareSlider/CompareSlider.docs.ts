import { CompareSliderDemo } from "./demos/CompareSliderDemo";
import compareSliderDemoCode from "./demos/CompareSliderDemo.tsx?raw";

export default {
  description: "Compare two visuals with a movable divider.",
  usage: "Set an aspect ratio or height on the frame. Pass before and after content that fills it. Control the divider with value and onValueChange, from 0 to 1, or leave value out and start from defaultValue.",
  anatomy: "The before layer sits below the clipped after layer. A focusable slider handle controls the divider and grows while the frame is held.",
  notes: [
    "Provide descriptive image alternatives and meaningful before/after labels.",
    "Drag anywhere on the frame to move the divider."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Two versions of one photo split by a draggable divider; use it to show an edit, a restoration or a redesign side by side.", Demo: CompareSliderDemo, code: compareSliderDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Move the divider by five percentage points."
    },
    {
      "key": "Home / End",
      "description": "Move to either edge."
    }
  ],
  related: [
    "Image",
    "Slider"
  ],
  props: {
    "before": "Left of the divider: any node that fills the frame, e.g. an img with size-full object-cover.",
    "after": "Content on the right side of the divider, filling the frame.",
    "value": "Divider position from the left, 0..1. Leave it out to let the slider track it, starting from defaultValue.",
    "defaultValue": "The divider's first position, 0..1, when the slider tracks it itself.",
    "onValueChange": "Called with the divider position, 0..1, while the frame is dragged or an arrow, Home or End key moves the handle.",
    "beforeLabel": "Visible label for the before layer.",
    "afterLabel": "Visible label for the after layer.",
    "label": "The handle's accessible name.",
    "className": "Classes on the frame; set its aspect ratio or height here, e.g. `aspect-3/2`."
  },
};
