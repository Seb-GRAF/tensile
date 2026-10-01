import { IconDemo } from "./demos/IconDemo";
import iconCode from "./demos/IconDemo.tsx?raw";
import { IconSizesDemo } from "./demos/IconSizesDemo";
import sizesCode from "./demos/IconSizesDemo.tsx?raw";

export default {
  description: "A decorative line icon from the library's set, drawn by name with a consistent stroke thickness.",
  usage: "Pass the name of an icon in the set, such as close, search or calendar. Set size in pixels and use the surrounding text color or a text color utility to color the strokes.",
  anatomy: "Icon renders an aria-hidden SVG with a 24 × 24 viewBox, no fill, rounded line caps and rounded joins. Its stroke follows the chosen size so lines remain 1.5px thick.",
  notes: [
    "Icon is hidden from screen readers. Put meaningful text beside it, or give the containing IconButton its required label.",
    "The names are the IconName type, exported from the package, so an unknown name is a type error. The set holds every icon the library and its examples draw.",
  ],
  examples: [
    { id: "usage", title: "With text", description: "The visible text communicates the status; the icon reinforces it visually.", Demo: IconDemo, code: iconCode },
    { id: "sizes", title: "Sizes and color", description: "The same icon at four sizes inherits the muted text color.", Demo: IconSizesDemo, code: sizesCode },
  ],
  keyboard: [],
  related: ["IconButton", "Button", "Spinner"],
  props: {
    name: "Which icon of the set to draw.",
    size: "Rendered width and height in pixels. Stroke thickness stays at 1.5px.",
    className: "Classes on the `<svg>`, for placement or a text color that sets the stroke.",
  },
};
