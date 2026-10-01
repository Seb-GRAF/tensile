import { BarChartDemo } from "./demos/BarChartDemo";
import barChartDemoCode from "./demos/BarChartDemo.tsx?raw";
import { BarChartFormatDemo } from "./demos/BarChartFormatDemo";
import barChartFormatDemoCode from "./demos/BarChartFormatDemo.tsx?raw";

export default {
  description: "Compare values across labeled categories.",
  usage: "Pass labeled numeric data and a summary in label. Use formatValue to communicate units.",
  anatomy: "An ink Card provides the chart surface. Pointer or keyboard exploration reveals each value.",
  notes: [
    "Use distinct, concise labels and non-negative values with a positive total.",
    "A live status announces the explored point."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Bars for a handful of categories; hover a bar or Tab in and use the arrows to read each value. Use it to compare amounts side by side.", Demo: BarChartDemo, code: barChartDemoCode },
    { id: "format", title: "Custom formatting", description: "`formatValue` adds a unit (\"6 h\") to the tooltip and the announced value; use it whenever a bare number would be unclear.", Demo: BarChartFormatDemo, code: barChartFormatDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right",
      "description": "Explore adjacent values."
    },
    {
      "key": "Home / End",
      "description": "Explore the first or last value."
    }
  ],
  related: [
    "Table",
    "StatTile"
  ],
  props: {
    "data": "Labeled bars with non-negative values.",
    "formatValue": "Turns a value into the text in the tooltip and the live status, such as \"6 h\".",
    "label": "Names the chart for screen readers with a short summary, such as \"Work hours this week\".",
    "className": "Classes on the ink card, for width and placement; it fills its container by default."
  },
};
