import { useState, type FormEvent } from "react";
import { Combobox, Field, Button } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function ComboboxFormDemo() {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === null) {
      setError("Choose a team.");
      setResult("");
      return;
    }
    setError("");
    const data = new FormData(event.currentTarget);
    setResult(`Selected: ${data.get("team")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue(null);
        setError("");
        setResult("");
      }}
    >
      <Field label="Team" required error={error}>
        <Combobox
          name="team"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </Field>
      <div className="flex gap-2">
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
