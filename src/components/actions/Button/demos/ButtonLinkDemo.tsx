import { Button } from "tensile";

export function ButtonLinkDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button href="#pricing">See pricing</Button>
      <Button href="https://github.com/seb-graf/tensile" variant="secondary">
        View on GitHub
      </Button>
    </div>
  );
}
