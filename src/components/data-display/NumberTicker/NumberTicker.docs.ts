import { NumberTickerDemo } from "./demos/NumberTickerDemo";
import numberTickerDemoCode from "./demos/NumberTickerDemo.tsx?raw";
import { NumberTickerFormatDemo } from "./demos/NumberTickerFormatDemo";
import numberTickerFormatDemoCode from "./demos/NumberTickerFormatDemo.tsx?raw";

export default {
  description: "Animate numeric changes with rolling digits.",
  usage: "Pass a number and optional formatter. Typography is inherited from the surrounding element.",
  anatomy: "Decorative digit strips animate the visual value. A single screen-reader string contains the formatted value.",
  notes: [
    "The formatter must return non-empty text.",
    "The ticker is not a live region; add an announcement only when the update needs one."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Changing numeric value.", Demo: NumberTickerDemo, code: numberTickerDemoCode },
    { id: "format", title: "Custom formatting", description: "Formatted numbers with inherited typography.", Demo: NumberTickerFormatDemo, code: numberTickerFormatDemoCode },
  ],
  keyboard: [],
  related: [
    "StatTile",
    "NumberStepper"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "format": "Format the value, including separators, decimals or units.",
    "className": "Additional classes on the outer element."
  },
};
