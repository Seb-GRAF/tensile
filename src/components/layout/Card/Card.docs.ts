import { CardDemo } from "./demos/CardDemo";
import cardCode from "./demos/CardDemo.tsx?raw";
import { CardInkDemo } from "./demos/CardInkDemo";
import inkCode from "./demos/CardInkDemo.tsx?raw";

export default {
  description: "A rounded surface with paper or ink tone for grouping related content.",
  usage: "Put ordinary content inside Card and use className to set padding, width and layout. The default tone is paper; choose ink for a dark surface.",
  anatomy: "Card renders one native div with the design system's card radius, floating shadow and surface styling. It does not add headings, padding or interaction.",
  notes: [
    "The ink tone sets the text and focus ring to paper and adjusts the line token for separators inside it. Ghost buttons inherit the surrounding text color.",
    "Use semantic headings, paragraphs and controls inside the card. Card itself is not a button and does not become keyboard-interactive through styling.",
    "Set spacing and dimensions with utility classes. The surface has no built-in content padding.",
  ],
  examples: [
    { id: "usage", title: "Paper", description: "A paper card with caller-supplied padding and width.", Demo: CardDemo, code: cardCode },
    { id: "ink", title: "Ink", description: "An ink card with a separator and a ghost action. Tab to the action to see its focus ring.", Demo: CardInkDemo, code: inkCode },
  ],
  keyboard: [],
  related: ["Separator", "Button", "ExpandableCard", "StatTile"],
  props: {
    tone: "Paper or ink surface. Ink also adjusts text, focus-ring and separator colors inside the card.",
    children: "The content placed inside the card.",
    className: "Additional classes on the div. Use these for padding, width and layout.",
    style: "Inline styles applied to the native div.",
  },
};
