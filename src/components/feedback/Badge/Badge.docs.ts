import { BadgeDemo } from "./demos/BadgeDemo";
import badgeDemoCode from "./demos/BadgeDemo.tsx?raw";
import { BadgeDotDemo } from "./demos/BadgeDotDemo";
import badgeDotDemoCode from "./demos/BadgeDotDemo.tsx?raw";
import { BadgeFormatDemo } from "./demos/BadgeFormatDemo";
import badgeFormatDemoCode from "./demos/BadgeFormatDemo.tsx?raw";

export default {
  description: "Show a count or a dot for new activity.",
  usage: "Pass a count, null for a dot, or zero to hide it. Position the badge in your layout.",
  anatomy: "NumberTicker displays the count. A screen-reader label describes its meaning.",
  notes: [
    "Use label to explain what the count represents.",
    "Badge is not a live region; use a separate status message if updates must be announced immediately."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A count that clears to 0 and comes back, so the badge shrinks to nothing and grows in again; the usual unread or pending count.", Demo: BadgeDemo, code: badgeDemoCode },
    { id: "dot", title: "Dot", description: "A null count shows a plain dot, for something new where the number doesn't matter.", Demo: BadgeDotDemo, code: badgeDotDemoCode },
    { id: "format", title: "Custom formatting", description: "Caps the visible count at 99+ while the label still reads the full number; use it when counts can grow large.", Demo: BadgeFormatDemo, code: badgeFormatDemoCode },
  ],
  keyboard: [],
  related: [
    "StatusBadge",
    "IconButton"
  ],
  props: {
    "count": "A count, or null for something new without a number. 0 hides the badge.",
    "format": "Format the visible numeric count.",
    "label": "Text for screen readers.",
    "className": "Classes on the badge, for placement, e.g. absolute over the corner of an icon button."
  },
};
