import { useState } from "react";
import { ThemeToggle, Card } from "tensile";

export function ThemeToggleDemo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <Card
      tone={theme === "dark" ? "ink" : "paper"}
      className="grid w-full max-w-sm gap-6 p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-label">Preview appearance</span>
        <ThemeToggle value={theme} onValueChange={setTheme} />
      </div>
      <p className="text-body">This card follows the selected theme.</p>
    </Card>
  );
}
