import { DescriptionListDemo } from "./demos/DescriptionListDemo";
import descriptionListDemoCode from "./demos/DescriptionListDemo.tsx?raw";
import { DescriptionListContentDemo } from "./demos/DescriptionListContentDemo";
import descriptionListContentDemoCode from "./demos/DescriptionListContentDemo.tsx?raw";

export default {
  description: "Pair labels with values in a responsive description list.",
  usage: "Pass distinct labels and React content for each value.",
  anatomy: "A native dl contains dt labels and dd values.",
  notes: [
    "Labels stack above values below 384px of container width and sit beside them in wider containers."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Plain text values beside their labels, stacking in a narrow container; use it for the facts on a detail page.", Demo: DescriptionListDemo, code: descriptionListDemoCode },
    { id: "content", title: "Content", description: "Values that are components, here a StatusBadge and a Link, for a status or a related page among the facts.", Demo: DescriptionListContentDemo, code: descriptionListContentDemoCode },
  ],
  keyboard: [],
  related: [
    "List",
    "Card"
  ],
  props: {
    "items": "Distinct labels paired with text or React content.",
    "className": "Classes on the `<dl>`, for width and placement; its width decides whether labels sit beside or above the values."
  },
};
