import { SeparatorDemo } from "./demos/SeparatorDemo";
import separatorCode from "./demos/SeparatorDemo.tsx?raw";
import { SeparatorVerticalDemo } from "./demos/SeparatorVerticalDemo";
import verticalCode from "./demos/SeparatorVerticalDemo.tsx?raw";

export default {
  description: "A horizontal or vertical rule for separating related content.",
  usage: "Place Separator between content blocks. Horizontal is the default; use orientation=\"vertical\" inside a flex or grid row for a vertical rule.",
  anatomy: "Separator renders a native hr with the design system's line color. A vertical separator is 1px wide, stretches to its row height and exposes aria-orientation=\"vertical\".",
  notes: [
    "Use a horizontal separator for a meaningful break between content sections. Add aria-hidden when the rule is only decorative, such as between short metadata labels.",
    "Vertical separators need a flex or grid row whose content establishes its height. Use the parent's gap or the separator's className for spacing.",
    "Inside an ink Card, the line token changes automatically to suit the surface.",
  ],
  examples: [
    { id: "usage", title: "Horizontal", description: "A rule between a report summary and its details, spaced with className, to split one surface into parts.", Demo: SeparatorDemo, code: separatorCode },
    { id: "vertical", title: "Vertical", description: "Vertical rules between metadata labels in a row, for inline lists that need more than a comma.", Demo: SeparatorVerticalDemo, code: verticalCode },
  ],
  keyboard: [],
  related: ["Card", "DescriptionList", "List"],
  props: {
    orientation: "Horizontal rule or vertical rule that stretches to its flex or grid row.",
    className: "Spacing around the rule, such as my-4, and its placement in a flex or grid row.",
  },
};
