import { Button, Spinner } from "tensile";

export function SpinnerButtonDemo() {
  return (
    <Button disabled aria-busy="true">
      <Spinner size={20} />
      Saving changes…
    </Button>
  );
}
