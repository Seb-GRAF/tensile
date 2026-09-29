import { CompareSliderDemo } from "./demos/CompareSliderDemo";
import compareSliderDemoCode from "./demos/CompareSliderDemo.tsx?raw";

export default {
  description: "Compare two visuals with a movable divider.",
  usage: "Set an aspect ratio or height on the frame. Pass before and after content that fills it and control a value from zero to one.",
  anatomy: "The before layer sits below the clipped after layer. A focusable slider handle controls the divider and grows while the frame is held.",
  notes: [
    "Provide descriptive image alternatives and meaningful before/after labels.",
    "Drag anywhere on the frame to move the divider."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled before/after comparison.", Demo: CompareSliderDemo, code: compareSliderDemoCode },
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
    "value": "Divider position from the left, 0..1",
    "onValueChange": "Called with the next value when the user makes a change.",
    "beforeLabel": "Visible label for the before layer.",
    "afterLabel": "Visible label for the after layer.",
    "label": "The handle's accessible name.",
    "className": "Additional classes on the outer element."
  },
};
