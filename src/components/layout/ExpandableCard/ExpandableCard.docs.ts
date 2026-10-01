import { ExpandableCardDemo } from "./demos/ExpandableCardDemo";
import expandableCardDemoCode from "./demos/ExpandableCardDemo.tsx?raw";

export default {
  description: "Expand a compact summary into a detail surface.",
  usage: "Provide a title, subtitle, visual and detail body; control open, or let the card keep it. Reserve room for the expanded surface.",
  anatomy: "A 280 × 72 summary opens into a 360 × 400 detail panel. The visual appears in both the summary and detail header. An IconButton closes the panel.",
  notes: [
    "Keep visual non-interactive because it also appears inside the trigger.",
    "The body has a fixed available area; keep its content concise."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A project summary that opens into its brief with a Done button that closes it, for previews that need more room than a list row.", Demo: ExpandableCardDemo, code: expandableCardDemoCode },
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
    "title": "Heading in the card and the detail view; also names the detail dialog.",
    "subtitle": "Muted line under the title in the card and the detail view.",
    "visual": "Picture shown in the card and the detail's header; it fills a square box that the card rounds.",
    "children": "Body of the detail view, below its header.",
    "open": "Whether the detail view is open. Set it to control the card.",
    "defaultOpen": "Whether the detail view starts open when open isn’t set.",
    "onOpenChange": "Called with true when the card is pressed, and with false on Escape or the close button.",
    "openLabel": "Builds the card button’s accessible name from the title.",
    "closeLabel": "Accessible name of the × button in the detail view.",
    "className": "Placement of the card; the space it takes stays 280 × 72 while the detail view overlays the page."
  },
};
