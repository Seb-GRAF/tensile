import { useState } from "react";
import { Carousel, Button } from "tensile";

const templates = ["Design review", "Project brief", "Launch checklist"];

export function CarouselInteractiveDemo() {
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState("");

  return (
    <div className="grid w-full max-w-lg gap-4">
      <Carousel
        label="Project templates"
        value={value}
        onValueChange={setValue}
        slides={templates.map((title) => ({
          label: title,
          content: (
            <div className="grid gap-4 p-6">
              <h3 className="text-body font-semibold">{title}</h3>
              <Button onClick={() => setSelected(title)}>Use template</Button>
            </div>
          ),
        }))}
      />
      <output aria-live="polite" className="text-label">
        {selected === "" ? "Choose a template" : `Selected: ${selected}`}
      </output>
    </div>
  );
}
