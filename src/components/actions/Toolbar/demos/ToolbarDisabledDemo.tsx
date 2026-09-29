import { Button, Toolbar } from "tensile";

export function ToolbarDisabledDemo() {
  return (
    <Toolbar label="Document actions">
      <Button size="sm" variant="ghost">Copy</Button>
      <Button size="sm" variant="ghost" disabled>Paste</Button>
      <Button size="sm" variant="ghost">Share</Button>
    </Toolbar>
  );
}
