import { useState } from "react";
import { Tabs } from "tensile";

const items = [
  { value: "design", label: "Style", content: <p>Set color, type and shape with tokens.</p> },
  { value: "develop", label: "Build", content: <p>Import a component and its styles.</p> },
  { value: "ship", label: "Ship", content: <p>Compose the pieces into your app.</p> },
];

export function TabsExample() {
  const [value, setValue] = useState("design");
  return <Tabs items={items} value={value} onValueChange={setValue} label="Building an interface" />;
}
