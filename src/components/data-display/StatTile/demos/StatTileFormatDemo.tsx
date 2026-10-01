import { StatTile } from "tensile";

export function StatTileFormatDemo() {
  return (
    <StatTile
      label="Revenue"
      value={1248}
      change={0.12}
      formatValue={(value) => `CHF ${value.toLocaleString("en-US")}`}
      formatChange={(change) => `${Math.abs(change * 100).toFixed(1)}%`}
      className="w-full max-w-xs"
    />
  );
}
