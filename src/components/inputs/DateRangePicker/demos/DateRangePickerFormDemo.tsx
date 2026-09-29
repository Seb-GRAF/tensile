import { useState, type FormEvent } from "react";
import { DateRangePicker, Field, Button } from "tensile";

export function DateRangePickerFormDemo() {
  const [value, setValue] = useState<{ start: string; end: string } | null>(
    null,
  );
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === null) {
      setError("Choose both dates.");
      setResult("");
      return;
    }
    setError("");
    const data = new FormData(event.currentTarget);
    setResult(`Dates: ${data.get("start")} to ${data.get("end")}`);
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
      <Field label="Travel dates" required error={error}>
        <DateRangePicker
          startName="start"
          endName="end"
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
