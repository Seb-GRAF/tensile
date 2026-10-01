import { LineChartDemo } from "./demos/LineChartDemo";
import lineChartDemoCode from "./demos/LineChartDemo.tsx?raw";
import { LineChartFormatDemo } from "./demos/LineChartFormatDemo";
import lineChartFormatDemoCode from "./demos/LineChartFormatDemo.tsx?raw";

export default {
  description: "Show change across an ordered series.",
  usage: "Pass labeled numeric data and a summary in label. Use formatValue to communicate units.",
  anatomy: "An ink Card provides the chart surface. Pointer or keyboard exploration reveals each value.",
  notes: [
    "Use distinct, concise labels and non-negative values with a positive total.",
    "LineChart needs at least two points.",
    "A live status announces the explored point."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A line through an ordered series; hover it or Tab in and use the arrows to read each point. Use it to show a trend over time.", Demo: LineChartDemo, code: lineChartDemoCode },
    { id: "format", title: "Custom formatting", description: "`formatValue` adds a unit to the tooltip and the announced value; use it whenever a bare number would be unclear.", Demo: LineChartFormatDemo, code: lineChartFormatDemoCode },
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
    "data": "Labeled points with non-negative values.",
    "formatValue": "Turns a value into the text in the tooltip and the live status, such as \"6 h\".",
    "label": "Names the chart for screen readers with a short summary, such as \"Work hours this week\".",
    "className": "Classes on the ink card, for width and placement; it fills its container by default."
  },
};
