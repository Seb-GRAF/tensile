import { SpinnerDemo } from "./demos/SpinnerDemo";
import spinnerCode from "./demos/SpinnerDemo.tsx?raw";
import { SpinnerSizesDemo } from "./demos/SpinnerSizesDemo";
import sizesCode from "./demos/SpinnerSizesDemo.tsx?raw";
import { SpinnerButtonDemo } from "./demos/SpinnerButtonDemo";
import buttonCode from "./demos/SpinnerButtonDemo.tsx?raw";

export default {
  description: "A decorative spinning arc for work in progress.",
  usage: "Pair Spinner with visible loading text, or place it inside the control that is busy. It inherits the current text color and accepts a pixel size.",
  anatomy: "Spinner renders an aria-hidden SVG containing one circle with a partial stroke. The arc remains 1.5px thick at different sizes.",
  notes: [
    "Spinner does not announce loading by itself. Put status text in a region with role=\"status\", or provide a busy control with an accessible name.",
    "For an action already in progress, disable its button to prevent repeated activation and use aria-busy to describe its state.",
    "The animation stops when the design system's --motion-duration-scale is 0. The text should still explain what is happening when the arc is stationary.",
    "Use LoadingState when you also need a standard loading title and description.",
  ],
  examples: [
    { id: "usage", title: "Loading status", description: "A status region with a visible loading message.", Demo: SpinnerDemo, code: spinnerCode },
    { id: "sizes", title: "Sizes and color", description: "Size the arc independently of text and inherit a muted color.", Demo: SpinnerSizesDemo, code: sizesCode },
    { id: "button", title: "In a button", description: "The saving state of a disabled action, with text and a spinner.", Demo: SpinnerButtonDemo, code: buttonCode },
  ],
  keyboard: [],
  related: ["LoadingState", "Button", "MorphButton", "ProgressBar"],
  props: {
    size: "Rendered width and height in pixels. The arc stays 1.5px thick.",
    className: "Additional classes on the SVG, including text color utilities.",
  },
};
