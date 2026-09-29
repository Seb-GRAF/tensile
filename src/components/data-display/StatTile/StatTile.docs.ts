import { StatTileDemo } from "./demos/StatTileDemo";
import statTileDemoCode from "./demos/StatTileDemo.tsx?raw";
import { StatTileNegativeDemo } from "./demos/StatTileNegativeDemo";
import statTileNegativeDemoCode from "./demos/StatTileNegativeDemo.tsx?raw";
import { StatTileFormatDemo } from "./demos/StatTileFormatDemo";
import statTileFormatDemoCode from "./demos/StatTileFormatDemo.tsx?raw";

export default {
  description: "Present a key number with its change.",
  usage: "Pass the current value and a signed fractional change. Supply formatters for currencies, percentages or units.",
  anatomy: "An ink Card contains the metric label and NumberTicker. A change chip gives direction and magnitude.",
  notes: [
    "A change of 0.12 means up 12%; -0.04 means down 4%.",
    "The component treats zero as non-negative.",
    "The number's size follows the tile's width; a long label truncates."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Value with positive change.", Demo: StatTileDemo, code: statTileDemoCode },
    { id: "negative", title: "Negative", description: "Negative change.", Demo: StatTileNegativeDemo, code: statTileNegativeDemoCode },
    { id: "format", title: "Custom formatting", description: "Custom value and change formatting.", Demo: StatTileFormatDemo, code: statTileFormatDemoCode },
  ],
  keyboard: [],
  related: [
    "NumberTicker",
    "LineChart"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "change": "Change as a fraction: 0.12 is up 12%, -0.04 is down 4%.",
    "label": "Accessible name of the control or region.",
    "formatValue": "Format a value for display or accessible value text.",
    "formatChange": "Gets the signed change; the default shows only its size.",
    "upLabel": "Read out instead of the up arrow, given the formatted change.",
    "downLabel": "Read out instead of the down arrow, given the formatted change.",
    "className": "Additional classes on the outer element."
  },
};
