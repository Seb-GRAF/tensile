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
    { id: "usage", title: "Basic usage", description: "Labeled bars with hover and keyboard exploration.", Demo: BarChartDemo, code: barChartDemoCode },
    { id: "format", title: "Custom formatting", description: "Formatted values.", Demo: BarChartFormatDemo, code: barChartFormatDemoCode },
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
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Accessible summary of the chart.",
    "className": "Additional classes on the outer element."
  },
};
