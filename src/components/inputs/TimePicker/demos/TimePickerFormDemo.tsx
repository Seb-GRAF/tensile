import { useState, type FormEvent } from "react";
import { TimePicker, Field, Button } from "tensile";

export function TimePickerFormDemo() {
  const [value, setValue] = useState<{ hours: number; minutes: number } | null>(
    null,
  );
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === null) {
      setError("Choose a time.");
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
      <Field label="Reminder time" required error={error}>
        <TimePicker name="value" value={value} onValueChange={setValue} />
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
