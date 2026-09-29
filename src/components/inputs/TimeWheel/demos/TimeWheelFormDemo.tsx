import { useState, type FormEvent } from "react";
import { TimeWheel, Field, Button } from "tensile";

export function TimeWheelFormDemo() {
  const [value, setValue] = useState<{ hours: number; minutes: number }>({
    hours: 9,
    minutes: 30,
  });
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.get("value")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue({ hours: 9, minutes: 30 });
        setResult("");
      }}
    >
      <Field label="Reminder time">
        <TimeWheel name="value" value={value} onValueChange={setValue} />
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
