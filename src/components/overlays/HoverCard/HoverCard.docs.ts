import { HoverCardDemo } from "./demos/HoverCardDemo";
import hoverCardDemoCode from "./demos/HoverCardDemo.tsx?raw";

export default {
  description: "Preview what a link or a name points to while the pointer rests on it or keyboard focus is on it.",
  usage: "Spread every binding from the render-function child onto the trigger, usually a Link, and pass the card's content with its own padding and width. The trigger must work on its own: the card adds detail but holds nothing the page needs.",
  anatomy: "The caller supplies a focusable trigger. A paper card opens below it in the top layer, or above it when there's more room there, and shifts sideways to stay 8 px inside the viewport. The card follows the trigger in the DOM, so Tab moves from the trigger into the card.",
  notes: [
    "Touch screens have no hover, so a tap follows the link and the card stays closed.",
    "The card has no role and the trigger doesn't point to it: screen readers reach it by reading on or with Tab, without hearing it every time the trigger gets focus.",
    "The card holds block content, so don't place the hover card inside a p element.",
    "Use Popover for a panel opened by a click, and Tooltip for a short text label."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A person's name in a sentence that previews their profile: avatar, role, a short bio with a link and follower counts.", Demo: HoverCardDemo, code: hoverCardDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus the trigger and open the card at once; Tab again moves into the card's links, and out of the card closes it."
    },
    {
      "key": "Escape",
      "description": "Close the card; focus inside the card returns to the trigger."
    }
  ],
  related: [
    "Tooltip",
    "Popover",
    "Link",
    "Avatar"
  ],
  props: {
    "content": "Content of the card, with its own padding and width.",
    "children": "Render function receiving ref and pointer/focus handlers. Spread these onto the trigger.",
    "open": "Whether the card is open. Set it to control the card.",
    "defaultOpen": "Whether the card starts open when open isn't set.",
    "onOpenChange": "Called with true when the open delay passes or the trigger gets keyboard focus, and with false when the close delay passes, focus leaves the trigger and the card, or Escape is pressed.",
    "openDelay": "Milliseconds the pointer rests on the trigger before the card opens.",
    "closeDelay": "Milliseconds after the pointer leaves the trigger or the card before the card closes; moving into the card within this time keeps it open.",
    "className": "Placement of the wrapper around the trigger."
  },
};
