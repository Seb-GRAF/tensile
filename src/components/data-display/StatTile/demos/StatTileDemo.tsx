import { StatTile } from "tensile";

export function StatTileDemo() {
  return (
    <StatTile
      label="Active members"
      value={1248}
      change={0.12}
      className="w-full max-w-xs"
    />
  );
}
