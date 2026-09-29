import { useState, type FormEvent } from "react";
import { DatePicker, Field, Button } from "tensile";

export function DatePickerFormDemo() {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === null) {
      setError("Choose a date.");
      setResult("");
      return;
    }
    setError("");
    const data = new FormData(event.currentTarget);
    setResult(`Selected: ${data.get("value")}`);
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
      <Field label="Appointment date" required error={error}>
        <DatePicker name="value" value={value} onValueChange={setValue} />
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
