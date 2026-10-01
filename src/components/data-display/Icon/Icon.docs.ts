import { IconDemo } from "./demos/IconDemo";
import iconCode from "./demos/IconDemo.tsx?raw";
import { IconSizesDemo } from "./demos/IconSizesDemo";
import sizesCode from "./demos/IconSizesDemo.tsx?raw";

export default {
  description: "A decorative SVG wrapper for line icons with a consistent stroke thickness.",
  usage: "Pass SVG shapes drawn on a 24 × 24 grid as children. Set size in pixels and use the surrounding text color or a text color utility to color the strokes.",
  anatomy: "Icon renders an aria-hidden SVG with a 24 × 24 viewBox, no fill, rounded line caps and rounded joins. Its stroke follows the chosen size so lines remain 1.5px thick.",
  notes: [
    "Icon is hidden from screen readers. Put meaningful text beside it, or give the containing IconButton its required label.",
    "Pass shapes such as path, circle or rect directly. The shared internal icon collection is not a public package export.",
  ],
  examples: [
    { id: "usage", title: "With text", description: "The visible text communicates the status; the icon reinforces it visually.", Demo: IconDemo, code: iconCode },
    { id: "sizes", title: "Sizes and color", description: "The same drawing at four sizes inherits the muted text color.", Demo: IconSizesDemo, code: sizesCode },
  ],
  keyboard: [],
  related: ["IconButton", "Button", "Spinner"],
  props: {
    children: "SVG shapes drawn on a 24 × 24 coordinate grid.",
    size: "Rendered width and height in pixels. Stroke thickness stays at 1.5px.",
    className: "Classes on the `<svg>`, for placement or a text color that sets the stroke.",
  },
};
