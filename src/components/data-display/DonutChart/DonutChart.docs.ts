import { DonutChartDemo } from "./demos/DonutChartDemo";
import donutChartDemoCode from "./demos/DonutChartDemo.tsx?raw";
import { DonutChartFormatDemo } from "./demos/DonutChartFormatDemo";
import donutChartFormatDemoCode from "./demos/DonutChartFormatDemo.tsx?raw";

export default {
  description: "Show how categories contribute to a total.",
  usage: "Pass labeled numeric data and a summary in label. Use formatValue to communicate units.",
  anatomy: "An ink Card provides the chart surface. Pointer or keyboard exploration reveals each value.",
  notes: [
    "Use distinct, concise labels and non-negative values with a positive total.",
    "The center shows the total until a segment is hovered or focused."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Labeled segments and total.", Demo: DonutChartDemo, code: donutChartDemoCode },
    { id: "format", title: "Custom formatting", description: "Formatted values and customized labels.", Demo: DonutChartFormatDemo, code: donutChartFormatDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Move between segments."
    }
  ],
  related: [
    "Table",
    "StatTile"
  ],
  props: {
    "data": "Labeled segments with non-negative values.",
    "formatValue": "Format a value for display or accessible value text.",
    "label": "Accessible summary of the chart.",
    "totalLabel": "Shown in the center above the total.",
    "segmentLabel": "Read out for a segment, given its label and formatted value.",
    "className": "Additional classes on the outer element."
  },
};
