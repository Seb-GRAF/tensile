import { DonutChart } from "tensile";

const data = [
  { label: "Design", value: 24 },
  { label: "Build", value: 48 },
  { label: "Review", value: 16 },
];

export function DonutChartDemo() {
  return (
    <DonutChart
      data={data}
      label="Work hours by activity"
      className="w-full max-w-xs"
    />
  );
}
