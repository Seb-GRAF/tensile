import { useState, type FormEvent } from "react";
import { TagInput, Field, Button } from "tensile";

export function TagInputFormDemo() {
  const [value, setValue] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.length === 0) {
      setError("Add at least one topic.");
      setResult("");
      return;
    }
    setError("");
    const data = new FormData(event.currentTarget);
    setResult(`Topics: ${data.getAll("topic").join(", ")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue([]);
        setError("");
        setResult("");
      }}
    >
      <Field
        label="Topics"
        required
        error={error}
        description="Confirm each topic with Enter or comma."
      >
        <TagInput name="topic" value={value} onValueChange={setValue} />
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
