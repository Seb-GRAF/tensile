import { useState } from "react";
import { Tabs } from "tensile";

const items = [
  { value: "design", label: "Style", content: <p>One set of tokens for color, type, and shape.</p> },
  {
    value: "develop",
    label: "Build",
    content: <div style={{ display: "grid", gap: 12 }}><p>Import a component and its styles.</p><p>Keep values in your app. Pass content and callbacks as props.</p></div>,
  },
  { value: "ship", label: "Ship", content: <p>Compose the pieces into your own interface.</p> },
];

export function TabsExample() {
  const [value, setValue] = useState("design");
  return <Tabs items={items} value={value} onValueChange={setValue} label="Building an interface" variant="segmented" />;
}
