import { Button } from "tensile";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="md">Default size</Button>
      <Button size="sm">Small size</Button>
    </div>
  );
}
