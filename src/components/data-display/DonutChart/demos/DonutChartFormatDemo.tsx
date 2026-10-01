import { DonutChart } from "tensile";

const data = [
  { label: "Design", value: 24 },
  { label: "Build", value: 48 },
  { label: "Review", value: 16 },
];

export function DonutChartFormatDemo() {
  return (
    <DonutChart
      data={data}
      label="Work hours by activity"
      formatValue={(value) => `${value} h`}
      totalLabel="Hours"
      segmentLabel={(label, value) => `${label}: ${value} of project work`}
      className="w-full max-w-xs"
    />
  );
}
