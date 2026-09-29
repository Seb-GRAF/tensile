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
    { id: "usage", title: "Basic usage", description: "Responsive label/value pairs.", Demo: DescriptionListDemo, code: descriptionListDemoCode },
    { id: "content", title: "Content", description: "Rich values composed from public components.", Demo: DescriptionListContentDemo, code: descriptionListContentDemoCode },
  ],
  keyboard: [],
  related: [
    "List",
    "Card"
  ],
  props: {
    "items": "Distinct labels paired with text or React content.",
    "className": "Additional classes on the outer element."
  },
};
