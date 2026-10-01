import { useState } from "react";
import { ThemeToggle } from "tensile";

export function ThemeToggleDisabledDemo() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return <ThemeToggle value={theme} onValueChange={setTheme} disabled />;
}
