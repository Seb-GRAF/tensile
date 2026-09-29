import { useState, type FormEvent } from "react";
import { ColorSwatches, Field, Button } from "tensile";

const colors = [
  { value: "sage", label: "Sage", color: "#8a9e86" },
  { value: "clay", label: "Clay", color: "#be8977" },
  { value: "slate", label: "Slate", color: "#778b9f" },
];

export function ColorSwatchesFormDemo() {
  const [value, setValue] = useState("sage");
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.get("color")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue("sage");
        setResult("");
      }}
    >
      <Field label="Notebook color">
        <ColorSwatches
          name="color"
          options={colors}
          value={value}
          onValueChange={setValue}
          required
        />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      <output aria-live="polite" className="text-label text-muted">
        {result}
      </output>
    </form>
  );
}
