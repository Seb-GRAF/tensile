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
    { id: "usage", title: "Basic usage", description: "A few categories as arcs around their total; hover or focus an arc to read it. Use it to show shares of a whole.", Demo: DonutChartDemo, code: donutChartDemoCode },
    { id: "format", title: "Custom formatting", description: "Hours as the unit, a center title and spoken segment text set by `formatValue`, `totalLabel` and `segmentLabel`, for data with a unit.", Demo: DonutChartFormatDemo, code: donutChartFormatDemoCode },
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
    "formatValue": "Turns a value into the text in the center and the spoken segment text, such as \"6 h\".",
    "label": "Names the chart for screen readers with a short summary, such as \"Work hours this week\".",
    "totalLabel": "Shown in the center above the total.",
    "segmentLabel": "Read out for a segment, given its label and formatted value.",
    "className": "Classes on the ink card, for width and placement; it fills its container by default."
  },
};
