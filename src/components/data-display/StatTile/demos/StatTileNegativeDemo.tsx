import { StatTile } from "tensile";

export function StatTileNegativeDemo() {
  return (
    <StatTile
      label="Active members"
      value={1248}
      change={-0.04}
      className="w-full max-w-xs"
    />
  );
}
