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
    { id: "usage", title: "Basic usage", description: "Changing count and zero state.", Demo: BadgeDemo, code: badgeDemoCode },
    { id: "dot", title: "Dot", description: "Dot for an unspecified count.", Demo: BadgeDotDemo, code: badgeDotDemoCode },
    { id: "format", title: "Custom formatting", description: "Formatted count with an accessible label.", Demo: BadgeFormatDemo, code: badgeFormatDemoCode },
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
    "className": "Additional classes on the outer element."
  },
};
