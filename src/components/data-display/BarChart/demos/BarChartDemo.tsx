import { BarChart } from "tensile";

const data = [
  { label: "Mon", value: 4 },
  { label: "Tue", value: 6 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 7 },
  { label: "Fri", value: 5 },
];

export function BarChartDemo() {
  return (
    <BarChart
      data={data}
      label="Work hours this week"
      className="w-full max-w-sm"
    />
  );
}
