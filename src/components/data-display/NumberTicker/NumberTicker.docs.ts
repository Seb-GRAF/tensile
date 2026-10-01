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
    { id: "usage", title: "Basic usage", description: "Digits roll up or down as the buttons change the number, at the size of the text around it; use it for counts that change in place.", Demo: NumberTickerDemo, code: numberTickerDemoCode },
    { id: "format", title: "Custom formatting", description: "`format` shows the number as CHF currency while the digits still roll; use it for prices and totals.", Demo: NumberTickerFormatDemo, code: numberTickerFormatDemoCode },
  ],
  keyboard: [],
  related: [
    "StatTile",
    "NumberStepper"
  ],
  props: {
    "value": "The number shown; when it changes, the digits roll toward it.",
    "format": "Format the value, including separators, decimals or units.",
    "className": "Classes on the inline span around the digits, for margin and placement; size and color come from the parent."
  },
};
