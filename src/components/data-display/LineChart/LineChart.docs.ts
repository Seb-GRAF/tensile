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
    { id: "usage", title: "Basic usage", description: "Labeled data with hover and keyboard exploration.", Demo: LineChartDemo, code: lineChartDemoCode },
    { id: "format", title: "Custom formatting", description: "Formatted values.", Demo: LineChartFormatDemo, code: lineChartFormatDemoCode },
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
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Accessible summary of the chart.",
    "className": "Additional classes on the outer element."
  },
};
