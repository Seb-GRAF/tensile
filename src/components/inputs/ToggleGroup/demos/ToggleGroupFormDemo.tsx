import { useState, type FormEvent } from "react";
import { ToggleGroup, Field, Button } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function ToggleGroupFormDemo() {
  const [value, setValue] = useState(["design"]);
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.getAll("team").join(", ")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue(["design"]);
        setResult("");
      }}
    >
      <Field label="Teams">
        <ToggleGroup
          name="team"
          options={options}
          value={value}
          onValueChange={setValue}
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
