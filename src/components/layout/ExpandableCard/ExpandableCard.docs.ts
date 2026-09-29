import { ExpandableCardDemo } from "./demos/ExpandableCardDemo";
import expandableCardDemoCode from "./demos/ExpandableCardDemo.tsx?raw";

export default {
  description: "Expand a compact summary into a detail surface.",
  usage: "Control open and provide a title, subtitle, visual and detail body. Reserve room for the expanded surface.",
  anatomy: "A 280 × 72 summary opens into a 360 × 400 detail panel. The visual appears in both the summary and detail header. An IconButton closes the panel.",
  notes: [
    "Keep visual non-interactive because it also appears inside the trigger.",
    "The body has a fixed available area; keep its content concise."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled summary-to-detail card.", Demo: ExpandableCardDemo, code: expandableCardDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Open the focused card."
    },
    {
      "key": "Escape",
      "description": "Close the detail panel."
    }
  ],
  related: [
    "Card",
    "Popover"
  ],
  props: {
    "title": "Title displayed by the component.",
    "subtitle": "Secondary text below the title.",
    "visual": "Picture shown in the card and the detail's header; it fills a square box that the card rounds.",
    "children": "Body of the detail view, below its header.",
    "open": "Whether the overlay is open.",
    "onOpenChange": "Called when the overlay requests an open or closed state.",
    "openLabel": "Build the accessible name of the summary trigger.",
    "closeLabel": "Accessible label for the close action.",
    "className": "Additional classes on the outer element."
  },
};
